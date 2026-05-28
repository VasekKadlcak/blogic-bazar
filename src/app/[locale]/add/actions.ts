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
  image?: string;
};

export async function createInzerat(data: InzeratFormData) {
  await db.insert(inzeratTable).values({
    ...data,
    image: data.image ?? "",
  });
}

export async function getInzeraty() {
  return await db.select().from(inzeratTable);
}

export async function updateInzeratStatus(id: number, status: string) {
  await db.update(inzeratTable).set({ status }).where(eq(inzeratTable.id, id));
}

export async function deleteInzerat(id: number) {
  await db.delete(inzeratTable).where(eq(inzeratTable.id, id));
}

export async function uploadInzeratImage(id: number, base64: string) {
  await db.update(inzeratTable).set({ image: base64 }).where(eq(inzeratTable.id, id));
}

export async function getInzerat(id: number) {
  const result = await db.select().from(inzeratTable).where(eq(inzeratTable.id, id));
  return result[0] ?? null;
}

export async function updateInzerat(id: number, data: Partial<InzeratFormData> & { image?: string }) {
  await db.update(inzeratTable).set(data).where(eq(inzeratTable.id, id));
}
