import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from '../components/SearchBar';

export default function MyProfilePage() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();

  // 로그인 상태면 플레이어 프로필로 자동 이동
  useEffect(() => {
    if (!loading && user?.playerId) {
      navigate(`/player/${encodeURIComponent(user.playerId)}`, { replace: true });
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#070712' }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#9B30FF] animate-spin" />
          <p className="text-[#5A5A7A] font-mono text-sm">// authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ background: '#070712' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 glass border-b border-[#1A1A30]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1 font-black text-xl hover:opacity-80 flex-shrink-0">
            <span className="text-white">BOOP</span>
            <span style={{ background: 'linear-gradient(90deg,#9B30FF,#00F5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>.GG</span>
          </Link>
          <div className="flex-1 max-w-lg"><SearchBar /></div>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center gap-8">
        <Link to="/" className="self-start inline-flex items-center gap-1.5 text-[#5A5A7A] hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> 홈으로
        </Link>

        {/* Login card */}
        <div className="w-full rounded-2xl overflow-hidden" style={{ background: '#0C0C1C', border: '1px solid #1A1A30' }}>
          {/* Top gradient line */}
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #9B30FF, #00F5E9, transparent)' }} />

          <div className="p-8 flex flex-col items-center gap-6">
            {/* Blizzard logo area */}
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(155,48,255,0.1)', border: '1px solid rgba(155,48,255,0.3)', boxShadow: '0 0 30px rgba(155,48,255,0.2)' }}>
              {/* Blizzard SVG icon */}
              <svg viewBox="0 0 100 100" className="w-12 h-12">
                <defs>
                  <linearGradient id="blizGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9B30FF"/>
                    <stop offset="100%" stopColor="#00F5E9"/>
                  </linearGradient>
                </defs>
                <path fill="url(#blizGrad)" d="M50 5
                  C27 5 8 24 8 47
                  C8 58 12 68 19 75
                  L15 90 L28 83
                  C34 87 42 89 50 89
                  C73 89 92 70 92 47
                  C92 24 73 5 50 5Z
                  M50 15 C67 15 82 29 82 47
                  C82 65 67 79 50 79
                  C43 79 37 77 32 73
                  L24 77 L26 69
                  C20 63 18 55 18 47
                  C18 29 33 15 50 15Z" />
                <text x="50" y="58" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial">B</text>
              </svg>
            </div>

            <div className="text-center">
              <h1 className="text-xl font-black text-white">Battle.net 로그인</h1>
              <p className="mt-2 text-sm text-[#5A5A7A] font-mono leading-relaxed">
                블리자드 계정으로 로그인하면<br/>내 오버워치 2 프로필을 바로 확인할 수 있어요
              </p>
            </div>

            {/* Login button */}
            <button
              onClick={login}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #9B30FF, #6B10CF)',
                boxShadow: '0 0 30px rgba(155,48,255,0.4)',
              }}
            >
              <User className="w-5 h-5" />
              Battle.net으로 로그인
            </button>

            <div className="flex items-center gap-3 w-full">
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="text-[11px] font-mono text-[#3A3A5A]">또는</span>
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <p className="text-xs text-[#5A5A7A] font-mono text-center">
              로그인 없이도 검색창에서<br/>BattleTag로 다른 플레이어 조회 가능
            </p>
          </div>
        </div>

        {/* Notice */}
        <div className="w-full rounded-xl p-4" style={{ background: 'rgba(0,245,233,0.04)', border: '1px solid rgba(0,245,233,0.1)' }}>
          <p className="text-[11px] font-mono text-[#00F5E9] opacity-70 leading-relaxed">
            // 로그인은 본인 프로필 조회 전용입니다<br/>
            // 블리자드 계정 정보는 저장되지 않습니다<br/>
            // 프로필 공개 설정이 되어있어야 합니다
          </p>
        </div>
      </div>
    </div>
  );
}
