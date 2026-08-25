-- Adds optional profile-photo, higher-studies, and employment fields to alumnis.
-- Safe to re-run: guarded via information_schema (plain MySQL 8.0 does not
-- support "ADD COLUMN IF NOT EXISTS" — that's a MariaDB-only shorthand).

SET @ddl := (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE alumnis
       ADD COLUMN ImagePath VARCHAR(255) DEFAULT NULL AFTER ParentGuardianSignature,
       ADD COLUMN CollegeName VARCHAR(200) DEFAULT NULL AFTER ImagePath,
       ADD COLUMN Degree VARCHAR(200) DEFAULT NULL AFTER CollegeName,
       ADD COLUMN CompanyName VARCHAR(200) DEFAULT NULL AFTER Degree,
       ADD COLUMN JobRole VARCHAR(200) DEFAULT NULL AFTER CompanyName,
       ADD COLUMN Location VARCHAR(200) DEFAULT NULL AFTER JobRole',
    'SELECT 1'
  )
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'ImagePath'
);
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
