import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  wins: number;
  losses: number;
  draws?: number;
}

export default function WinRateChart({ wins, losses, draws = 0 }: Props) {
  const data = [
    { name: '승', value: wins, color: '#4CAF50' },
    { name: '패', value: losses, color: '#E5464A' },
    ...(draws > 0 ? [{ name: '무', value: draws, color: '#9B9B9B' }] : []),
  ].filter((d) => d.value > 0);

  const total = wins + losses + draws;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-32 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#1E2030', border: '1px solid #2A2D45', borderRadius: 8 }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#A8ABBE' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white">{winRate}%</span>
          <span className="text-xs text-gray-400">승률</span>
        </div>
      </div>
      <div className="flex gap-3 mt-2 text-xs">
        <span className="text-[#4CAF50]">승 {wins}</span>
        <span className="text-[#E5464A]">패 {losses}</span>
        {draws > 0 && <span className="text-gray-400">무 {draws}</span>}
      </div>
    </div>
  );
}
