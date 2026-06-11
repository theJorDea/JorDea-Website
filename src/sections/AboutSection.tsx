import { Student, Target } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion";

export function AboutSection() {
  return (
    <section className="section page-shell about-section" id="about">
      <Reveal className="section-intro about-heading">
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
  );
}
