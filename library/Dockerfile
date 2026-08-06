# ==========================
# Build Stage
# ==========================
FROM eclipse-temurin:24-jdk AS builder

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

# ==========================
# Runtime Stage
# ==========================
FROM eclipse-temurin:24-jre

WORKDIR /app

COPY --from=builder /app/target/*.jar library.jar

EXPOSE 8080

ENTRYPOINT ["java","-Xms128m","-Xmx384m","-jar","library.jar"]