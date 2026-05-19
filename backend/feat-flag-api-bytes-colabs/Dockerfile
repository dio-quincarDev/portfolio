# Etapa 1: Construcción (Builder)
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Copiamos el pom y bajamos dependencias (aprovechando el caché de capas de Docker)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiamos el código fuente y compilamos
COPY src ./src
RUN mvn clean package -DskipTests -B

# Etapa 2: Imagen de ejecución (Runtime)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Seguridad: Crear un usuario no root para ejecutar la app
RUN addgroup -S spring && adduser -S spring -G spring
WORKDIR /app
RUN mkdir -p /app/data && chown -R spring:spring /app/data
USER spring:spring

# Copiamos el jar generado desde la etapa anterior
COPY --from=builder /app/target/feature-flag-api-*.jar app.jar

# El Gateway por defecto usa el 8080
EXPOSE 8080

# Parámetros optimizados para Java 21 en contenedores
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]