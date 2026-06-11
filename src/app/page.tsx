import {
  ArrowUpRight,
  At,
  Brain,
  Cpu,
  GithubLogo,
  GraduationCap,
  MagnifyingGlass,
  SpotifyLogo,
  Student,
  Target,
  TelegramLogo,
  Waveform,
} from "@phosphor-icons/react/ssr";
import {
  CustomCursor,
  FooterName,
  HeroEntrance,
  MagneticLink,
  PinnedFocus,
  Reveal,
  ScrollProgress,
  SmoothScroll,
  PolyHero,
  VilmarShowcase,
  WordReveal,
} from "@/components/MotionPrimitives";
import { SiteHeader } from "@/components/SiteHeader";

const focusAreas = [
  {
    icon: MagnifyingGlass,
    title: "NLP & LLM Systems",
    text: "Embeddings, semantic search, RAG, classification, summarization and LLM agents.",
    detail:
      "Практический интерес - пайплайны, где можно проверить retrieval quality, увидеть ошибки поиска и объяснить, почему ответ привязан к контексту.",
    stack: ["NLP", "BERT", "SBERT", "RAG", "Vector Search"],
  },
  {
    icon: Brain,
    title: "Deep Learning",
    text: "PyTorch training loops, tensor shapes, CNN, RNN/LSTM, attention and Transformer blocks.",
    detail:
      "Разбираю обучение не как черный ящик: loss, optimizer, regularization, gradients, формы тензоров и то, как архитектура влияет на ошибку.",
    stack: ["PyTorch", "Backprop", "RNN", "LSTM", "Transformers"],
  },
  {
    icon: Waveform,
    title: "Audio ML",
    text: "Spectrograms, MFCC, signal processing basics, audio classification and sequence modeling.",
    detail:
      "Смотрю на аудио как на сигнал и последовательность: признаки, окна, спектрограммы, короткие фрагменты и ограничения датасета.",
    stack: ["Audio ML", "MFCC", "Spectrograms", "Speech", "Sequences"],
  },
  {
    icon: Cpu,
    title: "ML Engineering",
    text: "FastAPI, Docker, Git, Linux, PostgreSQL and deployment of ML prototypes as usable services.",
    detail:
      "Цель - не только notebook, а понятная структура проекта: API, конфигурация, воспроизводимый запуск, базовый деплой и место для метрик.",
    stack: ["FastAPI", "Docker", "Linux", "SQL", "API"],
  },
];

const scrollStatements = [
  {
    label: "01 / models",
    title: "Модель должна быть понятной, а не просто запускаться.",
  },
  {
    label: "02 / models",
    title: "Сильный результат начинается с данных, метрик и ошибок.",
  },
];

const heroStats = [
  { value: "ИТМО", label: "образование" },
  { value: "PyTorch", label: "основной стек" },
  { value: "5+", label: "ML-проектов" },
  { value: "Junior ML", label: "ищу стажировку" },
];

const projects = [
  {
    icon: "fileText",
    status: "prototype",
    title: "RAG Assistant Prototype",
    text: "Ассистент по документам с retrieval pipeline, chunking, embeddings, semantic search и генерацией ответа на основе найденного контекста.",
    stack: ["Python", "Embeddings", "Vector Search", "LLM API", "RAG"],
  },
  {
    icon: "rows",
    status: "study",
    title: "NLP Classification Pipeline",
    text: "Пайплайн классификации текстов: preprocessing, baseline на TF-IDF, сравнение с нейросетевым подходом, метрики и анализ ошибок.",
    stack: ["scikit-learn", "PyTorch", "NLP", "Metrics"],
  },
  {
    icon: "treeStructure",
    status: "study",
    title: "Transformer From Scratch",
    text: "Учебная реализация positional encoding, self-attention, multi-head attention, feed-forward block и residual connections.",
    stack: ["PyTorch", "Attention", "Transformers", "Tensor Shapes"],
  },
  {
    icon: "waveform",
    status: "in progress",
    title: "Audio Classification Prototype",
    text: "Прототип классификации аудиофрагментов через spectrogram/MFCC-признаки и DL-модель для коротких сигналов.",
    stack: ["torchaudio", "librosa", "CNN", "Signal Processing"],
  },
  {
    icon: "chartLine",
    status: "cv",
    title: "Freshness Detection with YOLO",
    text: "Computer Vision-проект для определения состояния продуктов с фокусом на датасет, class imbalance, precision/recall/mAP и error analysis.",
    stack: ["YOLO", "Object Detection", "Dataset Quality", "mAP"],
  },
] as const;

const techGroups = [
  ["Core", "Python", "NumPy", "Pandas", "SQL", "Git", "Linux"],
  ["ML", "scikit-learn", "EDA", "Validation", "Metrics", "Feature Engineering"],
  ["DL", "PyTorch", "CNN", "RNN/LSTM", "Attention", "Transformers"],
  ["NLP", "Tokenization", "Embeddings", "BERT/SBERT", "RAG", "LLM Agents"],
  ["Audio", "Spectrograms", "MFCC", "Signal Processing", "Audio Classification"],
  ["Engineering", "FastAPI", "PostgreSQL", "Docker", "REST API", "Vercel"],
];

const socialLinks = [
  {
    href: "https://github.com/theJorDea",
    label: "GitHub",
    note: "код и ML-прототипы",
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
              <p className="plain-kicker hero-kicker-motion">ML / NLP / Deep Learning / Audio</p>
            </HeroEntrance>
            <div className="hero-title-motion">
              <h1>
                <WordReveal text="Я JorDea — ML-инженер." delay={0.22} />
              </h1>
            </div>
            <div className="hero-support-motion">
              <HeroEntrance delay={0.55}>
              <p className="hero-lead">
                Студент ИТМО. Собираю ML-прототипы для текста, аудио и компьютерного зрения:
                от данных и обучения модели в PyTorch — до метрик, API и деплоя.
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

        <Reveal delay={0.18} className="page-shell hero-stats">
          {heroStats.map((stat) => (
            <div className="hero-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </Reveal>

        <section className="section page-shell about-section" id="about">
          <Reveal className="section-intro about-heading">
            <p className="plain-kicker">Обо мне</p>
            <h2>Я учусь в ИТМО и делаю ML руками: Deep Learning, NLP и аудио — с метриками, разбором ошибок и работающим кодом.</h2>
          </Reveal>
          <div className="about-layout">
            <Reveal className="about-copy">
              <p>
                Основной фокус - Deep Learning, NLP и модели для последовательностей: тексты, временные ряды,
                аудио и мультимодальные данные.
              </p>
              <p>
                Сейчас углубляюсь в PyTorch, RNN/LSTM, attention, Transformers, BERT/SBERT и практические
                NLP-пайплайны. Мне важно понимать модели не только на уровне API, но и на уровне математики,
                тензорных форм, обучения и анализа ошибок.
              </p>
              <p>
                В проектах стараюсь соединять исследовательский подход и инженерную реализацию: строить понятные
                пайплайны, проверять метрики, контролировать качество данных и доводить прототип до работающего
                сервиса.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="profile-facts">
                <div className="profile-fact">
                  <Student size={24} weight="duotone" />
                  <span>education</span>
                  <strong>ИТМО</strong>
                  <p>Фокус обучения - Machine Learning, Deep Learning, NLP, PyTorch и математическая база ML.</p>
                </div>
                <div className="profile-fact">
                  <Target size={24} weight="duotone" />
                  <span>goal</span>
                  <strong>ML / NLP / Audio ML</strong>
                  <p>Ищу стажировку или junior-позицию в команде, которая работает с прикладными DL-продуктами.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <PinnedFocus items={scrollStatements} />

        <section className="section skill-section" id="skills">
          <div className="page-shell">
            <Reveal className="section-intro compact">
              <p className="plain-kicker">Focus areas</p>
              <h2>Что я умею и где набираю практику.</h2>
            </Reveal>
            <div className="capability-list">
              {focusAreas.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal delay={index * 0.08} key={item.title}>
                    <div className="capability-row" tabIndex={0}>
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

        {/* Секция проектов с эффектом сплит-фокуса (Vilmar Fernandes стиль) */}
        <section className="section page-shell" id="projects">
          <Reveal className="project-heading">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%", flexWrap: "wrap", gap: "24px" }}>
              <div>
                <p className="plain-kicker">Проекты</p>
                <h2 className="project-section-title">ML-разработки</h2>
              </div>
              <a className="inline-github" href="https://github.com/theJorDea" target="_blank" rel="noreferrer">
                <GithubLogo size={20} weight="duotone" />
                GitHub
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </div>
          </Reveal>

          <VilmarShowcase items={projects} />
        </section>

        <section className="section education-section">
          <div className="page-shell education-grid">
            <Reveal className="education-card">
              <GraduationCap size={32} weight="duotone" />
              <p className="plain-kicker">Образование</p>
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

        <section className="section contact-section page-shell" id="contact">
          <Reveal className="contact-copy">
            <p className="plain-kicker">Контакты</p>
            <h2>Открыт к стажировке или junior-позиции в ML/DL-команде.</h2>
            <p>
              Особенно интересны NLP, LLM/RAG-системы, Audio ML, sequence modeling, прикладные DL-прототипы и
              ML-инструменты, которые можно довести до сервиса.
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
          <span>
            <Brain size={14} weight="duotone" />
            Junior ML/NLP Engineer
          </span>
          <span>
            <Cpu size={14} weight="duotone" />
            PyTorch / NLP / Audio ML
          </span>
        </div>
      </footer>
    </>
  );
}
