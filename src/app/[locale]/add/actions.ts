"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inzeratTable } from "@/db/schemas/inzerat.schema";
import { rezervaceTable } from "@/db/schemas/rezervace.schema";

export type InzeratFormData = {
  title: string;
  category: string;
  condition: string;
  price: string;
  email: string;
  description: string;
  image?: string;
};

export type RezervaceData = {
  inzeratId: number;
  jmeno: string;
  email: string;
  telefon: string;
  zprava?: string;
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

export async function vytvorRezervaci(data: RezervaceData) {
  await db.insert(rezervaceTable).values({
    inzeratId: data.inzeratId,
    jmeno: data.jmeno,
    email: data.email,
    telefon: data.telefon,
    zprava: data.zprava ?? "",
  });
  await db.update(inzeratTable).set({ status: "rezervováno" }).where(eq(inzeratTable.id, data.inzeratId));
}

export async function getRezervaceProEmail(ownerEmail: string) {
  const vlastniInzeraty = await db.select().from(inzeratTable).where(eq(inzeratTable.email, ownerEmail));
  const ids = vlastniInzeraty.map((i) => i.id);
  if (ids.length === 0) return [];

  const vsechnyRezervace = await db.select().from(rezervaceTable);
  return vsechnyRezervace
    .filter((r) => ids.includes(r.inzeratId))
    .map((r) => ({
      ...r,
      inzerat: vlastniInzeraty.find((i) => i.id === r.inzeratId),
    }));
}

export async function deleteRezervace(id: number, inzeratId: number) {
  await db.delete(rezervaceTable).where(eq(rezervaceTable.id, id));
  await db.update(inzeratTable).set({ status: "aktivní" }).where(eq(inzeratTable.id, inzeratId));
}
