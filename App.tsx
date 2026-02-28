
import React, { useState, useEffect, useMemo } from 'react';
import { UserProgress, DayProgress } from './types';
import { EXERCISES, ROUTINES } from './constants';
import VectorImage from './components/VectorImage';
import { 
  Home, 
  Activity, 
  Calendar, 
  BookOpen, 
  ChevronRight, 
  PlayCircle, 
  CheckCircle2, 
  Info,
  Wind,
  Moon,
  Sun,
  Zap,
  ShieldAlert,
  Trophy,
  Flame,
  BarChart3,
  LogOut,
  User,
  Lock,
  Mail,
  Loader2,
  X,
  Pause,
  Play,
  ChevronLeft
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'exercises' | 'routines' | 'tracker'>('home');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<UserProgress>({});
  const [activeRoutine, setActiveRoutine] = useState<any>(null);

  // Auth Check
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          fetchProgress();
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await fetch('/api/progress');
      if (res.ok) {
        const data = await res.json();
        setProgress(data);
      }
    } catch (err) {
      console.error("Failed to fetch progress", err);
    }
  };

  const saveProgress = async (newProgress: UserProgress) => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProgress)
      });
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  };

  const updateProgress = (day: number, key: keyof DayProgress, value: any) => {
    const newProgress = {
      ...progress,
      [day]: {
        ...(progress[day] || {
          mornFlow: false,
          neckBack: false,
          wristsEyes: false,
          lunchReset: false,
          focusSigh: false,
          shutDown: false,
          painLevel: 5,
          energyLevel: 5
        }),
        [key]: value
      }
    };
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setProgress({});
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  if (!user) {
    return <AuthView onLogin={(u: any) => { setUser(u); fetchProgress(); }} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView setActiveTab={setActiveTab} user={user} onLogout={handleLogout} onStartSession={setActiveRoutine} />;
      case 'exercises': return <ExerciseList />;
      case 'routines': return <RoutineList onStartSession={setActiveRoutine} />;
      case 'tracker': return <ChallengeTracker progress={progress} updateProgress={updateProgress} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen pb-24 shadow-xl border-x border-stone-100 flex flex-col bg-white relative">
      {/* Session Player Overlay */}
      {activeRoutine && (
        <SessionPlayer 
          routine={activeRoutine} 
          onClose={() => setActiveRoutine(null)} 
          onComplete={() => {
            // Potentially auto-check a habit here if we knew which one
            setActiveRoutine(null);
          }}
        />
      )}
      {/* Header */}
      <header className="p-6 pt-10 text-center border-b border-stone-50">
        <h1 className="serif text-2xl font-bold text-stone-900 tracking-tight">WFH TOOLKIT</h1>
        <p className="handwritten text-indigo-500 text-lg">Fast Body & Mind Relief</p>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        {renderContent()}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 max-w-md w-full bg-white/80 backdrop-blur-md border-t border-stone-100 flex justify-around items-center py-4 px-2 z-50">
        <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<Home size={22} />} label="Home" />
        <NavButton active={activeTab === 'exercises'} onClick={() => setActiveTab('exercises')} icon={<BookOpen size={22} />} label="Library" />
        <NavButton active={activeTab === 'routines'} onClick={() => setActiveTab('routines')} icon={<Activity size={22} />} label="Routines" />
        <NavButton active={activeTab === 'tracker'} onClick={() => setActiveTab('tracker')} icon={<Calendar size={22} />} label="21-Day" />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-indigo-600' : 'text-stone-400 hover:text-stone-600'}`}
  >
    {icon}
    <span className="text-[10px] uppercase font-bold tracking-wider">{label}</span>
  </button>
);

const HomeView: React.FC<{ setActiveTab: (t: any) => void; user: any; onLogout: () => void; onStartSession: (r: any) => void }> = ({ setActiveTab, user, onLogout, onStartSession }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="flex justify-between items-center px-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <User size={16} />
        </div>
        <span className="text-xs font-bold text-stone-600 truncate max-w-[120px]">{user.email}</span>
      </div>
      <button onClick={onLogout} className="text-xs font-bold text-rose-500 flex items-center gap-1 hover:text-rose-600 transition-colors">
        <LogOut size={14} /> Logout
      </button>
    </div>

    <section className="bg-indigo-50 rounded-3xl p-6 relative overflow-hidden group">
      <div className="relative z-10">
        <h2 className="serif text-2xl font-bold mb-2">Ready to Reset?</h2>
        <p className="text-stone-600 mb-4 text-sm leading-relaxed">"The Dream" shouldn't hurt. Take 5 minutes to un-kink the garden hose.</p>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('routines')}
            className="bg-indigo-600 text-white px-5 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 text-sm"
          >
            Start Flow <ChevronRight size={18} />
          </button>
          <button 
            onClick={() => setActiveTab('exercises')}
            className="bg-white text-stone-700 px-5 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-stone-50 border border-stone-100 transition-colors text-sm shadow-sm"
          >
            Explore Breath <Wind size={16} />
          </button>
        </div>
      </div>
      <div className="absolute top-[-20%] right-[-10%] opacity-10 group-hover:scale-110 transition-transform duration-700">
        <Wind size={150} className="text-indigo-900" />
      </div>
    </section>

    <div className="grid grid-cols-2 gap-4">
      <DashboardCard 
        title="Pain Level" 
        value="-- / 10" 
        icon={<ShieldAlert size={20} className="text-rose-400" />} 
        color="bg-rose-50"
        onClick={() => setActiveTab('tracker')}
      />
      <DashboardCard 
        title="Focus State" 
        value="Active" 
        icon={<Zap size={20} className="text-amber-400" />} 
        color="bg-amber-50"
        onClick={() => setActiveTab('exercises')}
      />
    </div>

    <section>
      <div className="flex justify-between items-end mb-4 px-2">
        <h3 className="serif text-xl font-bold">Today's Protocol</h3>
        <button onClick={() => setActiveTab('routines')} className="text-xs font-bold text-indigo-600 uppercase tracking-widest">See All</button>
      </div>
      <div className="space-y-4">
        {ROUTINES.slice(0, 3).map(r => (
          <div 
            key={r.id} 
            onClick={() => onStartSession(r)}
            className="bg-stone-50 border border-stone-100 rounded-2xl p-4 flex justify-between items-center group cursor-pointer hover:bg-stone-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-stone-200 relative">
                <VectorImage 
                  id={r.id} 
                  className="w-full h-full"
                />
              </div>
              <div>
                <h4 className="font-bold text-stone-800">{r.name}</h4>
                <p className="text-xs text-stone-500">{r.description} • {r.totalTime}</p>
              </div>
            </div>
            <ChevronRight className="text-stone-300 group-hover:text-indigo-600 transition-colors" />
          </div>
        ))}
      </div>
    </section>

    <section className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
      <h3 className="serif text-lg font-bold mb-2 flex items-center gap-2">
        <Wind size={18} className="text-emerald-500" /> Mindfulness Check
      </h3>
      <p className="handwritten text-xl text-stone-700 italic leading-snug">
        "Is your jaw clenched? realease it. Is your tongue at the roof of your mouth? keep it there"
      </p>
    </section>
  </div>
);

const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string; onClick: () => void }> = ({ title, value, icon, color, onClick }) => (
  <button onClick={onClick} className={`${color} p-4 rounded-2xl flex flex-col items-start gap-3 text-left w-full hover:brightness-95 transition-all`}>
    <div className="p-2 rounded-xl bg-white/60 shadow-sm">{icon}</div>
    <div>
      <p className="text-xs font-bold text-stone-500 uppercase tracking-tighter mb-1">{title}</p>
      <p className="text-lg font-bold text-stone-800">{value}</p>
    </div>
  </button>
);

const ExerciseList: React.FC = () => {
  const categories = ['All', 'Neck', 'Back', 'Wrists/Eyes', 'Breath'];
  const [filter, setFilter] = useState('All');

  const filteredExercises = filter === 'All' 
    ? EXERCISES 
    : EXERCISES.filter(ex => ex.category === filter);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="px-2">
        <h2 className="serif text-2xl font-bold mb-4">Library</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${filter === cat ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-stone-400 border-stone-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredExercises.map(ex => (
          <div key={ex.id} className="bg-white border border-stone-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-1 block">{ex.category}</span>
                <h3 className="text-lg font-bold text-stone-800">{ex.name}</h3>
                <p className="handwritten text-stone-500 text-base">{ex.subtitle}</p>
              </div>
              <div className="text-xs text-stone-400 font-medium">
                {ex.reps || ex.duration}
              </div>
            </div>

            <div className="aspect-video bg-stone-100 rounded-2xl overflow-hidden relative mb-4 shadow-inner border border-stone-200 group">
              <VectorImage 
                id={ex.id} 
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <Info size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Vector Reference</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-stone-50 rounded-xl">
                <p className="text-xs font-bold uppercase text-stone-400 mb-1">The "Why"</p>
                <p className="text-xs text-stone-600 italic leading-relaxed">{ex.why}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-stone-400 mb-2">Instruction:</p>
                <ul className="space-y-2">
                  {ex.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone-700">
                      <span className="font-bold text-indigo-300">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RoutineList: React.FC<{ onStartSession: (r: any) => void }> = ({ onStartSession }) => (
  <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
    <h2 className="serif text-2xl font-bold px-2">Protocols & Flows</h2>
    <div className="space-y-4">
      {ROUTINES.map(r => (
        <div key={r.id} className="bg-stone-50 rounded-3xl overflow-hidden border border-stone-100">
          <div className="aspect-[21/9] w-full relative">
            <VectorImage 
              id={r.id} 
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent" />
          </div>
          <div className="p-6 pt-2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-stone-800 mb-1">{r.name}</h3>
                <p className="text-sm text-stone-500">{r.description}</p>
              </div>
              <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                {r.totalTime}
              </div>
            </div>

          <div className="space-y-2 mb-6">
            {r.steps.map((s, i) => {
              const ex = EXERCISES.find(e => e.id === s.exerciseId);
              return (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-500">
                    {i+1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-stone-800">{ex?.name}</p>
                    {s.note && <p className="text-[10px] text-stone-400 italic">{s.note}</p>}
                  </div>
                  <div className="text-[10px] font-bold text-stone-300 uppercase">
                    {s.durationOverride || ex?.duration}
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            onClick={() => onStartSession(r)}
            className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors"
          >
            <PlayCircle size={18} /> Start Session
          </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChallengeTracker: React.FC<{ progress: UserProgress; updateProgress: (day: number, key: keyof DayProgress, val: any) => void }> = ({ progress, updateProgress }) => {
  const [activeDay, setActiveDay] = useState(1);
  const currentData = progress[activeDay] || {
    mornFlow: false,
    neckBack: false,
    wristsEyes: false,
    lunchReset: false,
    focusSigh: false,
    shutDown: false,
    painLevel: 5,
    energyLevel: 5
  };

  const stats = useMemo(() => {
    let totalChecks = 0;
    let maxChecks = 21 * 6;
    let completedDays = 0;
    let currentStreak = 0;
    let tempStreak = 0;

    for (let i = 1; i <= 21; i++) {
      const d = progress[i];
      if (d) {
        const dayChecks = [d.mornFlow, d.neckBack, d.wristsEyes, d.lunchReset, d.focusSigh, d.shutDown].filter(Boolean).length;
        totalChecks += dayChecks;
        if (dayChecks > 0) {
          completedDays++;
          tempStreak++;
        } else {
          tempStreak = 0;
        }
        currentStreak = Math.max(currentStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    const percentage = Math.round((totalChecks / maxChecks) * 100);
    return { totalChecks, percentage, completedDays, currentStreak };
  }, [progress]);

  const habitRows = [
    { key: 'mornFlow', label: 'Morning Flow' },
    { key: 'neckBack', label: 'Neck/Back' },
    { key: 'wristsEyes', label: 'Wrist/Eye' },
    { key: 'lunchReset', label: 'Midday' },
    { key: 'focusSigh', label: 'Breath' },
    { key: 'shutDown', label: 'Shutdown' }
  ];

  const dayStatus = (day: number) => {
    const d = progress[day];
    if (!d) return 'empty';
    const checks = [d.mornFlow, d.neckBack, d.wristsEyes, d.lunchReset, d.focusSigh, d.shutDown].filter(Boolean).length;
    if (checks === 0) return 'empty';
    if (checks === 6) return 'full';
    return 'partial';
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="text-center px-4 mb-2">
        <h2 className="serif text-2xl font-bold">21-Day Journey</h2>
        <p className="text-stone-500 text-sm mt-1">Building habits for a pain-free life.</p>
      </div>

      {/* Summary Statistics Card */}
      <div className="grid grid-cols-3 gap-3 px-2">
        <StatTile 
          icon={<Trophy size={16} className="text-amber-500" />} 
          label="Success" 
          value={`${stats.percentage}%`} 
          subText="Complete" 
          color="bg-amber-50"
        />
        <StatTile 
          icon={<Flame size={16} className="text-orange-500" />} 
          label="Streak" 
          value={stats.currentStreak} 
          subText="Best Days" 
          color="bg-orange-50"
        />
        <StatTile 
          icon={<BarChart3 size={16} className="text-indigo-500" />} 
          label="Total" 
          value={stats.totalChecks} 
          subText="Checks" 
          color="bg-indigo-50"
        />
      </div>

      {/* Main Heatmap Grid */}
      <div className="bg-white border border-stone-100 p-5 rounded-[2rem] shadow-sm">
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-xs font-black uppercase tracking-widest text-stone-400">Activity Grid</h3>
          <div className="flex gap-2 items-center text-[10px] text-stone-400 font-bold uppercase">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-stone-100" /> None</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-indigo-100" /> Part</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-indigo-600" /> Full</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 21 }).map((_, i) => {
            const day = i + 1;
            const status = dayStatus(day);
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`
                  aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all relative group
                  ${activeDay === day ? 'ring-2 ring-stone-900 ring-offset-2 scale-105 z-10' : ''}
                  ${status === 'full' ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-100' : 
                    status === 'partial' ? 'bg-indigo-100 text-indigo-700' : 
                    'bg-stone-50 text-stone-400 border border-stone-100'}
                `}
              >
                {day}
                {status === 'full' && <div className="absolute top-0 right-0 w-2 h-2 bg-indigo-400 rounded-full translate-x-1/3 -translate-y-1/3" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Habit-Specific Heatmap Breakdown */}
      <div className="bg-stone-900 rounded-[2rem] p-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Zap size={100} />
        </div>
        <h3 className="serif text-lg font-bold mb-5 flex items-center gap-2">
           <BarChart3 size={18} /> Habit Density
        </h3>
        <div className="space-y-4 relative z-10">
          {habitRows.map(row => (
            <div key={row.key} className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-stone-400 px-0.5">
                <span>{row.label}</span>
                <span>{Math.round((Object.values(progress).filter(p => (p as any)[row.key]).length / 21) * 100)}%</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 21 }).map((_, i) => {
                  const day = i + 1;
                  const isDone = progress[day] && (progress[day] as any)[row.key];
                  return (
                    <div 
                      key={day} 
                      className={`h-2.5 flex-1 rounded-full transition-colors ${isDone ? 'bg-emerald-400' : 'bg-stone-800'}`}
                      title={`Day ${day}: ${row.label}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Day Details View */}
      <div className="bg-stone-50 rounded-[2.5rem] p-6 space-y-6 border border-stone-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600 font-bold">
               {activeDay}
             </div>
             <div>
               <h3 className="serif text-xl font-bold">Daily Check</h3>
               <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Focus & Flow</p>
             </div>
          </div>
        </div>

        <div className="space-y-3">
          <HabitToggle label="Morning Flow" checked={currentData.mornFlow} onChange={(v) => updateProgress(activeDay, 'mornFlow', v)} />
          <HabitToggle label="Neck/Back Protocol" checked={currentData.neckBack} onChange={(v) => updateProgress(activeDay, 'neckBack', v)} />
          <HabitToggle label="Wrist/Eye Reset" checked={currentData.wristsEyes} onChange={(v) => updateProgress(activeDay, 'wristsEyes', v)} />
          <HabitToggle label="Midday Reset" checked={currentData.lunchReset} onChange={(v) => updateProgress(activeDay, 'lunchReset', v)} />
          <HabitToggle label="Breathing Practice" checked={currentData.focusSigh} onChange={(v) => updateProgress(activeDay, 'focusSigh', v)} />
          <HabitToggle label="Shutdown Ritual" checked={currentData.shutDown} onChange={(v) => updateProgress(activeDay, 'shutDown', v)} />
        </div>

        <div className="pt-4 space-y-6">
          <MetricSlider 
            label="Pain Level" 
            value={currentData.painLevel} 
            onChange={(v) => updateProgress(activeDay, 'painLevel', v)} 
            low="Comfortable" 
            high="High Tension"
          />
          <MetricSlider 
            label="Focus / Energy" 
            value={currentData.energyLevel} 
            onChange={(v) => updateProgress(activeDay, 'energyLevel', v)} 
            low="Foggy" 
            high="In Flow"
          />
        </div>
      </div>
    </div>
  );
};

const StatTile: React.FC<{ icon: React.ReactNode; label: string; value: string | number; subText: string; color: string }> = ({ icon, label, value, subText, color }) => (
  <div className={`${color} p-4 rounded-3xl flex flex-col items-center text-center shadow-sm`}>
    <div className="mb-2">{icon}</div>
    <p className="text-xl font-black text-stone-900 leading-none mb-1">{value}</p>
    <p className="text-[9px] font-bold text-stone-500 uppercase tracking-tighter">{subText}</p>
  </div>
);

const HabitToggle: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, checked, onChange }) => (
  <button 
    onClick={() => onChange(!checked)}
    className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${checked ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-stone-700 border border-stone-100 shadow-sm'}`}
  >
    {checked ? <CheckCircle2 size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-stone-200" />}
    <span className="text-sm font-bold tracking-tight">{label}</span>
  </button>
);

const MetricSlider: React.FC<{ label: string; value: number; onChange: (v: number) => void; low: string; high: string }> = ({ label, value, onChange, low, high }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center px-1">
      <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{label}</label>
      <span className="text-lg font-bold text-stone-900 serif italic">{value} / 10</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max="10" 
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
    />
    <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
      <span>{low}</span>
      <span>{high}</span>
    </div>
  </div>
);

const SessionPlayer: React.FC<{ routine: any; onClose: () => void; onComplete: () => void }> = ({ routine, onClose, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentStep = routine.steps[currentStepIndex];
  const exercise = EXERCISES.find(e => e.id === currentStep.exerciseId);

  const parseDuration = (dur: string | undefined): number => {
    if (!dur) return 30;
    const match = dur.match(/(\d+)(s|m)/);
    if (!match) return 30;
    const val = parseInt(match[1]);
    return match[2] === 'm' ? val * 60 : val;
  };

  useEffect(() => {
    const dur = currentStep.durationOverride || exercise?.duration;
    setTimeLeft(parseDuration(dur));
    setIsActive(true);
  }, [currentStepIndex, routine]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      if (currentStepIndex < routine.steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        setIsActive(false);
        setIsFinished(true);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentStepIndex, routine]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isFinished) {
    return (
      <div className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="serif text-3xl font-bold mb-2">Session Complete!</h2>
        <p className="text-stone-500 mb-8">Great job taking care of yourself today.</p>
        <button 
          onClick={onComplete}
          className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-stone-800 transition-colors"
        >
          Finish
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-[100] bg-white flex flex-col animate-in slide-in-from-bottom-full duration-500">
      <header className="p-6 flex justify-between items-center border-b border-stone-50">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">{routine.name}</p>
          <h3 className="text-sm font-bold text-stone-400">Step {currentStepIndex + 1} of {routine.steps.length}</h3>
        </div>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors">
          <X size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        <div className="w-full aspect-square max-w-[280px] rounded-[3rem] overflow-hidden border-4 border-stone-50 shadow-2xl mb-8 relative">
          <VectorImage 
            id={exercise?.id || ''} 
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="text-center mb-8">
          <h2 className="serif text-3xl font-bold text-stone-900 mb-2">{exercise?.name}</h2>
          <p className="handwritten text-xl text-indigo-500 italic mb-4">{exercise?.subtitle}</p>
          {currentStep.note && (
            <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-xl text-xs font-bold inline-block border border-amber-100">
              Note: {currentStep.note}
            </div>
          )}
        </div>

        <div className="w-full max-w-[300px] space-y-6">
          <div className="text-center">
            <div className="text-6xl font-black text-stone-900 tabular-nums mb-2">
              {formatTime(timeLeft)}
            </div>
            <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / parseDuration(currentStep.durationOverride || exercise?.duration)) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center items-center gap-8">
            <button 
              disabled={currentStepIndex === 0}
              onClick={() => setCurrentStepIndex(prev => prev - 1)}
              className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center text-stone-400 disabled:opacity-30"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setIsActive(!isActive)}
              className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-100 hover:scale-105 transition-transform"
            >
              {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
            <button 
              disabled={currentStepIndex === routine.steps.length - 1}
              onClick={() => setCurrentStepIndex(prev => prev + 1)}
              className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center text-stone-400 disabled:opacity-30"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="mt-12 w-full">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4 text-center">Instruction</h4>
          <div className="space-y-3">
            {exercise?.steps.map((s, i) => (
              <div key={i} className="flex gap-3 text-sm text-stone-600 bg-stone-50 p-3 rounded-2xl">
                <span className="font-bold text-indigo-300">{i+1}.</span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const AuthView: React.FC<{ onLogin: (user: any) => void }> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        onLogin(data.user);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-white p-8 justify-center animate-in fade-in duration-700">
      <div className="text-center mb-10">
        <h1 className="serif text-4xl font-bold text-stone-900 tracking-tight mb-2">WFH TOOLKIT</h1>
        <p className="handwritten text-indigo-500 text-xl italic">Your body will thank you.</p>
      </div>

      <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
        <h2 className="serif text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white border border-stone-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white border border-stone-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-xs font-bold text-rose-500 text-center px-1">{error}</p>}

          <button 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-stone-500 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-indigo-600 font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>

      <div className="mt-12 text-center opacity-30">
        <Wind size={40} className="mx-auto text-stone-400" />
      </div>
    </div>
  );
};

export default App;
