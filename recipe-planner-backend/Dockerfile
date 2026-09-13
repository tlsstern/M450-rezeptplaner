FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# tests already run in the pipeline
RUN mvn -B package -DskipTests

FROM eclipse-temurin:17-jre
COPY --from=build /app/target/recipe-planner-backend-1.0-SNAPSHOT.jar /app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
