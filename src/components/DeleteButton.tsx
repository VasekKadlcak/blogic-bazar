"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteInzerat } from "@/app/[locale]/add/actions";

export default function DeleteButton({ id, ownerEmail }: { id: number; ownerEmail: string }) {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user?.email !== ownerEmail) return null;

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
