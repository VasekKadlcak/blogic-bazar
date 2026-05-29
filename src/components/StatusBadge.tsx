"use client";

import { Badge, Popover, Select } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { updateInzeratStatus } from "@/app/[locale]/add/actions";

const statusColors: Record<string, string> = {
  aktivní: "green",
  rezervováno: "yellow",
  prodáno: "red",
};

export default function StatusBadge({
  id,
  status,
  ownerEmail,
  onStatusChange,
}: {
  id: number;
  status: string;
  ownerEmail: string;
  onStatusChange?: (status: string) => void;
}) {
  const { data: session } = useSession();
  const [current, setCurrent] = useState(status);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = session?.user?.email;
  const isOwner = email === ownerEmail;
  const isAdmin = (session?.user as { isAdmin?: boolean })?.isAdmin === true;
  const canChange = isOwner || isAdmin;

  const handleChange = async (value: string | null) => {
    if (!value || value === current) {
      setOpened(false);
      return;
    }
    setLoading(true);
    await updateInzeratStatus(id, value);
    setCurrent(value);
    onStatusChange?.(value);
    setOpened(false);
    setLoading(false);
  };

  return (
    <Popover opened={opened} onClose={() => setOpened(false)} withArrow disabled={!canChange}>
      <Popover.Target>
        <Badge
          color={statusColors[current] ?? "gray"}
          variant="light"
          style={{ cursor: canChange ? "pointer" : "default" }}
          onClick={() => canChange && setOpened((o) => !o)}
        >
          {current}
        </Badge>
      </Popover.Target>
      <Popover.Dropdown>
        <Select
          label="Změnit stav"
          value={current}
          onChange={handleChange}
          disabled={loading}
          data={[
            { value: "aktivní", label: "Aktivní" },
            { value: "rezervováno", label: "Rezervováno" },
            { value: "prodáno", label: "Prodáno" },
          ]}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
