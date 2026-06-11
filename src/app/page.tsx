import {
  ArrowUpRight,
  At,
  GithubLogo,
  SpotifyLogo,
  TelegramLogo,
} from "@phosphor-icons/react/ssr";
import {
  CustomCursor,
  FooterName,
  HeroEntrance,
  MagneticLink,
  PinnedFocus,
  ProjectShowcase,
  Reveal,
  ScrollProgress,
  SmoothScroll,
  PolyHero,
  WordReveal,
} from "@/components/MotionPrimitives";
import { SiteHeader } from "@/components/SiteHeader";

const focusAreas = [
  {
    title: "Market Risk",
    text: "VaR и Expected Shortfall, оценка волатильности через EWMA и GARCH, Monte Carlo на тяжёлых хвостах.",
    stack: ["VaR / ES", "EWMA", "GARCH", "Monte Carlo"],
  },
  {
    title: "Credit Risk & Scoring",
    text: "PD-модели, WoE/IV-биннинг, калибровка вероятностей, скоркарты и интерпретация через SHAP.",
    stack: ["PD-модели", "WoE / IV", "Scorecard", "SHAP"],
  },
  {
    title: "Backtesting & Validation",
    text: "Проверка моделей на истории: тесты Купика и Кристофферсена, out-of-sample валидация, анализ ошибок.",
    stack: ["Kupiec", "Christoffersen", "Cross-validation", "Metrics"],
  },
  {
    title: "ML Engineering",
    text: "Воспроизводимые пайплайны: Python, SQL, Docker, тесты и доведение модели от ноутбука до сервиса.",
    stack: ["Python", "SQL", "Docker", "FastAPI", "CI"],
  },
];

const scrollStatements = [
  {
    label: "01 / risk",
    title: "Риск-модель должна пройти бэктест, а не просто посчитаться.",
  },
  {
    label: "02 / data",
    title: "Сильный результат начинается с данных, метрик и честных ошибок.",
  },
];

const projects = [
  {
    status: "core project",
    title: "Riskforge",
    text: "Библиотека рыночного риска на Python: исторический и Monte Carlo VaR, Expected Shortfall, волатильность через EWMA и GARCH(1,1), бэктесты Купика и Кристофферсена, сравнение LSTM с GARCH на реальных данных SPY/QQQ/TLT/GLD.",
    stack: ["Python", "VaR / ES", "GARCH", "Backtesting", "LSTM"],
  },
  {
    status: "credit risk",
    title: "Credit Scoring",
    text: "PD-модель на датасете Default of Credit Card Clients: логистическая регрессия и LightGBM, WoE/IV-биннинг, изотоническая калибровка, скоркарта в шкале PDO и SHAP-интерпретация. AUC 0.78, KS 0.42.",
    stack: ["LightGBM", "WoE / IV", "Calibration", "Scorecard", "SHAP"],
  },
  {
    status: "hackathon",
    title: "QuantForge",
    text: "Торговый агент для Московской биржи: пайплайн от рыночных данных до сигналов и оценки стратегии, собран в хакатонном темпе с упором на работающий end-to-end прототип.",
    stack: ["Python", "MOEX", "Trading", "Strategy"],
  },
  {
    status: "computer vision",
    title: "Freshness Detection",
    text: "CV-проект по определению свежести продуктов на YOLO: сбор и качество датасета, борьба с class imbalance, precision/recall/mAP и разбор ошибок модели.",
    stack: ["YOLO", "Object Detection", "Dataset Quality", "mAP"],
  },
] as const;

const techGroups = [
  ["Core", "Python", "NumPy", "Pandas", "SQL", "Git", "Linux"],
  ["ML", "scikit-learn", "LightGBM", "Validation", "Metrics", "Feature Engineering"],
  ["DL", "PyTorch", "LSTM", "Attention", "Transformers"],
  ["Risk", "VaR / ES", "EWMA / GARCH", "Backtesting", "Calibration", "Scorecards"],
  ["Engineering", "FastAPI", "PostgreSQL", "Docker", "REST API", "Vercel"],
];

const socialLinks = [
  {
    href: "https://github.com/theJorDea",
    label: "GitHub",
    note: "код и проекты",
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
    note: "личный фон",
    icon: SpotifyLogo,
  },
];

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <SiteHeader />
      <main id="main">
        {/* Использование PolyHero для анимации при скролле (Poly-block стиль) */}
        <PolyHero>
          <div className="hero-copy">
            <HeroEntrance delay={0.1}>
              <p className="plain-kicker hero-kicker-motion">Data Science / Quant Risk / ML</p>
            </HeroEntrance>
            <div className="hero-title-motion">
              <h1>
                <WordReveal text="JorDea — Data Scientist. Quant Risk." delay={0.22} />
              </h1>
            </div>
            <div className="hero-support-motion">
              <HeroEntrance delay={0.55}>
              <p className="hero-lead">
                Строю модели рыночного и кредитного риска: VaR и Expected Shortfall, EWMA/GARCH,
                кредитный скоринг и бэктестинг — на Python, с ML там, где он реально помогает.
              </p>
              </HeroEntrance>
              <HeroEntrance delay={0.72}>
              <div className="hero-actions">
              <a className="primary-link" href="#projects">
                Смотреть проекты
                <ArrowUpRight size={18} weight="bold" />
              </a>
              <a className="quiet-link" href="mailto:klevin3701@gmail.com">
                <At size={18} weight="bold" />
                Связаться
              </a>
              <a className="quiet-link" href="https://github.com/theJorDea" target="_blank" rel="noreferrer">
                <GithubLogo size={18} weight="bold" />
                GitHub
              </a>
              </div>
              </HeroEntrance>
            </div>
          </div>
        </PolyHero>

        <section className="section page-shell about-section" id="about">
          <Reveal className="section-intro about-heading">
            <p className="plain-kicker">Обо мне</p>
            <h2>Студент ИТМО, Data Scientist с фокусом на квантовых риск-моделях.</h2>
          </Reveal>
          <div className="about-layout">
            <Reveal className="about-copy">
              <p>
                Основной фокус - количественные методы в финансах: рыночный риск, кредитный скоринг,
                временные ряды и модели волатильности.
              </p>
              <p>
                Работаю с VaR/ES, EWMA и GARCH, бэктестингом по Купику и Кристофферсену, PD-моделями и
                калибровкой вероятностей. Мне важно понимать модели на уровне математики и статистики,
                а не только на уровне готовых библиотек.
              </p>
              <p>
                В проектах соединяю исследовательский подход и инженерную реализацию: воспроизводимые
                пайплайны, тесты, честные метрики и доведение прототипа до работающего инструмента.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <dl className="about-facts">
                <div className="about-fact">
                  <dt>Образование</dt>
                  <dd>
                    <strong>ИТМО</strong>
                    Математическая статистика, машинное обучение и количественные методы.
                  </dd>
                </div>
                <div className="about-fact">
                  <dt>Цель</dt>
                  <dd>
                    <strong>Quant Risk / Data Science</strong>
                    Стажировка в команде риск-аналитики или Data Science в финансах.
                  </dd>
                </div>
                <div className="about-fact">
                  <dt>Сейчас</dt>
                  <dd>
                    <strong>VaR / GARCH / Scoring</strong>
                    Модели волатильности, бэктестинг риск-метрик и кредитный скоринг на реальных данных.
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        <PinnedFocus items={scrollStatements} />

        <section className="section skill-section" id="skills">
          <div className="page-shell">
            <Reveal className="section-intro compact">
              <p className="plain-kicker">Focus areas</p>
              <h2>Направления, в которых я работаю и собираю практику.</h2>
            </Reveal>
            <div className="capability-list">
              {focusAreas.map((item, index) => (
                <Reveal delay={index * 0.06} key={item.title}>
                  <div className="capability-row" tabIndex={0}>
                    <span className="capability-index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="capability-copy">
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
              ))}
            </div>
          </div>
        </section>

        {/* Секция проектов с эффектом сплит-фокуса (Vilmar Fernandes стиль) */}
        <section className="section page-shell" id="projects">
          <Reveal className="project-heading">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%", flexWrap: "wrap", gap: "24px" }}>
              <div>
                <p className="plain-kicker">Проекты</p>
                <h2 className="project-section-title">Quant & Data Science</h2>
              </div>
              <a className="inline-github" href="https://github.com/theJorDea" target="_blank" rel="noreferrer">
                <GithubLogo size={20} weight="duotone" />
                GitHub
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </div>
          </Reveal>

          <ProjectShowcase items={projects} />
        </section>

        <section className="section education-section">
          <div className="page-shell education-grid">
            <Reveal className="education-card">
              <p className="plain-kicker">Образование</p>
              <h2>ИТМО и самостоятельная квант-база.</h2>
              <p>
                Изучаю теорию вероятностей, математическую статистику, стохастические процессы, оптимизацию
                и машинное обучение. Параллельно развиваю инженерные навыки: Python, SQL, Git, Linux, Docker
                и деплой моделей как сервисов.
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

        <section className="section contact-section page-shell" id="contact">
          <Reveal className="contact-copy">
            <p className="plain-kicker">Контакты</p>
            <h2>Ищу стажировку в Quant Risk или Data Science.</h2>
            <p>
              Особенно интересны рыночный и кредитный риск, риск-метрики и стресс-тесты, временные ряды
              и ML-инструменты для финансов, которые можно довести до продакшена.
            </p>
            <MagneticLink className="primary-link" href="mailto:klevin3701@gmail.com">
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
                    <div className="social-list-left">
                      <Icon size={22} weight="duotone" />
                      <strong>{link.label}</strong>
                      <span>{link.note}</span>
                    </div>
                    <ArrowUpRight size={14} weight="bold" />
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <FooterName />
        <div className="page-shell footer-inner">
          <span>© 2026 JorDea</span>
          <span>Data Scientist · Quant Risk</span>
          <span>Python / ML / Risk Models</span>
        </div>
      </footer>
    </>
  );
}
