# Используем официальный образ Nginx как базовый
FROM nginx:alpine

# Копируем файлы вашего приложения в директорию Nginx
COPY . /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

