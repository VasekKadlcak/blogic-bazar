"use client";

import {
  Alert,
  Button,
  Card,
  Container,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { getInzerat, updateInzerat } from "@/app/[locale]/add/actions";

type InzeratFormValues = {
  title: string;
  category: string;
  condition: string;
  price: string;
  email: string;
  description: string;
};

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isAdmin?: boolean;
};

export default function EditInzeratPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    getInzerat(Number(id)).then((inzerat) => {
      if (!inzerat) { router.push("/"); return; }

      const user = session?.user as SessionUser | undefined;
      const isAdmin = user?.isAdmin === true;
      const isOwner = user?.email === inzerat.email;

      if (!isAdmin && !isOwner) { router.push("/"); return; }

      form.setValues({
        title: inzerat.title,
        category: inzerat.category,
        condition: inzerat.condition,
        price: inzerat.price,
        email: inzerat.email,
        description: inzerat.description,
      });
    });
  }, [status, id, session]);

  if (status === "loading") return null;

  const handleSubmit = async (values: InzeratFormValues) => {
    setLoading(true);
    setError(null);
    try {
      await updateInzerat(Number(id), values);
      router.push(`/inzeraty/${id}`);
    } catch {
      setError("Nepodařilo se uložit změny.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <Title order={2}>Upravit inzerát</Title>

        {error && <Alert color="red">{error}</Alert>}

        <Card shadow="sm" padding="xl" radius="lg" withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput label="Název inzerátu" withAsterisk {...form.getInputProps("title")} />

              <Select
                label="Kategorie"
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
                withAsterisk
                {...form.getInputProps("price")}
              />

              <TextInput label="Kontaktní e-mail" readOnly withAsterisk {...form.getInputProps("email")} />

              <Textarea
                label="Popis"
                withAsterisk
                minRows={4}
                autosize
                {...form.getInputProps("description")}
              />

              <Button type="submit" color="orange" radius="md" fullWidth loading={loading}>
                Uložit změny
              </Button>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
}
