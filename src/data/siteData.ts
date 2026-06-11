export type FocusAreaData = {
  iconKey: "magnifyingGlass" | "brain" | "waveform" | "cpu";
  title: string;
  text: string;
  stack: readonly string[];
};

export type ProjectData = {
  icon: "fileText" | "rows" | "treeStructure" | "waveform" | "chartLine";
  status: string;
  title: string;
  text: string;
  stack: readonly string[];
};

export type PinnedStatement = {
  label: string;
  title: string;
};

export type SocialLinkData = {
  href: string;
  label: string;
  note: string;
  iconKey: "githubLogo" | "telegramLogo" | "spotifyLogo";
};

export const focusAreas: readonly FocusAreaData[] = [
  {
    iconKey: "magnifyingGlass",
    title: "NLP & LLM Systems",
    text: "Embeddings, semantic search, RAG, classification, summarization and LLM agents.",
    stack: ["NLP", "BERT", "SBERT", "RAG", "Vector Search"],
  },
  {
    iconKey: "brain",
    title: "Deep Learning",
    text: "PyTorch training loops, tensor shapes, CNN, RNN/LSTM, attention and Transformer blocks.",
    stack: ["PyTorch", "Backprop", "RNN", "LSTM", "Transformers"],
  },
  {
    iconKey: "waveform",
    title: "Audio ML",
    text: "Spectrograms, MFCC, signal processing basics, audio classification and sequence modeling.",
    stack: ["Audio ML", "MFCC", "Spectrograms", "Speech", "Sequences"],
  },
  {
    iconKey: "cpu",
    title: "ML Engineering",
    text: "FastAPI, Docker, Git, Linux, PostgreSQL and deployment of ML prototypes as usable services.",
    stack: ["FastAPI", "Docker", "Linux", "SQL", "API"],
  },
] as const;

export const scrollStatements: readonly PinnedStatement[] = [
  {
    label: "01 / models",
    title: "Модель должна быть понятной, а не просто запускаться.",
  },
  {
    label: "02 / models",
    title: "Сильный результат начинается с данными, метрик и ошибок.",
  },
] as const;

export const heroStats: readonly { value: string; label: string }[] = [
  { value: "4", label: "focus areas" },
  { value: "5", label: "project directions" },
  { value: "ITMO", label: "education" },
  { value: "ML", label: "internship target" },
] as const;

export const projects: readonly ProjectData[] = [
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

export const techGroups: readonly (readonly string[])[] = [
  ["Core", "Python", "NumPy", "Pandas", "SQL", "Git", "Linux"],
  ["ML", "scikit-learn", "EDA", "Validation", "Metrics", "Feature Engineering"],
  ["DL", "PyTorch", "CNN", "RNN/LSTM", "Attention", "Transformers"],
  ["NLP", "Tokenization", "Embeddings", "BERT/SBERT", "RAG", "LLM Agents"],
  ["Audio", "Spectrograms", "MFCC", "Signal Processing", "Audio Classification"],
  ["Engineering", "FastAPI", "PostgreSQL", "Docker", "REST API", "Vercel"],
] as const;

export const socialLinks: readonly SocialLinkData[] = [
  {
    href: "https://github.com/theJorDea",
    label: "GitHub",
    note: "код и ML-прототипы",
    iconKey: "githubLogo",
  },
  {
    href: "https://t.me/theJorDea",
    label: "Telegram",
    note: "быстрый контакт",
    iconKey: "telegramLogo",
  },
  {
    href: "https://open.spotify.com/playlist/1DjVihxAR3yUnrNIireZmP?si=0575d1eabe374547",
    label: "Spotify",
    note: "личный фон",
    iconKey: "spotifyLogo",
  },
] as const;
