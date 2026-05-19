package com.bytes_colaborativos.api.feature.scheduler;

import com.bytes_colaborativos.api.feature.constants.FeatureConstants;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DemoCleanupScheduler {

    private static final Logger log = LoggerFactory.getLogger(DemoCleanupScheduler.class);
    private final JdbcTemplate jdbcTemplate;

    /**
     * Resetea los datos de features cada 30 minutos.
     */
    @Scheduled(cron = "0 0/30 * * * *")
    public void autoResetDemoData() {
        log.info("Iniciando tarea programada: Limpieza automática de Feature Flags.");
        try {
            jdbcTemplate.execute(FeatureConstants.RESET_SQL);
            log.info("Tarea programada completada: Los datos de features han sido restaurados.");
        } catch (Exception e) {
            log.error("Error durante la limpieza automática de datos: {}", e.getMessage());
        }
    }
}
