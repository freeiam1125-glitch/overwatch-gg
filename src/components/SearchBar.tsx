import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchPlayers } from '../services/api';

interface SearchResult {
  player_id: string;
  name: string;
  avatar?: string;
  title?: string;
  career_section?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    clearTimeout(timeoutRef.current);
    if (!value.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    timeoutRef.current = setTimeout(async () => {

      setLoading(true);
      try {
        const data = await searchPlayers(value);
        setResults(data?.results || []);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const handleSelect = (playerId: string) => {
    setOpen(false);
    setQuery('');
    navigate(`/player/${encodeURIComponent(playerId)}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    setLoading(true);
    try {
      const data = await searchPlayers(query.trim());
      const first = data?.results?.[0];
      if (first) {
        navigate(`/player/${encodeURIComponent(first.player_id)}`);
      } else {
        navigate(`/player/${encodeURIComponent(query.trim())}`);
      }
    } catch {
      navigate(`/player/${encodeURIComponent(query.trim())}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glow border */}
        <div className="absolute -inset-px rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"
          style={{ background: 'linear-gradient(135deg, #9B30FF, #00F5E9)' }} />
        <div className="relative flex items-center rounded-2xl overflow-hidden group-focus-within:border-transparent transition-colors"
          style={{ background: '#0A0A18', border: '1px solid rgba(155,48,255,0.25)' }}>
          <Search className="absolute left-4 w-5 h-5 transition-colors text-[#5A5A7A] group-focus-within:text-[#9B30FF]" />
          <input
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="> BattleTag 검색 (예: Username#1234)"
            className="w-full bg-transparent pl-12 pr-10 py-4 text-white placeholder-[#5A5A7A] focus:outline-none text-sm font-mono"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); setResults([]); setOpen(false); }}
              className="absolute right-4 text-[#6B7280] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {open && (
        <div className="absolute top-full mt-2 w-full rounded-2xl shadow-2xl shadow-black/70 z-50 overflow-hidden"
          style={{ background: '#0A0A18', border: '1px solid rgba(155,48,255,0.3)' }}>
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, #9B30FF, #00F5E9)' }} />
          {loading ? (
            <div className="p-4 text-center text-sm font-mono text-[#9B30FF]">scanning...</div>
          ) : results.length > 0 ? (
            results.map((r) => (
              <button
                key={r.player_id}
                onClick={() => handleSelect(r.player_id)}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-left last:border-0"
                style={{ borderBottom: '1px solid rgba(155,48,255,0.1)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(155,48,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <img
                  src={r.avatar || '/overwatch-logo.png'}
                  alt={r.name}
                  className="w-9 h-9 rounded-xl object-cover"
                  style={{ background: '#1A1A32' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://overfast-api.tekrop.fr/static/player/default_player_icon.png'; }}
                />
                <div>
                  <p className="text-white font-medium text-sm">{r.name}</p>
                  {r.title && <p className="text-xs font-mono text-[#9B30FF]">{r.title}</p>}
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-sm font-mono text-[#5A5A7A]">// no results found</div>
          )}
        </div>
      )}
    </div>
  );
}
