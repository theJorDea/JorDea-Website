import { ArrowUpRight, GithubLogo, SpotifyLogo, TelegramLogo } from "@phosphor-icons/react/ssr";
import { MagneticLink, Reveal } from "@/components/motion";
import { socialLinks } from "@/data/siteData";

const iconMap = {
  githubLogo: GithubLogo,
  telegramLogo: TelegramLogo,
  spotifyLogo: SpotifyLogo,
};

export function ContactSection() {
  return (
    <section className="section contact-section page-shell" id="contact">
      <Reveal className="contact-copy">
        <h2>Ищу стажировку или junior-позицию в ML/DL-команде.</h2>
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
          const Icon = iconMap[link.iconKey];
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
  );
}
