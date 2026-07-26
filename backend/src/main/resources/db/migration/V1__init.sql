CREATE TABLE IF NOT EXISTS app_metadata (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    value TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO app_metadata (name, value)
VALUES ('schema_version', '1')
ON CONFLICT (name) DO NOTHING;
