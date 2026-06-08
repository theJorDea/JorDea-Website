"use client";

import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

const navItems = [
  { href: "#home", label: "Главная" },
  { href: "#about", label: "Обо мне" },
  { href: "#skills", label: "Фокус" },
  { href: "#projects", label: "Проекты" },
  { href: "#contact", label: "Контакты" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>
      <nav className="nav-shell" aria-label="Основная навигация">
        <a className="brand-lockup" href="#home" onClick={closeMenu}>
          <span className="brand-mark">jordea</span>
          <span className="brand-text">
            <strong>Junior ML/NLP Engineer</strong>
            <span>PyTorch / RAG / Audio ML</span>
          </span>
        </a>

        <div className={menuOpen ? "nav-links is-open" : "nav-links"}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a className="nav-mail" href="mailto:klevin3701@gmail.com">
            Написать
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
