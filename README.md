# Projekt dyplomowy - Trainify

## Get started

```bash
docker-compose up --build
```

- Client: [http://localhost:3001](http://localhost:3001)
- Swagger-documentation API: [http://localhost:3101/api/docs](http://localhost:3101/api/docs)

## Connect to Postgresql

```bash
PGPASSWORD=trainify psql -h localhost -p 5433 -U trainify -d trainify
```

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `\dt`           | List all tables in the database    |
| `\d table_name` | Show a table's structure           |
| `\l`            | List all databases                 |
| `\c trainify`   | Connect to the `trainify` database |
| `\q`            | Quit psql                          |

```sql
SELECT * FROM "user";
```

```sql
SELECT * FROM exercise;
```

```sql
SELECT COUNT(*) FROM exercise;
```
