import { Badge, Button, Card, Container, Group, Stack, Text, Title } from "@mantine/core";
import { eq } from "drizzle-orm";
import EditButton from "@/components/EditButton";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import InzeratImage from "@/components/InzeratImage";
import { db } from "@/db";
import { inzeratTable } from "@/db/schemas/inzerat.schema";
import RezervaceButton from "@/components/RezervaceButton";

export default async function InzeratDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await db
    .select()
    .from(inzeratTable)
    .where(eq(inzeratTable.id, Number(id)));
  const inzerat = result[0];

  if (!inzerat) {
    return (
      <Container py="xl">
        <Title>Inzerát nebyl nalezen</Title>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Card shadow="sm" padding="xl" radius="lg" withBorder>
        <Stack>
          <Group justify="space-between">
            <Title>{inzerat.title}</Title>
            <Badge color="orange" variant="light">
              {inzerat.category}
            </Badge>
          </Group>

          <Badge color="green" variant="light" style={{ alignSelf: "flex-start" }}>
            {inzerat.condition}
          </Badge>

          <InzeratImage image={inzerat.image ?? ""} />

          <Text size="lg">{inzerat.description}</Text>

          <Group justify="space-between">
            <Text fw={700} size="xl">
              {inzerat.price === "0" ? "Zdarma" : `${inzerat.price} Kč`}
            </Text>
            <Text c="dimmed">{inzerat.email}</Text>
          </Group>
          {inzerat.status === "aktivní" && (
            <RezervaceButton inzeratId={inzerat.id} />
          )}
          <Link href={`/inzeraty/${id}/edit`} style={{ textDecoration: "none", display: "block", gap: "0px" }}>
            <Button color="orange" variant="light" fullWidth>
              Upravit inzerát
            </Button>
          </Link>
          <Group justify="space-between">
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button variant="light" color="orange">
                ← Zpět na inzeráty
              </Button>
            </Link>
            <DeleteButton id={inzerat.id} ownerEmail={inzerat.email} />
          </Group>
        </Stack>
      </Card>
    </Container>
  );
}
