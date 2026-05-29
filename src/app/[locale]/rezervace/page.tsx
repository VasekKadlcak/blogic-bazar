import { Container, Title, Card, Stack, Text, Group, Badge } from "@mantine/core";
import { db } from "@/db";
import { rezervaceTable } from "@/db/schemas/rezervace.schema";
import { inzeratTable } from "@/db/schemas/inzerat.schema";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import DeleteRezervaceButton from "@/components/DeleteRezervaceButton";

export default async function RezervacePage() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/login");

  const vlastniInzeraty = await db.select().from(inzeratTable)
    .where(eq(inzeratTable.email, session.user.email));

  const ids = vlastniInzeraty.map(i => i.id);
  const rezervace = ids.length > 0
    ? await db.select().from(rezervaceTable)
    : [];

  const sInzeratem = rezervace
    .filter(r => ids.includes(r.inzeratId))
    .map(r => ({
      ...r,
      inzerat: vlastniInzeraty.find(i => i.id === r.inzeratId),
    }));

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="xl">Moje rezervace</Title>
      <Stack gap="md">
        {sInzeratem.length === 0 && (
          <Text c="dimmed">Žádné rezervace.</Text>
        )}
        {sInzeratem.map(r => (
          <Card key={r.id} withBorder radius="md" padding="lg">
            <Stack gap="xs">
              <Group justify="space-between">
                <Text fw={700}>{r.inzerat?.title}</Text>
                <Badge color="orange" variant="light">{r.inzerat?.category}</Badge>
              </Group>
              <Text size="sm">Rezervoval: <strong>{r.jmeno}</strong></Text>
              <Text size="sm">Email: <strong>{r.email}</strong></Text>
              <Text size="sm">Telefon: <strong>{r.telefon}</strong></Text>
              {r.zprava && <Text size="sm">Zpráva: {r.zprava}</Text>}
              <Text size="xs" c="dimmed">Datum: {new Date(r.createdAt ?? "").toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</Text>
              <DeleteRezervaceButton id={r.id} inzeratId={r.inzeratId} />
            </Stack>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
