package portfolio_gateway.constants;

public class ApiPathConstants {
    // Versions
    public static final String V1_PREFIX = "/api/v1";

    // Auth Service
    public static final String AUTH_PATH = V1_PREFIX + "/auth/**";
    public static final String AUTH_REWRITE_REGEX = "/api/v1/auth/(?<segment>.*)";
    public static final String AUTH_REWRITE_REPLACEMENT = "/api/v1/auth/${segment}";

    // Feature Flag Service
    public static final String FEATURE_FLAGS_PATH = V1_PREFIX + "/feature-flags/**";
    public static final String FEATURE_FLAGS_REWRITE_REGEX = "/api/v1/feature-flags/(?<segment>.*)";
    public static final String FEATURE_FLAGS_REWRITE_REPLACEMENT = "/api/v1/feature-flags/${segment}";

    // Demo Service
    public static final String DEMO_PATH = V1_PREFIX + "/demo/**";

    // Open API Endpoints (no require authentication)
    public static final String REGISTER_ENDPOINT = V1_PREFIX + "/auth/register";
    public static final String REGISTER_SUPER_ADMIN_ENDPOINT = V1_PREFIX + "/auth/register-super-admin";
    public static final String LOGIN_ENDPOINT = V1_PREFIX + "/auth/login";
}
