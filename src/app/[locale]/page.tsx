"use client";

import { Checkbox, Container, Grid, Group, RangeSlider, Select, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { getInzeraty } from "@/app/[locale]/add/actions";
import InzeratCard from "@/components/InzeratCard";
import type { Inzerat } from "@/db/schemas/inzerat.schema";

export default function InzeratyPage() {
  const [inzeraty, setInzeraty] = useState<Inzerat[]>([]);
  const [kategorie, setKategorie] = useState<string | null>(null);
  const [cenaRange, setCenaRange] = useState<[number, number]>([0, 100000]);
  const [jenAktivni, setJenAktivni] = useState(false);

  useEffect(() => {
    getInzeraty().then(setInzeraty);
  }, []);

  const maxCena = Math.max(...inzeraty.map((i) => Number(i.price) || 0), 100000);

  const filtrovane = inzeraty.filter((i) => {
    const cena = Number(i.price) || 0;
    if (kategorie && i.category !== kategorie) return false;
    if (cena < cenaRange[0] || cena > cenaRange[1]) return false;
    if (jenAktivni && i.status !== "aktivní") return false;
    return true;
  });

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Filtry */}
        <Group justify="center" align="flex-end" gap="xl">
          <Select
            label="Kategorie"
            placeholder="Všechny"
            clearable
            value={kategorie}
            onChange={setKategorie}
            data={[
              { value: "Technika", label: "Technika" },
              { value: "Nábytek", label: "Nábytek" },
              { value: "Sport", label: "Sport" },
              { value: "Hry", label: "Hry" },
              { value: "Oblečení", label: "Oblečení" },
              { value: "Ostatní", label: "Ostatní" },
            ]}
            style={{ minWidth: 160 }}
          />

          <Stack gap={4} style={{ minWidth: 260 }}>
            <Text size="sm" fw={500}>
              Cena: {cenaRange[0]} Kč — {cenaRange[1] >= maxCena ? "max" : `${cenaRange[1]} Kč`}
            </Text>
            <RangeSlider
              min={0}
              max={maxCena}
              step={100}
              value={cenaRange}
              onChange={setCenaRange}
              color="orange"
              label={null}
            />
          </Stack>

          <Checkbox
            label="Jen aktivní"
            checked={jenAktivni}
            onChange={(e) => setJenAktivni(e.currentTarget.checked)}
            color="orange"
            style={{ paddingBottom: 4 }}
          />
        </Group>

        {/* Inzeráty */}
        <Grid>
          {filtrovane.map((inzerat) => (
            <Grid.Col key={inzerat.id} span={{ base: 12, sm: 6, lg: 4 }}>
              <InzeratCard inzerat={inzerat} />
            </Grid.Col>
          ))}
        </Grid>

        {filtrovane.length === 0 && (
          <Text c="dimmed" ta="center">
            Žádné inzeráty neodpovídají filtru.
          </Text>
        )}
      </Stack>
    </Container>
  );
}
