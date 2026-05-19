-- Dark Mode
INSERT INTO features (id, name, description, enabled_by_default) VALUES
(X'00000000000000000000000000000001', 'Dark Mode', 'Enables high-contrast dark theme across the application', 1);

INSERT INTO feature_configs (id, environment, client_id, enabled, feature_id) VALUES
(X'00000000000000000000000000000011', 'DEV', NULL, 1, X'00000000000000000000000000000001'),
(X'00000000000000000000000000000012', 'PROD', NULL, 1, X'00000000000000000000000000000001');

-- Beta Dashboard
INSERT INTO features (id, name, description, enabled_by_default) VALUES
(X'00000000000000000000000000000002', 'Beta Dashboard', 'Access to the new experimental metrics dashboard', 0);

INSERT INTO feature_configs (id, environment, client_id, enabled, feature_id) VALUES
(X'00000000000000000000000000000021', 'DEV', NULL, 1, X'00000000000000000000000000000002'),
(X'00000000000000000000000000000022', 'PROD', NULL, 0, X'00000000000000000000000000000002');

-- Premium Assets
INSERT INTO features (id, name, description, enabled_by_default) VALUES
(X'00000000000000000000000000000003', 'Premium Assets', 'Unlocks exclusive icons and assets for premium users', 0);

INSERT INTO feature_configs (id, environment, client_id, enabled, feature_id) VALUES
(X'00000000000000000000000000000031', 'DEV', NULL, 1, X'00000000000000000000000000000003'),
(X'00000000000000000000000000000032', 'PROD', NULL, 0, X'00000000000000000000000000000003');

-- Real-time Collaboration
INSERT INTO features (id, name, description, enabled_by_default) VALUES
(X'00000000000000000000000000000004', 'Real-time Collaboration', 'Enables WebSockets for multi-user editing', 1);

INSERT INTO feature_configs (id, environment, client_id, enabled, feature_id) VALUES
(X'00000000000000000000000000000041', 'DEV', NULL, 1, X'00000000000000000000000000000004'),
(X'00000000000000000000000000000042', 'PROD', NULL, 1, X'00000000000000000000000000000004');