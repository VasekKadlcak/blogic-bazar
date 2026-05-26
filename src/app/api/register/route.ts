import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { userTable } from "@/db/schemas/user.schema";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Vyplňte všechna pole" }, { status: 400 });
  }

  const existing = await db.select().from(userTable).where(eq(userTable.email, email));
  if (existing.length > 0) {
    return NextResponse.json({ error: "Email již existuje" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  await db.insert(userTable).values({ email, password: hashed, name });

  return NextResponse.json({ success: true });
}
