import { ROLE_LABELS, ROLE_COLORS, DIVISION_COLORS, getRankLabel } from '../utils/helpers';

interface RoleRank {
  division: string;
  tier: number;
  rank_icon: string;
  tier_icon?: string;
}

interface Props {
  role: string;
  rank: RoleRank;
}

export default function RankCard({ role, rank }: Props) {
  const color = ROLE_COLORS[role] || '#9B9B9B';
  const divColor = DIVISION_COLORS[rank.division] || '#9B9B9B';

  return (
    <div
      className="flex flex-col items-center gap-2 p-4 rounded-xl border transition-transform hover:scale-105"
      style={{ borderColor: divColor + '40', background: divColor + '10' }}
    >
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
        {ROLE_LABELS[role] || role}
      </span>
      <img
        src={rank.rank_icon}
        alt={rank.division}
        className="w-16 h-16 object-contain drop-shadow-lg"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      <span className="font-bold text-sm" style={{ color: divColor }}>
        {getRankLabel(rank.division, rank.tier)}
      </span>
    </div>
  );
}
