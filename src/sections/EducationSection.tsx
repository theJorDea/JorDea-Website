import { GraduationCap } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion";
import { techGroups } from "@/data/siteData";

export function EducationSection() {
  return (
    <section className="section education-section">
      <div className="page-shell education-grid">
        <Reveal className="education-card">
          <GraduationCap size={32} weight="duotone" />
          <h2>ИТМО и самостоятельная ML-база.</h2>
          <p>
            Изучаю машинное обучение, Deep Learning, NLP и математическую базу: линейную алгебру,
            математический анализ, вероятность, статистику и оптимизацию. Параллельно развиваю инженерные
            навыки: Python, Git, Linux, Docker, backend/API и деплой ML-прототипов.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="tech-matrix">
          {techGroups.map(([group, ...items]) => (
            <div className="tech-row" key={group}>
              <strong>{group}</strong>
              <p>{items.join(" / ")}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
