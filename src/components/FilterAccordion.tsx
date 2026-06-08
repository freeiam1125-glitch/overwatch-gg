import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  SERVER_OPTIONS,
  RANK_OPTIONS,
  type Server,
  type Rank,
} from '../data/tierData';
import { RANK_IMGS } from '../data/rankImages';

interface Props {
  server: Server;
  rank: Rank;
  onServerChange: (s: Server) => void;
  onRankChange: (r: Rank) => void;
}

function RankImg({ rankValue, color, size = 7 }: { rankValue: string; color: string; size?: number }) {
  const px = size * 4;
  const src = RANK_IMGS[rankValue];
  if (!src) return <div className="rounded-full flex-shrink-0" style={{ width: px, height: px, backgroundColor: color + '33', border: `2px solid ${color}` }} />;
  return (
    <div className="flex-shrink-0" style={{ width: px, height: px }}>
      <img src={src} alt={rankValue} className="w-full h-full object-contain drop-shadow-sm" />
    </div>
  );
}

export default function FilterAccordion({ server, rank, onServerChange, onRankChange }: Props) {
  const [serverOpen, setServerOpen] = useState(false);
  const [rankOpen,   setRankOpen]   = useState(false);

  const currentServer = SERVER_OPTIONS.find(s => s.value === server)!;
  const currentRank   = RANK_OPTIONS.find(r => r.value === rank)!;

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      {/* Server */}
      <div className="relative flex-1">
        <button
          onClick={() => { setServerOpen(o => !o); setRankOpen(false); }}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-[#1E2030] border border-[#2A2D45] rounded-xl text-sm font-medium hover:border-[#F4871C60] transition-colors"
        >
          <span className="flex items-center gap-2 text-white">
            <span className="text-base">{currentServer.flag}</span>
            <span>{currentServer.label} 서버</span>
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${serverOpen ? 'rotate-180' : ''}`} />
        </button>
        {serverOpen && (
          <div className="absolute top-full mt-1 w-full bg-[#1E2030] border border-[#2A2D45] rounded-xl overflow-hidden shadow-2xl z-30">
            {SERVER_OPTIONS.map(s => (
              <button
                key={s.value}
                onClick={() => { onServerChange(s.value); setServerOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[#2A2D45] ${
                  s.value === server ? 'text-[#F4871C] bg-[#F4871C10]' : 'text-gray-300'
                }`}
              >
                <span className="text-base">{s.flag}</span>
                <span>{s.label}</span>
                {s.value === server && <span className="ml-auto text-xs">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Rank */}
      <div className="relative flex-1">
        <button
          onClick={() => { setRankOpen(o => !o); setServerOpen(false); }}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-[#1E2030] border border-[#2A2D45] rounded-xl text-sm font-medium hover:border-[#F4871C60] transition-colors"
        >
          <span className="flex items-center gap-2">
            <RankImg rankValue={currentRank.value} color={currentRank.color} size={6} />
            <span className="text-white">{currentRank.label}</span>
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${rankOpen ? 'rotate-180' : ''}`} />
        </button>
        {rankOpen && (
          <div className="absolute top-full mt-1 w-full bg-[#1E2030] border border-[#2A2D45] rounded-xl overflow-hidden shadow-2xl z-30">
            {RANK_OPTIONS.map(r => (
              <button
                key={r.value}
                onClick={() => { onRankChange(r.value); setRankOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[#2A2D45] ${
                  r.value === rank ? 'bg-[#2A2D45]' : ''
                }`}
              >
                <RankImg rankValue={r.value} color={r.color} size={7} />
                <span style={{ color: r.value === rank ? r.color : '#d1d5db' }}>{r.label}</span>
                {r.value === rank && (
                  <span className="ml-auto text-xs font-bold" style={{ color: r.color }}>✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
