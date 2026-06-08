import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section page-shell not-found-page">
      <p className="plain-kicker">404</p>
      <h1>Страница не найдена</h1>
      <p>
        Такого маршрута нет. Вернитесь на главную страницу портфолио.
      </p>
      <Link className="primary-link" href="/">
        На главную
      </Link>
    </main>
  );
}