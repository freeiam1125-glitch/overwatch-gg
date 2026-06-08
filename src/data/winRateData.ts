// Source: Blizzard Entertainment official hero stats
// https://overwatch.blizzard.com/ko-kr/rates/ (rq=1, PC, All tiers, All roles)
// Includes win rate, pick rate, ban rate per region

export type Region = 'asia' | 'americas' | 'europe';

export interface HeroStat {
  hero: string;
  label: string;
  role: 'tank' | 'damage' | 'support';
  winRate: number;
  pickRate: number;
  banRate: number;
}

const ASIA: HeroStat[] = [
  { hero: 'dva',           label: 'D.Va',        role: 'tank',    winRate: 48.5, pickRate: 7.0,  banRate: 22.8 },
  { hero: 'domina',        label: '도미나',       role: 'tank',    winRate: 52.1, pickRate: 4.3,  banRate: 5.1  },
  { hero: 'doomfist',      label: '둠피스트',     role: 'tank',    winRate: 52.2, pickRate: 6.6,  banRate: 39.7 },
  { hero: 'ramattra',      label: '라마트라',     role: 'tank',    winRate: 48.5, pickRate: 6.0,  banRate: 2.1  },
  { hero: 'reinhardt',     label: '라인하르트',   role: 'tank',    winRate: 48.9, pickRate: 7.4,  banRate: 0.9  },
  { hero: 'wrecking-ball', label: '레킹볼',       role: 'tank',    winRate: 48.2, pickRate: 3.1,  banRate: 7.4  },
  { hero: 'roadhog',       label: '로드호그',     role: 'tank',    winRate: 43.5, pickRate: 6.0,  banRate: 3.2  },
  { hero: 'mauga',         label: '마우가',       role: 'tank',    winRate: 47.5, pickRate: 10.0, banRate: 21.0 },
  { hero: 'sigma',         label: '시그마',       role: 'tank',    winRate: 53.3, pickRate: 12.2, banRate: 5.7  },
  { hero: 'orisa',         label: '오리사',       role: 'tank',    winRate: 47.2, pickRate: 11.9, banRate: 8.9  },
  { hero: 'winston',       label: '윈스턴',       role: 'tank',    winRate: 51.3, pickRate: 9.5,  banRate: 5.4  },
  { hero: 'zarya',         label: '자리야',       role: 'tank',    winRate: 50.0, pickRate: 7.4,  banRate: 35.2 },
  { hero: 'junker-queen',  label: '정커퀸',       role: 'tank',    winRate: 49.4, pickRate: 2.6,  banRate: 0.2  },
  { hero: 'hazard',        label: '해저드',       role: 'tank',    winRate: 53.1, pickRate: 5.8,  banRate: 4.3  },

  { hero: 'genji',         label: '겐지',         role: 'damage',  winRate: 52.0, pickRate: 13.9, banRate: 1.9  },
  { hero: 'reaper',        label: '리퍼',         role: 'damage',  winRate: 52.7, pickRate: 15.9, banRate: 5.9  },
  { hero: 'mei',           label: '메이',         role: 'damage',  winRate: 49.5, pickRate: 6.2,  banRate: 0.8  },
  { hero: 'bastion',       label: '바스티온',     role: 'damage',  winRate: 47.5, pickRate: 8.0,  banRate: 1.8  },
  { hero: 'vendetta',      label: '벤데타',       role: 'damage',  winRate: 47.9, pickRate: 2.1,  banRate: 4.0  },
  { hero: 'venture',       label: '벤처',         role: 'damage',  winRate: 52.0, pickRate: 3.0,  banRate: 0.7  },
  { hero: 'sojourn',       label: '소전',         role: 'damage',  winRate: 44.9, pickRate: 11.1, banRate: 0.4  },
  { hero: 'soldier-76',    label: '솔저: 76',     role: 'damage',  winRate: 48.3, pickRate: 15.0, banRate: 0.3  },
  { hero: 'sombra',        label: '솜브라',       role: 'damage',  winRate: 48.1, pickRate: 3.0,  banRate: 50.0 },
  { hero: 'symmetra',      label: '시메트라',     role: 'damage',  winRate: 53.2, pickRate: 3.5,  banRate: 4.3  },
  { hero: 'sierra',        label: '시에라',       role: 'damage',  winRate: 50.8, pickRate: 17.8, banRate: 20.1 },
  { hero: 'anran',         label: '안란',         role: 'damage',  winRate: 52.1, pickRate: 10.1, banRate: 10.3 },
  { hero: 'ashe',          label: '애쉬',         role: 'damage',  winRate: 50.2, pickRate: 8.3,  banRate: 0.3  },
  { hero: 'echo',          label: '에코',         role: 'damage',  winRate: 50.4, pickRate: 4.6,  banRate: 1.0  },
  { hero: 'emre',          label: '엠레',         role: 'damage',  winRate: 48.8, pickRate: 12.2, banRate: 1.9  },
  { hero: 'widowmaker',    label: '위도우메이커', role: 'damage',  winRate: 49.2, pickRate: 4.2,  banRate: 1.6  },
  { hero: 'junkrat',       label: '정크랫',       role: 'damage',  winRate: 48.2, pickRate: 5.2,  banRate: 0.5  },
  { hero: 'cassidy',       label: '캐서디',       role: 'damage',  winRate: 47.1, pickRate: 24.2, banRate: 2.7  },
  { hero: 'torbjorn',      label: '토르비욘',     role: 'damage',  winRate: 49.0, pickRate: 3.5,  banRate: 0.4  },
  { hero: 'tracer',        label: '트레이서',     role: 'damage',  winRate: 50.5, pickRate: 11.3, banRate: 7.8  },
  { hero: 'pharah',        label: '파라',         role: 'damage',  winRate: 53.1, pickRate: 5.3,  banRate: 34.0 },
  { hero: 'freja',         label: '프레야',       role: 'damage',  winRate: 47.9, pickRate: 5.1,  banRate: 7.1  },
  { hero: 'hanzo',         label: '한조',         role: 'damage',  winRate: 49.0, pickRate: 6.3,  banRate: 0.4  },

  { hero: 'ana',           label: '아나',         role: 'support', winRate: 50.1, pickRate: 48.3, banRate: 11.9 },
  { hero: 'lucio',         label: '루시우',       role: 'support', winRate: 47.3, pickRate: 5.3,  banRate: 0.3  },
  { hero: 'mercy',         label: '메르시',       role: 'support', winRate: 46.9, pickRate: 6.9,  banRate: 1.0  },
  { hero: 'moira',         label: '모이라',       role: 'support', winRate: 47.5, pickRate: 14.1, banRate: 1.8  },
  { hero: 'mizuki',        label: '미즈키',       role: 'support', winRate: 49.9, pickRate: 9.0,  banRate: 5.7  },
  { hero: 'baptiste',      label: '바티스트',     role: 'support', winRate: 46.1, pickRate: 6.1,  banRate: 0.1  },
  { hero: 'brigitte',      label: '브리기테',     role: 'support', winRate: 49.2, pickRate: 4.3,  banRate: 0.2  },
  { hero: 'lifeweaver',    label: '라이프위버',   role: 'support', winRate: 47.5, pickRate: 6.5,  banRate: 0.6  },
  { hero: 'illari',        label: '일리아리',     role: 'support', winRate: 50.8, pickRate: 9.0,  banRate: 4.6  },
  { hero: 'jetpack-cat',   label: '제트팩 캣',    role: 'support', winRate: 46.4, pickRate: 3.1,  banRate: 30.8 },
  { hero: 'zenyatta',      label: '젠야타',       role: 'support', winRate: 53.0, pickRate: 14.0, banRate: 1.4  },
  { hero: 'juno',          label: '주노',         role: 'support', winRate: 49.2, pickRate: 7.2,  banRate: 0.1  },
  { hero: 'kiriko',        label: '키리코',       role: 'support', winRate: 49.7, pickRate: 53.3, banRate: 2.7  },
  { hero: 'wuyang',        label: '우양',         role: 'support', winRate: 52.6, pickRate: 12.8, banRate: 0.7  },
];

const AMERICAS: HeroStat[] = [
  { hero: 'dva',           label: 'D.Va',        role: 'tank',    winRate: 46.1, pickRate: 6.8,  banRate: 12.3 },
  { hero: 'domina',        label: '도미나',       role: 'tank',    winRate: 51.6, pickRate: 6.0,  banRate: 20.0 },
  { hero: 'doomfist',      label: '둠피스트',     role: 'tank',    winRate: 52.3, pickRate: 6.3,  banRate: 17.3 },
  { hero: 'ramattra',      label: '라마트라',     role: 'tank',    winRate: 48.5, pickRate: 9.2,  banRate: 7.3  },
  { hero: 'reinhardt',     label: '라인하르트',   role: 'tank',    winRate: 52.4, pickRate: 11.1, banRate: 1.9  },
  { hero: 'wrecking-ball', label: '레킹볼',       role: 'tank',    winRate: 51.5, pickRate: 3.1,  banRate: 9.6  },
  { hero: 'roadhog',       label: '로드호그',     role: 'tank',    winRate: 47.6, pickRate: 7.7,  banRate: 14.6 },
  { hero: 'mauga',         label: '마우가',       role: 'tank',    winRate: 50.3, pickRate: 7.0,  banRate: 12.5 },
  { hero: 'sigma',         label: '시그마',       role: 'tank',    winRate: 50.8, pickRate: 11.3, banRate: 4.6  },
  { hero: 'orisa',         label: '오리사',       role: 'tank',    winRate: 45.0, pickRate: 11.3, banRate: 7.1  },
  { hero: 'winston',       label: '윈스턴',       role: 'tank',    winRate: 49.7, pickRate: 6.3,  banRate: 6.4  },
  { hero: 'zarya',         label: '자리야',       role: 'tank',    winRate: 47.6, pickRate: 5.4,  banRate: 44.7 },
  { hero: 'junker-queen',  label: '정커퀸',       role: 'tank',    winRate: 51.8, pickRate: 4.2,  banRate: 0.4  },
  { hero: 'hazard',        label: '해저드',       role: 'tank',    winRate: 52.5, pickRate: 4.3,  banRate: 8.6  },

  { hero: 'genji',         label: '겐지',         role: 'damage',  winRate: 52.4, pickRate: 11.1, banRate: 4.1  },
  { hero: 'reaper',        label: '리퍼',         role: 'damage',  winRate: 51.9, pickRate: 13.0, banRate: 4.0  },
  { hero: 'mei',           label: '메이',         role: 'damage',  winRate: 49.3, pickRate: 8.1,  banRate: 2.5  },
  { hero: 'bastion',       label: '바스티온',     role: 'damage',  winRate: 46.9, pickRate: 14.2, banRate: 5.1  },
  { hero: 'vendetta',      label: '벤데타',       role: 'damage',  winRate: 49.3, pickRate: 2.5,  banRate: 12.6 },
  { hero: 'venture',       label: '벤처',         role: 'damage',  winRate: 51.2, pickRate: 2.8,  banRate: 1.0  },
  { hero: 'sojourn',       label: '소전',         role: 'damage',  winRate: 44.6, pickRate: 11.2, banRate: 1.4  },
  { hero: 'soldier-76',    label: '솔저: 76',     role: 'damage',  winRate: 48.7, pickRate: 18.2, banRate: 0.6  },
  { hero: 'sombra',        label: '솜브라',       role: 'damage',  winRate: 47.6, pickRate: 3.4,  banRate: 34.0 },
  { hero: 'symmetra',      label: '시메트라',     role: 'damage',  winRate: 49.9, pickRate: 3.4,  banRate: 3.2  },
  { hero: 'sierra',        label: '시에라',       role: 'damage',  winRate: 52.1, pickRate: 15.2, banRate: 45.5 },
  { hero: 'anran',         label: '안란',         role: 'damage',  winRate: 51.8, pickRate: 9.4,  banRate: 15.9 },
  { hero: 'ashe',          label: '애쉬',         role: 'damage',  winRate: 50.5, pickRate: 11.0, banRate: 1.4  },
  { hero: 'echo',          label: '에코',         role: 'damage',  winRate: 49.8, pickRate: 5.0,  banRate: 0.7  },
  { hero: 'emre',          label: '엠레',         role: 'damage',  winRate: 48.0, pickRate: 11.1, banRate: 1.7  },
  { hero: 'widowmaker',    label: '위도우메이커', role: 'damage',  winRate: 50.2, pickRate: 3.9,  banRate: 5.9  },
  { hero: 'junkrat',       label: '정크랫',       role: 'damage',  winRate: 49.6, pickRate: 9.9,  banRate: 2.4  },
  { hero: 'cassidy',       label: '캐서디',       role: 'damage',  winRate: 47.6, pickRate: 18.1, banRate: 5.5  },
  { hero: 'torbjorn',      label: '토르비욘',     role: 'damage',  winRate: 51.2, pickRate: 5.0,  banRate: 0.6  },
  { hero: 'tracer',        label: '트레이서',     role: 'damage',  winRate: 50.6, pickRate: 7.6,  banRate: 7.6  },
  { hero: 'pharah',        label: '파라',         role: 'damage',  winRate: 51.8, pickRate: 4.9,  banRate: 5.3  },
  { hero: 'freja',         label: '프레야',       role: 'damage',  winRate: 46.8, pickRate: 3.5,  banRate: 0.7  },
  { hero: 'hanzo',         label: '한조',         role: 'damage',  winRate: 50.3, pickRate: 7.3,  banRate: 1.1  },

  { hero: 'ana',           label: '아나',         role: 'support', winRate: 47.6, pickRate: 26.0, banRate: 10.8 },
  { hero: 'lucio',         label: '루시우',       role: 'support', winRate: 50.0, pickRate: 6.7,  banRate: 0.9  },
  { hero: 'mercy',         label: '메르시',       role: 'support', winRate: 50.8, pickRate: 19.7, banRate: 8.1  },
  { hero: 'moira',         label: '모이라',       role: 'support', winRate: 47.4, pickRate: 25.3, banRate: 3.4  },
  { hero: 'mizuki',        label: '미즈키',       role: 'support', winRate: 51.1, pickRate: 13.2, banRate: 2.1  },
  { hero: 'baptiste',      label: '바티스트',     role: 'support', winRate: 46.9, pickRate: 7.5,  banRate: 0.2  },
  { hero: 'brigitte',      label: '브리기테',     role: 'support', winRate: 51.2, pickRate: 5.5,  banRate: 0.2  },
  { hero: 'lifeweaver',    label: '라이프위버',   role: 'support', winRate: 50.1, pickRate: 14.5, banRate: 0.7  },
  { hero: 'illari',        label: '일리아리',     role: 'support', winRate: 50.0, pickRate: 6.9,  banRate: 0.6  },
  { hero: 'jetpack-cat',   label: '제트팩 캣',    role: 'support', winRate: 49.8, pickRate: 4.2,  banRate: 26.5 },
  { hero: 'zenyatta',      label: '젠야타',       role: 'support', winRate: 53.3, pickRate: 11.6, banRate: 2.3  },
  { hero: 'juno',          label: '주노',         role: 'support', winRate: 50.6, pickRate: 17.7, banRate: 0.4  },
  { hero: 'kiriko',        label: '키리코',       role: 'support', winRate: 47.8, pickRate: 34.7, banRate: 4.2  },
  { hero: 'wuyang',        label: '우양',         role: 'support', winRate: 51.6, pickRate: 6.6,  banRate: 0.2  },
];

const EUROPE: HeroStat[] = [
  { hero: 'dva',           label: 'D.Va',        role: 'tank',    winRate: 46.7, pickRate: 6.6,  banRate: 19.4 },
  { hero: 'domina',        label: '도미나',       role: 'tank',    winRate: 51.2, pickRate: 5.6,  banRate: 14.8 },
  { hero: 'doomfist',      label: '둠피스트',     role: 'tank',    winRate: 51.8, pickRate: 6.8,  banRate: 18.8 },
  { hero: 'ramattra',      label: '라마트라',     role: 'tank',    winRate: 48.1, pickRate: 7.8,  banRate: 6.1  },
  { hero: 'reinhardt',     label: '라인하르트',   role: 'tank',    winRate: 52.0, pickRate: 11.3, banRate: 2.1  },
  { hero: 'wrecking-ball', label: '레킹볼',       role: 'tank',    winRate: 51.2, pickRate: 3.7,  banRate: 10.2 },
  { hero: 'roadhog',       label: '로드호그',     role: 'tank',    winRate: 47.5, pickRate: 8.6,  banRate: 11.4 },
  { hero: 'mauga',         label: '마우가',       role: 'tank',    winRate: 50.6, pickRate: 7.2,  banRate: 14.7 },
  { hero: 'sigma',         label: '시그마',       role: 'tank',    winRate: 51.0, pickRate: 11.3, banRate: 5.3  },
  { hero: 'orisa',         label: '오리사',       role: 'tank',    winRate: 45.3, pickRate: 11.4, banRate: 9.9  },
  { hero: 'winston',       label: '윈스턴',       role: 'tank',    winRate: 50.1, pickRate: 5.9,  banRate: 5.7  },
  { hero: 'zarya',         label: '자리야',       role: 'tank',    winRate: 47.0, pickRate: 5.4,  banRate: 41.3 },
  { hero: 'junker-queen',  label: '정커퀸',       role: 'tank',    winRate: 51.2, pickRate: 3.7,  banRate: 0.3  },
  { hero: 'hazard',        label: '해저드',       role: 'tank',    winRate: 53.2, pickRate: 4.7,  banRate: 10.8 },

  { hero: 'genji',         label: '겐지',         role: 'damage',  winRate: 52.3, pickRate: 12.3, banRate: 6.8  },
  { hero: 'reaper',        label: '리퍼',         role: 'damage',  winRate: 52.0, pickRate: 11.8, banRate: 3.7  },
  { hero: 'mei',           label: '메이',         role: 'damage',  winRate: 49.3, pickRate: 6.7,  banRate: 2.0  },
  { hero: 'bastion',       label: '바스티온',     role: 'damage',  winRate: 47.2, pickRate: 13.6, banRate: 6.3  },
  { hero: 'vendetta',      label: '벤데타',       role: 'damage',  winRate: 48.9, pickRate: 2.3,  banRate: 9.0  },
  { hero: 'venture',       label: '벤처',         role: 'damage',  winRate: 51.7, pickRate: 2.3,  banRate: 0.7  },
  { hero: 'sojourn',       label: '소전',         role: 'damage',  winRate: 45.2, pickRate: 11.2, banRate: 1.3  },
  { hero: 'soldier-76',    label: '솔저: 76',     role: 'damage',  winRate: 48.6, pickRate: 17.8, banRate: 0.7  },
  { hero: 'sombra',        label: '솜브라',       role: 'damage',  winRate: 46.8, pickRate: 3.6,  banRate: 26.4 },
  { hero: 'symmetra',      label: '시메트라',     role: 'damage',  winRate: 50.7, pickRate: 2.9,  banRate: 1.8  },
  { hero: 'sierra',        label: '시에라',       role: 'damage',  winRate: 51.3, pickRate: 15.9, banRate: 38.6 },
  { hero: 'anran',         label: '안란',         role: 'damage',  winRate: 51.4, pickRate: 8.3,  banRate: 15.4 },
  { hero: 'ashe',          label: '애쉬',         role: 'damage',  winRate: 50.5, pickRate: 12.0, banRate: 1.4  },
  { hero: 'echo',          label: '에코',         role: 'damage',  winRate: 49.9, pickRate: 5.0,  banRate: 0.8  },
  { hero: 'emre',          label: '엠레',         role: 'damage',  winRate: 48.1, pickRate: 11.1, banRate: 2.0  },
  { hero: 'widowmaker',    label: '위도우메이커', role: 'damage',  winRate: 50.3, pickRate: 5.2,  banRate: 8.5  },
  { hero: 'junkrat',       label: '정크랫',       role: 'damage',  winRate: 49.6, pickRate: 9.8,  banRate: 2.6  },
  { hero: 'cassidy',       label: '캐서디',       role: 'damage',  winRate: 47.7, pickRate: 18.5, banRate: 5.8  },
  { hero: 'torbjorn',      label: '토르비욘',     role: 'damage',  winRate: 51.0, pickRate: 4.3,  banRate: 0.5  },
  { hero: 'tracer',        label: '트레이서',     role: 'damage',  winRate: 50.7, pickRate: 7.3,  banRate: 6.9  },
  { hero: 'pharah',        label: '파라',         role: 'damage',  winRate: 52.8, pickRate: 5.3,  banRate: 13.6 },
  { hero: 'freja',         label: '프레야',       role: 'damage',  winRate: 47.0, pickRate: 3.7,  banRate: 1.0  },
  { hero: 'hanzo',         label: '한조',         role: 'damage',  winRate: 49.8, pickRate: 9.0,  banRate: 2.0  },

  { hero: 'ana',           label: '아나',         role: 'support', winRate: 47.9, pickRate: 28.5, banRate: 10.5 },
  { hero: 'lucio',         label: '루시우',       role: 'support', winRate: 50.2, pickRate: 6.2,  banRate: 0.9  },
  { hero: 'mercy',         label: '메르시',       role: 'support', winRate: 50.5, pickRate: 21.8, banRate: 12.7 },
  { hero: 'moira',         label: '모이라',       role: 'support', winRate: 47.6, pickRate: 24.2, banRate: 4.4  },
  { hero: 'mizuki',        label: '미즈키',       role: 'support', winRate: 50.7, pickRate: 11.5, banRate: 1.5  },
  { hero: 'baptiste',      label: '바티스트',     role: 'support', winRate: 47.5, pickRate: 7.6,  banRate: 0.2  },
  { hero: 'brigitte',      label: '브리기테',     role: 'support', winRate: 52.1, pickRate: 4.9,  banRate: 0.3  },
  { hero: 'lifeweaver',    label: '라이프위버',   role: 'support', winRate: 49.9, pickRate: 15.0, banRate: 0.8  },
  { hero: 'illari',        label: '일리아리',     role: 'support', winRate: 50.4, pickRate: 7.8,  banRate: 0.6  },
  { hero: 'jetpack-cat',   label: '제트팩 캣',    role: 'support', winRate: 49.8, pickRate: 4.3,  banRate: 25.4 },
  { hero: 'zenyatta',      label: '젠야타',       role: 'support', winRate: 53.2, pickRate: 11.8, banRate: 2.7  },
  { hero: 'juno',          label: '주노',         role: 'support', winRate: 50.5, pickRate: 14.9, banRate: 0.3  },
  { hero: 'kiriko',        label: '키리코',       role: 'support', winRate: 47.9, pickRate: 35.3, banRate: 4.5  },
  { hero: 'wuyang',        label: '우양',         role: 'support', winRate: 51.2, pickRate: 6.2,  banRate: 0.2  },
];

export const WIN_RATE_DATA: Record<Region, HeroStat[]> = {
  asia:     ASIA,
  americas: AMERICAS,
  europe:   EUROPE,
};

export function getHeroStats(region: Region, role: 'all' | 'tank' | 'damage' | 'support'): HeroStat[] {
  const data = WIN_RATE_DATA[region];
  const filtered = role === 'all' ? data : data.filter(h => h.role === role);
  return [...filtered].sort((a, b) => b.winRate - a.winRate);
}
