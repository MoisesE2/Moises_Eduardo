import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FAQ_ITEMS, whatsappUrl, QUOTE_MESSAGE } from "../copy";

interface ChatMessage {
  from: "user" | "bot";
  text: string;
}

const GREETING =
  "Olá! 👋 Sou o assistente da Gco Devs. Escolha uma pergunta abaixo ou chame direto no WhatsApp.";

const GcodevsChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: "bot", text: GREETING }]);
  const [asked, setAsked] = useState<Set<string>>(new Set());
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const pending = FAQ_ITEMS.filter((item) => !asked.has(item.question));

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => () => clearTimeout(typingTimer.current), []);

  const ask = (question: string, answer: string) => {
    setAsked((prev) => new Set(prev).add(question));
    setMessages((prev) => [...prev, { from: "user", text: question }]);
    setTyping(true);
    typingTimer.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: answer }]);
    }, 600);
  };

  return (
    <>
      {/* Janela do chat */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat de dúvidas da Gco Devs"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/30 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          {/* Cabeçalho */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
            <div className="flex items-center gap-2.5">
              <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/15">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-violet-600" />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">Gco Devs</p>
                <p className="text-xs text-white/80 leading-tight">Tire suas dúvidas</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar chat"
              className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Mensagens */}
          <div ref={listRef} className="flex-1 overflow-y-auto max-h-72 p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  message.from === "bot"
                    ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-bl-sm"
                    : "ml-auto bg-violet-600 text-white rounded-br-sm"
                }`}
              >
                {message.text}
              </div>
            ))}
            {typing && (
              <div className="inline-flex gap-1.5 px-3.5 py-3 rounded-2xl rounded-bl-sm bg-slate-100 dark:bg-slate-800">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Perguntas disponíveis */}
          {pending.length > 0 && (
            <div className="px-4 pb-3 pt-1 flex flex-wrap gap-2 max-h-32 overflow-y-auto border-t border-slate-100 dark:border-slate-800">
              {pending.map((item) => (
                <button
                  key={item.question}
                  onClick={() => ask(item.question, item.answer)}
                  disabled={typing}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-violet-300 text-violet-700 hover:bg-violet-50 dark:border-violet-700 dark:text-violet-300 dark:hover:bg-violet-950/50 transition-colors disabled:opacity-50"
                >
                  {item.question}
                </button>
              ))}
            </div>
          )}

          {/* Rodapé: WhatsApp */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950">
            <a
              href={whatsappUrl(QUOTE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              <FaWhatsapp className="w-4 h-4" />
              Falar com uma pessoa no WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Botão flutuante */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Fechar chat" : "Abrir chat de dúvidas"}
        aria-expanded={open}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg transition-all hover:scale-110 ${
          open
            ? "bg-slate-700 shadow-slate-700/40"
            : "bg-gradient-to-br from-violet-600 to-blue-600 shadow-violet-600/40"
        }`}
      >
        {open ? <XMarkIcon className="w-6 h-6" /> : <ChatBubbleLeftRightIcon className="w-7 h-7" />}
        {!open && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white dark:border-slate-950" />
        )}
      </button>
    </>
  );
};

export default GcodevsChat;
