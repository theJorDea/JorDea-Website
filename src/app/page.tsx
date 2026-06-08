import {
  ArrowUpRight,
  At,
  Brain,
  ChartLine,
  Cpu,
  Database,
  FileText,
  GithubLogo,
  GraduationCap,
  MagnifyingGlass,
  Network,
  Rows,
  SpotifyLogo,
  TelegramLogo,
  TreeStructure,
  Waveform,
} from "@phosphor-icons/react/ssr";
import {
  HoverLift,
  MagneticLink,
  PinnedFocus,
  Reveal,
  ScrollProgress,
} from "@/components/MotionPrimitives";
import { SiteHeader } from "@/components/SiteHeader";

const metrics = [
  ["4", "focus areas"],
  ["5", "project directions"],
  ["ITMO", "education"],
  ["ML", "internship target"],
];

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

const problemCards = [
  {
    title: "Модель должна быть понятной глубже API.",
    text: "Я разбираю tensor shapes, градиенты, training dynamics и ограничения архитектуры, чтобы понимать, почему модель работает или ломается.",
    action: "model thinking",
  },
  {
    title: "Метрики начинаются с качества данных.",
    text: "Смотрю на preprocessing, validation, class imbalance, ошибки разметки и failure cases до выводов о результате.",
    action: "data quality",
  },
  {
    title: "Прототип нужно довести до демонстрации.",
    text: "Мне важно упаковать модель в понятную структуру, API или небольшой сервис, который можно показать и проверить.",
    action: "product shape",
  },
];

const scrollStatements = [
  {
    label: "model thinking",
    title: "Понимать модель глубже, чем вызов готового API.",
    text: "Tensor shapes, gradients, training dynamics, data quality and architecture limits matter before any polished demo.",
  },
  {
    label: "data first",
    title: "Смотреть на данные раньше, чем спорить о метриках.",
    text: "A clean ML pipeline starts with validation, labels, distributions, class balance and failure analysis.",
  },
  {
    label: "ship the prototype",
    title: "Доводить идею до формы, которую можно показать.",
    text: "The target is not just a notebook. It is a readable project, a working path and a clear next experiment.",
  },
];

const projects = [
  {
    icon: FileText,
    status: "prototype",
    title: "RAG Assistant Prototype",
    text: "Ассистент по документам с retrieval pipeline, chunking, embeddings, semantic search и генерацией ответа на основе найденного контекста.",
    stack: ["Python", "Embeddings", "Vector Search", "LLM API", "RAG"],
    result: "retrieval quality focus",
  },
  {
    icon: Rows,
    status: "study",
    title: "NLP Classification Pipeline",
    text: "Пайплайн классификации текстов: preprocessing, baseline на TF-IDF, сравнение с нейросетевым подходом, метрики и анализ ошибок.",
    stack: ["scikit-learn", "PyTorch", "NLP", "Metrics"],
    result: "error analysis",
  },
  {
    icon: TreeStructure,
    status: "study",
    title: "Transformer From Scratch",
    text: "Учебная реализация positional encoding, self-attention, multi-head attention, feed-forward block и residual connections.",
    stack: ["PyTorch", "Attention", "Transformers", "Tensor Shapes"],
    result: "architecture basics",
  },
  {
    icon: Waveform,
    status: "in progress",
    title: "Audio Classification Prototype",
    text: "Прототип классификации аудиофрагментов через spectrogram/MFCC-признаки и DL-модель для коротких сигналов.",
    stack: ["torchaudio", "librosa", "CNN", "Signal Processing"],
    result: "signal pipeline",
  },
  {
    icon: ChartLine,
    status: "cv",
    title: "Freshness Detection with YOLO",
    text: "Computer Vision-проект для определения состояния продуктов с фокусом на датасет, class imbalance, precision/recall/mAP и error analysis.",
    stack: ["YOLO", "Object Detection", "Dataset Quality", "mAP"],
    result: "dataset quality",
  },
];

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
      <ScrollProgress />
      <SiteHeader />
      <main id="main">
        <section className="hero-section" id="home">
          <div className="page-shell hero-wrap">
            <div className="hero-copy">
              <Reveal>
                <p className="plain-kicker">Junior ML / NLP Engineer</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h1>
                  I build ML prototypes for text, sequence and audio tasks.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="hero-lead">
                  Фокусируюсь на PyTorch, NLP, Transformers, RAG-системах и прикладных DL-проектах, где важны данные, метрики и понятная инженерная реализация.
                </p>
              </Reveal>
              <Reveal delay={0.18} className="hero-actions">
                <a className="primary-link" href="#projects">
                  View cases
                  <ArrowUpRight size={18} weight="bold" />
                </a>
                <a className="quiet-link" href="mailto:klevin3701@gmail.com">
                  <At size={18} weight="bold" />
                  Let&apos;s talk
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.14}>
              <HoverLift className="hero-visual" ariaLabel="ML profile visual">
                <div className="showreel-card">
                  <span>research log 25/26</span>
                  <strong>PyTorch / RAG / Audio ML</strong>
                </div>
                <div className="visual-board">
                  <div className="visual-chip primary">
                    <Brain size={32} weight="duotone" />
                    <span>model</span>
                  </div>
                  <div className="visual-chip">
                    <Network size={30} weight="duotone" />
                    <span>retrieval</span>
                  </div>
                  <div className="visual-chip">
                    <Database size={30} weight="duotone" />
                    <span>data</span>
                  </div>
                  <div className="visual-chip">
                    <Waveform size={30} weight="duotone" />
                    <span>audio</span>
                  </div>
                </div>
                <p>Open to internships and junior roles in ML / NLP / Audio ML.</p>
              </HoverLift>
            </Reveal>

            <Reveal delay={0.22} className="metrics-strip" aria-label="Profile metrics">
              {metrics.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section page-shell about-section" id="about">
          <Reveal className="split-heading">
            <p className="plain-kicker">About</p>
            <h2>Студент ИТМО, который растёт в ML через практику, математику и инженерную аккуратность.</h2>
          </Reveal>

          <div className="problem-grid">
            {problemCards.map((item, index) => (
              <Reveal delay={index * 0.06} key={item.title}>
                <HoverLift className="problem-card">
                  <span>{item.action}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </HoverLift>
              </Reveal>
            ))}
          </div>
        </section>

        <PinnedFocus items={scrollStatements} />

        <section className="section skill-section" id="skills">
          <div className="page-shell">
            <Reveal className="section-intro">
              <p className="plain-kicker">Focus areas</p>
              <h2>Направления, где я сейчас собираю практику.</h2>
            </Reveal>
            <div className="capability-list">
              {focusAreas.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal delay={index * 0.08} key={item.title}>
                    <HoverLift
                      ariaLabel={`${item.title}: ${item.text}`}
                      className="capability-row"
                      tabIndex={0}
                    >
                      <div className="capability-number">{String(index + 1).padStart(2, "0")}</div>
                      <div className="capability-icon">
                        <Icon size={30} weight="duotone" />
                      </div>
                      <div className="capability-copy">
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                        <p className="capability-detail">{item.detail}</p>
                      </div>
                      <div className="stack-tags">
                        {item.stack.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </HoverLift>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section page-shell" id="projects">
          <Reveal className="project-heading">
            <p className="plain-kicker">Featured cases</p>
            <h2>ML-проекты, оформленные как case studies.</h2>
            <a className="inline-github" href="https://github.com/theJorDea" target="_blank" rel="noreferrer">
              GitHub
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </Reveal>

          <div className="project-stack">
            {projects.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  className={index === 0 ? "project-item project-item-large" : "project-item"}
                  delay={index * 0.05}
                  key={item.title}
                >
                  <HoverLift className={index === 0 ? "project-card featured" : "project-card"}>
                    <div className="project-card-top">
                      <div>
                        <Icon size={30} weight="duotone" />
                        <span>{item.status}</span>
                      </div>
                      <strong>{item.result}</strong>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="stack-tags compact-tags">
                      {item.stack.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </HoverLift>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section education-section">
          <div className="page-shell education-grid">
            <Reveal className="education-card">
              <GraduationCap size={34} weight="duotone" />
              <p className="plain-kicker">Education</p>
              <h2>ИТМО и самостоятельная ML-база.</h2>
              <p>
                Изучаю машинное обучение, Deep Learning, NLP и математическую базу: линейную алгебру, математический анализ, вероятность, статистику и оптимизацию. Параллельно развиваю инженерные навыки: Python, Git, Linux, Docker, backend/API и деплой ML-прототипов.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="tech-matrix">
              {techGroups.map(([group, ...items]) => (
                <HoverLift className="tech-row" key={group}>
                  <strong>{group}</strong>
                  <p>{items.join(" / ")}</p>
                </HoverLift>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section contact-section page-shell" id="contact">
          <Reveal className="contact-copy">
            <p className="plain-kicker">Contact</p>
            <h2>Ищу стажировку или junior-позицию в ML/DL-команде.</h2>
            <p>
              Особенно интересны NLP, LLM/RAG-системы, Audio ML, sequence modeling, прикладные DL-прототипы и ML-инструменты, которые можно довести до сервиса.
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
          <span>(c) 2026 JorDea</span>
          <span>
            <Brain size={16} weight="duotone" />
            Junior ML/NLP Engineer
          </span>
          <span>
            <Cpu size={16} weight="duotone" />
            PyTorch / NLP / Audio ML
          </span>
        </div>
      </footer>
    </>
  );
}
