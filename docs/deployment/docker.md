# Docker Deployment Strategy

This project contains explicit containerization support mapping the Node.js backend to lightweight Alpine images.

*(Currently implemented only for local development replication. Production relies directly on Render's native image engine).*

## Development Containerization
The `docker-compose.yml` links the API service securely to an ephemeral initialized MongoDB container instance.

```yaml
version: '3.8'
services:
  api:
    build: 
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/usr/src/app
      - /usr/src/app/node_modules
    env_file:
      - ./backend/.env
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```
