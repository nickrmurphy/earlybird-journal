CREATE TABLE `journal_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`journal_id` text NOT NULL,
	`content` text NOT NULL,
	`date` text DEFAULT (date('now', 'localtime')) NOT NULL,
	`type` text NOT NULL,
	`meta` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	FOREIGN KEY (`journal_id`) REFERENCES `journals`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `journals` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text DEFAULT 'Unnamed Journal' NOT NULL,
	`intention` text DEFAULT '-' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL
);
