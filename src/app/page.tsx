import Image from "next/image";
import {
  ArrowUpRight,
  At,
  BookOpen,
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
  Student,
  Target,
  TelegramLogo,
  TreeStructure,
  VinylRecord,
  Waveform,
} from "@phosphor-icons/react/ssr";
import {
  MagneticLink,
  PinnedFocus,
  Reveal,
  ScrollProgress,
} from "@/components/MotionPrimitives";
import { SiteHeader } from "@/components/SiteHeader";

const focusAreas = [
  {
    icon: MagnifyingGlass,
    title: "NLP & LLM Systems",
    text: "Embeddings, semantic search, RAG, classification, summarization and LLM agents.",
    stack: ["NLP", "BERT", "SBERT", "RAG", "Vector Search"],
  },
  {
    icon: Brain,
    title: "Deep Learning",
    text: "PyTorch training loops, tensor shapes, CNN, RNN/LSTM, attention and Transformer blocks.",
    stack: ["PyTorch", "Backprop", "RNN", "LSTM", "Transformers"],
  },
  {
    icon: Waveform,
    title: "Audio ML",
    text: "Spectrograms, MFCC, signal processing basics, audio classification and sequence modeling.",
    stack: ["Audio ML", "MFCC", "Spectrograms", "Speech", "Sequences"],
  },
  {
    icon: Cpu,
    title: "ML Engineering",
    text: "FastAPI, Docker, Git, Linux, PostgreSQL and deployment of ML prototypes as usable services.",
    stack: ["FastAPI", "Docker", "Linux", "SQL", "API"],
  },
];

const scrollStatements = [
  {
    label: "01 / models",
    title: "Понимать модель глубже, чем вызов готового API.",
    text: "Я разбираю tensor shapes, градиенты, training dynamics и ограничения архитектуры, чтобы понимать, почему модель работает или ломается.",
  },
  {
    label: "02 / data",
    title: "Смотреть на данные раньше, чем спорить о метриках.",
    text: "Качество пайплайна начинается с preprocessing, валидации, class imbalance, ошибок разметки и понятного анализа failure cases.",
  },
  {
    label: "03 / product",
    title: "Доводить прототип до формы, которую можно показать.",
    text: "Мне важно не только обучить модель, но и упаковать её в структуру, API или демонстрационный сервис.",
  },
];

const projects = [
  {
    icon: FileText,
    status: "prototype",
    title: "RAG Assistant Prototype",
    text: "Ассистент по документам с retrieval pipeline, chunking, embeddings, semantic search и генерацией ответа на основе найденного контекста.",
    stack: ["Python", "Embeddings", "Vector Search", "LLM API", "RAG"],
  },
  {
    icon: Rows,
    status: "study",
    title: "NLP Classification Pipeline",
    text: "Пайплайн классификации текстов: preprocessing, baseline на TF-IDF, сравнение с нейросетевым подходом, метрики и анализ ошибок.",
    stack: ["scikit-learn", "PyTorch", "NLP", "Metrics"],
  },
  {
    icon: TreeStructure,
    status: "study",
    title: "Transformer From Scratch",
    text: "Учебная реализация positional encoding, self-attention, multi-head attention, feed-forward block и residual connections.",
    stack: ["PyTorch", "Attention", "Transformers", "Tensor Shapes"],
  },
  {
    icon: Waveform,
    status: "in progress",
    title: "Audio Classification Prototype",
    text: "Прототип классификации аудиофрагментов через spectrogram/MFCC-признаки и DL-модель для коротких сигналов.",
    stack: ["torchaudio", "librosa", "CNN", "Signal Processing"],
  },
  {
    icon: ChartLine,
    status: "cv",
    title: "Freshness Detection with YOLO",
    text: "Computer Vision-проект для определения состояния продуктов с фокусом на датасет, class imbalance, precision/recall/mAP и error analysis.",
    stack: ["YOLO", "Object Detection", "Dataset Quality", "mAP"],
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
          <div className="page-shell hero-grid">
            <div className="hero-copy">
              <Reveal>
                <p className="plain-kicker">ML / NLP / Deep Learning / Audio</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h1>JorDea - Junior ML/NLP Engineer.</h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="hero-lead">
                  Собираю ML-прототипы для задач с текстом, последовательностями и аудиоданными.
                  Фокусируюсь на PyTorch, Deep Learning, NLP, Transformers, RAG-системах и Audio ML.
                </p>
              </Reveal>
              <Reveal delay={0.18} className="hero-actions">
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
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <aside className="hero-card" aria-label="Профиль JorDea">
                <div className="hero-card-top">
                  <span>open to</span>
                  <strong>internships / junior roles</strong>
                </div>
                <div className="signal-board">
                  <div>
                    <Brain size={28} weight="duotone" />
                    <span>PyTorch</span>
                  </div>
                  <div>
                    <Network size={28} weight="duotone" />
                    <span>RAG</span>
                  </div>
                  <div>
                    <Waveform size={28} weight="duotone" />
                    <span>Audio ML</span>
                  </div>
                  <div>
                    <Database size={28} weight="duotone" />
                    <span>Data</span>
                  </div>
                </div>
                <p>Открыт к стажировкам и junior-позициям в ML / NLP / Audio ML.</p>
              </aside>
            </Reveal>
          </div>
        </section>

        <section className="section page-shell about-section" id="about">
          <Reveal className="section-intro about-heading">
            <p className="plain-kicker">Обо мне</p>
            <h2>Студент ИТМО, начинающий ML-разработчик с фокусом на Deep Learning и NLP.</h2>
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
                <div>
                  <Student size={24} weight="duotone" />
                  <span>education</span>
                  <strong>ИТМО</strong>
                  <p>Фокус обучения - Machine Learning, Deep Learning, NLP, PyTorch и математическая база ML.</p>
                </div>
                <div>
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
              <h2>Направления, где я сейчас расту и собираю практику.</h2>
            </Reveal>
            <div className="capability-list">
              {focusAreas.map((item, index) => {
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
              <h2>ML-проекты, которые показывают не только интерес, но и инженерную сторону.</h2>
            </div>
            <a className="inline-github" href="https://github.com/theJorDea" target="_blank" rel="noreferrer">
              <GithubLogo size={22} weight="duotone" />
              GitHub
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </Reveal>

          <div className="project-stack">
            {projects.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal className="project-card" delay={index * 0.05} key={item.title}>
                  <div className="project-card-meta">
                    <Icon size={28} weight="duotone" />
                    <span>{item.status}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="stack-tags compact-tags">
                    {item.stack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section education-section">
          <div className="page-shell education-grid">
            <Reveal className="education-card">
              <GraduationCap size={30} weight="duotone" />
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
                <div key={group}>
                  <strong>{group}</strong>
                  <p>{items.join(" / ")}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section media-section">
          <div className="page-shell media-grid">
            <Reveal>
              <div className="code-panel" aria-label="ML profile card">
                <div className="code-topline">
                  <BookOpen size={20} weight="bold" />
                  <span>profile.md</span>
                </div>
                <pre>{`role: Junior ML/NLP Engineer
focus: PyTorch, NLP, RAG, Audio ML
learning: tensor shapes, gradients, metrics
goal: internship or junior ML role`}</pre>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="music-panel">
                <Image src="/images/TPAB.png" alt="Обложка To Pimp a Butterfly" width={420} height={420} />
                <div>
                  <span>after hours</span>
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
            <h2>Ищу стажировку или junior-позицию в ML/DL-команде.</h2>
            <p>
              Особенно интересны NLP, LLM/RAG-системы, Audio ML, sequence modeling, прикладные DL-прототипы и
              ML-инструменты, которые можно довести до сервиса.
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
            <Brain size={16} weight="duotone" />
            Junior ML/NLP Engineer
          </span>
          <span>
            <VinylRecord size={16} weight="duotone" />
            PyTorch / NLP / Audio ML
          </span>
        </div>
      </footer>
    </>
  );
}
