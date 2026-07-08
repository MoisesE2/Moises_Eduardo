import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import GcodevsHeader from "./components/GcodevsHeader";
import GcodevsHero from "./components/GcodevsHero";
import GcodevsTrustBar from "./components/GcodevsTrustBar";
import GcodevsProblemSolution from "./components/GcodevsProblemSolution";
import GcodevsServices from "./components/GcodevsServices";
import GcodevsDeliverables from "./components/GcodevsDeliverables";
import GcodevsProcess from "./components/GcodevsProcess";
import GcodevsCases from "./components/GcodevsCases";
import GcodevsInvestment from "./components/GcodevsInvestment";
import GcodevsFaq from "./components/GcodevsFaq";
import GcodevsQuote from "./components/GcodevsQuote";
import GcodevsCtaBand from "./components/GcodevsCtaBand";
import GcodevsFooter from "./components/GcodevsFooter";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const GcodevsApp: React.FC = () => (
  <div className="gcodevs-site">
    <ErrorBoundary>
      <GcodevsHeader />
      <main id="main-content" role="main">
        <GcodevsHero />
        <GcodevsTrustBar />
        <GcodevsProblemSolution />
        <GcodevsServices />
        <GcodevsDeliverables />
        <GcodevsProcess />
        <GcodevsCases />
        <GcodevsInvestment />
        <GcodevsFaq />
        <GcodevsQuote />
        <GcodevsCtaBand />
      </main>
      <GcodevsFooter />
      <FloatingWhatsApp />
    </ErrorBoundary>
  </div>
);

export default GcodevsApp;
