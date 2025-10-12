# authorizationApp

собираем образ
docker build -f docker/backend.Dockerfile -t my-backend .
docker build do-f docker/frontend.Dockerfile -t my-frontend .

запускаем образ
docker run -d -p 8080:8080 --name backend my-backend
docker run -d -p 3000:3000 --name frontend my-frontend

удаляем все контейнеры
docker container prune

удаляем дубли образов
docker image prune

удалить образ
docker rmi <IMAGE_ID_или_название>

Запуск production build
docker compose up --build
docker compose -f docker/docker-compose.yml up

Запуск dev build
docker compose -f docker/docker-compose.dev.yml up
