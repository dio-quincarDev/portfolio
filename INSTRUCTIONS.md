# Instrucciones de Conexión y Ejecución - Portfolio Ecosystem

## 1. Arquitectura Actual

- **API Gateway (Puerto 8080)**: Gestiona Rate Limiting (vía Redis), Circuit Breaking (Resilience4j) y validación de rutas.
- **Backend - Feature Flag API (Puerto 8081)**: SQLite persistente (`./data/feature_flags.db`) con 4 feature flags pre-cargados. Datos visibles en Swagger sin autenticación.
- **Frontend - Quasar App (Puerto 9000)**: Dashboard de métricas en tiempo real consume telemetría de Prometheus del Gateway.
- **Redis**: Persistencia para cuotas de tráfico y límites de tasa.

## 2. Ejecución con Docker (Recomendado)

```bash
docker-compose up --build
```

- **Frontend**: `http://localhost:9000`
- **Gateway Health**: `http://localhost:8080/actuator/health`
- **Swagger Unificado**: `http://localhost:8080/swagger-ui.html`

## 3. Ejecución Standalone (Feature Flag API)

```bash
cd backend/feat-flag-api-bytes-colabs
./mvnw spring-boot:run
```

La API estará disponible en `http://localhost:8081`. Acceso a Swagger: `http://localhost:8081/swagger-ui.html`.

## 4. Backend - Feature Flag API

### Stack Tecnológico
- Java 21 + Spring Boot 3.3.1
- SQLite (archivo `./data/feature_flags.db`)
- Spring Security 6 + JWT
- SpringDoc OpenAPI (Swagger UI)
- HikariCP (connection pool)
- `hibernate-community-dialects` (SQLiteDialect para Hibernate 6)

### Endpoints Públicos (sin auth)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/v1/feature-flags` | Listar todos los features |
| `GET` | `/api/v1/feature-flags/{id}` | Obtener un feature por ID |
| `GET` | `/api/v1/feature-flags/check` | Verificar si un feature está activo |
| `POST` | `/api/v1/auth/register` | Registrar usuario |
| `POST` | `/api/v1/auth/login` | Login (retorna JWT) |

## 5. Infraestructura y Mantenimiento

### Persistencia con SQLite
El ecosistema ha migrado de H2 (memoria) a **SQLite** para mayor ligereza y portabilidad:
- **Base de Datos**: `./backend/feat-flag-api-bytes-colabs/data/feature_flags.db`.
- **Docker**: Volumen persistente `portfolio-sqlite-data` montado en `/app/data`.
- **Permisos**: Dockerfile configurado para otorgar permisos de escritura al usuario `spring` sobre el archivo `.db`.

### Auto-Reset de Features
Para garantizar la integridad del demo público:
- **Tarea Programada**: Un `DemoCleanupScheduler` ejecuta un reset de las Feature Flags cada 30 minutos (`0 0/30 * * * *`).
- **Alcance**: Solo afecta a las tablas de `features` y `feature_configs`. No interfiere con la lógica de negocio ni usuarios.
- **Constante Centralizada**: El SQL de reset está centralizado en `FeatureConstants.java` para evitar duplicación.

### Auto-Reset de Usuarios
Para garantizar la integridad del demo público:
- **Tarea Programada**: Un `UserCleanupScheduler` ejecuta un reset de usuarios cada 30 minutos (`0 0/30 * * * *`).
- **Alcance**: Tabla `users` completa (incluye todos los roles).

### Gateway Bridge (Fixed)
Se ha corregido el enrutamiento del Gateway (8080):
- `ANY /api/feature-flags/**` -> Reescrito correctamente a `/api/v1/feature-flags/**` en el Backend.

## 6. Estado del API
El código fuente del API (Servicios, Controladores y Excepciones) se mantiene en su **estado original funcional**, libre de lógica de demo invasiva, garantizando la pureza de la implementación RBAC solicitada.

- `SUPER_ADMIN`: Acceso total, gestión de usuarios y features.
- `ADMIN`: Puede habilitar/deshabilitar features.
- `USER`: Acceso autenticado básico.

### Feature Flags Pre-cargados
| Nombre | Descripción | Default |
|--------|-------------|---------|
| Dark Mode | High-contrast dark theme | `true` |
| Beta Dashboard | Experimental metrics dashboard | `false` |
| Premium Assets | Exclusive icons and assets | `false` |
| Real-time Collaboration | WebSockets para multi-user editing | `true` |

### Reset de Datos
El reset de features ahora es **exclusivamente automático** cada 30 minutos via `DemoCleanupScheduler`. El endpoint manual `/reset` fue eliminado para evitar duplicación.

## 5. Expansión del Ecosistema

Para agregar nuevos microservicios, consulta:
`backend/portfolio-gateway/README.md`

## 6. Roadmap

- [x] Refactorización de Gateway ("Traffic Police").
- [x] SQLite persistente con datos pre-cargados visibles en Swagger.
- [x] Dashboard de Métricas con ApexCharts.
- [x] Orquestación Completa con Docker Compose.
- [ ] **Fase Final: Pulido de UX/UI y Experiencia de Usuario.**