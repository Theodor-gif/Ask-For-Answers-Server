# Ask For Answers

Build with an Express + postgreSQL backend for the Ask For Answers Web App.

## Tech Stack

- [Express](https://expressjs.com/): web server and routing
- [PostgreSQL](https://www.postgresql.org/): database
- [pg](https://www.npmjs.com/package/pg): PostgreSQL client for Node.js
- [Morgan](https://www.npmjs.com/package/morgan): HTTP request logging
- [dotenv](https://www.npmjs.com/package/dotenv): environment variable management
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): authentication (JWT)
- [bcrypt](https://www.npmjs.com/package/bcrypt): password hashing
- [cors](https://www.npmjs.com/package/cors): cross-origin requests from the client

## Project Structure

```
Ask-For-Answers-Server
|
|-- controller/
|   |
|   |-- commentController.js/
|   |-- postController.js/
|   |__ userController.js/
|
|-- db/
|   |
|   |__ connection.js/
|
|-- middleware/
|   |
|   |__ isAuth.js/
|
|-- router/
|   |
|   |-- routeComment.js/
|   |-- routePost.js/
|   |__ routeUser.js/
|
|-- .env/
|
|-- .env.example/
|
|-- .gitignore/
|
|-- app.js/
|
|-- package-lock.json/
|
|-- package.json/
|
|__ README.md/
```

## Environment Variables

```dotenv
PORT=
DATABASE_URL=
ACCESS_TOKEN_SECRET=
```

| Variable              | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `PORT`                | Port the Express server listens on                       |
| `DATABASE_URL`        | PostgreSQL connection string                             |
| `ACCESS_TOKEN_SECRET` | Secret key used to sign/verify short-lived access tokens |

## Database Schema

```sql
CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    first_name  VARCHAR(50) NOT NULL,
    last_name   VARCHAR(50) NOT NULL,
    age         INTEGER NOT NULL CHECK ( age > 0 ),
    email       VARCHAR(60) NOT NULL UNIQUE,
    password    VARCHAR(60) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    title       VARCHAR(50) NOT NULL,
    text        TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE comments (
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    post_id    BIGINT NOT NULL,
    text       TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX posts_user_id_idx ON posts (user_id);
CREATE INDEX comments_user_id_idx ON comments (user_id);
CREATE INDEX comments_post_id_idx ON comments (post_id);

```

## API Endpoints

Base URL: `http://localhost:2000/api`

| Method | Path                 | Auth | Description.            |
| ------ | -------------------- | ---- | ----------------------- |
| GET    | `/users`             | No   | List users              |
| POST   | `/register`          | No   | Create a user           |
| PUT    | `/change`            | Yes  | Update a user           |
| DELETE | `/deleteUser`        | Yes  | Delete a user           |
| POST   | `/login`             | No   | Log in user             |
| GET    | `/posts`             | No   | List posts              |
| POST   | `/upload`            | Yes  | Create a post           |
| DELETE | `/deletePost/:id`    | Yes  | Delete a post           |
| PUT    | `/changePost/:id`    | Yes  | Update a post           |
| GET    | `/allComments`       | No   | List comments           |
| POST   | `/addComment/:id`    | Yes  | Add a comment to a post |
| DELETE | `/deleteComment/:id` | Yes  | Delete a comment        |
| PUT    | `/changeComment/:id` | Yes  | Update a comment        |
