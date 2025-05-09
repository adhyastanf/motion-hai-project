DROP TABLE `task_assignees`;--> statement-breakpoint
ALTER TABLE `tasks` ADD `assignee_id` varchar(36);--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_assignee_id_members_id_fk` FOREIGN KEY (`assignee_id`) REFERENCES `members`(`id`) ON DELETE set null ON UPDATE no action;