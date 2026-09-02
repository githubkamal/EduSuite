-- Migration 004: Update alumni schema
-- 1. Drops obsolete columns:
--    NameFromForm, ModeOfConveyance, ParentGuardianSignature, EmergencyPhone,
--    Hobbies, ExtraCurricularInterests, InterestedInPartTimeJob,
--    SocialFacebook, SocialInstagram, SocialTwitter, DateOfSignature
-- 2. Adds new fields:
--    HscSchool, HscMarks, HscPercentage, HscAchievements,
--    FatherName, FatherMobile, MotherName, MotherMobile, OtherStatus

DROP PROCEDURE IF EXISTS _migrate_alumni_004;

CREATE PROCEDURE _migrate_alumni_004()
BEGIN
  -- Drop obsolete columns if they exist
  IF EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'NameFromForm') THEN
    ALTER TABLE alumnis DROP COLUMN NameFromForm;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'ModeOfConveyance') THEN
    ALTER TABLE alumnis DROP COLUMN ModeOfConveyance;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'ParentGuardianSignature') THEN
    ALTER TABLE alumnis DROP COLUMN ParentGuardianSignature;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'EmergencyPhone') THEN
    ALTER TABLE alumnis DROP COLUMN EmergencyPhone;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'Hobbies') THEN
    ALTER TABLE alumnis DROP COLUMN Hobbies;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'ExtraCurricularInterests') THEN
    ALTER TABLE alumnis DROP COLUMN ExtraCurricularInterests;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'InterestedInPartTimeJob') THEN
    ALTER TABLE alumnis DROP COLUMN InterestedInPartTimeJob;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'SocialFacebook') THEN
    ALTER TABLE alumnis DROP COLUMN SocialFacebook;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'SocialInstagram') THEN
    ALTER TABLE alumnis DROP COLUMN SocialInstagram;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'SocialTwitter') THEN
    ALTER TABLE alumnis DROP COLUMN SocialTwitter;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'DateOfSignature') THEN
    ALTER TABLE alumnis DROP COLUMN DateOfSignature;
  END IF;

  -- Add HSC fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'HscSchool') THEN
    ALTER TABLE alumnis ADD COLUMN HscSchool VARCHAR(200) DEFAULT NULL AFTER SslcAchievements;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'HscMarks') THEN
    ALTER TABLE alumnis ADD COLUMN HscMarks VARCHAR(50) DEFAULT NULL AFTER HscSchool;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'HscPercentage') THEN
    ALTER TABLE alumnis ADD COLUMN HscPercentage VARCHAR(10) DEFAULT NULL AFTER HscMarks;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'HscAchievements') THEN
    ALTER TABLE alumnis ADD COLUMN HscAchievements TEXT DEFAULT NULL AFTER HscPercentage;
  END IF;

  -- Add Father & Mother fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'FatherName') THEN
    ALTER TABLE alumnis ADD COLUMN FatherName VARCHAR(200) DEFAULT NULL AFTER HallNameRoom;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'FatherMobile') THEN
    ALTER TABLE alumnis ADD COLUMN FatherMobile VARCHAR(20) DEFAULT NULL AFTER FatherName;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'MotherName') THEN
    ALTER TABLE alumnis ADD COLUMN MotherName VARCHAR(200) DEFAULT NULL AFTER FatherMobile;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'MotherMobile') THEN
    ALTER TABLE alumnis ADD COLUMN MotherMobile VARCHAR(20) DEFAULT NULL AFTER MotherName;
  END IF;

  -- Add OtherStatus field
  IF NOT EXISTS (SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'alumnis' AND COLUMN_NAME = 'OtherStatus') THEN
    ALTER TABLE alumnis ADD COLUMN OtherStatus VARCHAR(255) DEFAULT NULL AFTER Location;
  END IF;

END;

CALL _migrate_alumni_004();
DROP PROCEDURE IF EXISTS _migrate_alumni_004;
