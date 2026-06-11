import {
  CustomCursor,
  ScrollProgress,
  SmoothScroll,
} from "@/components/motion";
import { SiteHeader } from "@/components/SiteHeader";
import {
  HeroSection,
  AboutSection,
  PinnedSection,
  SkillsSection,
  ProjectsSection,
  EducationSection,
  ContactSection,
  Footer,
} from "@/sections";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <PinnedSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
