import React from "react";
import "./../../public/assets/images/Pensamentos.png"


const PortfolioSection: React.FC = () => {
  return (
    <section id="portfolio" className="px-6 mb-10">
      <h3 className="text-2xl font-semibold mb-8 text-center">Portfólio</h3>
      <div className="flex justify-center">
        <img
          src="./../../public/assets/images/Pensamentos.png"
          alt="Pensamentos de Quinta"
          className="w-full max-w-md rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default PortfolioSection;
