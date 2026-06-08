const BASE = 'https://static.playoverwatch.com/img/pages/career/icons/rank/';

// Confirmed hashes from live API responses
export const RANK_IMGS: Record<string, string> = {
  bronze:      BASE + 'Rank_BronzeTier-3352bed98b.png',
  silver:      BASE + 'Rank_SilverTier-5a6b3c3498.png',
  gold:        BASE + 'Rank_GoldTier-16d20c7128.png',
  platinum:    BASE + 'Rank_PlatinumTier-ccf57375a7.png',
  diamond:     BASE + 'Rank_DiamondTier-d775ca9c43.png',
  master:      BASE + 'Rank_MasterTier-7d3b85ba0d.png',
  grandmaster: BASE + 'Rank_GrandmasterTier-0bd17ecac7.png',
    champion:    '/rank-champion.webp',
  ranker:      '/rank-ranker.webp',
};

// Tier badge images for hero list (1=best … 7=weakest)
export const TIER_RANK_IMGS: Record<string, string> = {
  '1': BASE + 'Rank_GrandmasterTier-0bd17ecac7.png',
  '2': BASE + 'Rank_MasterTier-7d3b85ba0d.png',
  '3': BASE + 'Rank_DiamondTier-d775ca9c43.png',
  '4': BASE + 'Rank_PlatinumTier-ccf57375a7.png',
  '5': BASE + 'Rank_GoldTier-16d20c7128.png',
  '6': BASE + 'Rank_SilverTier-5a6b3c3498.png',
  '7': BASE + 'Rank_BronzeTier-3352bed98b.png',
};

// Official Blizzard role SVG icons
export const ROLE_IMGS: Record<string, string> = {
  tank:    'https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/bltf0889daa1ef606db/6504cff74d2a764cb7973991/Tank.svg',
  damage:  'https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt05d482c88096959a/6504cff7d9caa1285f64b6bd/Damage.svg',
  support: 'https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt3ccd5df488163b33/6504cff7fc2ae4d7c50445c4/Support.svg',
};
