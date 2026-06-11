import { MagnifyingGlass, Brain, Waveform, Cpu } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion";
import { focusAreas } from "@/data/siteData";

const iconMap = {
  magnifyingGlass: MagnifyingGlass,
  brain: Brain,
  waveform: Waveform,
  cpu: Cpu,
};

export function SkillsSection() {
  return (
    <section className="section skill-section" id="skills">
      <div className="page-shell">
        <Reveal className="section-intro compact">
          <h2>Направления, где я сейчас расту и собираю практику.</h2>
        </Reveal>
        <div className="capability-list">
          {focusAreas.map((item, index) => {
            const Icon = iconMap[item.iconKey];
            return (
              <Reveal delay={index * 0.08} key={item.title}>
                <div className="capability-row">
                  <div className="capability-icon">
                    <Icon size={24} weight="duotone" />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <div className="stack-tags">
                    {item.stack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
