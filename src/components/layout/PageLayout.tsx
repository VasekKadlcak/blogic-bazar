"use client";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Button,
  Container,
  Group,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { PageLogo } from "@/components/layout/PageLogo";

const HEADER_HEIGHT = 90;
const BODY_MAX_WIDTH = 1280;

export function PageLayout({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  return (
    <AppShell header={{ height: HEADER_HEIGHT }} padding="md" withBorder={false}>
      <AppShell.Header px="md" style={{ border: "none", opacity: 0.85}}>
        <Container size={BODY_MAX_WIDTH} h="100%">
          <Group h="100%" align="center" justify="space-between">
            <a href="/cs">
              <PageLogo />
            </a>
            <Group gap="sm">
              {session && (
              <Button variant="subtle" color="gray" component="a" href="/rezervace">
                Rezervace
              </Button>
            )}
              <ActionIcon variant="subtle" color="gray" onClick={toggleColorScheme} size="lg">
                 {colorScheme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
              </ActionIcon>
              {session ? (
                <>
                  <Tooltip label={`${session.user?.name ?? ""} • ${session.user?.email ?? ""}`} withArrow>
                    <Avatar src={session.user?.image} size="sm" radius="xl" />
                  </Tooltip>
                  <Button variant="subtle" color="gray" onClick={() => signOut()}>
                    Odhlásit se
                  </Button>
                </>
              ) : (
                <Button variant="light" color="orange" component="a" href="/login">
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
