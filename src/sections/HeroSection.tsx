import { ArrowUpRight, At, GithubLogo } from "@phosphor-icons/react/ssr";
import { PolyHero, Reveal } from "@/components/motion";
import { heroStats } from "@/data/siteData";

export function HeroSection() {
  return (
    <>
      <PolyHero>
        <div className="hero-copy">
          <p className="plain-kicker hero-kicker-motion">ML / NLP / Deep Learning / Audio</p>
          <div className="hero-title-motion">
            <h1>JorDea — Junior ML/NLP Engineer.</h1>
          </div>
          <div className="hero-support-motion">
            <p className="hero-lead">
              Собираю ML-прототипы для задач с текстом, последовательностями и аудиоданными.
              Фокусируюсь на PyTorch, Deep Learning, NLP, Transformers, RAG-системах и Audio ML.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#projects">
                Смотреть проекты
                <ArrowUpRight size={18} weight="bold" />
              </a>
              <a className="quiet-link" href="mailto:klevin3701@gmail.com">
                <At size={18} weight="bold" />
                Связаться
              </a>
              <a
                className="quiet-link"
                href="https://github.com/theJorDea"
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogo size={18} weight="bold" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </PolyHero>

      <Reveal delay={0.18} className="page-shell hero-stats">
        {heroStats.map((stat) => (
          <div className="hero-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </Reveal>
    </>
  );
}
