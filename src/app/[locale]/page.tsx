"use client";

import { Link } from "@/i18n/navigation";
import { inzeraty } from "@/data/inzeraty";
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

                      <Button
                      component={Link}
                      href={`/inzeraty/${inzerat.id}`}
                      fullWidth
                      radius="md"
                      color="orange"
                      >
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


