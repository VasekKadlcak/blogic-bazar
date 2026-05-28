"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteInzerat } from "@/app/[locale]/add/actions";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isAdmin?: boolean;
};

export default function DeleteButton({ id, ownerEmail }: { id: number; ownerEmail: string }) {
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user as SessionUser | undefined;
  const isAdmin = user?.isAdmin === true;
  const isOwner = user?.email === ownerEmail;

  if (!isAdmin && !isOwner) return null;

  const handleDelete = async () => {
    const confirmed = window.confirm("Opravdu chcete smazat tento inzerát?");
    if (!confirmed) return;
    await deleteInzerat(id);
    router.push("/");
  };
  return (
    <Button color="red" size="sm" onClick={handleDelete}>
      🗑️
    </Button>
  );
}
