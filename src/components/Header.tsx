import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const touchStartX = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Bloqueia o scroll quando o menu está aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  // Detecta gesto de swipe para abrir o menu
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0].clientX > window.innerWidth - 50 && !menuOpen) {
        touchStartX.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX.current === 0) return;
      
      const touchCurrentX = e.touches[0].clientX;
      const deltaX = touchStartX.current - touchCurrentX;
      
      if (deltaX > 60) {
        setMenuOpen(true);
        touchStartX.current = 0;
      }
    };

    const handleTouchEnd = () => {
      touchStartX.current = 0;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [menuOpen]);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { id: 1, label: "Home", href: "#home" },
    { id: 2, label: "Sobre", href: "#sobre" },
    { id: 3, label: "Habilidades", href: "#habilidades" },
    { id: 4, label: "Portfólio", href: "#portfolio" },
  ];

  return (
    <>
      {/* Header Desktop */}
      <motion.header
        className="hidden md:block fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md shadow-md"
        initial={{ y: 0 }}
      >
        <div className="flex justify-between items-center px-6 py-4">
          <a 
            href="#home" 
            className="text-2xl font-light bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
          >
            Moisés Eduardo
          </a>

          <nav className="flex space-x-8 text-lg">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Botão Mobile Flutuante */}
      <motion.div
        className="md:hidden fixed top-4 right-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex flex-col justify-center items-center shadow-lg border border-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <motion.span
            className="block w-5 h-0.5 bg-white rounded-full mb-1.5"
            animate={{
              rotate: menuOpen ? 45 : 0,
              y: menuOpen ? 6 : 0,
            }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-white rounded-full"
            animate={{
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-white rounded-full mt-1.5"
            animate={{
              rotate: menuOpen ? -45 : 0,
              y: menuOpen ? -6 : 0,
            }}
          />
        </button>
      </motion.div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay escuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Painel lateral */}
            <motion.div
              ref={menuRef}
              className="fixed top-0 right-0 w-4/5 max-w-sm h-screen bg-gray-900/95 backdrop-blur-xl z-50 shadow-2xl shadow-purple-900/30 border-l border-gray-800 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100 || info.velocity.x > 500) {
                  setMenuOpen(false);
                }
              }}
            >
              <div className="flex flex-col h-full p-6 pt-24">
                {/* Logo no topo */}
                <div className="mb-8 px-2">
                  <a 
                    href="#home" 
                    className="text-xl font-light bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
                    onClick={() => setMenuOpen(false)}
                  >
                    Moisés Eduardo
                  </a>
                </div>
                
                <div className="space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-xl font-light text-gray-300 hover:text-purple-400 transition-colors pl-2"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ 
                        x: 0, 
                        opacity: 1,
                        transition: {
                          delay: 0.1 * index,
                          duration: 0.3
                        }
                      }}
                      exit={{ 
                        x: 50, 
                        opacity: 0,
                        transition: {
                          delay: 0.05 * (menuItems.length - index),
                          duration: 0.2
                        }
                      }}
                    >
                      <span className="text-purple-400 mr-2">#</span>
                      {item.label}
                    </motion.a>
                  ))}
                </div>
                
                {/* Rodapé */}
                <motion.div 
                  className="mt-auto text-center text-gray-500 text-sm pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.5 } }}
                >
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;