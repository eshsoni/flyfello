import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

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
      server: { middlewareMode: true },
      appType: 'spa',
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
