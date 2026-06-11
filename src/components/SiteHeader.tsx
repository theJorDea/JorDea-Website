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
      setVisible(window.scrollY > window.innerHeight * 0.3);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const menu = document.getElementById("mobile-nav");
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    first?.focus();

    // Lock body scroll when menu is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

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
          <span className="brand-text-mini">JorDea</span>
        </a>

        <div
          id="mobile-nav"
          className={menuOpen ? "nav-links is-open" : "nav-links"}
          aria-hidden={!menuOpen}
        >
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
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
