import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/ssr";
import { Reveal, VilmarShowcase } from "@/components/motion";
import { projects } from "@/data/siteData";

export function ProjectsSection() {
  return (
    <section className="section page-shell projects-section" id="projects">
      <Reveal className="project-heading">
        <div className="project-heading-inner">
          <div>
            <h2 className="project-section-title">ML-разработки</h2>
          </div>
          <a
            className="inline-github"
            href="https://github.com/theJorDea"
            target="_blank"
            rel="noreferrer"
          >
            <GithubLogo size={20} weight="duotone" />
            GitHub
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>
      </Reveal>

      <VilmarShowcase items={projects} />
    </section>
  );
}
