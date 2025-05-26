CREATE TABLE `actions` (
	`id` text PRIMARY KEY NOT NULL,
	`journal_id` text NOT NULL,
	`content` text NOT NULL,
	`date` text DEFAULT (date('now', 'localtime')) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`original_date` text DEFAULT (date('now', 'localtime')) NOT NULL,
	`status` text DEFAULT 'incomplete' NOT NULL,
	FOREIGN KEY (`journal_id`) REFERENCES `journals`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `days` (
	`id` text PRIMARY KEY NOT NULL,
	`journal_id` text NOT NULL,
	`title` text DEFAULT (strftime('%w', 'now', 'localtime') || ', ' || strftime('%Y %m %d', 'now', 'localtime')) NOT NULL,
	`date` text DEFAULT (date('now', 'localtime')) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	FOREIGN KEY (`journal_id`) REFERENCES `journals`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `days_journal_id_date_unique` ON `days` (`journal_id`,`date`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_journal_date` ON `days` (`journal_id`,`date`);--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`journal_id` text NOT NULL,
	`content` text NOT NULL,
	`date` text DEFAULT (date('now', 'localtime')) NOT NULL,
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
--> statement-breakpoint
CREATE TABLE `moods` (
	`id` text PRIMARY KEY NOT NULL,
	`journal_id` text NOT NULL,
	`content` text NOT NULL,
	`date` text DEFAULT (date('now', 'localtime')) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`level` integer,
	FOREIGN KEY (`journal_id`) REFERENCES `journals`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notes` (
	`id` text PRIMARY KEY NOT NULL,
	`journal_id` text NOT NULL,
	`content` text NOT NULL,
	`date` text DEFAULT (date('now', 'localtime')) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	FOREIGN KEY (`journal_id`) REFERENCES `journals`(`id`) ON UPDATE no action ON DELETE no action
);
