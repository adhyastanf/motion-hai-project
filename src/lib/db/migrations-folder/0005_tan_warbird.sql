ALTER TABLE `activity_logs` DROP FOREIGN KEY `activity_logs_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `projects` DROP FOREIGN KEY `projects_status_id_project_statuses_id_fk`;
--> statement-breakpoint
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_status_id_task_statuses_id_fk`;
--> statement-breakpoint
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_assignee_id_members_id_fk`;
--> statement-breakpoint
ALTER TABLE `activity_logs` ADD CONSTRAINT `activity_logs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_status_id_project_statuses_id_fk` FOREIGN KEY (`status_id`) REFERENCES `project_statuses`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_status_id_task_statuses_id_fk` FOREIGN KEY (`status_id`) REFERENCES `task_statuses`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_assignee_id_members_id_fk` FOREIGN KEY (`assignee_id`) REFERENCES `members`(`id`) ON DELETE set null ON UPDATE no action;