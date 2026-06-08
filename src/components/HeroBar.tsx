import { formatTime } from '../utils/helpers';
import { getPortrait } from '../data/heroPortraits';

interface HeroData {
  hero: string;
  label: string;
  value: number;
}

interface Props {
  heroes: HeroData[];
  max: number;
}

const HERO_COLORS: Record<string, string> = {
  ana: '#5B8CBF',
  ashe: '#8B6914',
  baptiste: '#1CB0C8',
  bastion: '#4A7F4A',
  brigitte: '#B05A2A',
  cassidy: '#B83C28',
  dva: '#E91E8A',
  doomfist: '#7B3F9E',
  echo: '#5FC8E8',
  genji: '#4CB944',
  hanzo: '#B8A040',
  illari: '#E8C840',
  junker: '#C87840',
  junkrat: '#E8C820',
  kiriko: '#E84068',
  lifeweaver: '#E880A0',
  lucio: '#88C820',
  mauga: '#C84040',
  mei: '#68B8E8',
  mercy: '#E8D840',
  moira: '#9B3FA8',
  orisa: '#5A8840',
  pharah: '#2878C8',
  ramattra: '#7858C8',
  reaper: '#8B1A1A',
  reinhardt: '#8888A8',
  roadhog: '#C87028',
  sigma: '#8898B8',
  sojourn: '#E84820',
  soldier76: '#6878A8',
  sombra: '#6840B8',
  symmetra: '#60B0D8',
  torbjorn: '#C84020',
  tracer: '#E89820',
  venture: '#C8A040',
  widowmaker: '#7848A8',
  winston: '#A8A8B8',
  wreckingball: '#C87820',
  zarya: '#E868A8',
  zenyatta: '#E8C840',
};

export default function HeroBar({ heroes, max }: Props) {
  return (
    <div className="space-y-2">
      {heroes.slice(0, 5).map((h) => {
        const pct = max > 0 ? (h.value / max) * 100 : 0;
        const color = HERO_COLORS[h.hero] || '#F4871C';
        const heroName = h.label || h.hero;

        return (
          <div key={h.hero} className="flex items-center gap-3">
            <img
              src={getPortrait(h.hero)}
              alt={heroName}
              className="w-8 h-8 rounded-full object-cover bg-[#2A2D45] flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white font-medium truncate">{heroName}</span>
                <span className="text-gray-400 ml-2 flex-shrink-0">{formatTime(h.value)}</span>
              </div>
              <div className="h-1.5 bg-[#2A2D45] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
