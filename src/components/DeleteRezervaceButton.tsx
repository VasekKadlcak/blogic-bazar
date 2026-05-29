"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { deleteRezervace } from "@/app/[locale]/add/actions";

export default function DeleteRezervaceButton({ id, inzeratId }: { id: number; inzeratId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("Opravdu chcete zrušit rezervaci?");
    if (!confirmed) return;
    await deleteRezervace(id, inzeratId);
    router.refresh();
  };

  return (
    <Button color="red" variant="light" size="xs" onClick={handleDelete}>
      Zrušit rezervaci
    </Button>
  );
}
