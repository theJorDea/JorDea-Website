# JorDea - Developer Portfolio

Современный одностраничный сайт-портфолио разработчика с плавными анимациями, переключением тем и адаптивным дизайном.

## ✨ Особенности

- 🎨 **Современный дизайн** - Вдохновлен wa-studio.co
- 🌓 **Переключение тем** - Светлая и темная тема
- 📱 **Адаптивность** - Отлично выглядит на всех устройствах
- ⚡ **Плавные анимации** - Анимации появления при скролле
- 🎯 **Одна страница** - Вся информация на одной странице
- 🔗 **Социальные сети** - Интеграция с GitHub, Telegram, Spotify, LinkedIn
- ⌨️ **Анимация печати** - Динамическая смена профессий в hero секции
- 🎪 **Частицы** - Анимированный фон с частицами

## 🚀 Быстрый старт

1. **Клонируйте или скачайте файлы**
2. **Откройте `index.html` в браузере**
3. **Настройте под себя** (см. раздел "Настройка")

Никаких дополнительных зависимостей не требуется!

## 📁 Структура проекта

```
portfolio/
├── index.html          # Основная страница
├── styles.css          # Стили и темы
├── script.js           # JavaScript функциональность
└── README.md           # Документация
```

## 🎨 Настройка

### 1. Персональная информация

В файле `index.html` найдите и замените:

```html
<!-- Навигация -->
<div class="nav-logo">
    <a href="#home">JD</a>  <!-- Ваши инициалы -->
</div>

<!-- Hero секция -->
<span class="title-main">JorDea</span>  <!-- Ваше имя -->

<!-- О себе -->
<p class="about-description">
    Привет! Я JorDea, увлеченный разработчик...  <!-- Ваша биография -->
</p>

<!-- Статистика -->
<span class="stat-number">2+</span>  <!-- Годы опыта -->
<span class="stat-number">15+</span> <!-- Количество проектов -->

<!-- Контакты -->
<span>your.email@example.com</span>    <!-- Ваш email -->
<span>Ваш город, Страна</span>         <!-- Ваше местоположение -->
```

### 2. Социальные сети

Замените ссылки в секции контактов:

```html
<a href="https://github.com/yourusername" target="_blank" class="social-link github">
<a href="https://t.me/yourusername" target="_blank" class="social-link telegram">
<a href="https://open.spotify.com/user/yourusername" target="_blank" class="social-link spotify">
<a href="https://linkedin.com/in/yourusername" target="_blank" class="social-link linkedin">
```

### 3. Навыки

В секции навыков обновите технологии:

```html
<div class="skill-category">
    <h3 class="category-title">Frontend</h3>
    <div class="skills-list">
        <span class="skill-tag">JavaScript</span>
        <span class="skill-tag">TypeScript</span>
        <!-- Добавьте свои технологии -->
    </div>
</div>
```

### 4. Фотография

Замените placeholder изображение:

```html
<img src="your-photo.jpg" alt="JorDea">
```

### 5. Анимация печати

В `script.js` измените список профессий:

```javascript
new TypingAnimation(heroSubtitle, ['Developer', 'Frontend', 'Fullstack', 'Creator'], 150, 75, 2000);
```

## 🎨 Цветовая схема

### Светлая тема
```css
--bg-primary: #ffffff;      /* Основной фон */
--bg-secondary: #f8f6f3;    /* Вторичный фон (бежевый) */
--text-primary: #1a1a1a;    /* Основной текст */
--accent: #e8d5c4;          /* Акцентный цвет (бежевый) */
```

### Темная тема
```css
--bg-primary: #0f0f0f;      /* Основной фон */
--bg-secondary: #1a1a1a;    /* Вторичный фон */
--text-primary: #ffffff;    /* Основной текст */
--accent: #2d2d2d;          /* Акцентный цвет */
```

## ⚡ Функциональность

### Переключение тем
- Кнопка в навигации
- Сохранение выбора в localStorage
- Автоматическая смена иконок

### Плавная навигация
- Автоматический скролл к секциям
- Подсветка активной секции
- Мобильное гамбургер-меню

### Анимации
- Появление элементов при скролле
- Анимация цифр в статистике
- Эффект частиц на фоне
- Плавающие карточки

### Адаптивность
- Мобильная навигация
- Responsive сетки
- Оптимизация для планшетов

## 📱 Мобильная версия

Сайт полностью адаптирован для мобильных устройств:
- Гамбургер-меню для навигации
- Адаптивные сетки
- Оптимизированные размеры
- Touch-friendly элементы

## 🔧 Кастомизация

### Добавление новых секций

1. **HTML структура**:
```html
<section id="new-section" class="new-section">
    <div class="container">
        <div class="section-header fade-in">
            <h2 class="section-title">Заголовок</h2>
            <p class="section-subtitle">Подзаголовок</p>
        </div>
        <div class="content fade-in">
            <!-- Ваш контент -->
        </div>
    </div>
</section>
```

2. **CSS стили**:
```css
.new-section {
    padding: var(--spacing-4xl) 0;
    background: var(--bg-secondary); /* если нужен другой фон */
}
```

3. **Навигация**:
```html
<li><a href="#new-section" class="nav-link">Новая секция</a></li>
```

### Изменение анимаций

В `styles.css` найдите и измените:

```css
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.8s ease forwards;
}
```

### Настройка частиц

В `script.js` измените параметры:

```javascript
this.particleCount = 50;  // Количество частиц
// В createParticles():
size: Math.random() * 3 + 1,  // Размер частиц
speedX: (Math.random() - 0.5) * 0.5,  // Скорость
```

## 🛠️ Техническая информация

### Используемые технологии
- **HTML5** - Семантическая разметка
- **CSS3** - Grid, Flexbox, Custom Properties, Animations
- **Vanilla JavaScript** - ES6+ классы, Intersection Observer API
- **Font Awesome** - Иконки
- **Google Fonts** - Шрифт Inter

### Поддержка браузеров
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### Производительность
- Оптимизированные анимации (60 FPS)
- Ленивая загрузка анимаций
- Debounce для событий скролла
- Минимальное использование JavaScript

## 📝 Лицензия

Этот проект создан для личного использования. Вы можете свободно использовать и модифицировать код для своих нужд.

## 🤝 Поддержка

Если у вас есть вопросы или предложения:
1. Создайте issue в репозитории
2. Напишите на email
3. Свяжитесь через социальные сети

---

**Сделано с ❤️ и ☕** 