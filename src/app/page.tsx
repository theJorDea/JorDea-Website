import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";

const skillGroups = [
  {
    title: "Frontend",
    summary: "Интерфейсы, которые быстро грузятся и не разваливаются на мобильных.",
    skills: ["TypeScript", "React", "Next.js", "Vue.js", "CSS", "Sass"],
  },
  {
    title: "Backend",
    summary: "API, боты и серверная логика с понятной структурой.",
    skills: ["Node.js", "Express", "Python", "Django", "Aiogram", "PostgreSQL"],
  },
  {
    title: "Delivery",
    summary: "Сборка, деплой и поддержка проекта после релиза.",
    skills: ["Vercel", "Git", "Docker", "Vite", "Figma", "CI/CD"],
  },
];

const projectTypes = [
  {
    title: "Веб-приложения",
    text: "SPA и публичные сайты на React, Vue и современном CSS.",
    label: "web",
  },
  {
    title: "Telegram-боты",
    text: "Автоматизация сценариев на Python и Aiogram.",
    label: "bot",
  },
  {
    title: "PWA и адаптив",
    text: "Интерфейсы, которые удобно использовать с телефона.",
    label: "pwa",
  },
  {
    title: "Backend API",
    text: "Серверные части для продуктов, интеграций и админок.",
    label: "api",
  },
];

const socialLinks = [
  { href: "https://github.com/theJorDea", label: "GitHub", note: "код и проекты" },
  { href: "https://t.me/theJorDea", label: "Telegram", note: "быстрый контакт" },
  {
    href: "https://open.spotify.com/playlist/1DjVihxAR3yUnrNIireZmP?si=0575d1eabe374547",
    label: "Spotify",
    note: "музыка в работе",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hero-section" id="home">
          <div className="hero-grid page-shell">
            <div className="hero-copy">
              <p className="eyebrow">Frontend / Fullstack / Vercel</p>
              <h1>JorDea делает веб-продукты, которые выглядят спокойно и работают быстро.</h1>
              <p className="hero-lead">
                Перенес старое GitHub Pages портфолио на стек Next.js + React под Vercel:
                статический рендер, оптимизированные изображения, нормальная мета-разметка и
                структура, которую проще развивать.
              </p>
              <div className="hero-actions">
                <a className="primary-link" href="#projects">
                  Смотреть проекты
                </a>
                <a className="text-link" href="mailto:klevin3701@gmail.com">
                  klevin3701@gmail.com
                </a>
              </div>
            </div>

            <div className="hero-panel" aria-label="Профиль JorDea">
              <div className="status-row">
                <span className="status-dot" />
                <span>Доступен для проектов</span>
              </div>
              <div className="profile-shot">
                <Image
                  src="/images/pretty_cat.png"
                  alt="Визуальный образ JorDea"
                  width={720}
                  height={900}
                  priority
                />
              </div>
              <div className="stack-strip">
                <span>Next.js</span>
                <span>React</span>
                <span>TypeScript</span>
                <span>Vercel</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section page-shell" id="about">
          <div className="section-heading">
            <p className="eyebrow">Обо мне</p>
            <h2>Разработка без лишнего шума: понятная архитектура, аккуратный UI, быстрый деплой.</h2>
          </div>
          <div className="about-layout">
            <div className="about-copy">
              <p>
                Привет, я JorDea. Специализируюсь на frontend и fullstack-разработке:
                собираю интерфейсы, подключаю серверную логику и довожу проекты до публикации.
              </p>
              <p>
                Люблю новые технологии, но выбираю их по задаче. Для этого сайта стек стал
                проще для Vercel: App Router, статическая страница, локальные ассеты и минимум
                клиентского JavaScript.
              </p>
            </div>
            <div className="metrics-grid" aria-label="Ключевые показатели">
              <div>
                <strong>2+</strong>
                <span>года опыта</span>
              </div>
              <div>
                <strong>15+</strong>
                <span>проектов</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>вовлеченность</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section muted-section" id="skills">
          <div className="page-shell">
            <div className="section-heading narrow">
              <p className="eyebrow">Навыки</p>
              <h2>Стек под реальные задачи, а не под красивый список технологий.</h2>
            </div>
            <div className="skills-layout">
              {skillGroups.map((group) => (
                <article className="skill-block" key={group.title}>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.summary}</p>
                  </div>
                  <div className="tag-row">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section page-shell" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Проекты</p>
            <h2>Основной фокус - веб-продукты, автоматизация и интерфейсы для повторного использования.</h2>
          </div>
          <div className="projects-layout">
            <a className="github-feature" href="https://github.com/theJorDea" target="_blank" rel="noreferrer">
              <span className="feature-kicker">GitHub</span>
              <strong>theJorDea</strong>
              <p>Репозитории, эксперименты и открытый код. Vercel будет автоматически делать preview для веток и production для main.</p>
              <span className="feature-link">Открыть профиль</span>
            </a>
            <div className="project-list">
              {projectTypes.map((project) => (
                <article className="project-row" key={project.title}>
                  <span>{project.label}</span>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section listening-section">
          <div className="page-shell listening-card">
            <div>
              <p className="eyebrow">Currently listening</p>
              <h2>Alright - Kendrick Lamar</h2>
              <p>
                Старый Spotify-блок сохранен как компактный визуальный акцент, без лишнего
                скрипта и внешних библиотек.
              </p>
            </div>
            <div className="album-widget" aria-label="Музыкальный виджет">
              <Image src="/images/TPAB.png" alt="Обложка To Pimp a Butterfly" width={220} height={220} />
              <div>
                <strong>To Pimp a Butterfly</strong>
                <span>1:23 / 3:45</span>
                <div className="progress-bar">
                  <span />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section page-shell" id="contact">
          <div className="contact-layout">
            <div>
              <p className="eyebrow">Контакты</p>
              <h2>Готов обсудить проект, задачу или идею.</h2>
              <p>
                Напишите на почту или откройте один из профилей. Лучше сразу прислать цель,
                сроки и пару примеров того, что нравится по качеству.
              </p>
              <a className="primary-link" href="mailto:klevin3701@gmail.com">
                Написать на почту
              </a>
            </div>
            <div className="social-list">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  <strong>{link.label}</strong>
                  <span>{link.note}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <span>© 2026 JorDea</span>
          <span>Next.js + Vercel ready</span>
        </div>
      </footer>
    </>
  );
}
