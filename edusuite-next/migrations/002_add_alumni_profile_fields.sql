-- Adds optional profile-photo, higher-studies, and employment fields to alumnis.
-- Safe to re-run: uses IF NOT EXISTS (supported on MariaDB 10.0.2+ / MySQL 8.0.29+).

ALTER TABLE alumnis
  ADD COLUMN IF NOT EXISTS ImagePath VARCHAR(255) DEFAULT NULL AFTER ParentGuardianSignature,
  ADD COLUMN IF NOT EXISTS CollegeName VARCHAR(200) DEFAULT NULL AFTER ImagePath,
  ADD COLUMN IF NOT EXISTS Degree VARCHAR(200) DEFAULT NULL AFTER CollegeName,
  ADD COLUMN IF NOT EXISTS CompanyName VARCHAR(200) DEFAULT NULL AFTER Degree,
  ADD COLUMN IF NOT EXISTS JobRole VARCHAR(200) DEFAULT NULL AFTER CompanyName,
  ADD COLUMN IF NOT EXISTS Location VARCHAR(200) DEFAULT NULL AFTER JobRole;
