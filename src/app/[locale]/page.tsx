"use client";

import {
  Badge,
  Button,
  Card,
  Container,
  Flex,
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
    condition: "nový",
    price: "18 600 Kč",
    email: "dan@example.cz",
    description:
      "Výkonný herní notebook RTX 3070, 16 GB RAM, SSD 1 TB.",
  },
  {
    id: 2,
    title: "Dřevěný jídelní stůl",
    category: "Nábytek",
    condition: "Použitý",
    price: "2 900 Kč",
    email: "jana@example.cz",
    description:
      "Masivní dubový stůl pro 6 osob, velmi dobrý stav.",
  },
  {
    id: 3,
    title: "Kancelářská židle IKEA",
    category: "Nábytek",
    condition: "Použitý",
    price: "Zdarma",
    email: "pavel@example.cz",
    description:
      "Starší kancelářská židle, plně funkční, nutný vlastní odvoz.",
  },
  {
    id: 4,
    title: "iPhone 14 Pro 256GB",
    category: "Technika",
    condition: "Použitý",
    price: "19 900 Kč",
    email: "martin@example.cz",
    description:
      "Telefon bez škrábanců, baterie 95 %, originální balení.",
  },
  {
    id: 5,
    title: "Horské kolo Rockrider",
    category: "Sport",
    condition: "Použitý",
    price: "7 500 Kč",
    email: "jirka@example.cz",
    description:
      "Kolo velikost M, pravidelně servisované, ideální do terénu.",
  },
  {
    id: 6,
    title: "PS5 + 2 ovladače",
    category: "Hry",
    condition: "Použitý",
    price: "11 000 Kč",
    email: "zdenda@example.cz",
    description:
      "PlayStation 5 v perfektním stavu, přidám dvě hry zdarma.",
  },
];

export default function InzeratyPage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">

        <Grid>
          {inzeraty.map((inzerat) => (
            <Grid.Col
              key={inzerat.id}
              span={{ base: 12, sm: 6, lg: 4 }}
            >
              <Card
                shadow="sm"
                padding="15px"
                radius="25px"
                withBorder
                h="100%"
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}

              >
                <Stack gap="md" style={{ flex: 1 }}>
                  <Group justify="space-between" align="start">
                    <Title order={4}>
                      {inzerat.title}
                    </Title>

                    <Badge style={{ marginTop: "auto" }} color="orange" variant="light">
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

                    <Text size="sm" c="dimmed">
                      {inzerat.description}
                    </Text>
                  <div style={{ marginTop: "auto", gap: 6, display: "flex", flexDirection: "column"}}>
                    <Group justify="space-between" style={{ marginTop: "auto"}}>
                      <Text fw={700} size="lg">
                        {inzerat.price}
                      </Text>

                      <Text size="sm" c="dimmed">
                        {inzerat.email}
                      </Text>
                    </Group>

                      <Button color="orange" fullWidth radius="md">
                        Detail inzerátu
                      </Button>
                    </div>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}


