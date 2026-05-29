CREATE TABLE `rezervace` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`inzeratId` integer NOT NULL,
	`jmeno` text NOT NULL,
	`email` text NOT NULL,
	`telefon` text NOT NULL,
	`zprava` text DEFAULT '',
	`createdAt` text DEFAULT '2026-05-29T06:24:01.488Z'
);
