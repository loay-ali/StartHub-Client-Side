import AgentsSection from "./AgentsSection";
import DashboardSection from "./DashboardSection";
import FinalCTA from "./FinalCTA";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import IntegrationsSection from "./IntegrationsSection";
import PricingSection from "./PricingSection";
import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import TestimonialsSection from "./TestimonialsSection";
import UseCasesSection from "./UseCasesSection";
import { PageBg } from "./shared";

export default function HomePage() {
  return (
    <main className = 'pt-20'>
      <PageBg />
      <HeroSection/>
      <ProblemSection />
      <SolutionSection />
      <DashboardSection />
      <AgentsSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <UseCasesSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTA />
    </main>
  );
}
