import React from 'react';
import { buildWhatsAppSupportUrl } from '../utils/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  const supportUrl = buildWhatsAppSupportUrl();

  return (
    <a
      href={supportUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with FlyFello support on WhatsApp"
      title="Chat on WhatsApp (+1 737-290-4745)"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-95 text-white rounded-full p-3.5 sm:px-4 sm:py-3 shadow-xl shadow-emerald-900/25 hover:shadow-2xl transition-all duration-200 ring-2 ring-white/90"
    >
      <span className="relative flex items-center justify-center w-7 h-7 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75" />
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="relative w-7 h-7 text-white"
          aria-hidden="true"
        >
          <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16.004c0 2.352.616 4.648 1.787 6.672L2.667 29.333l6.816-1.787a13.28 13.28 0 0 0 6.521 1.711h.005c7.36 0 13.324-5.973 13.324-13.337 0-3.56-1.387-6.907-3.904-9.424a13.24 13.24 0 0 0-9.425-3.829Zm0 24.337h-.004a11.05 11.05 0 0 1-5.636-1.544l-.404-.24-4.045 1.06 1.08-3.943-.263-.419a11.016 11.016 0 0 1-1.693-5.915c0-6.1 4.964-11.064 11.069-11.064 2.956 0 5.735 1.153 7.824 3.245a10.99 10.99 0 0 1 3.237 7.824c0 6.1-4.965 11.096-11.165 11.096Zm6.071-8.288c-.332-.167-1.965-.97-2.27-1.08-.305-.111-.526-.167-.748.167-.221.333-.859 1.08-1.053 1.302-.194.222-.388.25-.72.083-.333-.167-1.404-.518-2.674-1.651-.988-.881-1.656-1.97-1.85-2.303-.194-.333-.021-.513.146-.679.15-.149.333-.388.499-.582.167-.194.222-.333.333-.555.111-.222.055-.416-.028-.582-.083-.167-.748-1.803-1.025-2.469-.27-.649-.544-.561-.748-.571-.194-.01-.416-.012-.637-.012a1.22 1.22 0 0 0-.887.416c-.305.333-1.164 1.138-1.164 2.774s1.192 3.218 1.358 3.44c.167.222 2.345 3.581 5.682 5.021.794.343 1.414.548 1.897.701.797.253 1.522.217 2.095.132.639-.095 1.965-.803 2.242-1.579.277-.777.277-1.442.194-1.581-.083-.139-.305-.222-.637-.389Z" />
        </svg>
      </span>
      <span className="hidden sm:inline text-xs font-extrabold tracking-wide pr-1">
        WhatsApp Support
      </span>
    </a>
  );
};
