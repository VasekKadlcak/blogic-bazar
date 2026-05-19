import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { inzeraty } from "@/data/inzeraty";

export default async function InzeratDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const inzerat = inzeraty.find(
    (item) => item.id === Number(id)
  );

  if (!inzerat) {
    return (
      <Container py="xl">
        <Title>Inzerát nebyl nalezen</Title>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Card
        shadow="sm"
        padding="xl"
        radius="lg"
        withBorder
      >
        <Stack gap="lg">
          <Group justify="space-between">
            <Title>{inzerat.title}</Title>

            <Badge color="orange" variant="light">
              {inzerat.category}
            </Badge>
          </Group>

          <Badge
            color="green"
            variant="light"
            style={{ alignSelf: "flex-start" }}
          >
            {inzerat.condition}
          </Badge>

          <Text size="lg">
            {inzerat.description}
          </Text>

          <Group justify="space-between">
            <Text fw={700} size="xl">
              {inzerat.price}
            </Text>

            <Text c="dimmed">
              {inzerat.email}
            </Text>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
}
