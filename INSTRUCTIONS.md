# Instrucciones de Conexión y Ejecución - Portfolio Ecosystem

## 1. Arquitectura Actual: "The Traffic Police"
El sistema ha sido refactorizado para operar bajo un modelo de **Zero-Trust** y **Alta Observabilidad**.

- **API Gateway (Puerto 8080)**: Actúa como el policía de tráfico. Gestiona el Rate Limiting (vía Redis), Circuit Breaking (Resilience4j) y la validación formal de rutas.
- **Backend - Feature Flag API (Puerto 8081)**: Opera en **Modo Demo** con persistencia efímera (H2 In-Memory) y auto-limpieza programada cada 6 horas.
- **Frontend - Quasar App (Puerto 9000)**: Integra un Dashboard de Métricas en tiempo real que consume telemetría de Prometheus del Gateway.
- **Redis**: Motor de persistencia para las cuotas de tráfico y límites de tasa.

## 2. Ejecución con Docker (Recomendado)
El proyecto está completamente orquestado para un despliegue inmediato.

1.  **Configuración**: Asegúrate de tener el archivo `.env` en la raíz (generado automáticamente).
2.  **Lanzamiento**:
    ```bash
    docker-compose up --build
    ```
3.  **Acceso**:
    - **Frontend**: `http://localhost:9000`
    - **Gateway Health**: `http://localhost:8080/actuator/health`
    - **Swagger Unificado**: `http://localhost:8080/swagger-ui.html`

## 3. Características de Robustez Implementadas

### Gateway (Seguridad y Control)
- **Rate Limit**: Protege contra ataques de denegación de servicio (10 req/s por IP).
- **Circuit Breaker**: Evita fallos en cascada. Si el backend cae, el Gateway responde con un fallback elegante.
- **Route Validator**: Solo permite el paso a rutas registradas formalmente en `ApiPathConstants`.

### Backend (Mantenibilidad)
- **H2 In-Memory**: Ideal para reclutadores. No requiere instalación de DB externa y se limpia al reiniciar.
- **Data Seeding**: Se pre-cargan datos de ejemplo (`Dark Mode`, `Beta Dashboard`) automáticamente.
- **Demo Management**: Endpoint `POST /api/v1/demo/reset` disponible para restaurar el estado inicial.

### Frontend (Observabilidad)
- **Metrics Dashboard**: Visualización profesional con ApexCharts.
- **Prometheus Parser**: El frontend interpreta la telemetría del backend para mostrar carga de tráfico y estado de circuitos.

## 4. Expansión del Ecosistema
Para agregar nuevos microservicios, consulta el manual detallado en:
`backend/portfolio-gateway/README.md`

## 5. Roadmap Actualizado
- [x] Refactorización de Gateway ("Traffic Police").
- [x] Implementación de Modo Demo y Persistencia H2.
- [x] Dashboard de Métricas con ApexCharts.
- [x] Orquestación Completa con Docker Compose.
- [ ] **Fase Final: Pulido de UX/UI y Experiencia de Usuario.**
