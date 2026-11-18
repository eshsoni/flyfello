import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const INSTAGRAM_USERNAME = 'flyfello';
const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

interface InstagramMediaItem {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp?: string;
}

let cachedFeed: { fetchedAt: number; posts: InstagramMediaItem[] } | null = null;
const CACHE_TTL_MS = 10 * 60 * 1000;

async function fetchFromInstagramGraphApi(token: string): Promise<InstagramMediaItem[]> {
  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';

  // 1. Meta Business / Facebook Graph API tokens (start with EAA...)
  if (token.startsWith('EAA')) {
    let igAccountId = process.env.INSTAGRAM_ACCOUNT_ID?.trim();

    if (!igAccountId || igAccountId === 'MY_INSTAGRAM_ACCOUNT_ID') {
      const accountsRes = await fetch(
        `https://graph.facebook.com/v21.0/me/accounts?fields=id,name,instagram_business_account{id,username}&access_token=${encodeURIComponent(token)}`
      );
      if (accountsRes.ok) {
        const accountsData = (await accountsRes.json()) as {
          data?: Array<{
            id: string;
            name?: string;
            instagram_business_account?: { id: string; username?: string };
          }>;
        };
        const pages = Array.isArray(accountsData?.data) ? accountsData.data : [];
        const matchedPage =
          pages.find(
            (p) =>
              p.instagram_business_account?.username?.toLowerCase() === INSTAGRAM_USERNAME
          ) || pages.find((p) => Boolean(p.instagram_business_account?.id));
        igAccountId = matchedPage?.instagram_business_account?.id;

        if (!igAccountId) {
          console.warn(
            '[Instagram Sync] Meta token is valid, but me/accounts returned no linked instagram_business_account. Ensure pages_show_list + pages_read_engagement permissions and Facebook Page/IG asset assignment are granted, or set INSTAGRAM_ACCOUNT_ID.'
          );
        }
      }
    }

    if (igAccountId && igAccountId !== 'MY_INSTAGRAM_ACCOUNT_ID') {
      const mediaRes = await fetch(
        `https://graph.facebook.com/v21.0/${encodeURIComponent(igAccountId)}/media?fields=${fields}&limit=8&access_token=${encodeURIComponent(token)}`
      );
      if (mediaRes.ok) {
        const mediaData = (await mediaRes.json()) as { data?: InstagramMediaItem[] };
        return Array.isArray(mediaData?.data) ? mediaData.data : [];
      }
    }

    return [];
  }

  // 2. Instagram API with Instagram Login tokens (graph.instagram.com)
  const endpoint = `https://graph.instagram.com/me/media?fields=${fields}&limit=8&access_token=${encodeURIComponent(token)}`;
  const response = await fetch(endpoint);
  if (!response.ok) return [];
  const data = (await response.json()) as { data?: InstagramMediaItem[] };
  return Array.isArray(data?.data) ? data.data : [];
}

async function fetchFromInstagramPublicProfile(): Promise<InstagramMediaItem[]> {
  try {
    const response = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${INSTAGRAM_USERNAME}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'x-ig-app-id': '936619743392459',
          Accept: 'application/json',
        },
      }
    );
    if (!response.ok) return [];
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return [];
    const payload = (await response.json()) as any;
    const edges = payload?.data?.user?.edge_owner_to_timeline_media?.edges;
    if (!Array.isArray(edges)) return [];

    const items: InstagramMediaItem[] = [];
    for (const edge of edges.slice(0, 8)) {
      const node = edge?.node;
      if (!node?.shortcode || !node?.display_url) continue;
      items.push({
        id: String(node.id || node.shortcode),
        caption: String(node.edge_media_to_caption?.edges?.[0]?.node?.text || ''),
        media_type: node.is_video ? 'VIDEO' : 'IMAGE',
        media_url: String(node.display_url),
        thumbnail_url: String(node.thumbnail_src || node.display_url),
        permalink: `https://www.instagram.com/${node.is_video ? 'reel' : 'p'}/${node.shortcode}/`,
        timestamp: node.taken_at_timestamp
          ? new Date(node.taken_at_timestamp * 1000).toISOString()
          : undefined,
      });
    }
    return items;
  } catch {
    return [];
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  const resolveBaseUrl = (req: express.Request): string => {
    const configured = process.env.APP_URL?.trim();
    if (configured && configured !== 'MY_APP_URL') {
      return configured.replace(/\/+$/, '');
    }
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
    const host = req.get('host') || `localhost:${PORT}`;
    return `${protocol}://${host}`;
  };

  app.get('/robots.txt', (req, res) => {
    const baseUrl = resolveBaseUrl(req);
    res.type('text/plain').send(
      `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`
    );
  });

  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = resolveBaseUrl(req);
    const lastMod = new Date().toISOString().split('T')[0];
    res.type('application/xml').send(
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        `  <url>\n` +
        `    <loc>${baseUrl}/</loc>\n` +
        `    <lastmod>${lastMod}</lastmod>\n` +
        `    <changefreq>daily</changefreq>\n` +
        `    <priority>1.0</priority>\n` +
        `  </url>\n` +
        `</urlset>\n`
    );
  });

  const escapeHtml = (val: unknown): string =>
    String(val ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  app.post('/api/holiday-inquiry', async (req, res) => {
    try {
      const payload = req.body || {};
      const referenceId = `FF-HOL-${Math.floor(100000 + Math.random() * 900000)}`;
      const receivedAt = new Date().toISOString();
      const record = {
        referenceId,
        receivedAt,
        ...payload,
      };

      console.log('[Holiday Inquiry Received]', JSON.stringify(record));

      let emailSent = false;
      const smtpHost = process.env.SMTP_HOST?.trim() || 'smtp.zoho.in';
      const smtpPort = Number(process.env.SMTP_PORT) || 465;
      const smtpUser = process.env.SMTP_USER?.trim() || 'info@flyfello.in';
      const smtpPass = process.env.SMTP_PASS?.trim();
      const toEmail = process.env.INQUIRY_TO_EMAIL?.trim() || smtpUser || 'info@flyfello.in';

      if (smtpPass && smtpPass !== 'MY_ZOHO_SMTP_APP_PASSWORD') {
        const flightsInfo = payload.includeFlights
          ? 'Yes'
          : 'No (Land Package Only)';

        const textBody = [
          `FlyFello Holiday Booking Inquiry (${referenceId})`,
          `Received: ${receivedAt}`,
          '',
          `Name: ${payload.fullName || 'N/A'}`,
          `Phone / WhatsApp: ${payload.phone || 'N/A'}`,
          `Email: ${payload.email || 'N/A'}`,
          `Departure City: ${payload.departureCity || 'N/A'}`,
          `Destination: ${payload.destination || 'N/A'}`,
          `Package Type: ${payload.packageType || 'N/A'}`,
          `Departure Date: ${payload.travelDate || 'N/A'}`,
          `Duration: ${payload.nights || 'N/A'}`,
          `Travelers: ${payload.adults ?? 2} Adult(s), ${payload.children ?? 0} Child(ren)`,
          `Hotel Category: ${payload.hotelCategory || 'N/A'}`,
          `Package with Flight Ticket: ${flightsInfo}`,
          `Estimated Budget: ${payload.budget || 'N/A'}`,
          `Special Requests: ${payload.notes || 'None'}`,
        ].join('\n');

        const rows: Array<[string, string]> = [
          ['Reference ID', referenceId],
          ['Full Name', String(payload.fullName || 'N/A')],
          ['Phone / WhatsApp', String(payload.phone || 'N/A')],
          ['Email', String(payload.email || 'N/A')],
          ['Departure City', String(payload.departureCity || 'N/A')],
          ['Destination', String(payload.destination || 'N/A')],
          ['Holiday Type', String(payload.packageType || 'N/A')],
          ['Departure Date', String(payload.travelDate || 'N/A')],
          ['Trip Duration', String(payload.nights || 'N/A')],
          ['Travelers', `${payload.adults ?? 2} Adult(s), ${payload.children ?? 0} Child(ren)`],
          ['Hotel Category', String(payload.hotelCategory || 'N/A')],
          ['Package with Flight Ticket', flightsInfo],
          ['Estimated Budget', String(payload.budget || 'N/A')],
          ['Special Requests', String(payload.notes || 'None')],
        ];

        const htmlRows = rows
          .map(
            ([label, value]) =>
              `<tr>
                <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#122754;width:180px;background:#f8fafc;">${escapeHtml(label)}</td>
                <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#334155;">${escapeHtml(value)}</td>
              </tr>`
          )
          .join('');

        const htmlBody = `
          <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
            <div style="background:#122754;padding:20px 24px;color:#ffffff;">
              <h2 style="margin:0;font-size:20px;">New Holiday Booking Inquiry</h2>
              <p style="margin:6px 0 0;font-size:13px;color:#fbbf24;font-weight:bold;">Ref: ${escapeHtml(referenceId)}</p>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              ${htmlRows}
            </table>
            <div style="padding:14px 24px;background:#f8fafc;font-size:12px;color:#64748b;">
              Submitted via FlyFello Holiday Bookings Form at ${escapeHtml(receivedAt)}
            </div>
          </div>
        `;

        const cleanReplyTo =
          typeof payload.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())
            ? payload.email.trim()
            : undefined;

        const sendWithPort = async (port: number) => {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port,
            secure: port === 465,
            ...(port === 587 ? { requireTLS: true } : {}),
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 15000,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          return transporter.sendMail({
            from: `"FlyFello Holiday Desk" <${smtpUser}>`,
            to: toEmail,
            ...(cleanReplyTo ? { replyTo: cleanReplyTo } : {}),
            subject: `Holiday Inquiry (${referenceId}) - ${payload.destination || 'Package'} | ${payload.fullName || 'Customer'}`,
            text: textBody,
            html: htmlBody,
            headers: {
              'X-Entity-Ref-ID': referenceId,
            },
          });
        };

        try {
          let mailInfo;
          try {
            mailInfo = await sendWithPort(smtpPort);
          } catch (primaryErr) {
            const fallbackPort = smtpPort === 465 ? 587 : 465;
            console.warn(
              `[Holiday Inquiry SMTP] Port ${smtpPort} failed, retrying port ${fallbackPort}:`,
              (primaryErr as Error)?.message
            );
            mailInfo = await sendWithPort(fallbackPort);
          }

          const accepted = Array.isArray(mailInfo.accepted) ? mailInfo.accepted.map(String) : [];
          const rejected = Array.isArray(mailInfo.rejected) ? mailInfo.rejected.map(String) : [];
          emailSent = accepted.length > 0;
          console.log(
            `[Holiday Inquiry SMTP Result] ref=${referenceId} from=${smtpUser} to=${toEmail} host=${smtpHost} accepted=${JSON.stringify(accepted)} rejected=${JSON.stringify(rejected)} response=${mailInfo.response}`
          );

          const webhookUrl = process.env.INQUIRY_WEBHOOK_URL?.trim();
          if (webhookUrl && webhookUrl !== 'MY_INQUIRY_WEBHOOK_URL') {
            await fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...record, emailSent }),
            });
          }

          return res.json({
            success: true,
            referenceId,
            emailSent,
          });
        } catch (smtpError: any) {
          console.error('[Holiday Inquiry SMTP Error]', smtpError);
          return res.json({
            success: true,
            referenceId,
            emailSent: false,
            reason: 'SMTP_DELIVERY_FAILED',
          });
        }
      }

      const webhookUrl = process.env.INQUIRY_WEBHOOK_URL?.trim();
      if (webhookUrl && webhookUrl !== 'MY_INQUIRY_WEBHOOK_URL') {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...record, emailSent }),
        });
      }

      return res.json({
        success: true,
        referenceId,
        emailSent,
        reason: 'SMTP_NOT_CONFIGURED',
      });
    } catch {
      return res.status(500).json({ success: false });
    }
  });

  app.get('/api/instagram/feed', async (_req, res) => {
    try {
      if (cachedFeed && Date.now() - cachedFeed.fetchedAt < CACHE_TTL_MS) {
        return res.json({
          synced: cachedFeed.posts.length > 0,
          username: INSTAGRAM_USERNAME,
          profileUrl: INSTAGRAM_PROFILE_URL,
          posts: cachedFeed.posts,
        });
      }

      let posts: InstagramMediaItem[] = [];
      const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();

      if (token && token !== 'MY_INSTAGRAM_ACCESS_TOKEN') {
        posts = await fetchFromInstagramGraphApi(token);
      }

      if (posts.length === 0) {
        posts = await fetchFromInstagramPublicProfile();
      }

      if (posts.length > 0) {
        cachedFeed = { fetchedAt: Date.now(), posts };
      }

      return res.json({
        synced: posts.length > 0,
        username: INSTAGRAM_USERNAME,
        profileUrl: INSTAGRAM_PROFILE_URL,
        posts,
      });
    } catch {
      return res.json({
        synced: false,
        username: INSTAGRAM_USERNAME,
        profileUrl: INSTAGRAM_PROFILE_URL,
        posts: [],
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false, ws: false },
      appType: 'spa',
    });

    app.get(['/@vite/client', '/bundledDevClient.mjs'], (req, res, next) => {
      delete req.headers['if-none-match'];
      delete req.headers['if-modified-since'];

      const chunks: Buffer[] = [];
      const origWrite = res.write.bind(res);
      const origEnd = res.end.bind(res);

      (res as any).write = (chunk: any, encoding?: any) => {
        if (chunk) {
          chunks.push(
            Buffer.isBuffer(chunk)
              ? chunk
              : Buffer.from(String(chunk), typeof encoding === 'string' ? (encoding as BufferEncoding) : 'utf-8')
          );
        }
        return true;
      };

      (res as any).end = (chunk?: any, encoding?: any, cb?: any) => {
        if (typeof chunk === 'function') {
          cb = chunk;
          chunk = undefined;
        }
        if (chunk) {
          chunks.push(
            Buffer.isBuffer(chunk)
              ? chunk
              : Buffer.from(String(chunk), typeof encoding === 'string' ? (encoding as BufferEncoding) : 'utf-8')
          );
        }

        res.write = origWrite;
        res.end = origEnd;

        if (chunks.length > 0) {
          let code = Buffer.concat(chunks).toString('utf-8');
          code = code.replace(
            'await wsTransport.connect(handlers);',
            'return; /* HMR disabled */'
          );
          res.removeHeader('Content-Length');
          res.removeHeader('ETag');
          return origEnd(code, cb);
        }

        return origEnd(cb);
      };

      next();
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
