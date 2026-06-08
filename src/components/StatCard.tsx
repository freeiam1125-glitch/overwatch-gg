interface Props {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

export default function StatCard({ label, value, sub, color }: Props) {
  return (
    <div className="bg-[#1E2030] border border-[#2A2D45] rounded-xl p-4 text-center">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-2xl font-bold" style={{ color: color || '#fff' }}>{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-0.5">{sub}</p>}
    </div>
  );
}
