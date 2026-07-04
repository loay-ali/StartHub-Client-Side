import UseCasesSection from "@/components/home/UseCasesSection";
import AgentsSection from "@/components/home/AgentsSection";
import DashboardSection from "@/components/home/DashboardSection";
import FeaturesHero from "@/components/features/FeaturesHero";

export default async function FeaturesPage() {
    return (
        <div>
            <FeaturesHero />
            <DashboardSection />
            <AgentsSection />
            <UseCasesSection />
        </div>
    )
}