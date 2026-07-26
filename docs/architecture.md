# AI Study Assistance Architecture

AI Study Assistance is initialized as a full-stack application with separate frontend, backend, database, and documentation areas.

## Frontend

The frontend is a React + Vite + TypeScript application. It runs locally on port `5173`.

## Backend

The backend is a Spring Boot Gradle application targeting Java 21. It runs locally on port `8080`.

## Database

PostgreSQL is the primary database. Flyway owns schema migrations from the backend application.

## API Documentation

OpenAPI JSON is available at `/v3/api-docs`.
Swagger UI is available at `/swagger-ui.html`.
