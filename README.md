# n0phase — Portfolio

Персональное портфолио Frontend-разработчика. Статический сайт на HTML, CSS и Vanilla JavaScript. Развёртывается через GitHub Pages.

## Структура

```
/
├── index.html
├── README.md
└── assets/
    ├── css/main.css
    ├── js/main.js
    ├── js/projects.js
    └── images/
```

## Как добавить проект

1. Открой `assets/js/projects.js`.
2. Скопируй объект проекта в массиве `projects`.
3. Измени название, категорию, год, описание, ссылку и технологии.
4. Для обложки загрузи файл в `assets/images/` и укажи путь, например `assets/images/my-project.webp`.
5. Сохрани изменения. После публикации GitHub Pages обновит сайт.

Пример записи:

```js
{
  title: "MY PROJECT",
  category: "Web · Личный проект",
  year: "2026",
  description: "Краткое описание проекта.",
  image: "assets/images/my-project.webp",
  url: "https://example.com/",
  status: "Личный проект",
  featured: true,
  stack: ["HTML", "CSS", "JavaScript"]
}
```

### Поля проекта

- `title` — название.
- `category` — категория.
- `year` — год.
- `description` — краткое описание.
- `image` — путь к обложке; пустая строка включает фирменную заглушку.
- `url` — ссылка; пустая строка показывает статус «Скоро».
- `status` — подпись статуса.
- `featured` — `true` выводит проект выше в каталоге.
- `stack` — массив технологий.

## Настройка бренда

Оформление находится в `assets/css/main.css`. Основные цвета задаются переменными `--red` и `--red-bright` в начале файла.

## Технологии

HTML5 · CSS · Vanilla JavaScript · ES Modules · IntersectionObserver · GitHub Pages

**Code. Design. Create.**
