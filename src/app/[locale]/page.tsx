"use client";

import { Badge, Button, Card, Container, Grid, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getInzeraty } from "@/app/[locale]/add/actions";
import StatusBadge from "@/components/StatusBadge";
import type { Inzerat } from "@/db/schemas/inzerat.schema";

export default function InzeratyPage() {
  const [inzeraty, setInzeraty] = useState<Inzerat[]>([]);

  useEffect(() => {
    getInzeraty().then(setInzeraty);
  }, []);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Grid>
          {inzeraty.map((inzerat) => (
            <Grid.Col key={inzerat.id} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card
                shadow="sm"
                padding="15px"
                radius="25px"
                withBorder
                h="100%"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Stack gap="md" style={{ flex: 1 }}>
                  <Group justify="space-between" align="start">
                    <Title order={4}>{inzerat.title}</Title>
                    <Badge style={{ marginTop: "auto" }} color="orange" variant="light">
                      {inzerat.category}
                    </Badge>
                  </Group>
                  <Group gap="xs">
                    <Badge color="green" variant="light" style={{ alignSelf: "flex-start" }}>
                      {inzerat.condition}
                    </Badge>
                    <StatusBadge id={inzerat.id} status={inzerat.status} />
                  </Group>

                  <Text size="sm" c="dimmed">
                    {inzerat.description}
                  </Text>

                  <div style={{ marginTop: "auto", gap: 6, display: "flex", flexDirection: "column" }}>
                    <Group justify="space-between" style={{ marginTop: "auto" }}>
                      <Text fw={700} size="lg">
                        {inzerat.price === "0" ? "Zdarma" : `${inzerat.price} Kč`}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {inzerat.email}
                      </Text>
                    </Group>

                    <Link
                      href={`/inzeraty/${inzerat.id}`}
                      style={{ textDecoration: "none", pointerEvents: inzerat.status !== "aktivní" ? "none" : "auto" }}
                    >
                      <Button fullWidth radius="md" color="orange" disabled={inzerat.status !== "aktivní"}>
                        Detail inzerátu
                      </Button>
                    </Link>
                  </div>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {inzeraty.length === 0 && (
          <Text c="dimmed" ta="center">
            Zatím nejsou žádné inzeráty.
          </Text>
        )}
      </Stack>
    </Container>
  );
}
