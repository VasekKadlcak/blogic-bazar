export type Inzerat = {
  id: number;
  title: string;
  category: string;
  condition: string;
  price: string;
  email: string;
  description: string;
};

export const inzeraty: Inzerat[] = [
  {
    id: 1,
    title: "Herní notebook ASUS ROG",
    category: "Technika",
    condition: "nový",
    price: "18 500 Kč",
    email: "dan@example.cz",
    description: "Výkonný herní notebook RTX 3070, 16 GB RAM, SSD 1 TB.",
  },
  {
    id: 2,
    title: "Dřevěný jídelní stůl",
    category: "Nábytek",
    condition: "Použitý",
    price: "2 900 Kč",
    email: "jana@example.cz",
    description: "Masivní dubový stůl pro 6 osob, velmi dobrý stav.",
  },
  {
    id: 3,
    title: "Kancelářská židle IKEA",
    category: "Nábytek",
    condition: "Použitý",
    price: "Zdarma",
    email: "pavel@example.cz",
    description: "Starší kancelářská židle, plně funkční, nutný vlastní odvoz.",
  },
  {
    id: 4,
    title: "iPhone 14 Pro 256GB",
    category: "Technika",
    condition: "Použitý",
    price: "19 900 Kč",
    email: "martin@example.cz",
    description: "Telefon bez škrábanců, baterie 95 %, originální balení.",
  },
  {
    id: 5,
    title: "Horské kolo Rockrider",
    category: "Sport",
    condition: "Použitý",
    price: "7 500 Kč",
    email: "jirka@example.cz",
    description: "Kolo velikost M, pravidelně servisované, ideální do terénu.",
  },
  {
    id: 6,
    title: "PS5 + 2 ovladače",
    category: "Hry",
    condition: "Použitý",
    price: "11 000 Kč",
    email: "zdenda@example.cz",
    description: "PlayStation 5 v perfektním stavu, přidám dvě hry zdarma.",
  },
  {
    id: 7,
    title: "XBOX series X + 2 ovladače",
    category: "Hry",
    condition: "Použitý",
    price: "13 000 Kč",
    email: "pavlik@example.cz",
    description: "XBOX series X v perfektním stavu, přidám dvě hry zdarma.",
  },
];
