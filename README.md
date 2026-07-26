# AI Study Assistance

Production-ready full-stack foundation for AI Study Assistance.

## Tech Stack

- Frontend: React, Vite, TypeScript
- Backend: Spring Boot, Java 21, Gradle
- Database: PostgreSQL
- Migrations: Flyway
- API docs: OpenAPI and Swagger UI

## Folder Structure

```text
AI-study-assistance/
├── frontend/   # React + Vite + TypeScript application
├── backend/    # Spring Boot API with Gradle wrapper
├── database/   # Local PostgreSQL Docker Compose setup
├── docs/       # Architecture and project documentation
└── README.md
```

## Run PostgreSQL

```powershell
docker compose -f database/docker-compose.yml up -d
```

The backend uses these defaults:

- `DB_URL=jdbc:postgresql://localhost:5432/ai_study_assistance`
- `DB_USERNAME=ai_study_user`
- `DB_PASSWORD=ai_study_password`

## Run Backend

```powershell
cd backend
.\gradlew.bat bootRun
```

Backend URL: `http://localhost:8080`

- Health endpoint: `GET http://localhost:8080/health`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Run Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## Configuration

Backend configuration is in `backend/src/main/resources/application.yml`.
Flyway migrations are in `backend/src/main/resources/db/migration`.

For local frontend API configuration, copy `frontend/.env.example` to `frontend/.env` and adjust values as needed.
