"use client";

import { Button, Checkbox, Container, Grid, Group, Select, Slider, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { getInzeraty } from "@/app/[locale]/add/actions";
import InzeratCard from "@/components/InzeratCard";
import type { Inzerat } from "@/db/schemas/inzerat.schema";

export default function InzeratyPage() {
  const [inzeraty, setInzeraty] = useState<Inzerat[]>([]);
  const [kategorie, setKategorie] = useState<string | null>(null);
  const [cenaMax, setCenaMax] = useState<number>(0);
  const [sliderPouzit, setSliderPouzit] = useState(false);
  const [jenAktivni, setJenAktivni] = useState(false);

  useEffect(() => {
    getInzeraty().then((data) => {
      setInzeraty(data);
    });
  }, []);

  const maxCena = Math.max(...inzeraty.map((i) => Number(i.price) || 0), 0);

  const filtrovane = inzeraty.filter((i) => {
    const cena = Number(i.price) || 0;
    if (kategorie && i.category !== kategorie) return false;
    if (sliderPouzit && cena > cenaMax) return false;
    if (jenAktivni && i.status !== "aktivní") return false;
    return true;
  });

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Filtry */}
        <Group justify="left" align="flex-end" gap="xl">
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
            <Group justify="space-between">
              <Text size="sm" fw={500}>
                Cena: do {sliderPouzit ? `${cenaMax} Kč` : "max"}
              </Text>
              {sliderPouzit && (
                <Button
                  size="xs"
                  variant="subtle"
                  color="gray"
                  onClick={() => {
                    setCenaMax(0);
                    setSliderPouzit(false);
                  }}
                >
                  Reset
                </Button>
              )}
            </Group>
            <Slider
              min={0}
              max={maxCena}
              step={100}
              value={cenaMax}
              onChange={(val) => {
                setCenaMax(val);
                setSliderPouzit(true);
              }}
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
              <InzeratCard
                inzerat={inzerat}
                onDelete={(id) => setInzeraty((prev) => prev.filter((i) => i.id !== id))}
              />
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
