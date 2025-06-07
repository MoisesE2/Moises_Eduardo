import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaDownload, FaEnvelope } from "react-icons/fa";

const ProfileSection: React.FC = () => {
  return (
    <section id="sobre" className="min-h-screen w-full relative">
      {/* Mobile Version */}
      <div className="md:hidden h-screen w-full relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/Moises.jpg"
            alt="Moisés Eduardo"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-start pt-8 px-6 text-white">
          <div className="mt-[60%] space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300/90">
              OLÁ, MEU NOME É
            </p>
            <h1 className="text-5xl 2xl:text-6xl font-bold leading-[1.1] bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Moisés Eduardo
            </h1>
            <p className="text-gray-200 text-base leading-relaxed">
              Finalizando minha graduação em Desenvolvimento Full Stack e em
              busca da primeira oportunidade na área! Disponível para trabalho
              remoto e pronto para contribuir com soluções modernas e
              inteligentes. Se está na procura de alguém criativo e com sede de
              evoluir vamos conversar!
            </p>
            <div className="flex gap-6 mt-6">
              <a 
                href="https://github.com/MoisesE2" 
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                <FaGithub size={24} aria-label="GitHub" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mois%C3%A9s-eduardo-gomes-da-costa-a1972324b/" 
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                <FaLinkedin size={24} aria-label="LinkedIn" />
              </a>
              <a 
                href="https://www.instagram.com/moises_e1/" 
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                <FaInstagram size={24} aria-label="Instagram" />
              </a>
              <a 
                href="mailto:moises.eduardogc@gmail.com?subject=QUERO%20TRABALHAR%20COM%20VOCÊ!" 
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                <FaEnvelope size={24} aria-label="Email" />
              </a>
            </div>
            <div className="mt-6">
              <a
                href="/assets/curriculo.pdf"
                download
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95 transition-all duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-900/30"
              >
                <FaDownload size={18} />
                Baixar Currículo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:flex h-screen w-full items-center pl-0 lg:pl-12 xl:pl-24 gap-16 max-w-[1800px] mx-auto">
        <div className="w-[55%] min-w-[55%] h-[85vh] relative -ml-8 lg:-ml-12 xl:-ml-16">
          <img
            src="/assets/images/Moises2.jpg"
            alt="Moisés Eduardo"
            className="w-full h-full object-cover object-left rounded-3xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent rounded-3xl" />
        </div>

        <div className="flex-1 text-white space-y-8 pr-8 lg:pr-12 xl:pr-24">
          <div className="space-y-4">
            <p className="text-lg uppercase tracking-[0.3em] text-purple-300/90">
              OLÁ, MEU NOME É
            </p>
            <h1 className="text-5xl 2xl:text-6xl font-bold leading-[1.1] bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              MOISÉS
              <br />
              EDUARDO
            </h1>
          </div>
          <p className="text-lg 2xl:text-xl text-gray-300 leading-relaxed">
            Finalizando minha graduação em Desenvolvimento Full Stack e em busca
            da primeira oportunidade na área! Disponível para trabalho remoto e
            pronto para contribuir com soluções modernas e inteligentes. Se está
            na procura de alguém criativo e com sede de evoluir vamos conversar!
          </p>
          <div className="flex gap-8 mt-8">
            <a 
              href="https://github.com/MoisesE2" 
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
            >
              <FaGithub size={24} aria-label="GitHub" />
            </a>
            <a 
              href="https://www.linkedin.com/in/mois%C3%A9s-eduardo-gomes-da-costa-a1972324b/" 
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
            >
              <FaLinkedin size={24} aria-label="LinkedIn" />
            </a>
            <a 
              href="https://www.instagram.com/moises_e1/" 
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
            >
              <FaInstagram size={24} aria-label="Instagram" />
            </a>
            <a 
              href="mailto:moises.eduardogc@gmail.com?subject=QUERO%20TRABALHAR%20COM%20VOCÊ!" 
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
            >
              <FaEnvelope size={24} aria-label="Email" />
            </a>
          </div>
          <div className="mt-6">
            <a
              href="/assets/curriculo.pdf"
              download
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95 transition-all duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-900/30"
            >
              <FaDownload size={18} />
              Baixar Currículo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;