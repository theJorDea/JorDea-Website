import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section page-shell">
      <h1>Страница не найдена</h1>
      <p>Такого раздела нет. Вернитесь на главную страницу.</p>
      <Link className="primary-link" href="/">
        На главную
      </Link>
    </main>
  );
}