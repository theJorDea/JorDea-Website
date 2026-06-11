import { Brain, Cpu } from "@phosphor-icons/react/ssr";

export function Footer() {
  return (
    <footer className="site-footer">
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
  );
}
