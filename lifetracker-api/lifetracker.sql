\echo `Delete and recreate vaccine-hub db?`
\prompt `Return for yes or control-C to cancel > ` answer

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql