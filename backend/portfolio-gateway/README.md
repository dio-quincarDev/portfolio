# Portfolio Gateway - Technical Operations Manual

This Gateway acts as a "Traffic Police" for the portfolio ecosystem, providing Routing, Rate Limiting, Circuit Breaking, and Monitoring.

## 🚦 How to add a new Microservice

To register a new API in this gateway and keep it formal and protected, follow these steps:

### 1. Update Constants
Define the new service paths and target URL in `portfolio_gateway.constants.ApiPathConstants`:
```java
// Example for a new 'Project Service'
public static final String PROJECT_SERVICE_PATH = V1_PREFIX + "/projects/**";
public static final String PROJECT_SERVICE_URL = "http://localhost:8082";
```

### 2. Update Route Validator
Ensure the `RouteValidator.isValidPath` method recognizes the new prefix so it doesn't get rejected:
```java
public boolean isValidPath(String path) {
    return ... || path.startsWith("/api/v1/projects");
}
```

### 3. Register Route in Java DSL
Add the new route in `GatewayConfig.customRouteLocator`. You **must** include the protective filters (Rate Limiter and Circuit Breaker) to maintain the "Traffic Police" standard:
```java
.route("project-service", r -> r.path(ApiPathConstants.PROJECT_SERVICE_PATH)
    .filters(f -> f
        .requestRateLimiter(rl -> rl.setRateLimiter(redisRateLimiter()).setKeyResolver(userKeyResolver()))
        .circuitBreaker(cb -> cb.setName("projectServiceCircuitBreaker").setFallbackUri("forward:/fallback/projects"))
    )
    .uri(ApiPathConstants.PROJECT_SERVICE_URL))
```

### 4. Aggregate Swagger Docs
To show the new API docs in the unified Swagger UI (accessible at `/swagger-ui.html`), update `application.yaml`:
```yaml
springdoc:
  swagger-ui:
    urls:
      - name: Feature Flag API
        url: /feature-flags/v3/api-docs
      - name: Project Service  # <--- Add your new service here
        url: /project-service/v3/api-docs
```

---

## 📈 Observability & Health
- **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Health Check**: [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health) (Shows status of Redis and Circuit Breakers)
- **Prometheus Metrics**: [http://localhost:8080/actuator/prometheus](http://localhost:8080/actuator/prometheus)
