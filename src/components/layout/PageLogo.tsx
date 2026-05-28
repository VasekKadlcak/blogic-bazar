"use client";

import Image from "next/image";
import { useComputedColorScheme } from "@mantine/core";
import { useTranslations } from "next-intl";

export function PageLogo() {
  const t = useTranslations();
  const colorScheme = useComputedColorScheme("light");

  return (
    <Image
  src={colorScheme === "dark" ? "/blogic-logo-dark (1).png" : "/blogic-logo.png"}
  alt={t("common.pageLogo.ariaLabel")}
  width={115}
  height={46}
/>
  );
}
