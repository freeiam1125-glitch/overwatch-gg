export const ROLE_COLORS: Record<string, string> = {
  tank: '#4A90D9',
  damage: '#E5464A',
  support: '#4CAF50',
  open: '#9B59B6',
};

export const ROLE_LABELS: Record<string, string> = {
  tank: '탱커',
  damage: '딜러',
  support: '지원가',
  open: '오픈',
};

export const DIVISION_COLORS: Record<string, string> = {
  Bronze: '#8B6914',
  Silver: '#9E9E9E',
  Gold: '#F5C518',
  Platinum: '#00BCD4',
  Diamond: '#2196F3',
  Master: '#9C27B0',
  Grandmaster: '#FF6D00',
  Champion: '#FFD700',
};

export const formatTime = (seconds: number): string => {
  if (!seconds) return '0분';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}시간 ${m}분`;
  return `${m}분`;
};

export const formatNumber = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
};

export const getWinRate = (wins: number, games: number): number => {
  if (!games) return 0;
  return Math.round((wins / games) * 100);
};

export const getRankLabel = (division: string, tier: number): string => {
  if (['Grandmaster', 'Champion'].includes(division)) return division;
  return `${division} ${tier}`;
};

export const getHeroPortrait = (heroName: string): string =>
  `https://overfast-api.tekrop.fr/static/heroes/portraits/${heroName}.png`;

export const analyzePlayer = (stats: {
  wins: number;
  games: number;
  eliminations: number;
  deaths: number;
  damage_done: number;
  healing_done: number;
  time_played: number;
}) => {
  const winRate = getWinRate(stats.wins, stats.games);
  const kda = stats.deaths > 0 ? ((stats.eliminations) / stats.deaths).toFixed(2) : 'Perfect';
  const avgElims = stats.games > 0 ? (stats.eliminations / stats.games).toFixed(1) : '0';

  const traits: string[] = [];

  if (winRate >= 60) traits.push('승률 높음');
  else if (winRate <= 40) traits.push('승률 낮음');

  const kdaNum = parseFloat(kda as string);
  if (kdaNum >= 3) traits.push('뛰어난 생존력');
  else if (kdaNum < 1.5) traits.push('죽음이 잦음');

  if (stats.healing_done > stats.damage_done * 0.5) traits.push('힐 중심 플레이');
  else if (stats.damage_done > 0) traits.push('공격적 플레이');

  return { winRate, kda, avgElims, traits };
};
