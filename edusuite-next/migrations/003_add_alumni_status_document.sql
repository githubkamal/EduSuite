-- Adds a document-upload field for Current Status: College ID card (higher
-- studies), Offer Letter/Work ID card (working). Not used when "Not
-- specified" (business/entrepreneurship) is selected.
-- Safe to re-run: guarded via information_schema (plain MySQL 8.0 does not
-- support "ADD COLUMN IF NOT EXISTS" — that's a MariaDB-only shorthand).

SET @col_exists := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'StatusDocumentPath'
);
SET @ddl := IF(
  @col_exists = 0,
  'ALTER TABLE alumnis ADD COLUMN StatusDocumentPath VARCHAR(255) DEFAULT NULL AFTER Location',
  'SELECT 1'
);
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
