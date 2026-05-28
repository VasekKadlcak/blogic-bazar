"use client";

import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isAdmin?: boolean;
};

export default function EditButton({ id, ownerEmail }: { id: number; ownerEmail: string }) {
  const { data: session } = useSession();

  const user = session?.user as SessionUser | undefined;
  const isAdmin = user?.isAdmin === true;
  const isOwner = user?.email === ownerEmail;

  if (!isAdmin && !isOwner) return null;

  return (
    <Link href={`/inzeraty/${id}/edit`} style={{ textDecoration: "none" }}>
      <Button color="orange" variant="light" size="sm">
        Upravit inzerát
      </Button>
    </Link>
  );
}
