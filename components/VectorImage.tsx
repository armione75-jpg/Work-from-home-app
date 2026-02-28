
import React from 'react';
import { 
  ArrowDownToLine, 
  RefreshCw, 
  Maximize, 
  Link, 
  Accessibility, 
  RotateCw, 
  Hand, 
  EyeOff, 
  Wind, 
  Square, 
  Timer, 
  Circle, 
  Volume2,
  Activity,
  Zap,
  Moon,
  Sun,
  Coffee
} from 'lucide-react';

interface VectorImageProps {
  id: string;
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  'chin-tucks': <ArrowDownToLine size={48} />,
  'yes-no': <RefreshCw size={48} />,
  'cactus': <Maximize size={48} />,
  'eagle-arms': <Link size={48} />,
  'figure-4': <Accessibility size={48} />,
  'seated-twist': <RotateCw size={48} />,
  'zombie': <Hand size={48} />,
  'palming': <EyeOff size={48} />,
  'physio-sigh': <Wind size={48} />,
  'box-breathing': <Square size={48} />,
  '4-7-8-breath': <Timer size={48} />,
  'belly-breathing': <Circle size={48} />,
  'bumble-bee': <Volume2 size={48} />,
  // Routines
  'morning-flow': <Sun size={48} />,
  'neck-fix': <Activity size={48} />,
  'focus-booster': <Zap size={48} />,
  'anxiety-switch': <Wind size={48} />,
  'back-rescue': <Accessibility size={48} />,
  'bedtime-winddown': <Moon size={48} />,
  'lunch-reset': <Coffee size={48} />
};

const colorMap: Record<string, string> = {
  'Neck': 'bg-indigo-50 text-indigo-500',
  'Back': 'bg-rose-50 text-rose-500',
  'Wrists/Eyes': 'bg-amber-50 text-amber-500',
  'Breath': 'bg-emerald-50 text-emerald-500',
  'Mindset': 'bg-violet-50 text-violet-500'
};

const VectorImage: React.FC<VectorImageProps> = ({ id, className }) => {
  const icon = iconMap[id] || <Activity size={48} />;
  
  // Determine color based on ID prefix or routine name
  let colorClass = 'bg-stone-50 text-stone-400';
  if (id.includes('neck') || ['chin-tucks', 'yes-no', 'cactus', 'eagle-arms'].includes(id)) colorClass = 'bg-indigo-50 text-indigo-400';
  if (id.includes('back') || ['figure-4', 'seated-twist'].includes(id)) colorClass = 'bg-rose-50 text-rose-400';
  if (id.includes('wrist') || id.includes('eye') || ['zombie', 'palming'].includes(id)) colorClass = 'bg-amber-50 text-amber-400';
  if (id.includes('breath') || id.includes('sigh') || ['physio-sigh', 'box-breathing', '4-7-8-breath', 'belly-breathing', 'bumble-bee', 'anxiety-switch'].includes(id)) colorClass = 'bg-emerald-50 text-emerald-400';
  if (id.includes('morning')) colorClass = 'bg-orange-50 text-orange-400';
  if (id.includes('bedtime')) colorClass = 'bg-indigo-900/10 text-indigo-400';
  if (id.includes('focus')) colorClass = 'bg-violet-50 text-violet-400';

  return (
    <div className={`${className} ${colorClass} flex items-center justify-center relative overflow-hidden`}>
      <div className="relative z-10 animate-in fade-in zoom-in duration-700">
        {icon}
      </div>
      {/* Decorative background elements to make it feel "vectorial" */}
      <div className="absolute top-[-10%] right-[-10%] w-24 h-24 rounded-full bg-current opacity-5 blur-2xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-16 h-16 rounded-full bg-current opacity-10 blur-xl" />
    </div>
  );
};

export default VectorImage;
