# Инструкция по тестированию авторизации

## Быстрый запуск демо-сервера

### 1. Запуск демо-сервера
```bash
cd backend
npm run demo
```

Сервер запустится на `http://localhost:3001`

### 2. Открытие фронтенда
```bash
open auth.html
```

Или открой файл `auth.html` в браузере вручную.

### 3. Тестирование авторизации
Нажми на любую кнопку авторизации (Google, GitHub, GitLab, Bitbucket) - будет симулирована успешная авторизация с демо-пользователем.

## API endpoints для тестирования

### Проверка здоровья сервера
```bash
curl http://localhost:3001/health
```

### Проверка статуса авторизации
```bash
curl http://localhost:3001/auth/status
```

### Получение текущего пользователя
```bash
curl http://localhost:3001/api/user
```

### Получение всех пользователей
```bash
curl http://localhost:3001/api/users
```

## Для реального OAuth

Чтобы использовать реальные OAuth приложения:

1. Создай OAuth приложения в Google, GitHub, GitLab, Bitbucket
2. Обнови `backend/.env` с реальными credentials
3. Запусти реальный сервер: `npm start` вместо `npm run demo`
4. Обнови `API_URL` в `auth.html` на `http://localhost:5000`

## Публичный доступ

Для публичного доступа можно использовать:
- Railway (requires auth)
- Render (requires auth)
- Vercel (requires auth)
- Glitch (бесплатный, но нужен ручной деплой)

Инструкции в `backend/DEPLOYMENT.md`