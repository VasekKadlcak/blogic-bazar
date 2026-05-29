"use client";

import { Badge, Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { deleteInzerat } from "@/app/[locale]/add/actions";
import type { Inzerat } from "@/db/schemas/inzerat.schema";
import StatusBadge from "./StatusBadge";

const conditionColors: Record<string, string> = {
  nový: "blue",
  Použitý: "yellow",
  Poškozený: "red",
};

export default function InzeratCard({ inzerat, onDelete }: { inzerat: Inzerat; onDelete?: (id: number) => void }) {
  const [status, setStatus] = useState(inzerat.status);

  const handleDelete = async () => {
    await deleteInzerat(inzerat.id);
    onDelete?.(inzerat.id);
  };

  return (
    <Card shadow="sm" padding="15px" radius="25px" withBorder style={{ display: "flex", flexDirection: "column" }}>
      <Stack gap="md">
        <Group justify="space-between" align="start">
          <Title order={4}>{inzerat.title}</Title>
          <Group gap="xs">
            <Badge style={{ marginTop: "auto" }} color="orange" variant="light">
              {inzerat.category}
            </Badge>
          </Group>
        </Group>

        <Group gap="xs">
          <Badge color={conditionColors[inzerat.condition] ?? "gray"} variant="light">
            {inzerat.condition}
          </Badge>
          <StatusBadge id={inzerat.id} status={inzerat.status} ownerEmail={inzerat.email} onStatusChange={setStatus} />
        </Group>

        <Text size="sm" c="dimmed">
          {inzerat.description}
        </Text>

        <Group justify="space-between">
          <Text fw={700} size="lg">
            {inzerat.price === "0" ? "Zdarma" : `${inzerat.price} Kč`}
          </Text>
          <Text size="sm" c="dimmed">
            {inzerat.email}
          </Text>
        </Group>

        <Link
          href={`/inzeraty/${inzerat.id}`}
          style={{ textDecoration: "none", pointerEvents: status !== "aktivní" ? "none" : "auto" }}
        >
          <Button fullWidth radius="md" color="orange" disabled={status !== "aktivní"}>
            Detail inzerátu
          </Button>
        </Link>
      </Stack>
    </Card>
  );
}
