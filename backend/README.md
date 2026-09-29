# OAuth Authentication Backend

Полноценный бэкенд для OAuth авторизации через Google, GitHub, GitLab и Bitbucket.

## Технологии

- Node.js + Express
- SQLite база данных
- Passport.js для OAuth
- Express Sessions

## Установка

1. Установите зависимости:
```bash
cd backend
npm install
```

2. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

3. Настройте OAuth приложения:

### Google OAuth
1. Перейдите на [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект
3. Включите Google+ API
4. Создайте OAuth 2.0 Client ID
5. Добавьте redirect URI: `http://localhost:5000/auth/google/callback`
6. Скопируйте Client ID и Client Secret в `.env`

### GitHub OAuth
1. Перейдите на [GitHub Developer Settings](https://github.com/settings/developers)
2. Создайте новое OAuth App
3. Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Скопируйте Client ID и Client Secret в `.env`

### GitLab OAuth
1. Перейдите на [GitLab User Settings](https://gitlab.com/-/profile/applications)
2. Создайте новое приложение
3. Redirect URI: `http://localhost:5000/auth/gitlab/callback`
4. Скопируте Application ID и Secret в `.env`

### Bitbucket OAuth
1. Перейдите на [Bitbucket Developer Portal](https://bitbucket.org/account/settings/applications/)
2. Создайте OAuth consumer
3. Callback URL: `http://localhost:5000/auth/bitbucket/callback`
4. Скопируйте Key и Secret в `.env`

## Запуск

Для разработки:
```bash
npm run dev
```

Для продакшена:
```bash
npm start
```

Сервер будет запущен на `http://localhost:5000`

## API Endpoints

### Авторизация
- `GET /auth/google` - Начать авторизацию через Google
- `GET /auth/google/callback` - Callback для Google
- `GET /auth/github` - Начать авторизацию через GitHub
- `GET /auth/github/callback` - Callback для GitHub
- `GET /auth/gitlab` - Начать авторизацию через GitLab
- `GET /auth/gitlab/callback` - Callback для GitLab
- `GET /auth/bitbucket` - Начать авторизацию через Bitbucket
- `GET /auth/bitbucket/callback` - Callback для Bitbucket
- `GET /auth/success` - Успешная авторизация
- `GET /auth/error` - Ошибка авторизации
- `GET /auth/logout` - Выход из системы
- `GET /auth/status` - Проверка статуса авторизации

### API
- `GET /api/user` - Получить текущего пользователя
- `GET /api/users` - Получить всех пользователей (admin)
- `DELETE /api/user` - Удалить аккаунт

### Health
- `GET /health` - Проверка здоровья сервера

## База данных

SQLite база данных создается автоматически в файле `database.sqlite`.

Таблицы:
- `users` - информация о пользователях
- `sessions` - сессии пользователей

## Фронтенд

Обновите `API_URL` в `auth.html` на URL вашего бэкенда в продакшене.

## Безопасность

- Измените `SESSION_SECRET` в `.env` для продакшена
- Используйте HTTPS в продакшене
- Настройте правильные CORS origins
- Ограничьте доступ к админским endpoints