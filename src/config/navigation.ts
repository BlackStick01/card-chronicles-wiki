export type NavigationItem = {
  key: string;
  label: string;
  href: string;
  description: string;
};

export const NAVIGATION_CONFIG: Record<string, NavigationItem> = {
  guide: {
    key: "guide",
    label: "Guide",
    href: "/guide",
    description: "Beginner and progression guides for Card Chronicles on Roblox.",
  },
  codes: {
    key: "codes",
    label: "Codes",
    href: "/codes",
    description: "Active code status and verified redeem-code tracking for Card Chronicles.",
  },
  cards: {
    key: "cards",
    label: "Cards",
    href: "/cards",
    description: "Card rolling, rare cards, best cards, and card list guides.",
  },
  lineup: {
    key: "lineup",
    label: "Lineup",
    href: "/lineup",
    description: "Lineup planning, team structure, and card composition guides.",
  },
  upgrades: {
    key: "upgrades",
    label: "Upgrades",
    href: "/upgrades",
    description: "Upgrade paths, ability unlocks, and progression priorities.",
  },
  waves: {
    key: "waves",
    label: "Waves",
    href: "/waves",
    description: "Endless waves, fights, strong foes, and combat progression.",
  },
  ranks: {
    key: "ranks",
    label: "Ranks",
    href: "/ranks",
    description: "Rank climbing and long-term progression goals.",
  },
  system: {
    key: "system",
    label: "System",
    href: "/system",
    description: "Roblox platform, private server, mobile, PC, and max-player notes.",
  },
};

export const CONTENT_TYPES = Object.keys(NAVIGATION_CONFIG);
