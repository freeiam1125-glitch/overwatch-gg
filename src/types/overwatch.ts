export interface PlayerSummary {
  username: string;
  avatar: string;
  namecard: string;
  title: string;
  endorsement: {
    level: number;
    frame: string;
  };
  competitive?: {
    pc?: RankSummary;
    console?: RankSummary;
  };
}

export interface RankSummary {
  tank?: RoleRank;
  damage?: RoleRank;
  support?: RoleRank;
  open?: RoleRank;
}

export interface RoleRank {
  division: string;
  tier: number;
  role_icon: string;
  rank_icon: string;
  tier_icon: string;
}

export interface HeroStat {
  hero: string;
  label: string;
  value: number | string;
}

export interface HeroStats {
  name: string;
  label: string;
  portrait: string;
  role: string;
  stats: {
    quickplay?: StatCategory;
    competitive?: StatCategory;
  };
}

export interface StatCategory {
  best?: Record<string, HeroStatValue>;
  average?: Record<string, HeroStatValue>;
  game?: Record<string, HeroStatValue>;
  combat?: Record<string, HeroStatValue>;
  hero_specific?: Record<string, HeroStatValue>;
}

export interface HeroStatValue {
  label: string;
  value: number;
}

export interface PlayerStats {
  summary: PlayerSummary;
  stats?: {
    pc?: {
      quickplay?: ModeStats;
      competitive?: ModeStats;
    };
  };
}

export interface ModeStats {
  heroes_comparisons: HeroComparison[];
  career_stats: CareerStat[];
}

export interface HeroComparison {
  id: string;
  label: string;
  values: { hero: string; label: string; value: number }[];
}

export interface CareerStat {
  category: string;
  label: string;
  stats: { key: string; label: string; value: number | string }[];
}

export interface SearchResult {
  player_id: string;
  name: string;
  avatar?: string;
  namecard?: string;
  title?: string;
  career_section: string;
  blizzard_id: string;
}
