import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, AlertCircle, Shield, Crosshair, Heart, Users } from 'lucide-react';
import { getPortrait } from '../data/heroPortraits';
import { getPlayerSummary, getPlayerStats } from '../services/api';
import WinRateChart from '../components/WinRateChart';
import PlayerTraits from '../components/PlayerTraits';
import SearchBar from '../components/SearchBar';
import { formatTime, formatNumber, ROLE_LABELS, DIVISION_COLORS, getRankLabel } from '../utils/helpers';

type Mode = 'quickplay' | 'competitive';

const ROLE_ICONS: Record<string, React.ReactNode> = {
  tank:    <Shield   className="w-3.5 h-3.5" />,
  damage:  <Crosshair className="w-3.5 h-3.5" />,
  support: <Heart    className="w-3.5 h-3.5" />,
  open:    <Users    className="w-3.5 h-3.5" />,
};

const ROLE_COLORS: Record<string, string> = {
  tank: '#4A90D9', damage: '#E5464A', support: '#4CAF50', open: '#9B59B6',
};

function heroDisplayName(slug: string): string {
  const MAP: Record<string, string> = {
    'soldier-76': '솔저: 76', 'wrecking-ball': '레킹볼', 'junker-queen': '정커퀸',
    'd-va': 'D.Va', 'torbjorn': '토르비욘', 'ana': '아나',
    'orisa': '오리사', 'reinhardt': '라인하르트', 'roadhog': '로드호그',
    'sigma': '시그마', 'winston': '윈스턴', 'zarya': '자리야', 'doomfist': '둠피스트',
    'ramattra': '라마트라', 'mauga': '마우가', 'hazard': '헤이저드',
    'ashe': '애쉬', 'bastion': '바스티온', 'cassidy': '캐서디',
    'echo': '에코', 'genji': '겐지', 'hanzo': '한조', 'junkrat': '정크랫',
    'mei': '메이', 'pharah': '파라', 'reaper': '리퍼', 'sojourn': '소전',
    'sombra': '솜브라', 'symmetra': '시메트라', 'torbjörn': '토르비욘',
    'tracer': '트레이서', 'widowmaker': '위도우메이커', 'baptiste': '바티스트',
    'brigitte': '브리기테', 'kiriko': '키리코', 'lifeweaver': '라이프위버',
    'lucio': '루시우', 'mercy': '메르시', 'moira': '모이라', 'zenyatta': '젠야타',
    'illari': '일리아리', 'juno': '주노', 'venture': '벤처', 'ram': '라마트라',
    'jetpack-cat': '제트팩 캣', 'freja': '프레야', 'black-cat': '블랙 캣',
    'emre-sarioglu': '엠레', 'aqua': '아쿠아', 'hanamura': '하나무라',
    'mirrorwatch-symmetra': '미러워치 시메트라',
  };
  return MAP[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ── Hero Records Table ───────────────────────────────────
type SortKey = 'time_played' | 'games_played' | 'winrate' | 'kda';

function HeroRecordsTable({ heroes, mode }: { heroes: any[]; mode: Mode }) {
  const [sort, setSort] = useState<SortKey>('time_played');
  const [asc, setAsc]   = useState(false);

  const sorted = [...heroes].sort((a, b) => {
    const av = a[sort] ?? 0, bv = b[sort] ?? 0;
    return asc ? av - bv : bv - av;
  });

  const col = (key: SortKey, label: string, cls = '') => (
    <th
      className={`px-3 py-2.5 text-left text-[10px] font-mono uppercase tracking-wider cursor-pointer select-none transition-colors hover:text-[#9B30FF] ${sort === key ? 'text-[#9B30FF]' : 'text-[#5A5A7A]'} ${cls}`}
      onClick={() => { sort === key ? setAsc(v => !v) : setSort(key); setAsc(false); }}
    >
      {label}{sort === key ? (asc ? ' ↑' : ' ↓') : ''}
    </th>
  );

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#0C0C1C', border: '1px solid #1A1A30' }}>
      {/* header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <p className="text-xs font-mono text-[#5A5A7A] uppercase tracking-wider">영웅별 대전 기록</p>
        <span className="text-[10px] font-mono text-[#3A3A5A]">// 컬럼 클릭시 정렬</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #1A1A30' }}>
              <th className="px-3 py-2.5 text-left text-[10px] font-mono uppercase tracking-wider text-[#5A5A7A] w-8">#</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-mono uppercase tracking-wider text-[#5A5A7A]">영웅</th>
              {col('time_played',  '플레이 시간')}
              {col('games_played', '게임 수')}
              {col('winrate',      '승률')}
              {col('kda',         'KDA')}
              <th className="px-3 py-2.5 text-left text-[10px] font-mono uppercase tracking-wider text-[#5A5A7A]">승/패</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((h, i) => {
              const wr = h.winrate
                ? Math.round(h.winrate)
                : h.games_played ? Math.round((h.games_won / h.games_played) * 100) : 0;
              const wrColor = wr >= 55 ? '#4CAF50' : wr >= 45 ? '#F5C518' : '#E5464A';
              const gamesLostH = h.games_played - (h.games_won ?? 0);
              return (
                <tr key={h.hero}
                  className="transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(155,48,255,0.05)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* rank */}
                  <td className="px-3 py-2.5">
                    <span className="text-[11px] font-mono text-[#3A3A5A]">{i + 1}</span>
                  </td>
                  {/* hero */}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2.5 min-w-[130px]">
                      <img
                        src={getPortrait(h.hero)}
                        alt={h.hero}
                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                        style={{ background: '#1A1A2E' }}
                        onError={e => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                      />
                      <span className="text-[#C0C0D8] font-medium text-xs">{heroDisplayName(h.hero)}</span>
                    </div>
                  </td>
                  {/* time */}
                  <td className="px-3 py-2.5">
                    <span className="text-[#9B9BB5] font-mono text-xs">{formatTime(h.time_played)}</span>
                  </td>
                  {/* games */}
                  <td className="px-3 py-2.5">
                    <span className="text-[#9B9BB5] font-mono text-xs">{h.games_played}</span>
                  </td>
                  {/* winrate bar */}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2 min-w-[80px]">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#1A1A30' }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${wr}%`, background: wrColor }} />
                      </div>
                      <span className="text-xs font-bold w-9 text-right flex-shrink-0" style={{ color: wrColor }}>{wr}%</span>
                    </div>
                  </td>
                  {/* kda */}
                  <td className="px-3 py-2.5">
                    <span className="text-[#00F5E9] font-mono text-xs font-bold">
                      {h.kda ? h.kda.toFixed(2) : '-'}
                    </span>
                  </td>
                  {/* W/L pills */}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: 'rgba(76,175,80,0.15)', color: '#4CAF50' }}>
                        {h.games_won ?? 0}W
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: 'rgba(229,70,74,0.15)', color: '#E5464A' }}>
                        {gamesLostH > 0 ? gamesLostH : 0}L
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3" style={{ borderTop: '1px solid #1A1A30' }}>
        <p className="text-[10px] font-mono text-[#3A3A5A]">
          // 총 {heroes.length}개 영웅 · {mode === 'competitive' ? '경쟁전' : '빠른 대전'} 누적 기록
        </p>
      </div>
    </div>
  );
}

function StatPill({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <span className="text-[10px] font-mono text-[#5A5A7A] uppercase tracking-wider">{label}</span>
      <span className="text-sm font-bold" style={{ color: color || '#E0E0F0' }}>{value}</span>
    </div>
  );
}

export default function PlayerPage() {
  const { playerId } = useParams<{ playerId: string }>();
  const [summary, setSummary]     = useState<any>(null);
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading]     = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [error, setError]         = useState('');
  const [mode, setMode]           = useState<Mode>('competitive');

  const load = async () => {
    if (!playerId) return;
    setLoading(true);
    setError('');
    setSummary(null);
    setStatsData(null);
    try {
      const sum = await getPlayerSummary(playerId);
      setSummary(sum);
      try {
        const stats = await getPlayerStats(playerId, mode);
        setStatsData(stats);
      } catch { setStatsData(null); }
    } catch (e: any) {
      setError(e?.response?.status === 404
        ? '플레이어를 찾을 수 없습니다. BattleTag를 확인해주세요.'
        : '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [playerId]);

  useEffect(() => {
    if (!playerId || !summary) return;
    setStatsLoading(true);
    getPlayerStats(playerId, mode)
      .then(setStatsData)
      .catch(() => setStatsData(null))
      .finally(() => setStatsLoading(false));
  }, [mode]);

  // ── derived data ──────────────────────────────────────
  const compRanks = summary?.competitive?.pc;

  const gen = statsData?.general;
  const gamesWon    = gen?.games_won    ?? 0;
  const gamesLost   = gen?.games_lost   ?? 0;
  const gamesPlayed = gen?.games_played ?? 0;
  const timePlayed  = gen?.time_played  ?? 0;
  const eliminations = gen?.total?.eliminations ?? 0;
  const deaths       = gen?.total?.deaths       ?? 0;
  const damageDone   = gen?.total?.damage       ?? 0;
  const healingDone  = gen?.total?.healing      ?? 0;
  const kda          = gen?.kda ?? (deaths > 0 ? eliminations / deaths : eliminations);
  const elim10  = gen?.average?.eliminations ?? 0;
  const deaths10 = timePlayed > 0 ? (deaths / timePlayed) * 600 : 0;
  const dmg10   = gen?.average?.damage   ?? 0;
  const heal10  = gen?.average?.healing  ?? 0;

  // Top heroes sorted by time_played
  const topHeroes: any[] = statsData?.heroes
    ? Object.entries(statsData.heroes)
        .map(([hero, s]: [string, any]) => ({
          hero,
          time_played:  s?.time_played  ?? 0,
          games_played: s?.games_played ?? 0,
          games_won:    s?.games_won    ?? 0,
          winrate:      s?.winrate      ?? 0,
          kda:          s?.kda          ?? 0,
        }))
        .filter(h => h.time_played > 0)
        .sort((a, b) => b.time_played - a.time_played)
    : [];

  // ── render ────────────────────────────────────────────
  return (
    <div className="min-h-screen text-white" style={{ background: '#070712' }}>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40 glass border-b border-[#1A1A30]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1 font-black text-xl hover:opacity-80 transition-opacity flex-shrink-0">
            <span className="text-white">BOOP</span>
            <span style={{ background: 'linear-gradient(90deg,#9B30FF,#00F5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>.GG</span>
          </Link>
          <div className="flex-1 max-w-lg"><SearchBar /></div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-5">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[#5A5A7A] hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 홈으로
        </Link>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-[#9B30FF] border-t-transparent animate-spin" />
            <p className="text-[#5A5A7A] text-sm font-mono">// scanning player data...</p>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-red-400 font-semibold">{error}</p>
            <button onClick={load} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
              style={{ background: 'rgba(155,48,255,0.2)', border: '1px solid rgba(155,48,255,0.4)' }}>
              <RefreshCw className="w-4 h-4" /> 다시 시도
            </button>
          </div>
        )}

        {!loading && !error && summary && (
          <div className="space-y-4">

            {/* ══════════════════════════════════════════
                PROFILE HEADER — 인게임 프로필 스타일
            ══════════════════════════════════════════ */}
            <div className="rounded-2xl overflow-hidden" style={{ background: '#0C0C1C', border: '1px solid #1A1A30' }}>

              {/* Namecard banner */}
              <div className="relative h-40 overflow-hidden">
                {summary.namecard
                  ? <img src={summary.namecard} alt="namecard" className="w-full h-full object-cover" />
                  : <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #0E0E20 0%, #1A0A30 50%, #060618 100%)' }} />
                }
                {/* Gradient fade bottom */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, #0C0C1C 100%)' }} />
                {/* Top-right refresh */}
                <button onClick={load} className="absolute top-3 right-3 p-2 rounded-lg transition-colors"
                  style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <RefreshCw className="w-3.5 h-3.5 text-[#9B9BB5]" />
                </button>
              </div>

              {/* Avatar + identity */}
              <div className="px-6 pb-5 -mt-14 relative">
                <div className="flex items-end gap-5">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-xl overflow-hidden" style={{ border: '3px solid #9B30FF', boxShadow: '0 0 20px rgba(155,48,255,0.5)' }}>
                      <img
                        src={summary.avatar || 'https://overfast-api.tekrop.fr/static/player/default_player_icon.png'}
                        alt={summary.username}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://overfast-api.tekrop.fr/static/player/default_player_icon.png'; }}
                      />
                    </div>
                    {/* Endorsement badge */}
                    {summary.endorsement && (
                      <div className="absolute -bottom-1 -right-1 w-7 h-7">
                        <img src={summary.endorsement.frame} alt="endorsement" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>

                  {/* Name + title */}
                  <div className="pb-1">
                    <h1 className="text-2xl font-black text-white leading-none">{summary.username}</h1>
                    {summary.title
                      ? <p className="mt-1 text-sm font-mono" style={{ color: '#00F5E9' }}>{summary.title}</p>
                      : <p className="mt-1 text-sm font-mono text-[#3A3A5A]">// no title</p>
                    }
                    {summary.endorsement && (
                      <p className="mt-1 text-xs text-[#5A5A7A]">인정 레벨 {summary.endorsement.level}</p>
                    )}
                  </div>
                </div>

                {/* ── Competitive ranks inline ── */}
                {compRanks && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(['tank', 'damage', 'support', 'open'] as const).map(role => {
                      const rank = compRanks[role];
                      if (!rank) return null;
                      const divColor = DIVISION_COLORS[rank.division] || '#9B9B9B';
                      return (
                        <div key={role} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                          style={{ background: divColor + '12', border: `1px solid ${divColor}30` }}>
                          {/* Role icon */}
                          <span style={{ color: ROLE_COLORS[role] }}>{ROLE_ICONS[role]}</span>
                          {/* Rank image */}
                          <img src={rank.rank_icon} alt={rank.division}
                            className="w-9 h-9 object-contain drop-shadow-lg"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          {/* Division text */}
                          <div>
                            <p className="text-xs font-mono text-[#5A5A7A]">{ROLE_LABELS[role] || role}</p>
                            <p className="text-sm font-bold leading-none" style={{ color: divColor }}>
                              {getRankLabel(rank.division, rank.tier)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    {!['tank','damage','support','open'].some(r => compRanks[r]) && (
                      <p className="text-[#5A5A7A] text-sm font-mono">// 경쟁전 배치 미완료</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ══════════════════════════════════════════
                TOP 3 HEROES
            ══════════════════════════════════════════ */}
            {topHeroes.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(155,48,255,0.3))' }} />
                  <span className="text-[11px] font-mono tracking-[0.2em] text-[#9B30FF] opacity-80">
                    TOP_HEROES.{mode === 'competitive' ? 'COMP' : 'QP'}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(155,48,255,0.3))' }} />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {topHeroes.slice(0, 3).map((h, i) => {
                    const portrait = getPortrait(h.hero);
                    const wr = h.winrate ? Math.round(h.winrate) : (h.games_played ? Math.round((h.games_won / h.games_played) * 100) : 0);
                    const medals = ['🥇', '🥈', '🥉'];
                    const accentColors = ['#9B30FF', '#6B20D0', '#4A1590'];
                    return (
                      <div key={h.hero} className="relative rounded-2xl overflow-hidden flex flex-col"
                        style={{ background: '#0C0C1C', border: `1px solid ${accentColors[i]}40` }}>

                        {/* Medal badge */}
                        <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-sm"
                          style={{ background: 'rgba(0,0,0,0.7)' }}>
                          {medals[i]}
                        </div>

                        {/* Hero portrait — tall crop */}
                        <div className="relative overflow-hidden" style={{ height: 180 }}>
                          <img
                            src={portrait}
                            alt={h.hero}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://overfast-api.tekrop.fr/static/player/default_player_icon.png'; }}
                          />
                          {/* Bottom fade */}
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, #0C0C1C 100%)' }} />
                          {/* Rank # overlay */}
                          <div className="absolute bottom-2 right-2">
                            <span className="text-xs font-black font-mono" style={{ color: accentColors[i], textShadow: `0 0 8px ${accentColors[i]}` }}>
                              #{i + 1}
                            </span>
                          </div>
                        </div>

                        {/* Hero info */}
                        <div className="px-3 pb-3 pt-1">
                          <p className="font-bold text-white text-sm truncate">{heroDisplayName(h.hero)}</p>
                          <p className="text-[11px] font-mono text-[#5A5A7A] mb-2">{formatTime(h.time_played)}</p>

                          {/* Stats row */}
                          <div className="grid grid-cols-3 gap-1">
                            <div className="flex flex-col items-center py-1.5 rounded-lg"
                              style={{ background: 'rgba(255,255,255,0.04)' }}>
                              <span className="text-[9px] font-mono text-[#5A5A7A]">승률</span>
                              <span className="text-xs font-bold"
                                style={{ color: wr >= 55 ? '#4CAF50' : wr >= 45 ? '#F5C518' : '#E5464A' }}>
                                {wr}%
                              </span>
                            </div>
                            <div className="flex flex-col items-center py-1.5 rounded-lg"
                              style={{ background: 'rgba(255,255,255,0.04)' }}>
                              <span className="text-[9px] font-mono text-[#5A5A7A]">KDA</span>
                              <span className="text-xs font-bold text-[#00F5E9]">{h.kda ? h.kda.toFixed(1) : '-'}</span>
                            </div>
                            <div className="flex flex-col items-center py-1.5 rounded-lg"
                              style={{ background: 'rgba(255,255,255,0.04)' }}>
                              <span className="text-[9px] font-mono text-[#5A5A7A]">게임</span>
                              <span className="text-xs font-bold text-[#9B9BB5]">{h.games_played}</span>
                            </div>
                          </div>
                        </div>

                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${accentColors[i]}, transparent)` }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════
                MODE TOGGLE + STATS
            ══════════════════════════════════════════ */}
            <div className="flex gap-1 p-1 rounded-xl w-fit"
              style={{ background: '#0C0C1C', border: '1px solid #1A1A30' }}>
              {(['competitive', 'quickplay'] as Mode[]).map(m => (
                <button key={m} onClick={() => setMode(m)}
                  className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={mode === m
                    ? { background: 'rgba(155,48,255,0.25)', color: '#9B30FF', border: '1px solid rgba(155,48,255,0.4)' }
                    : { color: '#5A5A7A', border: '1px solid transparent' }}>
                  {m === 'competitive' ? '경쟁전' : '빠른 대전'}
                </button>
              ))}
            </div>

            {statsLoading && (
              <div className="flex items-center gap-2 text-[#5A5A7A] text-sm font-mono py-2">
                <div className="w-3 h-3 rounded-full border border-[#9B30FF] border-t-transparent animate-spin" />
                loading stats...
              </div>
            )}

            {!statsLoading && !statsData && (
              <div className="rounded-2xl p-10 text-center" style={{ background: '#0C0C1C', border: '1px solid #1A1A30' }}>
                <p className="text-[#5A5A7A] font-mono text-sm">
                  // {mode === 'competitive' ? '경쟁전' : '빠른 대전'} 데이터가 없습니다
                </p>
              </div>
            )}

            {!statsLoading && statsData && (
              <>
                {/* ── Key stats grid ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: '플레이 시간', value: formatTime(timePlayed), color: '#00F5E9' },
                    { label: 'KDA', value: kda.toFixed(2), color: kda >= 3 ? '#4CAF50' : kda >= 2 ? '#F5C518' : '#FF6B6B' },
                    { label: '10분당 딜량', value: formatNumber(Math.round(dmg10)), color: '#FF8C42' },
                    { label: '10분당 힐량', value: formatNumber(Math.round(heal10)), color: '#E91E8A' },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: '#0C0C1C', border: '1px solid #1A1A30' }}>
                      <p className="text-[10px] font-mono text-[#5A5A7A] uppercase tracking-wider mb-1">{s.label}</p>
                      <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* ── Win rate + more heroes ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Win/Loss */}
                  <div className="rounded-2xl p-5" style={{ background: '#0C0C1C', border: '1px solid #1A1A30' }}>
                    <p className="text-xs font-mono text-[#5A5A7A] mb-4 uppercase tracking-wider">승/패 기록</p>
                    <div className="flex items-center justify-around">
                      <WinRateChart wins={gamesWon} losses={gamesLost} />
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-3xl font-black text-white">{gamesPlayed}</p>
                          <p className="text-[#5A5A7A] text-xs font-mono">총 게임</p>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-center px-3 py-1.5 rounded-lg" style={{ background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.2)' }}>
                            <p className="font-black text-[#4CAF50]">{gamesWon}</p>
                            <p className="text-[#5A5A7A] text-[10px]">승</p>
                          </div>
                          <div className="text-center px-3 py-1.5 rounded-lg" style={{ background: 'rgba(229,70,74,0.1)', border: '1px solid rgba(229,70,74,0.2)' }}>
                            <p className="font-black text-[#E5464A]">{gamesLost}</p>
                            <p className="text-[#5A5A7A] text-[10px]">패</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* More heroes 4~8 */}
                  <div className="rounded-2xl p-5" style={{ background: '#0C0C1C', border: '1px solid #1A1A30' }}>
                    <p className="text-xs font-mono text-[#5A5A7A] mb-4 uppercase tracking-wider">플레이 영웅</p>
                    <div className="space-y-2">
                      {topHeroes.slice(3, 8).map((h) => {
                        const wr = h.winrate ? Math.round(h.winrate) : (h.games_played ? Math.round((h.games_won / h.games_played) * 100) : 0);
                        const pct = topHeroes[0] ? (h.time_played / topHeroes[0].time_played) * 100 : 0;
                        return (
                          <div key={h.hero} className="flex items-center gap-2">
                            <img src={getPortrait(h.hero)} alt={h.hero}
                              className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
                              style={{ background: '#1A1A2E' }}
                              onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between text-xs mb-0.5">
                                <span className="text-[#C0C0D8] font-medium truncate">{heroDisplayName(h.hero)}</span>
                                <span className="text-[#5A5A7A] font-mono flex-shrink-0 ml-2">{formatTime(h.time_played)}</span>
                              </div>
                              <div className="h-1 rounded-full overflow-hidden" style={{ background: '#1A1A30' }}>
                                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #9B30FF, #00F5E9)' }} />
                              </div>
                            </div>
                            <span className="text-[11px] font-mono flex-shrink-0 w-9 text-right"
                              style={{ color: wr >= 55 ? '#4CAF50' : wr >= 45 ? '#F5C518' : '#E5464A' }}>
                              {wr}%
                            </span>
                          </div>
                        );
                      })}
                      {topHeroes.length === 0 && <p className="text-[#5A5A7A] text-sm font-mono text-center py-3">// no data</p>}
                    </div>
                  </div>
                </div>

                {/* ── Combat stats ── */}
                <div className="rounded-2xl p-5" style={{ background: '#0C0C1C', border: '1px solid #1A1A30' }}>
                  <p className="text-xs font-mono text-[#5A5A7A] mb-4 uppercase tracking-wider">전투 통계</p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      { label: '총 처치', value: formatNumber(eliminations) },
                      { label: '총 사망', value: formatNumber(deaths) },
                      { label: '10분 처치', value: elim10.toFixed(1) },
                      { label: '10분 사망', value: deaths10.toFixed(1) },
                      { label: '총 딜량', value: formatNumber(damageDone) },
                      { label: '총 힐량', value: formatNumber(healingDone) },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="text-[9px] font-mono text-[#5A5A7A] mb-1">{s.label}</p>
                        <p className="text-sm font-bold text-[#C0C0D8]">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Player traits ── */}
                <div className="rounded-2xl p-5" style={{ background: '#0C0C1C', border: '1px solid #1A1A30' }}>
                  <p className="text-xs font-mono text-[#5A5A7A] mb-4 uppercase tracking-wider">플레이어 분석</p>
                  <PlayerTraits
                    stats={{ wins: gamesWon, losses: gamesLost, games_played: gamesPlayed, time_played: timePlayed,
                      kda, eliminations_per_10: elim10, deaths_per_10: deaths10, damage_per_10: dmg10, healing_per_10: heal10 }}
                    topHeroes={topHeroes.slice(0, 3).map(h => h.hero)}
                  />
                </div>

                {/* ── Hero records table ── */}
                {topHeroes.length > 0 && (
                  <HeroRecordsTable heroes={topHeroes} mode={mode} />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
