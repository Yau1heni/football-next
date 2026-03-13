# Football App (#iLoveThisGame)

Веб-приложение о футболе на Next.js — каталог клубов с поиском и избранным, лента статей с комментариями и реакциями, авторизация через Firebase (в том числе OAuth).

---

## Запуск проекта

### Требования

- Node.js 20+
- Рекомендуемый пакетный менеджер: **yarn** (при желании можно использовать npm или pnpm)

### Установка и запуск

```bash
# Установка зависимостей (рекомендуется)
yarn install

# Режим разработки
yarn dev

# при использовании npm
# npm install
# npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

### Сборка и продакшен

```bash
yarn build
yarn start
```

### Линтинг и форматирование

```bash
yarn lint
yarn lint:fix
yarn format
```

---

## Основные фичи

- **Клубы:** список с поиском и фильтрами (Typesense), карточка клуба (описание, трофеи, соцсети), избранные клубы (локально + Firestore).
- **Статьи:** лента с пагинацией и виртуализацией, страница статьи с просмотрами, тегами, лайками/дизлайками, комментариями (добавление, ответы, виртуальный список).
- **Авторизация:** вход/регистрация (email + пароль), OAuth (Google, GitHub и др.), защищённые маршруты.
- **UI/UX:** тёмная/светлая тема, адаптивная шапка с бургер-меню, тосты, скелетоны загрузки, обработка ошибок и 404.

---

## Структура папок

```
src/
├── app/                          # Next.js App Router
│   ├── (articles)/               # Роуты статей
│   │   └── articles/
│   │       ├── [id]/             # Страница статьи, комментарии
│   │       └── _components/      # Компоненты страниц статей
│   ├── (auth)/                   # Роуты авторизации
│   │   ├── login/
│   │   └── register/
│   ├── (clubs)/                  # Роуты клубов
│   │   ├── club/[id]/            # Страница клуба
│   │   └── _components/          # Списки клубов, фильтры
│   ├── layout.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── shared/                       # Общий код
│   ├── api/                      # Работа с Firebase, Typesense
│   ├── components/               # UI и переиспользуемые компоненты
│   ├── configs/                  # Конфиги (Firebase, Typesense, TanStack Query)
│   ├── constants/
│   ├── contexts/                 # Auth, Theme, Favorites, Article comments
│   ├── hooks/
│   ├── providers/
│   ├── styles/
│   ├── types/
│   └── utils/
└── queries/                      # TanStack Query: хуки и ключи
    ├── article/
    ├── articles/
    ├── article-comments/
    ├── auth/
    ├── club/
    ├── clubs/
    └── favorites/
```

## Основные технологии

- **Next.js 16** (App Router, React 19)
- **TypeScript**
- **Firebase** — авторизация (в т.ч. OAuth), Firestore (статьи, комментарии, реакции, избранное)
- **Typesense** — поиск и фильтрация клубов
- **TanStack React Query** — кэш и запросы на клиенте и при prefetch
- **TanStack React Virtual** — виртуализация списков (статьи, комментарии)
- **SASS** (модули) — стили
- **react-toastify** — уведомления
- **ESLint, Prettier** — линтинг и форматирование

---

