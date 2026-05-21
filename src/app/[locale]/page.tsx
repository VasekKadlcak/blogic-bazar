"use client";

import { Container, Grid, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { getInzeraty } from "@/app/[locale]/add/actions";
import InzeratCard from "@/components/InzeratCard";
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
              <InzeratCard inzerat={inzerat} />
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
