import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { 
  MessageSquare, X, Send, Bot, User, Phone, 
  ExternalLink, Sparkles, CheckCheck, Clock, ShieldCheck 
} from 'lucide-react';

interface LiveChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const LiveChat: React.FC<LiveChatProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'agent',
      text: 'Namaste & Hello! Welcome to Flyfello. I am your live travel advisor for USA & Canada to India flights. How can I help you today?',
      timestamp: 'Just now',
      quickActions: [
        { label: 'Check lowest fare to Delhi / Amritsar', action: 'fares' },
        { label: 'Baggage Allowance (2x 23kg)', action: 'baggage' },
        { label: 'How does WhatsApp Payment work?', action: 'payment' },
        { label: 'EMI / Installment options', action: 'emi' },
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const generateAgentResponse = (userQuery: string): { text: string; quickActions?: { label: string; action: string }[] } => {
    const q = userQuery.toLowerCase();

    if (q.includes('baggage') || q.includes('luggage') || q.includes('weight') || q.includes('23kg')) {
      return {
        text: 'All Flyfello flight bookings to India include 2 pieces of checked baggage (23 kg / 50 lbs each) plus 1 cabin bag (7 kg) and 1 personal item (laptop bag). We also have special student allowances for 3 bags (3x 23kg) on select airlines like Air India, Emirates, and Qatar.',
        quickActions: [
          { label: 'Chat with agent on WhatsApp', action: 'whatsapp' },
          { label: 'Check flight schedules', action: 'fares' },
        ],
      };
    }

    if (q.includes('pay') || q.includes('payment') || q.includes('interac') || q.includes('zelle') || q.includes('card')) {
      return {
        text: 'Payment is super easy and 100% secure! You can pay directly via WhatsApp using:\n• Canada: Interac e-Transfer (zero markup)\n• USA: Zelle / US Bank Wire / ACH\n• Credit / Debit Cards (Visa, MasterCard, Amex)\n• Easy monthly EMI plans\nOnce paid, your official airline PNR and e-ticket are sent in minutes.',
        quickActions: [
          { label: 'Open WhatsApp Payment (+1 604-832-6304)', action: 'whatsapp' },
        ],
      };
    }

    if (q.includes('emi') || q.includes('installment') || q.includes('finance') || q.includes('monthly')) {
      return {
        text: 'Yes! Flyfello offers convenient EMI installment plans spanning 3, 6, or 12 months. This allows you to lock today’s cheap seat without paying the full lump sum upfront. You can set this up directly via WhatsApp with our billing desk.',
        quickActions: [
          { label: 'Inquire about EMI on WhatsApp', action: 'whatsapp' },
        ],
      };
    }

    if (q.includes('fare') || q.includes('price') || q.includes('cheap') || q.includes('cost') || q.includes('deal') || q.includes('delhi') || q.includes('amritsar') || q.includes('punjab')) {
      return {
        text: 'Current promo fares between Canada/USA and India start around $1,420–$1,540 CAD round trip, with all taxes and 2x 23kg bags included! Non-stop flights with Air India or 1-stop options with Emirates and Qatar sell out quickly. What dates and cities are you looking for?',
        quickActions: [
          { label: 'Get Exact Dates Quote on WhatsApp', action: 'whatsapp' },
          { label: 'Fill Custom Inquiry Form', action: 'inquiry' },
        ],
      };
    }

    if (q.includes('whatsapp') || q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('call')) {
      return {
        text: 'You can reach our live ticketing desk 24/7 on WhatsApp or phone at +1 (604) 832-6304 (WhatsApp link: Wa.me/16048326304). Email: flyfello@hotmail.com. We answer immediately!',
        quickActions: [
          { label: 'Open WhatsApp Now', action: 'whatsapp' },
        ],
      };
    }

    if (q.includes('emergency') || q.includes('urgent') || q.includes('today') || q.includes('tomorrow')) {
      return {
        text: 'For last-minute or emergency travel within 24–48 hours, please message our emergency WhatsApp desk immediately at +1 (604) 832-6304. We hold emergency consolidated seats that are not publicly displayed online.',
        quickActions: [
          { label: 'Emergency WhatsApp Contact', action: 'whatsapp' },
        ],
      };
    }

    return {
      text: `Thank you for your question! For specific flight dates, group bookings, or instant ticket holds, our certified ticketing agent is standing by right now on WhatsApp (+1 604-832-6304) with direct airline inventory access.`,
      quickActions: [
        { label: 'Connect on WhatsApp (+1 604-832-6304)', action: 'whatsapp' },
        { label: 'Check Baggage Rules', action: 'baggage' },
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || input.trim();
    if (!messageText) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAgentResponse(messageText);
      const agentMessage: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        text: response.text,
        timestamp: 'Just now',
        quickActions: response.quickActions,
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: string) => {
    if (action === 'whatsapp') {
      window.open('https://wa.me/16048326304?text=Hi%20Flyfello,%20I%20am%20chatting%20on%20your%20website%20and%20need%20assistance%20with%20flights%20to%20India', '_blank');
      return;
    }
    if (action === 'inquiry') {
      const elem = document.getElementById('custom-quote');
      elem?.scrollIntoView({ behavior: 'smooth' });
      onToggle();
      return;
    }
    if (action === 'baggage') {
      handleSendMessage('What is the baggage allowance to India?');
      return;
    }
    if (action === 'payment') {
      handleSendMessage('How does payment via WhatsApp and Interac work?');
      return;
    }
    if (action === 'emi') {
      handleSendMessage('Can I book flights on monthly EMI installments?');
      return;
    }
    if (action === 'fares') {
      handleSendMessage('What are the lowest fares to Delhi or Amritsar right now?');
      return;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Trigger Button with Attention Badge */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="relative px-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-2xl flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group border border-slate-700/60 cursor-pointer"
          aria-label="Open Flyfello Live Support Chat"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900"></span>
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-bold leading-tight">Live Travel Support</span>
            <span className="text-[10px] text-emerald-400 font-medium">Online · Vancouver Desk</span>
          </div>

          {unreadCount > 0 && (
            <span className="w-5 h-5 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-96 h-[540px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-white p-0.5 flex items-center justify-center border border-slate-200 overflow-hidden shrink-0">
                <img src="/assets/aistudio/image_f51311fc.png" alt="Flyfello" className="w-full h-full object-contain" />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-slate-900"></span>
              </div>
              <div>
                <div className="font-bold text-xs flex items-center gap-1.5">
                  <span>Flyfello Flight Desk</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span>Avg reply: Instant · Canada/USA & India</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="https://wa.me/16048326304"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
                title="Switch to WhatsApp (+1 604-832-6304)"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={onToggle}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Contact Banner */}
          <div className="bg-amber-50 px-3.5 py-1.5 border-b border-amber-100 flex items-center justify-between text-[11px] text-amber-900">
            <span className="truncate">WhatsApp Ticket Desk: <strong>Wa.me/16048326304</strong></span>
            <a
              href="https://wa.me/16048326304"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-amber-950 shrink-0 ml-2"
            >
              Open WA
            </a>
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50/50 text-xs">
            {messages.map((msg) => {
              const isAgent = msg.sender === 'agent';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs whitespace-pre-wrap leading-relaxed ${
                      isAgent
                        ? 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                        : 'bg-slate-900 text-white rounded-tr-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Optional Quick Action Buttons */}
                  {msg.quickActions && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                      {msg.quickActions.map((qa, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleActionClick(qa.action)}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                        >
                          <span>{qa.label}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs py-1">
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-[10px] ml-1">Flyfello agent is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about flights, dates, luggage, EMI..."
              className="flex-1 px-3 py-2 bg-slate-100 border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-300"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
