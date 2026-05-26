"use client";

import { Alert, Button, Card, Container, FileButton, Select, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string>("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

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
      price: (value) =>
        value.trim().length === 0
          ? "Zadejte cenu"
          : Number(value) < 0
            ? "Cena nemůže být záporná"
            : Number(value) > 250000
              ? "Maximální cena je 250 000 Kč"
              : null,
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Zadejte platný e-mail"),
      description: (value) => (value.trim().length < 10 ? "Popis musí mít alespoň 10 znaků" : null),
    },
  });

  const handleFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values: InzeratFormValues) => {
    setLoading(true);
    setError(null);
    try {
      await createInzerat({ ...values, image: imageBase64 });
      router.push("/");
    } catch {
      setError("Nepodařilo se uložit inzerát. Zkuste to znovu.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !session) {
    return null;
  }

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <Title order={2}>Přidat inzerát</Title>

        {error && (
          <Alert color="red" title="Chyba">
            {error}
          </Alert>
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
                max={250000}
                placeholder="Např. 3 000 nebo 0 pro zdarma"
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

              <FileButton onChange={handleFile} accept="image/*">
                {(props) => (
                  <Button {...props} variant="light" color="orange" fullWidth>
                    {imageBase64 ? "✓ Fotka vybrána" : "Přidat fotku"}
                  </Button>
                )}
              </FileButton>

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
