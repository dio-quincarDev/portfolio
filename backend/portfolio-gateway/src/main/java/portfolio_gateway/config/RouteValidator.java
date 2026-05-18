package portfolio_gateway.config;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import portfolio_gateway.constants.ApiPathConstants;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    // List of allowed public endpoints or open paths
    public static final List<String> openApiEndpoints = List.of(
            ApiPathConstants.REGISTER_ENDPOINT,
            ApiPathConstants.REGISTER_SUPER_ADMIN_ENDPOINT,
            ApiPathConstants.LOGIN_ENDPOINT,
            "/actuator"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));

    /**
     * Formal check to ensure the path belongs to a known service or pattern defined in constants.
     */
    public boolean isValidPath(String path) {
        return path.startsWith(ApiPathConstants.V1_PREFIX) || 
               path.startsWith("/feature-flags") ||
               path.startsWith("/actuator") ||
               path.startsWith("/swagger-ui") ||
               path.startsWith("/v3/api-docs");
    }
}
