# 🔧 Стадия сборки (Builder)
FROM eclipse-temurin:21-jdk as builder

# 1. Копируем только то, что нужно для сборки
WORKDIR /workspace
COPY backend/gradlew .
COPY backend/gradle gradle
COPY backend/build.gradle.kts .
COPY backend/settings.gradle.kts .
COPY backend/src src

# 2. Собираем JAR (кешируем зависимости)
RUN ./gradlew bootJar --no-daemon

# 🚀 Стадия запуска (Runtime)
FROM eclipse-temurin:21-jre-jammy

# 1. Безопасный пользователь
RUN useradd -m appuser && \
    mkdir /app && \
    chown appuser:appuser /app
USER appuser
WORKDIR /app

# 2. Копируем только JAR из стадии сборки
COPY --from=builder --chown=appuser:appuser /workspace/build/libs/*.jar app.jar

# 3. Оптимизация JVM для контейнеров
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:+UseContainerSupport"

# 4. Метаданные
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# 5. Запуск
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]