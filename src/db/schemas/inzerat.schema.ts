import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inzeratTable = sqliteTable("inzerat", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  category: text().notNull(),
  condition: text().notNull(),
  price: text().notNull(),
  email: text().notNull(),
  description: text().notNull(),
  status: text().notNull().default("aktivní"),
  image: text().default(""),
});

export type Inzerat = typeof inzeratTable.$inferSelect;
export type NewInzerat = typeof inzeratTable.$inferInsert;
