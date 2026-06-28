import type { ComponentType } from "react";

export type MdxModule = {
  default: ComponentType;
  metadata: { title: string; description: string; category: string; date: string };
};

export const mdxLoaders = {
  "en/guide/card-chronicles-beginner-guide": () => import("../../content/en/guide/card-chronicles-beginner-guide.mdx") as Promise<MdxModule>,
  "en/guide/card-chronicles-guide": () => import("../../content/en/guide/card-chronicles-guide.mdx") as Promise<MdxModule>,
  "en/guide/card-chronicles-how-to-play": () => import("../../content/en/guide/card-chronicles-how-to-play.mdx") as Promise<MdxModule>,
  "en/guide/card-chronicles-roblox-guide": () => import("../../content/en/guide/card-chronicles-roblox-guide.mdx") as Promise<MdxModule>,
  "en/guide/card-chronicles-tips": () => import("../../content/en/guide/card-chronicles-tips.mdx") as Promise<MdxModule>,
  "en/codes/card-chronicles-codes": () => import("../../content/en/codes/card-chronicles-codes.mdx") as Promise<MdxModule>,
  "en/cards/card-chronicles-best-cards": () => import("../../content/en/cards/card-chronicles-best-cards.mdx") as Promise<MdxModule>,
  "en/cards/card-chronicles-card-rolling": () => import("../../content/en/cards/card-chronicles-card-rolling.mdx") as Promise<MdxModule>,
  "en/lineup/card-chronicles-best-lineup": () => import("../../content/en/lineup/card-chronicles-best-lineup.mdx") as Promise<MdxModule>,
  "en/lineup/card-chronicles-card-team": () => import("../../content/en/lineup/card-chronicles-card-team.mdx") as Promise<MdxModule>,
  "en/lineup/card-chronicles-team": () => import("../../content/en/lineup/card-chronicles-team.mdx") as Promise<MdxModule>,
  "en/upgrades/card-chronicles-ability-unlocks": () => import("../../content/en/upgrades/card-chronicles-ability-unlocks.mdx") as Promise<MdxModule>,
  "en/upgrades/card-chronicles-upgrade-guide": () => import("../../content/en/upgrades/card-chronicles-upgrade-guide.mdx") as Promise<MdxModule>,
  "en/waves/card-chronicles-endless-waves": () => import("../../content/en/waves/card-chronicles-endless-waves.mdx") as Promise<MdxModule>,
  "en/waves/card-chronicles-waves": () => import("../../content/en/waves/card-chronicles-waves.mdx") as Promise<MdxModule>,
  "en/ranks/card-chronicles-rank-guide": () => import("../../content/en/ranks/card-chronicles-rank-guide.mdx") as Promise<MdxModule>,
  "en/ranks/card-chronicles-rank-up": () => import("../../content/en/ranks/card-chronicles-rank-up.mdx") as Promise<MdxModule>,
  "en/ranks/card-chronicles-ranks": () => import("../../content/en/ranks/card-chronicles-ranks.mdx") as Promise<MdxModule>,
  "en/system/card-chronicles-max-players": () => import("../../content/en/system/card-chronicles-max-players.mdx") as Promise<MdxModule>,
  "en/system/card-chronicles-mobile": () => import("../../content/en/system/card-chronicles-mobile.mdx") as Promise<MdxModule>,
  "en/system/card-chronicles-pc": () => import("../../content/en/system/card-chronicles-pc.mdx") as Promise<MdxModule>,
  "en/system/card-chronicles-private-server": () => import("../../content/en/system/card-chronicles-private-server.mdx") as Promise<MdxModule>,
  "en/system/card-chronicles-roblox": () => import("../../content/en/system/card-chronicles-roblox.mdx") as Promise<MdxModule>,
} as const;
