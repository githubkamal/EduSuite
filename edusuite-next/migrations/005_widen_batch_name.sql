-- Migration 005: Widen BatchName column
ALTER TABLE batchs MODIFY COLUMN BatchName VARCHAR(100) NOT NULL;
