"use client";

import { Button, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { vytvorRezervaci } from "@/app/[locale]/add/actions";
import { useRouter } from "next/navigation";

export default function RezervaceButton({ inzeratId }: { inzeratId: number }) {
  const { data: session } = useSession();
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      jmeno: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
      telefon: "",
      zprava: "",
    },
    validate: {
      jmeno: (v) => v.trim().length < 2 ? "Zadejte jméno" : null,
      email: (v) => /^\S+@\S+\.\S+$/.test(v) ? null : "Zadejte platný email",
      telefon: (v) => /^[+]?[0-9\s]{9,15}$/.test(v.trim()) ? null : "Zadejte platné telefonní číslo",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    await vytvorRezervaci({ inzeratId, ...values });
    setOpened(false);
    form.reset();
    setLoading(false);
    router.refresh();
  };

  if (!session) return null;

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Rezervovat inzerát">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="sm">
            <TextInput label="Jméno" withAsterisk {...form.getInputProps("jmeno")} />
            <TextInput label="Email" withAsterisk {...form.getInputProps("email")} />
            <TextInput label="Telefon" type="tel" withAsterisk {...form.getInputProps("telefon")} />
            <Textarea label="Zpráva" {...form.getInputProps("zprava")} />
            <Button type="submit" color="orange" loading={loading}>
              Potvrdit rezervaci
            </Button>
          </Stack>
        </form>
      </Modal>

      <Button color="orange" variant="light" onClick={() => setOpened(true)}>
        Rezervovat
      </Button>
    </>
  );
}
