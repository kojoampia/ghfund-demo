# App Demo

A full-stack application built with **JHipster 8.11**, combining a **Spring Boot 3.4** backend with an **Angular 19** frontend. Part of the GHFund platform, this project demonstrates investment project tracking with entities for Projects, Circles, and Investments.

## Tech Stack

| Layer      | Technology                                                  |
| ---------- | ----------------------------------------------------------- |
| Backend    | Java 17, Spring Boot 3.4.5, Spring Security (OAuth2/OIDC)  |
| Frontend   | Angular 19.2, Bootstrap 5, Tailwind CSS, NgBootstrap        |
| Database   | PostgreSQL (Liquibase migrations)                           |
| Build      | Maven (backend), Webpack + Angular CLI (frontend)           |
| Testing    | JUnit 5, ArchUnit (backend); Jest (frontend)                |
| API Docs   | SpringDoc OpenAPI                                           |
| Monitoring | Micrometer / Prometheus, Grafana                            |
| Container  | Docker Compose, Jib                                         |

## Domain Model

Defined in [demoApp-models.jdl](demoApp-models.jdl):

- **Project** — name, sector, status (`ACTIVE` / `VETTING` / `CLOSED`), target amount, current raised, impact score
- **Circle** — name, members, impact, focus area
- **Investment** — amount, date, ROI, status, hash; linked to a Project (`ManyToOne`)

## Project Structure

```
src/main/
├── java/com/ghfund/appdemo/   # Spring Boot application
│   ├── domain/                # JPA entities (Project, Circle, Investment, User, Authority)
│   ├── repository/            # Spring Data repositories
│   ├── service/               # Business logic
│   ├── web/                   # REST controllers
│   ├── security/              # Security configuration
│   └── config/                # App configuration
├── resources/                 # application.yml, Liquibase changelogs, i18n
├── webapp/                    # Angular application
│   └── app/
│       ├── entities/          # CRUD views (project, circle, investment)
│       ├── admin/             # Admin pages
│       ├── account/           # User account management
│       ├── home/              # Landing page
│       ├── layouts/           # Navigation, error pages, footer
│       ├── login/             # Authentication
│       └── shared/            # Shared components, pipes, directives
└── docker/                    # Docker Compose files (PostgreSQL, Prometheus, Grafana, Sonar)
```

## Prerequisites

- **Java** 17+
- **Node.js** 20+ / npm 11+
- **Docker** & Docker Compose (for local services)

## Getting Started

### 1. Start required services

```bash
docker compose -f src/main/docker/services.yml up -d
```

### 2. Run the backend

```bash
./mvnw
```

The Spring Boot application starts on [http://localhost:8080](http://localhost:8080).

### 3. Run the frontend (hot-reload)

In a separate terminal:

```bash
npm install --legacy-peer-deps
npm start
```

The Angular dev server starts on [http://localhost:9060](http://localhost:9060) with HMR enabled and proxies API calls to the backend.

### 4. Run both together

```bash
npm run watch
```

## Testing

### Backend

```bash
./mvnw verify
```

Or via npm:

```bash
npm run backend:unit:test
```

### Frontend

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

### Linting

```bash
npm run lint
npm run lint:fix   # auto-fix
```

## Building for Production

```bash
./mvnw -Pprod clean verify
```

This compiles the Angular frontend with production optimizations and packages everything into a single executable JAR.

Run the production artifact:

```bash
java -jar target/*.jar
```

## Docker

Build a Docker image with Jib:

```bash
npm run java:docker
```

ARM64 variant:

```bash
npm run java:docker:arm64
```

Run the full stack via Docker Compose:

```bash
docker compose -f src/main/docker/app.yml up
```

## Monitoring

Start Prometheus + Grafana:

```bash
docker compose -f src/main/docker/monitoring.yml up -d
```

Metrics are exposed via Spring Boot Actuator at `/management/prometheus`.

## API Documentation

OpenAPI docs are available at `/v3/api-docs` when the server is running. Swagger UI is bundled for interactive exploration.

## Code Quality

Run SonarQube analysis (requires a running Sonar instance):

```bash
docker compose -f src/main/docker/sonar.yml up -d
./mvnw -Pprod clean verify sonar:sonar
```

## Key Configuration Files

| File                                                     | Purpose                       |
| -------------------------------------------------------- | ----------------------------- |
| [pom.xml](pom.xml)                                       | Maven build & dependencies    |
| [package.json](package.json)                             | npm scripts & JS dependencies |
| [angular.json](angular.json)                             | Angular CLI configuration     |
| [demoApp-models.jdl](demoApp-models.jdl)                 | JHipster entity definitions   |
| [tsconfig.json](tsconfig.json)                           | TypeScript compiler options   |
| [tailwind.config.js](tailwind.config.js)                 | Tailwind CSS configuration    |
| [eslint.config.mjs](eslint.config.mjs)                   | ESLint rules                  |
| [sonar-project.properties](sonar-project.properties)     | SonarQube project settings    |

## License

UNLICENSED — proprietary.
