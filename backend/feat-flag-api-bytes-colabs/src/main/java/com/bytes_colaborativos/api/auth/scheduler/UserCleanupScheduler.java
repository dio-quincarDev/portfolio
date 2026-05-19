package com.bytes_colaborativos.api.auth.scheduler;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserCleanupScheduler {

    private static final Logger log = LoggerFactory.getLogger(UserCleanupScheduler.class);
    private final JdbcTemplate jdbcTemplate;

    @Scheduled(cron = "0 0/30 * * * *")
    public void cleanupUsers() {
        log.info("Iniciando tarea programada: Limpieza automática de usuarios.");
        try {
            jdbcTemplate.execute("DELETE FROM users");
            log.info("Tarea programada completada: Todos los usuarios han sido eliminados.");
        } catch (Exception e) {
            log.error("Error durante la limpieza automática de usuarios: {}", e.getMessage());
        }
    }
}