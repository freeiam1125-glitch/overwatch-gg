import { useState } from 'react';
import { TrendingUp, Users, ShieldOff, ChevronDown } from 'lucide-react';
import { getHeroStats, type Region } from '../data/winRateData';
import { getPortrait } from '../data/heroPortraits';
import { ROLE_IMGS } from '../data/rankImages';

type RoleFilter = 'all' | 'tank' | 'damage' | 'support';

const REGIONS: { value: Region; label: string; flag: string }[] = [
  { value: 'asia',     label: '아시아',   flag: '🌏' },
  { value: 'americas', label: '아메리카', flag: '🇺🇸' },
  { value: 'europe',   label: '유럽',     flag: '🇪🇺' },
];

const ROLE_FILTERS: { value: RoleFilter; label: string }[] = [
  { value: 'all',     label: '전체' },
  { value: 'tank',    label: '탱커' },
  { value: 'damage',  label: '딜러' },
  { value: 'support', label: '지원가' },
];

const ROLE_COLORS = { tank: '#4A90D9', damage: '#E5464A', support: '#4CAF50' };

function winRateColor(wr: number) {
  if (wr >= 54) return '#4CAF50';
  if (wr >= 52) return '#8BC34A';
  if (wr >= 50) return '#FFC107';
  if (wr >= 48) return '#FF9800';
  return '#E5464A';
}

export default function TierList() {
  const [region, setRegion]   = useState<Region>('asia');
  const [role, setRole]       = useState<RoleFilter>('all');
  const [regionOpen, setRegionOpen] = useState(false);

  const heroes = getHeroStats(region, role);
  const avg    = heroes.reduce((s, h) => s + h.winRate, 0) / (heroes.length || 1);

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {/* Region dropdown */}
        <div className="relative">
          <button
            onClick={() => setRegionOpen(o => !o)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0D0D1A] border border-[#1E1E35] rounded-xl text-sm font-medium hover:border-[#F4871C60] transition-colors min-w-[130px]"
          >
            <span>{REGIONS.find(r => r.value === region)?.flag}</span>
            <span className="text-white flex-1">{REGIONS.find(r => r.value === region)?.label}</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${regionOpen ? 'rotate-180' : ''}`} />
          </button>
          {regionOpen && (
            <div className="absolute top-full mt-1 w-full bg-[#0D0D1A] border border-[#1E1E35] rounded-xl overflow-hidden shadow-2xl z-30">
              {REGIONS.map(r => (
                <button
                  key={r.value}
                  onClick={() => { setRegion(r.value); setRegionOpen(false); }}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-[#2A2D45] ${
                    r.value === region ? 'text-[#7C3AED] bg-[#F4871C10]' : 'text-gray-300'
                  }`}
                >
                  <span>{r.flag}</span>
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Role filter tabs */}
        <div className="flex bg-[#0D0D1A] border border-[#1E1E35] rounded-xl p-1">
          {ROLE_FILTERS.map(r => (
            <button
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                role === r.value ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              {r.value !== 'all' && (
                <img
                  src={ROLE_IMGS[r.value]}
                  alt={r.label}
                  className="w-4 h-4 object-contain"
                  style={{ filter: role === r.value ? 'brightness(0) invert(1)' : 'brightness(0) invert(1) opacity(0.4)' }}
                />
              )}
              {r.label}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="ml-auto text-xs text-gray-500 text-right">
          <span className="text-gray-400">{heroes.length}명</span>
          <span className="mx-1">·</span>
          <span>평균 승률 </span>
          <span className="font-bold text-white">{avg.toFixed(1)}%</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#080810] rounded-2xl border border-[#1E1E35] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2rem_1fr_auto_auto_auto] gap-3 px-4 py-2.5 border-b border-[#1E1E35] bg-[#0D0D1A] text-xs text-gray-500 uppercase tracking-wider">
          <span>#</span>
          <span>영웅</span>
          <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> 승률</span>
          <span className="flex items-center gap-1 w-12 justify-end"><Users className="w-3 h-3" /> 픽률</span>
          <span className="flex items-center gap-1 w-12 justify-end"><ShieldOff className="w-3 h-3" /> 밴률</span>
        </div>

        {heroes.map((h, i) => {
          const wr = h.winRate;
          const wrColor = winRateColor(wr);
          const wrBar = ((wr - 42) / 16) * 100;
          const banColor = h.banRate >= 30 ? '#E5464A' : h.banRate >= 15 ? '#FF9800' : h.banRate >= 5 ? '#FFC107' : '#6b7280';

          return (
            <div
              key={h.hero}
              className="grid grid-cols-[2rem_1fr_auto_auto_auto] gap-3 items-center px-4 py-2.5 hover:bg-white/5 transition-colors border-b border-[#1E1E35]/30 last:border-0"
            >
              {/* Rank */}
              <span className={`text-sm font-bold text-center ${
                i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-amber-600' : 'text-gray-600'
              }`}>
                {i + 1}
              </span>

              {/* Hero */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={getPortrait(h.hero)}
                  alt={h.label}
                  className="w-9 h-9 rounded-lg object-cover bg-[#2A2D45] flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm text-white font-medium truncate">{h.label}</p>
                  <p className="text-xs" style={{ color: ROLE_COLORS[h.role] }}>
                    {h.role === 'tank' ? '탱커' : h.role === 'damage' ? '딜러' : '지원가'}
                  </p>
                </div>
              </div>

              {/* Win rate */}
              <div className="flex items-center gap-2 w-28">
                <div className="flex-1 h-1.5 bg-[#2A2D45] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(0, Math.min(100, wrBar))}%`, backgroundColor: wrColor }}
                  />
                </div>
                <span className="text-sm font-bold w-10 text-right" style={{ color: wrColor }}>
                  {wr.toFixed(1)}%
                </span>
              </div>

              {/* Pick rate */}
              <span className="text-xs text-gray-500 w-12 text-right">
                {h.pickRate.toFixed(1)}%
              </span>

              {/* Ban rate */}
              <span className="text-xs font-semibold w-12 text-right" style={{ color: banColor }}>
                {h.banRate.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-center text-gray-600 text-xs mt-4">
        출처: <a
          href="https://overwatch.blizzard.com/ko-kr/rates/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7C3AED] hover:underline"
        >
          Blizzard Entertainment 공식 영웅 통계
        </a>
        &nbsp;· PC 경쟁전 전체 랭크 통합 데이터
      </p>
    </div>
  );
}
