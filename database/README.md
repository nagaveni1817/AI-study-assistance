# Database

Local PostgreSQL is provided through Docker Compose.

```powershell
docker compose -f database/docker-compose.yml up -d
```

Default local connection:

- Host: `localhost`
- Port: `5432`
- Database: `ai_study_assistance`
- Username: `ai_study_user`
- Password: `ai_study_password`

Flyway migrations live in `backend/src/main/resources/db/migration`.
