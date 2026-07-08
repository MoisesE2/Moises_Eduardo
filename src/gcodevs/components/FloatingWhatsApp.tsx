import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappUrl, QUOTE_MESSAGE } from "../copy";

const FloatingWhatsApp: React.FC = () => (
  <a
    href={whatsappUrl(QUOTE_MESSAGE)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white bg-green-600 shadow-lg shadow-green-600/40 hover:scale-110 transition-transform"
  >
    <FaWhatsapp className="w-7 h-7" />
  </a>
);

export default FloatingWhatsApp;
