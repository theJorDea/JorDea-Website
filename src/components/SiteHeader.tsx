"use client";

import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "#home", label: "Главная" },
  { href: "#about", label: "Обо мне" },
  { href: "#skills", label: "Фокус" },
  { href: "#projects", label: "Проекты" },
  { href: "#contact", label: "Контакты" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.75);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={visible ? "site-header is-visible" : "site-header"}>
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>

      <nav className="nav-shell" aria-label="Основная навигация">
        <a className="brand-lockup" href="#home" onClick={closeMenu}>
          <svg className="brand-mark-svg" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="16" height="6" />
            <rect x="18" y="0" width="6" height="6" />
            <rect x="0" y="10" width="8" height="6" />
          </svg>
          <span className="brand-text-mini">JorDea</span>
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
            Контакты
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