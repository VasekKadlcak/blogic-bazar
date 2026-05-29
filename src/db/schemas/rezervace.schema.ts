import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const rezervaceTable = sqliteTable("rezervace", {
  id: integer().primaryKey({ autoIncrement: true }),
  inzeratId: integer().notNull(),
  jmeno: text().notNull(),
  email: text().notNull(),
  telefon: text().notNull(),
  zprava: text().default(""),
  createdAt: text().default(new Date().toISOString()),
});

export type Rezervace = typeof rezervaceTable.$inferSelect;
