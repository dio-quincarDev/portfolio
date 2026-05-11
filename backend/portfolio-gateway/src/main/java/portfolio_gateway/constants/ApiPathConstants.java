package portfolio_gateway.constants;

public class ApiPathConstants {
    // Versions
    public static final String V1_PREFIX = "/api/v1";

    // Feature Flag Service
    public static final String FEATURE_FLAGS_PATH = V1_PREFIX + "/feature-flags/**";
    public static final String FEATURE_FLAGS_REWRITE_REGEX = "/api/v1/feature-flags/(?<segment>.*)";
    public static final String FEATURE_FLAGS_REWRITE_REPLACEMENT = "/api/v1/features/${segment}";

    // Demo Service
    public static final String DEMO_PATH = V1_PREFIX + "/demo/**";

    // Swagger / Docs
    public static final String DOCS_PATH = "/feature-flags/v3/api-docs/**";
    public static final String DOCS_REWRITE_REGEX = "/feature-flags/(?<segment>.*)";
    public static final String DOCS_REWRITE_REPLACEMENT = "/${segment}";
}
