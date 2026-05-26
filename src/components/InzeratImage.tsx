"use client";

import { Image, Text } from "@mantine/core";

export default function InzeratImage({ image }: { image: string }) {
  if (!image) {
    return (
      <Text c="dimmed" size="sm">
        Bez fotky
      </Text>
    );
  }

  return <Image src={image} alt="Foto inzerátu" radius="md" mah={400} fit="contain" />;
}
