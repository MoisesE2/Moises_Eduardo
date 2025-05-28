// src/pages/index.tsx
import Header from "./../../components/Header";
import ProfileSection from "./../../components/ProfileSection";
import SkillsSection from "./../../components/SkillsSection";
import PortfolioSection from "./../../components/PortfolioSection";

export default function PortfolioPage() {
  return (
    <div id="home" className="min-h-screen bg-black text-white font-sans">
      <Header />
      <ProfileSection />
      <SkillsSection />
      <PortfolioSection />
    </div>
  );
}
