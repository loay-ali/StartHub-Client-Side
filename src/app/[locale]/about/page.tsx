import HeroSection from "@/components/about/HeroSection";
import ProblemSection from "@/components/about/ProblemSection";
import StorySection from "@/components/about/StorySection";
import WorkflowSection from "@/components/about/WorkflowSection";
import AISection from "@/components/about/AISection";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import { Teachers } from "next/font/google";
import TeamSection from "@/components/about/TeamSection";
import CTASection from "@/components/about/CTASection";
export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <ProblemSection />
      <WorkflowSection />
      <AISection />
      <MissionVisionSection />
      <TeamSection />
      <CTASection />
    </>
  );
}
