"use client";

import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

const inzeraty = [
  {
    id: 1,
    title: "Herní notebook ASUS ROG",
    category: "Technika",
    price: "18 500 Kč",
    location: "Praha",
    description:
      "Výkonný herní notebook RTX 3070, 16 GB RAM, SSD 1 TB.",
  },
  {
    id: 2,
    title: "Dřevěný jídelní stůl",
    category: "Nábytek",
    price: "2 900 Kč",
    location: "Brno",
    description:
      "Masivní dubový stůl pro 6 osob, velmi dobrý stav.",
  },
  {
    id: 3,
    title: "Kancelářská židle IKEA",
    category: "Nábytek",
    price: "Zdarma",
    location: "Ostrava",
    description:
      "Starší kancelářská židle, plně funkční, nutný vlastní odvoz.",
  },
  {
    id: 4,
    title: "iPhone 14 Pro 256GB",
    category: "Technika",
    price: "19 900 Kč",
    location: "Plzeň",
    description:
      "Telefon bez škrábanců, baterie 95 %, originální balení.",
  },
  {
    id: 5,
    title: "Horské kolo Rockrider",
    category: "Sport",
    price: "7 500 Kč",
    location: "Liberec",
    description:
      "Kolo velikost M, pravidelně servisované, ideální do terénu.",
  },
  {
    id: 6,
    title: "PS5 + 2 ovladače",
    category: "Hry",
    price: "11 000 Kč",
    location: "Olomouc",
    description:
      "PlayStation 5 v perfektním stavu, přidám dvě hry zdarma.",
  },
];

export default function InzeratyPage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1}>Bazar inzeráty</Title>

          <Text c="dimmed" mt={4}>
            Přehled nejnovějších inzerátů
          </Text>
        </div>

        <Grid>
          {inzeraty.map((inzerat) => (
            <Grid.Col
              key={inzerat.id}
              span={{ base: 12, sm: 6, lg: 4 }}
            >
              <Card
                shadow="sm"
                padding="lg"
                radius="lg"
                withBorder
                h="100%"
              >
                <Stack gap="md">
                  <Group justify="space-between" align="start">
                    <Title order={4}>
                      {inzerat.title}
                    </Title>

                    <Badge color="blue" variant="light">
                      {inzerat.category}
                    </Badge>
                  </Group>

                  <Text size="sm" c="dimmed">
                    {inzerat.description}
                  </Text>

                  <Group justify="space-between">
                    <Text fw={700} size="lg">
                      {inzerat.price}
                    </Text>

                    <Text size="sm" c="dimmed">
                      {inzerat.location}
                    </Text>
                  </Group>

                  <Button fullWidth radius="md">
                    Detail inzerátu
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}


