ALTER TABLE `invitations` ADD `is_active` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `invitations` DROP COLUMN `expires_at`;