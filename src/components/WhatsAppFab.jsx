import React from "react";

export const WHATSAPP_PHONE_E164_NO_PLUS = "918013007962";
const DEFAULT_MESSAGE = "Hi! I want to enquire about your nutrition plans.";

export function buildWhatsAppHref(message = DEFAULT_MESSAGE) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_E164_NO_PLUS}?text=${encoded}`;
}

export default function WhatsAppFab({ message = DEFAULT_MESSAGE }) {
  return (
    <a
      className="whatsapp-fab"
      href={buildWhatsAppHref(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path
          d="M20.52 3.48A11.88 11.88 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.1.55 4.15 1.58 5.96L0 24l6.2-1.58A11.94 11.94 0 0 0 12 24h.01c6.62 0 12-5.38 12-12 0-3.2-1.24-6.21-3.49-8.52ZM12.01 21.9h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.68.94.98-3.58-.23-.37a9.84 9.84 0 0 1-1.5-5.3c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.45-4.44 9.89-9.9 9.89Zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.41-1.47a8.9 8.9 0 0 1-1.67-2.06c-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.57-.48-.5-.66-.51l-.56-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.09 4.48.7.3 1.25.48 1.68.61.7.22 1.34.19 1.85.12.56-.08 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}

