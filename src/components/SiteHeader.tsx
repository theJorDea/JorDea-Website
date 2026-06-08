"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#home", label: "Главная" },
  { href: "#about", label: "Обо мне" },
  { href: "#skills", label: "Навыки" },
  { href: "#projects", label: "Проекты" },
  { href: "#contact", label: "Контакты" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

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
          <span className="brand-mark">JD</span>
          <span className="brand-text">
            <strong>JorDea</strong>
            <span>developer portfolio</span>
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
          <button
            className="icon-button"
            type="button"
            aria-label="Переключить тему"
            onClick={toggleTheme}
          >
            Тема
          </button>
          <button
            className="menu-button"
            type="button"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
