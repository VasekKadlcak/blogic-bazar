"use client";

import { AppShell, Avatar, Button, Container, Group } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { PageLogo } from "@/components/layout/PageLogo";

const HEADER_HEIGHT = 90;
const BODY_MAX_WIDTH = 1280;

export function PageLayout({ children }: PropsWithChildren) {
  const { data: session } = useSession();

  return (
    <AppShell header={{ height: HEADER_HEIGHT }} padding="md" withBorder={false}>
      <AppShell.Header px="md">
        <Container size={BODY_MAX_WIDTH} h="100%">
          <Group h="100%" align="center" justify="space-between">
            <a href="/cs">
              <PageLogo />
            </a>
            <Group gap="sm">
              {session ? (
                <>
                  <Avatar src={session.user?.image} size="sm" radius="xl" />
                  <Button variant="subtle" color="gray" onClick={() => signOut()}>
                    Odhlásit se
                  </Button>
                </>
              ) : (
                <Button variant="light" color="orange" onClick={() => signIn("google")}>
                  Přihlásit se
                </Button>
              )}
              <Button
                component={session ? "a" : "button"}
                href={session ? "/add" : undefined}
                color="#FF9000"
                radius="md"
                disabled={!session}
              >
                + Přidat inzerát
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size={BODY_MAX_WIDTH} px="md">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
