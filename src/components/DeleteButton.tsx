"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { deleteInzerat } from "@/app/[locale]/add/actions";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("Opravdu chcete smazat tento inzerát?");
    if (!confirmed) return;
    await deleteInzerat(id);
    router.push("/");
  };

  return (
    <Button color="red" onClick={handleDelete}>
      🗑️
    </Button>
  );
}
