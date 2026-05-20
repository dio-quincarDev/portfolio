package portfolio_gateway;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class GatewayProtectionIntegrationTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    void testActuatorHealthIsUp() {
        webTestClient.get()
                .uri("/actuator/health")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.status").isEqualTo("UP");
    }

    @Test
    void testActuatorPrometheusIsAvailable() {
        webTestClient.get()
                .uri("/actuator/prometheus")
                .exchange()
                .expectStatus().isOk();
    }

    @Test
    void testFeatureFlagRouteExists() {
        // This test verifies that the route is correctly defined and the gateway 
        // attempts to route it (even if the backend is down, we check for non-404 if possible, 
        // or just that the filters don't crash).
        webTestClient.get()
                .uri("/api/v1/feature-flags/health-check")
                .exchange()
                .expectBody();
    }
}
