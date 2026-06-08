export type Role = 'tank' | 'damage' | 'support';
export type Tier = '1' | '2' | '3' | '4' | '5' | '6' | '7';
export type Server = 'kr' | 'na' | 'eu' | 'asia';
export type Rank = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master' | 'grandmaster' | 'champion' | 'ranker';

export interface HeroTierEntry {
  hero: string;
  label: string;
  tier: Tier;
}

interface HeroInput {
  hero: string;
  label: string;
}

export interface TierTableData {
  '1': HeroTierEntry[];
  '2': HeroTierEntry[];
  '3': HeroTierEntry[];
  '4': HeroTierEntry[];
  '5': HeroTierEntry[];
  '6': HeroTierEntry[];
  '7': HeroTierEntry[];
}

// Rank groups — champion & ranker share 'elite' group
type RankGroup = 'low' | 'mid' | 'high' | 'top' | 'elite';

const RANK_GROUP: Record<Rank, RankGroup> = {
  bronze:      'low',
  silver:      'low',
  gold:        'mid',
  platinum:    'mid',
  diamond:     'high',
  master:      'top',
  grandmaster: 'top',
  champion:    'elite',
  ranker:      'elite',
};

interface RawTierTable {
  '1': HeroInput[];
  '2': HeroInput[];
  '3': HeroInput[];
  '4': HeroInput[];
  '5': HeroInput[];
  '6': HeroInput[];
  '7': HeroInput[];
}

// ── TANK ─────────────────────────────────────────────────
const TANK: Record<RankGroup, RawTierTable> = {
  low: {
    '1': [
      { hero: 'reinhardt',     label: '라인하르트' },
      { hero: 'roadhog',       label: '로드호그' },
      { hero: 'mauga',         label: '마우가' },
    ],
    '2': [
      { hero: 'dva',           label: 'D.Va' },
      { hero: 'orisa',         label: '오리사' },
      { hero: 'zarya',         label: '자리야' },
    ],
    '3': [
      { hero: 'ramattra',      label: '라마트라' },
      { hero: 'sigma',         label: '시그마' },
      { hero: 'junker-queen',  label: '정커퀸' },
    ],
    '4': [
      { hero: 'domina',        label: '도미나' },
      { hero: 'hazard',        label: '해저드' },
    ],
    '5': [
      { hero: 'doomfist',      label: '둠피스트' },
    ],
    '6': [
      { hero: 'winston',       label: '윈스턴' },
    ],
    '7': [
      { hero: 'wrecking-ball', label: '레킹볼' },
    ],
  },
  mid: {
    '1': [
      { hero: 'reinhardt',     label: '라인하르트' },
      { hero: 'dva',           label: 'D.Va' },
      { hero: 'mauga',         label: '마우가' },
    ],
    '2': [
      { hero: 'orisa',         label: '오리사' },
      { hero: 'sigma',         label: '시그마' },
      { hero: 'roadhog',       label: '로드호그' },
    ],
    '3': [
      { hero: 'zarya',         label: '자리야' },
      { hero: 'ramattra',      label: '라마트라' },
      { hero: 'junker-queen',  label: '정커퀸' },
    ],
    '4': [
      { hero: 'hazard',        label: '해저드' },
      { hero: 'domina',        label: '도미나' },
    ],
    '5': [
      { hero: 'winston',       label: '윈스턴' },
      { hero: 'doomfist',      label: '둠피스트' },
    ],
    '6': [
      { hero: 'wrecking-ball', label: '레킹볼' },
    ],
    '7': [],
  },
  high: {
    '1': [
      { hero: 'dva',           label: 'D.Va' },
      { hero: 'sigma',         label: '시그마' },
      { hero: 'reinhardt',     label: '라인하르트' },
    ],
    '2': [
      { hero: 'ramattra',      label: '라마트라' },
      { hero: 'orisa',         label: '오리사' },
      { hero: 'mauga',         label: '마우가' },
    ],
    '3': [
      { hero: 'zarya',         label: '자리야' },
      { hero: 'roadhog',       label: '로드호그' },
      { hero: 'junker-queen',  label: '정커퀸' },
    ],
    '4': [
      { hero: 'hazard',        label: '해저드' },
      { hero: 'domina',        label: '도미나' },
    ],
    '5': [
      { hero: 'winston',       label: '윈스턴' },
      { hero: 'wrecking-ball', label: '레킹볼' },
    ],
    '6': [
      { hero: 'doomfist',      label: '둠피스트' },
    ],
    '7': [],
  },
  top: {
    '1': [
      { hero: 'dva',           label: 'D.Va' },
      { hero: 'sigma',         label: '시그마' },
      { hero: 'winston',       label: '윈스턴' },
    ],
    '2': [
      { hero: 'zarya',         label: '자리야' },
      { hero: 'ramattra',      label: '라마트라' },
      { hero: 'reinhardt',     label: '라인하르트' },
    ],
    '3': [
      { hero: 'wrecking-ball', label: '레킹볼' },
      { hero: 'orisa',         label: '오리사' },
      { hero: 'junker-queen',  label: '정커퀸' },
    ],
    '4': [
      { hero: 'hazard',        label: '해저드' },
      { hero: 'mauga',         label: '마우가' },
    ],
    '5': [
      { hero: 'roadhog',       label: '로드호그' },
      { hero: 'doomfist',      label: '둠피스트' },
    ],
    '6': [
      { hero: 'domina',        label: '도미나' },
    ],
    '7': [],
  },
  elite: {
    '1': [
      { hero: 'dva',           label: 'D.Va' },
      { hero: 'sigma',         label: '시그마' },
      { hero: 'winston',       label: '윈스턴' },
    ],
    '2': [
      { hero: 'zarya',         label: '자리야' },
      { hero: 'ramattra',      label: '라마트라' },
      { hero: 'wrecking-ball', label: '레킹볼' },
    ],
    '3': [
      { hero: 'reinhardt',     label: '라인하르트' },
      { hero: 'orisa',         label: '오리사' },
      { hero: 'junker-queen',  label: '정커퀸' },
      { hero: 'hazard',        label: '해저드' },
    ],
    '4': [
      { hero: 'mauga',         label: '마우가' },
      { hero: 'doomfist',      label: '둠피스트' },
    ],
    '5': [
      { hero: 'roadhog',       label: '로드호그' },
      { hero: 'domina',        label: '도미나' },
    ],
    '6': [],
    '7': [],
  },
};

// ── DAMAGE ───────────────────────────────────────────────
const DAMAGE: Record<RankGroup, RawTierTable> = {
  low: {
    '1': [
      { hero: 'soldier-76',  label: '솔저: 76' },
      { hero: 'reaper',      label: '리퍼' },
      { hero: 'bastion',     label: '바스티온' },
    ],
    '2': [
      { hero: 'cassidy',     label: '캐서디' },
      { hero: 'pharah',      label: '파라' },
      { hero: 'junkrat',     label: '정크랫' },
      { hero: 'symmetra',    label: '시메트라' },
      { hero: 'torbjorn',    label: '토르비욘' },
    ],
    '3': [
      { hero: 'ashe',        label: '애쉬' },
      { hero: 'mei',         label: '메이' },
    ],
    '4': [
      { hero: 'genji',       label: '겐지' },
      { hero: 'hanzo',       label: '한조' },
      { hero: 'sombra',      label: '솜브라' },
      { hero: 'sierra',      label: '시에라' },
      { hero: 'freja',       label: '프레야' },
    ],
    '5': [
      { hero: 'tracer',      label: '트레이서' },
      { hero: 'emre',        label: '엠레' },
      { hero: 'anran',       label: '안란' },
    ],
    '6': [
      { hero: 'widowmaker',  label: '위도우메이커' },
      { hero: 'echo',        label: '에코' },
      { hero: 'sojourn',     label: '소전' },
    ],
    '7': [
      { hero: 'venture',     label: '벤처' },
      { hero: 'vendetta',    label: '벤데타' },
    ],
  },
  mid: {
    '1': [
      { hero: 'soldier-76',  label: '솔저: 76' },
      { hero: 'reaper',      label: '리퍼' },
      { hero: 'cassidy',     label: '캐서디' },
    ],
    '2': [
      { hero: 'pharah',      label: '파라' },
      { hero: 'ashe',        label: '애쉬' },
      { hero: 'bastion',     label: '바스티온' },
      { hero: 'junkrat',     label: '정크랫' },
    ],
    '3': [
      { hero: 'echo',        label: '에코' },
      { hero: 'hanzo',       label: '한조' },
      { hero: 'mei',         label: '메이' },
      { hero: 'torbjorn',    label: '토르비욘' },
    ],
    '4': [
      { hero: 'genji',       label: '겐지' },
      { hero: 'tracer',      label: '트레이서' },
      { hero: 'sierra',      label: '시에라' },
      { hero: 'freja',       label: '프레야' },
    ],
    '5': [
      { hero: 'sojourn',     label: '소전' },
      { hero: 'emre',        label: '엠레' },
      { hero: 'anran',       label: '안란' },
    ],
    '6': [
      { hero: 'widowmaker',  label: '위도우메이커' },
      { hero: 'sombra',      label: '솜브라' },
      { hero: 'symmetra',    label: '시메트라' },
    ],
    '7': [
      { hero: 'venture',     label: '벤처' },
      { hero: 'vendetta',    label: '벤데타' },
    ],
  },
  high: {
    '1': [
      { hero: 'cassidy',     label: '캐서디' },
      { hero: 'sojourn',     label: '소전' },
      { hero: 'tracer',      label: '트레이서' },
    ],
    '2': [
      { hero: 'ashe',        label: '애쉬' },
      { hero: 'echo',        label: '에코' },
      { hero: 'genji',       label: '겐지' },
      { hero: 'emre',        label: '엠레' },
    ],
    '3': [
      { hero: 'soldier-76',  label: '솔저: 76' },
      { hero: 'reaper',      label: '리퍼' },
      { hero: 'pharah',      label: '파라' },
      { hero: 'freja',       label: '프레야' },
    ],
    '4': [
      { hero: 'hanzo',       label: '한조' },
      { hero: 'widowmaker',  label: '위도우메이커' },
      { hero: 'venture',     label: '벤처' },
      { hero: 'sierra',      label: '시에라' },
      { hero: 'anran',       label: '안란' },
    ],
    '5': [
      { hero: 'sombra',      label: '솜브라' },
      { hero: 'mei',         label: '메이' },
      { hero: 'bastion',     label: '바스티온' },
      { hero: 'vendetta',    label: '벤데타' },
    ],
    '6': [
      { hero: 'junkrat',     label: '정크랫' },
      { hero: 'torbjorn',    label: '토르비욘' },
    ],
    '7': [
      { hero: 'symmetra',    label: '시메트라' },
    ],
  },
  top: {
    '1': [
      { hero: 'tracer',      label: '트레이서' },
      { hero: 'sojourn',     label: '소전' },
      { hero: 'genji',       label: '겐지' },
    ],
    '2': [
      { hero: 'cassidy',     label: '캐서디' },
      { hero: 'echo',        label: '에코' },
      { hero: 'ashe',        label: '애쉬' },
      { hero: 'emre',        label: '엠레' },
    ],
    '3': [
      { hero: 'widowmaker',  label: '위도우메이커' },
      { hero: 'venture',     label: '벤처' },
      { hero: 'soldier-76',  label: '솔저: 76' },
      { hero: 'anran',       label: '안란' },
    ],
    '4': [
      { hero: 'reaper',      label: '리퍼' },
      { hero: 'hanzo',       label: '한조' },
      { hero: 'sierra',      label: '시에라' },
      { hero: 'freja',       label: '프레야' },
    ],
    '5': [
      { hero: 'sombra',      label: '솜브라' },
      { hero: 'pharah',      label: '파라' },
      { hero: 'mei',         label: '메이' },
      { hero: 'vendetta',    label: '벤데타' },
    ],
    '6': [
      { hero: 'bastion',     label: '바스티온' },
      { hero: 'junkrat',     label: '정크랫' },
      { hero: 'torbjorn',    label: '토르비욘' },
    ],
    '7': [
      { hero: 'symmetra',    label: '시메트라' },
    ],
  },
  elite: {
    '1': [
      { hero: 'tracer',      label: '트레이서' },
      { hero: 'sojourn',     label: '소전' },
      { hero: 'genji',       label: '겐지' },
    ],
    '2': [
      { hero: 'echo',        label: '에코' },
      { hero: 'cassidy',     label: '캐서디' },
      { hero: 'venture',     label: '벤처' },
      { hero: 'emre',        label: '엠레' },
    ],
    '3': [
      { hero: 'widowmaker',  label: '위도우메이커' },
      { hero: 'ashe',        label: '애쉬' },
      { hero: 'anran',       label: '안란' },
    ],
    '4': [
      { hero: 'hanzo',       label: '한조' },
      { hero: 'soldier-76',  label: '솔저: 76' },
      { hero: 'sierra',      label: '시에라' },
      { hero: 'freja',       label: '프레야' },
    ],
    '5': [
      { hero: 'reaper',      label: '리퍼' },
      { hero: 'sombra',      label: '솜브라' },
      { hero: 'pharah',      label: '파라' },
      { hero: 'vendetta',    label: '벤데타' },
    ],
    '6': [
      { hero: 'mei',         label: '메이' },
      { hero: 'bastion',     label: '바스티온' },
      { hero: 'junkrat',     label: '정크랫' },
    ],
    '7': [
      { hero: 'torbjorn',    label: '토르비욘' },
      { hero: 'symmetra',    label: '시메트라' },
    ],
  },
};

// ── SUPPORT ──────────────────────────────────────────────
const SUPPORT: Record<RankGroup, RawTierTable> = {
  low: {
    '1': [
      { hero: 'mercy',       label: '메르시' },
      { hero: 'moira',       label: '모이라' },
    ],
    '2': [
      { hero: 'lucio',       label: '루시우' },
      { hero: 'brigitte',    label: '브리기테' },
      { hero: 'baptiste',    label: '바티스트' },
    ],
    '3': [
      { hero: 'ana',         label: '아나' },
      { hero: 'zenyatta',    label: '젠야타' },
      { hero: 'juno',        label: '주노' },
    ],
    '4': [
      { hero: 'illari',      label: '일리아리' },
      { hero: 'wuyang',      label: '우양' },
    ],
    '5': [
      { hero: 'kiriko',      label: '키리코' },
      { hero: 'lifeweaver',  label: '라이프위버' },
    ],
    '6': [
      { hero: 'mizuki',      label: '미즈키' },
    ],
    '7': [
      { hero: 'jetpack-cat', label: '제트팩 캣' },
    ],
  },
  mid: {
    '1': [
      { hero: 'mercy',       label: '메르시' },
      { hero: 'moira',       label: '모이라' },
      { hero: 'lucio',       label: '루시우' },
    ],
    '2': [
      { hero: 'ana',         label: '아나' },
      { hero: 'baptiste',    label: '바티스트' },
      { hero: 'brigitte',    label: '브리기테' },
    ],
    '3': [
      { hero: 'illari',      label: '일리아리' },
      { hero: 'zenyatta',    label: '젠야타' },
      { hero: 'juno',        label: '주노' },
    ],
    '4': [
      { hero: 'kiriko',      label: '키리코' },
      { hero: 'wuyang',      label: '우양' },
    ],
    '5': [
      { hero: 'lifeweaver',  label: '라이프위버' },
      { hero: 'mizuki',      label: '미즈키' },
    ],
    '6': [
      { hero: 'jetpack-cat', label: '제트팩 캣' },
    ],
    '7': [],
  },
  high: {
    '1': [
      { hero: 'ana',         label: '아나' },
      { hero: 'kiriko',      label: '키리코' },
      { hero: 'lucio',       label: '루시우' },
    ],
    '2': [
      { hero: 'baptiste',    label: '바티스트' },
      { hero: 'mercy',       label: '메르시' },
      { hero: 'zenyatta',    label: '젠야타' },
    ],
    '3': [
      { hero: 'illari',      label: '일리아리' },
      { hero: 'juno',        label: '주노' },
      { hero: 'moira',       label: '모이라' },
    ],
    '4': [
      { hero: 'brigitte',    label: '브리기테' },
      { hero: 'wuyang',      label: '우양' },
    ],
    '5': [
      { hero: 'lifeweaver',  label: '라이프위버' },
      { hero: 'mizuki',      label: '미즈키' },
    ],
    '6': [
      { hero: 'jetpack-cat', label: '제트팩 캣' },
    ],
    '7': [],
  },
  top: {
    '1': [
      { hero: 'ana',         label: '아나' },
      { hero: 'kiriko',      label: '키리코' },
      { hero: 'lucio',       label: '루시우' },
    ],
    '2': [
      { hero: 'baptiste',    label: '바티스트' },
      { hero: 'zenyatta',    label: '젠야타' },
      { hero: 'illari',      label: '일리아리' },
    ],
    '3': [
      { hero: 'juno',        label: '주노' },
      { hero: 'mercy',       label: '메르시' },
      { hero: 'wuyang',      label: '우양' },
    ],
    '4': [
      { hero: 'brigitte',    label: '브리기테' },
      { hero: 'lifeweaver',  label: '라이프위버' },
    ],
    '5': [
      { hero: 'moira',       label: '모이라' },
      { hero: 'mizuki',      label: '미즈키' },
    ],
    '6': [
      { hero: 'jetpack-cat', label: '제트팩 캣' },
    ],
    '7': [],
  },
  elite: {
    '1': [
      { hero: 'ana',         label: '아나' },
      { hero: 'kiriko',      label: '키리코' },
      { hero: 'lucio',       label: '루시우' },
    ],
    '2': [
      { hero: 'baptiste',    label: '바티스트' },
      { hero: 'zenyatta',    label: '젠야타' },
      { hero: 'illari',      label: '일리아리' },
    ],
    '3': [
      { hero: 'juno',        label: '주노' },
      { hero: 'wuyang',      label: '우양' },
    ],
    '4': [
      { hero: 'mercy',       label: '메르시' },
      { hero: 'brigitte',    label: '브리기테' },
    ],
    '5': [
      { hero: 'lifeweaver',  label: '라이프위버' },
      { hero: 'moira',       label: '모이라' },
    ],
    '6': [
      { hero: 'mizuki',      label: '미즈키' },
    ],
    '7': [
      { hero: 'jetpack-cat', label: '제트팩 캣' },
    ],
  },
};

function withTier(data: Record<RankGroup, RawTierTable>, group: RankGroup): TierTableData {
  const raw = data[group];
  const result: TierTableData = { '1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': [] };
  for (const t of ['1', '2', '3', '4', '5', '6', '7'] as Tier[]) {
    result[t] = raw[t].map(h => ({ ...h, tier: t }));
  }
  return result;
}

export function getTierData(role: Role, _server: Server, rank: Rank): TierTableData {
  const group = RANK_GROUP[rank];
  if (role === 'tank')   return withTier(TANK,    group);
  if (role === 'damage') return withTier(DAMAGE,  group);
  return                        withTier(SUPPORT, group);
}

export const SERVER_OPTIONS: { value: Server; label: string; flag: string }[] = [
  { value: 'kr',   label: '한국',   flag: '🇰🇷' },
  { value: 'na',   label: '북미',   flag: '🇺🇸' },
  { value: 'eu',   label: '유럽',   flag: '🇪🇺' },
  { value: 'asia', label: '아시아', flag: '🌏' },
];

export const RANK_OPTIONS: { value: Rank; label: string; color: string }[] = [
  { value: 'bronze',      label: '브론즈',      color: '#CD7F32' },
  { value: 'silver',      label: '실버',        color: '#C0C0C0' },
  { value: 'gold',        label: '골드',        color: '#FFD700' },
  { value: 'platinum',    label: '플래티넘',    color: '#00E5FF' },
  { value: 'diamond',     label: '다이아몬드',  color: '#4FC3F7' },
  { value: 'master',      label: '마스터',      color: '#CE93D8' },
  { value: 'grandmaster', label: '그랜드마스터',color: '#FF6D00' },
  { value: 'champion',    label: '챔피언',      color: '#FFD700' },
  { value: 'ranker',      label: '랭커 (Top500)',color: '#FF3D3D' },
];

export const TIER_COLORS: Record<Tier, { bg: string; border: string; text: string }> = {
  '1': { bg: 'rgba(255,70,70,0.12)',    border: '#FF4646', text: '#FF6B6B' },
  '2': { bg: 'rgba(255,140,50,0.12)',   border: '#FF8C32', text: '#FFA050' },
  '3': { bg: 'rgba(255,210,50,0.12)',   border: '#FFD232', text: '#FFE050' },
  '4': { bg: 'rgba(50,200,100,0.12)',   border: '#32C864', text: '#4DD980' },
  '5': { bg: 'rgba(50,160,255,0.12)',   border: '#32A0FF', text: '#50B8FF' },
  '6': { bg: 'rgba(150,100,255,0.12)',  border: '#9664FF', text: '#AA80FF' },
  '7': { bg: 'rgba(120,120,120,0.12)',  border: '#787878', text: '#9A9A9A' },
};
