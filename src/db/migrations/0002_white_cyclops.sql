CREATE TABLE `inzerat` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`condition` text NOT NULL,
	`price` text NOT NULL,
	`email` text NOT NULL,
	`description` text NOT NULL
);
