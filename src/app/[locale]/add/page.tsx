"use client";

import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Group,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createInzerat } from "./actions";

type InzeratFormValues = {
  title: string;
  category: string;
  condition: string;
  price: string;
  email: string;
  description: string;
};

export default function AddInzeratPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<InzeratFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<InzeratFormValues>({
    initialValues: {
      title: "",
      category: "",
      condition: "",
      price: "",
      email: "",
      description: "",
    },
    validate: {
      title: (value) => (value.trim().length < 3 ? "Název musí mít alespoň 3 znaky" : null),
      category: (value) => (!value ? "Vyberte kategorii" : null),
      condition: (value) => (!value ? "Vyberte stav zboží" : null),
      price: (value) => (value.trim().length === 0 ? "Zadejte cenu" : null),
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Zadejte platný e-mail"),
      description: (value) => (value.trim().length < 10 ? "Popis musí mít alespoň 10 znaků" : null),
    },
  });

  const handleSubmit = async (values: InzeratFormValues) => {
    setLoading(true);
    setError(null);
    try {
      await createInzerat(values);
      setSubmittedValues(values);
      setSubmitted(true);
      await createInzerat(values);
      router.push("/");
      form.reset();
    } catch (e) {
      setError("Nepodařilo se uložit inzerát. Zkuste to znovu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <Title order={2}>Přidat inzerát</Title>

        {error && (
          <Alert color="red" title="Chyba">
            {error}
          </Alert>
        )}

        {submitted && submittedValues && (
          <Card withBorder radius="md" padding="lg" bg="green.0">
            <Stack gap="sm">
              <Text fw={700} c="green.8">
                ✓ Inzerát byl úspěšně přidán!
              </Text>
              <Group gap="xs">
                <Badge color="orange" variant="light">
                  {submittedValues.category}
                </Badge>
                <Badge color="green" variant="light">
                  {submittedValues.condition}
                </Badge>
              </Group>
              <Text fw={600}>{submittedValues.title}</Text>
              <Text size="sm" c="dimmed">
                {submittedValues.description}
              </Text>
              <Group justify="space-between">
                <Text fw={700}>{submittedValues.price === "0" ? "Zdarma" : `${submittedValues.price} Kč`}</Text>
                <Text size="sm" c="dimmed">
                  {submittedValues.email}
                </Text>
              </Group>
              <Button variant="subtle" color="green" size="xs" onClick={() => setSubmitted(false)}>
                Přidat další inzerát
              </Button>
            </Stack>
          </Card>
        )}

        <Card shadow="sm" padding="xl" radius="lg" withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Název inzerátu"
                placeholder="Např. Notebook, Smartphone, ..."
                withAsterisk
                {...form.getInputProps("title")}
              />

              <Select
                label="Kategorie"
                placeholder="Vyberte kategorii"
                withAsterisk
                data={[
                  { value: "Technika", label: "Technika" },
                  { value: "Nábytek", label: "Nábytek" },
                  { value: "Sport", label: "Sport" },
                  { value: "Hry", label: "Hry" },
                  { value: "Oblečení", label: "Oblečení" },
                  { value: "Ostatní", label: "Ostatní" },
                ]}
                {...form.getInputProps("category")}
              />

              <Select
                label="Stav zboží"
                placeholder="Vyberte stav"
                withAsterisk
                data={[
                  { value: "nový", label: "Nový" },
                  { value: "Použitý", label: "Použitý" },
                  { value: "Poškozený", label: "Poškozený" },
                ]}
                {...form.getInputProps("condition")}
              />

              <TextInput
                label="Cena"
                type="number"
                min={0}
                placeholder="Např. 3 000 Kč nebo 0 pro zdarma"
                withAsterisk
                {...form.getInputProps("price")}
              />

              <TextInput
                label="Kontaktní e-mail"
                placeholder="vas@email.cz"
                withAsterisk
                {...form.getInputProps("email")}
              />

              <Textarea
                label="Popis"
                placeholder="Popište zboží, jeho stav, parametry..."
                withAsterisk
                minRows={4}
                autosize
                {...form.getInputProps("description")}
              />

              <Button type="submit" color="orange" radius="md" fullWidth mt="sm" loading={loading}>
                Přidat inzerát
              </Button>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
}
