import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, TrendingUp, BarChart2, Trophy, Skull, LogIn, LogOut, User } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import TierList from '../components/TierList';
import { useAuth } from '../contexts/AuthContext';

const CDN = 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/';
const EMP_ICON = CDN + '9ccf2688b89c3f17c3f6410c3142510ea413718f0d165f78e712184ec636b2e4.png';

export default function HomePage() {
  const [showStats, setShowStats] = useState(false);
  const { user, loading: authLoading, login, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#060610] hex-bg overflow-x-hidden">

      {/* ── Top nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-6 py-3"
        style={{ background: 'rgba(6,6,16,0.7)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(155,48,255,0.1)' }}>
        {!authLoading && (
          user ? (
            <div className="flex items-center gap-2">
              {/* 내 프로필 버튼 */}
              <Link to="/me"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                style={{ background: 'rgba(155,48,255,0.15)', border: '1px solid rgba(155,48,255,0.35)' }}>
                {user.avatar
                  ? <img src={user.avatar} alt="" className="w-6 h-6 rounded-lg object-cover" />
                  : <User className="w-4 h-4 text-[#9B30FF]" />
                }
                <span className="text-sm font-bold text-white">{user.battletag}</span>
              </Link>
              {/* 로그아웃 */}
              <button onClick={logout}
                className="p-1.5 rounded-xl transition-colors hover:text-white text-[#5A5A7A]"
                title="로그아웃">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={login}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, rgba(155,48,255,0.3), rgba(0,245,233,0.15))', border: '1px solid rgba(155,48,255,0.4)', color: 'white' }}>
              <LogIn className="w-4 h-4" />
              Battle.net 로그인
            </button>
          )
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <div className="relative flex flex-col items-center px-4 pt-24 pb-20">

        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#9B30FF] opacity-[0.08] blur-[140px]" />
          <div className="absolute top-32 right-1/4 w-[300px] h-[300px] rounded-full bg-[#00F5E9] opacity-[0.06] blur-[100px]" />
          <div className="absolute top-60 left-1/4 w-[200px] h-[200px] rounded-full bg-[#FF2D9B] opacity-[0.05] blur-[80px]" />
        </div>


        {/* Logo */}
        <div className="relative z-10 mb-10 text-center select-none">

          {/* EMP ultimate icon with glitch effect */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center glow-purple emp-glitch"
                style={{ background: '#0E0E1E', border: '1px solid rgba(155,48,255,0.4)' }}>
                <img src={EMP_ICON} alt="EMP" className="w-14 h-14 object-contain" />
              </div>
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-2xl border border-[#9B30FF] opacity-40 animate-ping" style={{ animationDuration: '3s' }} />
              {/* Cyan corner accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#00F5E9] rounded-tl opacity-80" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#00F5E9] rounded-tr opacity-80" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#00F5E9] rounded-bl opacity-80" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#00F5E9] rounded-br opacity-80" />
            </div>
          </div>

          {/* Site name */}
          <div className="glitch-text" data-text="BOOP.GG">
            <h1 className="text-6xl font-black tracking-tight leading-none">
              <span className="text-white">BOOP</span>
              <span style={{
                background: 'linear-gradient(90deg, #9B30FF, #00F5E9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>.GG</span>
            </h1>
          </div>

          {/* Tagline with cursor */}
          <p className="mt-3 text-[#5A5A7A] text-sm tracking-[0.3em] uppercase font-mono cursor">
            Overwatch 2 Stats &amp; Analytics
          </p>
        </div>

        {/* Search */}
        <div className="relative z-10 w-full max-w-2xl">
          <SearchBar />
          <p className="text-center text-[#5A5A7A] text-xs mt-3 font-mono tracking-wider">
            &gt; BattleTag 입력 후 엔터 (예: PlayerName#1234)
          </p>
        </div>


        {/* Feature cards */}
        <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
          {[
            {
              icon: Trophy,
              label: '경쟁전 랭크',
              sub: 'Competitive Rank',
              color: '#9B30FF',
              bg: 'rgba(155,48,255,0.08)',
              border: 'rgba(155,48,255,0.25)',
            },
            {
              icon: TrendingUp,
              label: '플레이어 분석',
              sub: 'Player Analysis',
              color: '#FF2D9B',
              bg: 'rgba(255,45,155,0.08)',
              border: 'rgba(255,45,155,0.25)',
            },
          ].map(f => (
            <div
              key={f.label}
              className="group flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-300 cursor-default"
              style={{ background: f.bg, border: `1px solid ${f.border}` }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${f.color}22` }}>
                <f.icon className="w-4 h-4" style={{ color: f.color }} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{f.label}</p>
                <p className="text-xs font-mono" style={{ color: f.color, opacity: 0.7 }}>{f.sub}</p>
              </div>
            </div>
          ))}

          {/* 영웅 통계 toggle */}
          <button
            onClick={() => setShowStats(v => !v)}
            className="group flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-300"
            style={{
              background: showStats ? 'rgba(0,245,233,0.1)' : 'rgba(0,245,233,0.05)',
              border: `1px solid ${showStats ? 'rgba(0,245,233,0.5)' : 'rgba(0,245,233,0.2)'}`,
              boxShadow: showStats ? '0 0 20px rgba(0,245,233,0.15)' : 'none',
            }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(0,245,233,0.15)' }}>
              <BarChart2 className="w-4 h-4 text-[#00F5E9]" />
            </div>
            <div className="text-left">
              <p className={`text-sm font-semibold ${showStats ? 'text-[#00F5E9]' : 'text-white'}`}>영웅 통계</p>
              <p className="text-xs font-mono text-[#00F5E9] opacity-70">Hero Statistics</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-[#00F5E9] transition-transform duration-300 ${showStats ? 'rotate-180' : ''}`} />
          </button>
        </div>


      </div>

      {/* ── Stats panel ────────────────────────────────── */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
        showStats ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="max-w-4xl w-full mx-auto px-4 pb-20 pt-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(155,48,255,0.4))' }} />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-sm font-bold text-[#00F5E9]"
              style={{ border: '1px solid rgba(0,245,233,0.3)', background: 'rgba(0,245,233,0.06)' }}>
              <Skull className="w-3.5 h-3.5" />
              HERO_STATS.EXE
            </div>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(0,245,233,0.4))' }} />
          </div>

          <div className="relative rounded-2xl overflow-hidden scan-line"
            style={{ background: '#0E0E1E', border: '1px solid rgba(155,48,255,0.2)' }}>
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #9B30FF, #00F5E9, transparent)' }} />
            <div className="p-5">
              <TierList />
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="mt-auto py-8 text-center" style={{ borderTop: '1px solid rgba(155,48,255,0.15)' }}>
        <p className="text-xs font-mono text-[#5A5A7A]">
          <span className="text-[#9B30FF]">BOOP.GG</span> — Blizzard Entertainment와 무관한 비공식 서비스
        </p>
        <p className="text-xs font-mono text-[#5A5A7A] mt-1">
          Powered by <span className="text-[#9B30FF]">Overfast API</span> · <span className="text-[#00F5E9]">Blizzard Stats API</span>
        </p>
      </footer>
    </div>
  );
}
