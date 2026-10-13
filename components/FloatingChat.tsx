"use client";

import { WHATSAPP_URL } from "./Contact";

/** Always-available way to reach out, like the reference sites. */
export default function FloatingChat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vorel Labs on WhatsApp"
      className="shadow-lift fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-silver-light px-5 py-3 text-[13px] font-medium text-base transition-transform duration-300 hover:-translate-y-0.5"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20l1.2-5.3A8.5 8.5 0 1 1 21 11.5Z" />
      </svg>
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
