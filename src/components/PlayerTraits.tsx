import { Shield, Zap, Heart, TrendingUp, TrendingDown, Target, Sword, Star } from 'lucide-react';

interface Stats {
  wins: number;
  losses: number;
  games_played: number;
  time_played: number;
  kda: number;
  eliminations_per_10: number;
  deaths_per_10: number;
  damage_per_10: number;
  healing_per_10: number;
}

interface Props {
  stats: Stats;
  topHeroes: string[];
}

const TRAIT_DEFS = [
  {
    id: 'highWin',
    label: '승리 기계',
    desc: '승률 60% 이상',
    icon: TrendingUp,
    color: '#4CAF50',
    check: (s: Stats) => s.games_played > 0 && s.wins / s.games_played >= 0.6,
  },
  {
    id: 'lowWin',
    label: '연패의 늪',
    desc: '승률 40% 미만',
    icon: TrendingDown,
    color: '#E5464A',
    check: (s: Stats) => s.games_played > 0 && s.wins / s.games_played < 0.4,
  },
  {
    id: 'highKda',
    label: '생존의 달인',
    desc: 'KDA 3.0 이상',
    icon: Shield,
    color: '#4A90D9',
    check: (s: Stats) => s.kda >= 3.0,
  },
  {
    id: 'fragmaster',
    label: '킬 머신',
    desc: '10분당 처치 20+',
    icon: Sword,
    color: '#FF6D00',
    check: (s: Stats) => s.eliminations_per_10 >= 20,
  },
  {
    id: 'healer',
    label: '힐봇',
    desc: '10분당 힐 10000+',
    icon: Heart,
    color: '#E91E8A',
    check: (s: Stats) => s.healing_per_10 >= 10000,
  },
  {
    id: 'dps',
    label: '딜 장인',
    desc: '10분당 딜 10000+',
    icon: Zap,
    color: '#F4871C',
    check: (s: Stats) => s.damage_per_10 >= 10000,
  },
  {
    id: 'sniper',
    label: '저격수',
    desc: '처치 정확도 높음',
    icon: Target,
    color: '#9B59B6',
    check: (s: Stats) => s.eliminations_per_10 > 0 && s.deaths_per_10 < 5,
  },
  {
    id: 'experienced',
    label: '베테랑',
    desc: '플레이 시간 100시간+',
    icon: Star,
    color: '#F5C518',
    check: (s: Stats) => s.time_played >= 360000,
  },
];

export default function PlayerTraits({ stats }: Props) {
  const active = TRAIT_DEFS.filter((t) => t.check(stats));

  if (active.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-4">분석할 데이터가 부족합니다</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {active.map((t) => {
        const Icon = t.icon;
        return (
          <div
            key={t.id}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium"
            style={{ borderColor: t.color + '40', backgroundColor: t.color + '15', color: t.color }}
            title={t.desc}
          >
            <Icon className="w-4 h-4" />
            {t.label}
          </div>
        );
      })}
    </div>
  );
}
