import React from 'react';
import { Phone, MessageCircle, MessageSquare, Search } from 'lucide-react';

interface MobileBottomBarProps {
  onScrollToSearch: () => void;
  onOpenChat: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onScrollToSearch,
  onOpenChat,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 text-white shadow-2xl">
      <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
        {/* WhatsApp Booking */}
        <a
          href="https://wa.me/16048326304?text=Hi%20Flyfello,%20I%20want%20to%20book%20a%20flight%20ticket"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg flex flex-col items-center justify-center text-center transition-colors"
        >
          <div className="flex items-center gap-1 font-bold text-xs text-white">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </div>
          <span className="text-[9px] text-emerald-100">Pay & Book</span>
        </a>

        {/* Call Agent */}
        <a
          href="tel:+16048326304"
          className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-lg flex flex-col items-center justify-center text-center transition-colors"
        >
          <div className="flex items-center gap-1 font-semibold text-xs text-amber-400">
            <Phone className="w-3.5 h-3.5" />
            <span>Call Desk</span>
          </div>
          <span className="text-[9px] text-slate-400">604-832-6304</span>
        </a>

        {/* Search Flights */}
        <button
          onClick={onScrollToSearch}
          className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-lg flex flex-col items-center justify-center text-center transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-1 font-semibold text-xs text-sky-400">
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </div>
          <span className="text-[9px] text-slate-400">Live Fares</span>
        </button>

        {/* Live Chat */}
        <button
          onClick={onOpenChat}
          className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-lg flex flex-col items-center justify-center text-center transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-1 font-semibold text-xs text-white">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Support</span>
          </div>
          <span className="text-[9px] text-emerald-400">Online</span>
        </button>
      </div>
    </div>
  );
};
