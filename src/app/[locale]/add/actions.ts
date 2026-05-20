"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inzeratTable } from "@/db/schemas/inzerat.schema";

export type InzeratFormData = {
  title: string;
  category: string;
  condition: string;
  price: string;
  email: string;
  description: string;
};

export async function createInzerat(data: InzeratFormData) {
  await db.insert(inzeratTable).values(data);
}

export async function getInzeraty() {
  return await db.select().from(inzeratTable);
}

export async function updateInzeratStatus(id: number, status: string) {
  await db.update(inzeratTable).set({ status }).where(eq(inzeratTable.id, id));
}
