import FinalCTA from "./FinalCTA";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import IntegrationsSection from "./IntegrationsSection";
import { PageBg } from "./shared";
import EcosystemSection from "./EcosystemSection";
// import DashboardSection from "./DashboardSection";
import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";


export default function HomePage() {
  return (
    <main>
      <PageBg />
      <HeroSection />
      <ProblemSection/>
      <SolutionSection/>
      {/* <DashboardSection /> */}
      <EcosystemSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <FinalCTA />
      
    </main>
  );
}
