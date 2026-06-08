import Image from "next/image";
import {
  ArrowUpRight,
  At,
  BracketsCurly,
  Browsers,
  CloudArrowUp,
  Code,
  Database,
  DeviceMobile,
  GithubLogo,
  Lightning,
  Robot,
  SpotifyLogo,
  Stack,
  TelegramLogo,
  TerminalWindow,
} from "@phosphor-icons/react/ssr";
import { MagneticLink, Reveal, ScrollProgress, TiltFrame } from "@/components/MotionPrimitives";
import { SiteHeader } from "@/components/SiteHeader";

const principles = [
  {
    value: "01",
    title: "Страница должна объяснять себя сама",
    text: "Сначала смысл и структура. Декор появляется только там, где помогает прочитать работу быстрее.",
  },
  {
    value: "02",
    title: "Интерфейс не спорит с контентом",
    text: "Меньше одинаковых карточек, больше воздуха, ритма и точных акцентов в местах принятия решения.",
  },
  {
    value: "03",
    title: "Деплой - часть дизайна",
    text: "Сайт собирается как статический Next.js route, поэтому Vercel быстро отдает страницу и preview для каждой ветки.",
  },
];

const capabilities = [
  {
    icon: Browsers,
    title: "Веб-интерфейсы",
    text: "React, Next.js и Vue для лендингов, личных кабинетов и небольших продуктовых поверхностей.",
    stack: ["React", "Next.js", "Vue", "CSS"],
  },
  {
    icon: Robot,
    title: "Боты и автоматизация",
    text: "Telegram-сценарии, API-интеграции и backend-логика на Python без лишней инфраструктуры.",
    stack: ["Python", "Aiogram", "Node", "API"],
  },
  {
    icon: CloudArrowUp,
    title: "Публикация и поддержка",
    text: "Сборка, деплой, базовая оптимизация и понятная структура проекта для следующих изменений.",
    stack: ["Vercel", "Git", "CI", "Docker"],
  },
];

const projectIndex = [
  {
    icon: Code,
    type: "web",
    title: "Публичные сайты",
    detail: "Минималистичные страницы, где важны скорость, типографика и мобильная версия.",
  },
  {
    icon: DeviceMobile,
    type: "pwa",
    title: "Адаптивные продукты",
    detail: "Интерфейсы, которые не теряют смысл на узком экране и не требуют объяснений.",
  },
  {
    icon: Database,
    type: "api",
    title: "Серверные части",
    detail: "Небольшие API, интеграции и хранение данных без тяжелой архитектуры ради архитектуры.",
  },
  {
    icon: TerminalWindow,
    type: "ops",
    title: "Сборка и релиз",
    detail: "Next.js, линт, production build, GitHub workflow и Vercel deploy без ручных шагов.",
  },
];

const socialLinks = [
  {
    href: "https://github.com/theJorDea",
    label: "GitHub",
    note: "репозитории и код",
    icon: GithubLogo,
  },
  {
    href: "https://t.me/theJorDea",
    label: "Telegram",
    note: "быстрый контакт",
    icon: TelegramLogo,
  },
  {
    href: "https://open.spotify.com/playlist/1DjVihxAR3yUnrNIireZmP?si=0575d1eabe374547",
    label: "Spotify",
    note: "что играет в фоне",
    icon: SpotifyLogo,
  },
];

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main id="main">
        <section className="hero-section" id="home">
          <div className="page-shell hero-grid">
            <div className="hero-copy">
              <Reveal>
                <p className="plain-kicker">JorDea / frontend / bots / deploy</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h1>
                  Сайты, боты и интерфейсы с чистой логикой и тихой визуальной системой.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="hero-lead">
                  Я собираю веб-продукты на Next.js и React, подключаю backend-сценарии и довожу
                  проекты до Vercel без ручной рутины.
                </p>
              </Reveal>
              <Reveal delay={0.18} className="hero-actions">
                <a className="primary-link" href="#projects">
                  Смотреть работу
                  <ArrowUpRight size={18} weight="bold" />
                </a>
                <a className="quiet-link" href="mailto:klevin3701@gmail.com">
                  <At size={18} weight="bold" />
                  klevin3701@gmail.com
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <TiltFrame className="hero-art">
                <div className="portrait-frame">
                  <Image
                    src="/images/pretty_cat.png"
                    alt="Визуальный образ JorDea"
                    width={720}
                    height={900}
                    priority
                  />
                </div>
                <div className="art-caption">
                  <span>available</span>
                  <strong>Санкт-Петербург</strong>
                </div>
              </TiltFrame>
            </Reveal>
          </div>
        </section>

        <section className="section page-shell" id="about">
          <Reveal className="section-intro">
            <p className="plain-kicker">Обо мне</p>
            <h2>Не пытаюсь впечатлить количеством эффектов. Делаю так, чтобы сайт было легко читать и менять.</h2>
          </Reveal>
          <div className="principle-grid">
            {principles.map((item, index) => (
              <Reveal className="principle" delay={index * 0.08} key={item.value}>
                <span>{item.value}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section skill-section" id="skills">
          <div className="page-shell">
            <Reveal className="section-intro compact">
              <p className="plain-kicker">Навыки</p>
              <h2>Стек держится вокруг результата: интерфейс, сценарий, публикация.</h2>
            </Reveal>
            <div className="capability-list">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal className="capability-row" delay={index * 0.08} key={item.title}>
                    <div className="capability-icon">
                      <Icon size={28} weight="duotone" />
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
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section page-shell" id="projects">
          <Reveal className="project-heading">
            <div>
              <p className="plain-kicker">Проекты</p>
              <h2>Рабочие направления вместо витрины с одинаковыми плитками.</h2>
            </div>
            <a className="inline-github" href="https://github.com/theJorDea" target="_blank" rel="noreferrer">
              <GithubLogo size={22} weight="duotone" />
              GitHub
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </Reveal>

          <div className="project-index">
            {projectIndex.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal className="project-item" delay={index * 0.06} key={item.title}>
                  <span className="project-type">{item.type}</span>
                  <Icon size={28} weight="duotone" />
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section media-section">
          <div className="page-shell media-grid">
            <Reveal>
              <div className="code-panel" aria-label="Технический стек">
                <div className="code-topline">
                  <BracketsCurly size={20} weight="bold" />
                  <span>site.config.ts</span>
                </div>
                <pre>{`const site = {
  framework: "Next.js",
  render: "static",
  motion: "measured",
  deploy: "Vercel"
}`}</pre>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="music-panel">
                <Image src="/images/TPAB.png" alt="Обложка To Pimp a Butterfly" width={420} height={420} />
                <div>
                  <span>currently listening</span>
                  <h2>Alright</h2>
                  <p>Kendrick Lamar / To Pimp a Butterfly</p>
                  <div className="sound-line" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section contact-section page-shell" id="contact">
          <Reveal className="contact-copy">
            <p className="plain-kicker">Контакты</p>
            <h2>Если задача понятная, можно сразу писать.</h2>
            <p>
              Лучше прислать цель, срок и текущие материалы. Если материалов нет, начнем с
              короткой структуры и соберем первую версию.
            </p>
            <MagneticLink className="primary-link large" href="mailto:klevin3701@gmail.com">
              Написать на почту
              <ArrowUpRight size={18} weight="bold" />
            </MagneticLink>
          </Reveal>

          <div className="social-list">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Reveal delay={index * 0.06} key={link.label}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    <Icon size={24} weight="duotone" />
                    <strong>{link.label}</strong>
                    <span>{link.note}</span>
                    <ArrowUpRight size={16} weight="bold" />
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <span>© 2026 JorDea</span>
          <span>
            <Stack size={16} weight="duotone" />
            Next.js / Motion / Vercel
          </span>
          <span>
            <Lightning size={16} weight="duotone" />
            static route
          </span>
        </div>
      </footer>
    </>
  );
}
