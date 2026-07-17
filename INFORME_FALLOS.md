# Informe de Fallos Identificados y Acciones Realizadas

Este documento detalla los problemas técnicos detectados en la plataforma, las soluciones propuestas e implementadas, y el resultado de las mismas (revertidas por no solucionar el problema base o causar inestabilidad).

## 1. Problemas Identificados

### A. Desincronización del Tiempo Activo (Uptime)
- **Síntoma**: El frontend mostraba un tiempo activo basado en el tiempo local de la pestaña del navegador (`Date.now()`), no en el tiempo real del proceso del servidor.
- **Causa Raíz**: El componente `IndexPage.vue` no consultaba los metadatos de Actuator del backend.

### B. Fallo de Estado del Servicio (Badge "DOWN")
- **Síntoma**: El indicador de estado del ecosistema permanecía en "DOWN" o "FUERA DE LÍNEA".
- **Causa Raíz**: Las rutas del frontend apuntaban a `/actuator/health` de forma directa, mientras que el Gateway de producción espera `/api/v1/feature-flags/actuator/health`.

### C. Errores HTTP 500 durante Pruebas de Estrés
- **Síntoma**: Bajo carga (Stress Test), el endpoint `/api/v1/feature-flags/check` respondía con error 500 en el 100% de las peticiones.
- **Causa Raíz Identificada**: Bloqueo de concurrencia en SQLite ("Database is locked") al intentar manejar múltiples hilos sin configuración WAL (Write-Ahead Logging).

### D. Desincronización de Tareas Programadas (Reset)
- **Síntoma**: La cuenta regresiva de reinicio en el frontend no coincidía con la ejecución real de los schedulers del backend (que ocurren a las :00 y :30).

---

## 2. Acciones Realizadas (No Solucionadas/Revertidas)

Se aplicó una refactorización integral en el commit `3a9f7e6` que incluía:

1.  **Backend - SQLite**: Inclusión de `journal_mode=WAL&busy_timeout=5000` en la URL de conexión.
2.  **Backend - Logs**: Habilitación de `log.error` en `GlobalExceptionHandler` para capturar stacktraces.
3.  **Frontend - Rutas**: Cambio masivo de endpoints de Actuator para incluir el prefijo del Gateway.
4.  **Frontend - Lógica**: Implementación de consumo de `process.uptime` real y sincronización de reloj absoluto para el Reset.

### Resultado de la acción
- **Estado**: **REVERTIDO**.
- **Razón**: Los cambios fueron considerados invasivos o no resolvieron el problema de fondo en el entorno desplegado, causando una desincronización mayor o riesgo de inestabilidad en producción.

---

## 3. Estado Actual del Sistema
- Se ha realizado un **Rollback total** al commit `1fa564a` ("UX/UI improve").
- El código ha vuelto a su estado original previo a la intervención.
- Los problemas identificados en la sección 1 **persisten** y requieren un nuevo enfoque de diagnóstico.

---

## 4. Recomendaciones Técnicas Futuras
- **Aislamiento**: Probar el cambio de rutas del Actuator de forma independiente antes de modificar la lógica de cálculo.
- **Pruebas de Origen**: Verificar si el error 500 persiste atacando directamente al backend (puerto 8081) para descartar capas intermedias (Cloudflare/Gateway).
- **CORS**: Revisar las cabeceras de `Access-Control-Allow-Origin` si el cambio de rutas a través del Gateway provoca bloqueos.
