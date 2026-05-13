package portfolio_gateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import portfolio_gateway.constants.ApiPathConstants;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Objects;

@Configuration
public class GatewayConfig {

    @Value("${app.services.feature-flag-api.url:http://localhost:8081}")
    private String featureFlagServiceUrl;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("feature-flag-actuator", r -> r.path("/api/v1/feature-flags/actuator/**")
                        .filters(f -> f
                                .rewritePath("/api/v1/feature-flags/actuator/(?<segment>.*)", "/actuator/${segment}")
                        )
                        .uri(featureFlagServiceUrl))

                .route("feature-flag-api", r -> r.path(ApiPathConstants.FEATURE_FLAGS_PATH)
                        .filters(f -> f
                                .rewritePath(ApiPathConstants.FEATURE_FLAGS_REWRITE_REGEX, ApiPathConstants.FEATURE_FLAGS_REWRITE_REPLACEMENT)
                                .requestRateLimiter(rl -> rl.setRateLimiter(redisRateLimiter()).setKeyResolver(userKeyResolver()))
                                .circuitBreaker(cb -> cb.setName("featureFlagCircuitBreaker").setFallbackUri("forward:/fallback/feature-flags"))
                        )
                        .uri(featureFlagServiceUrl))

                .route("demo-api", r -> r.path(ApiPathConstants.DEMO_PATH)
                        .filters(f -> f
                                .requestRateLimiter(rl -> rl.setRateLimiter(redisRateLimiter()).setKeyResolver(userKeyResolver()))
                                .circuitBreaker(cb -> cb.setName("demoCircuitBreaker"))
                        )
                        .uri(featureFlagServiceUrl))

                .route("feature-flag-docs", r -> r.path(ApiPathConstants.DOCS_PATH)
                        .filters(f -> f
                                .rewritePath(ApiPathConstants.DOCS_REWRITE_REGEX, ApiPathConstants.DOCS_REWRITE_REPLACEMENT)
                                .circuitBreaker(cb -> cb.setName("docsCircuitBreaker"))
                        )
                        .uri(featureFlagServiceUrl))
                .build();
    }

    @Bean
    public RedisRateLimiter redisRateLimiter() {
        return new RedisRateLimiter(10, 20); // replenishRate, burstCapacity
    }

    @Bean
    public KeyResolver userKeyResolver() {
        return exchange -> Mono.just(
                Objects.requireNonNull(exchange.getRequest().getRemoteAddress()).getAddress().getHostAddress()
        );
    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:9000"));
        corsConfig.setMaxAge(3600L);
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfig.setAllowedHeaders(Arrays.asList("*"));
        corsConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}
