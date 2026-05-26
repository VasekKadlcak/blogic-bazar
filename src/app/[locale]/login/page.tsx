"use client";

import { Alert, Anchor, Button, Card, Container, Divider, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: (value) => (mode === "register" && value.trim().length < 2 ? "Zadejte jméno" : null),
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Zadejte platný e-mail"),
      password: (value) => (value.length < 6 ? "Heslo musí mít alespoň 6 znaků" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);

    if (mode === "register") {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }
    }

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Špatný email nebo heslo");
    } else {
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <Container size="xs" py="xl">
      <Card shadow="sm" padding="xl" radius="lg" withBorder>
        <Stack gap="md">
          <Title order={2} ta="center">
            {mode === "login" ? "Přihlášení" : "Registrace"}
          </Title>

          {error && <Alert color="red">{error}</Alert>}

          <Button
            variant="outline"
            color="gray"
            fullWidth
            leftSection="G"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Pokračovat přes Google
          </Button>

          <Divider label="nebo" labelPosition="center" />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="sm">
              {mode === "register" && (
                <TextInput label="Jméno" placeholder="Jan Novák" {...form.getInputProps("name")} />
              )}

              <TextInput label="Email" placeholder="vas@email.cz" {...form.getInputProps("email")} />

              <TextInput label="Heslo" type="password" placeholder="••••••" {...form.getInputProps("password")} />

              <Button type="submit" color="orange" fullWidth loading={loading}>
                {mode === "login" ? "Přihlásit se" : "Zaregistrovat se"}
              </Button>
            </Stack>
          </form>

          <Text ta="center" size="sm">
            {mode === "login" ? "Nemáte účet?" : "Máte účet?"}{" "}
            <Anchor
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError(null);
                form.reset();
              }}
              style={{ cursor: "pointer" }}
              color="orange"
            >
              {mode === "login" ? "Zaregistrujte se" : "Přihlaste se"}
            </Anchor>
          </Text>
        </Stack>
      </Card>
    </Container>
  );
}
