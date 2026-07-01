import { useState, useRef } from 'react';
import { Compass, Leaf, Droplet, Sun, Eye, Navigation, Trees, Flame, MapPin } from 'lucide-react';
import { hikingTrailData, initialVirtualPlants } from '../data/portfolioData';
import { TrailPoint, VirtualPlant } from '../types';

export default function InterestModule() {
  const [selectedTrail, setSelectedTrail] = useState<TrailPoint>(hikingTrailData[0]);
  const [plants, setPlants] = useState<VirtualPlant[]>(initialVirtualPlants);
  const sectionRef = useRef<HTMLElement>(null);

  const handleWaterPlant = (id: string) => {
    setPlants(prev => prev.map(p => {
      if (p.id === id) {
        const nextMoisture = Math.min(p.moisture + 25, 100);
        let status: 'thirsty' | 'healthy' | 'overwatered' = 'healthy';
        if (nextMoisture > 80) {
          status = 'overwatered';
        } else if (nextMoisture < 25) {
          status = 'thirsty';
        }
        return {
          ...p,
          moisture: nextMoisture,
          status,
          lastWatered: 'Just now'
        };
      }
      return p;
    }));
  };

  const handleDryPlant = (id: string) => {
    setPlants(prev => prev.map(p => {
      if (p.id === id) {
        const nextMoisture = Math.max(p.moisture - 20, 0);
        let status: 'thirsty' | 'healthy' | 'overwatered' = 'healthy';
        if (nextMoisture > 80) {
          status = 'overwatered';
        } else if (nextMoisture < 25) {
          status = 'thirsty';
        }
        return {
          ...p,
          moisture: nextMoisture,
          status,
          lastWatered: 'Dried in sun'
        };
      }
      return p;
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="hobbies"
      className="relative py-20"
    >
      <div className="relative max-w-6xl mx-auto px-6 z-10">

        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
            <Compass className="w-3.5 h-3.5" />
            Humanizing myself
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">
            Seeing <span className="font-bold hover:text-emerald-700 dark:hover:text-emerald-500 shadow-emerald-500/10 dark:shadow-emerald-500/10">GREEN</span> <s className="font-bold hover:text-red-700 dark:hover:text-red-500 shadow-red-500/10 dark:shadow-red-500/10">RED</s>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            I don’t sit in front of screens 24/7. Stepping away from code lets me compile thoughts. Here is how my love for nature and indoor plant care mirrors my outlook on building software.
          </p>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column - HIKING TRAIL EXPLORER */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Trees className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-bold font-display text-slate-900 dark:text-slate-100">
                    The Plant Log
                  </h3>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest font-mono">
                  Malay Peninsula
                </span>
              </div>

              {/* Trails Selection Tabs */}
              <div className="flex gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                {hikingTrailData.map((trail) => (
                  <button
                    key={trail.id}
                    id={`btn-${trail.id}`}
                    onClick={() => setSelectedTrail(trail)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${selectedTrail.id === trail.id
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950'
                      }`}
                  >
                    {trail.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* SVG Map / Trail Elevation Profile */}
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 min-h-[140px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

                {/* Visual trail path */}
                <div className="w-full h-full flex flex-col justify-end">
                  <div className="relative h-20 w-full flex items-end">

                    {/* SVG Elevation curve */}
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="trailGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Spline curve dependent on selected trail */}
                      {selectedTrail.id === 'trail-carnivorous' && (
                        <>
                          <path d="M 0 5 Q 25 18 50 12 T 100 2" fill="none" stroke="#10b981" strokeWidth="2" />
                          <path d="M 0 5 Q 25 18 50 12 T 100 2 L 100 20 L 0 20 Z" fill="url(#trailGrad)" />
                          <circle cx="50" cy="12" r="3.5" fill="#10b981" className="animate-pulse" />
                        </>
                      )}
                      {selectedTrail.id === 'trail-berembun' && (
                        <>
                          <path d="M 0 18 Q 30 15 50 6 T 100 0.5" fill="none" stroke="#10b981" strokeWidth="2" />
                          <path d="M 0 18 Q 30 15 50 6 T 100 0.5 L 100 20 L 0 20 Z" fill="url(#trailGrad)" />
                          <circle cx="100" cy="0.5" r="3.5" fill="#10b981" className="animate-pulse" />
                        </>
                      )}
                      {selectedTrail.id === 'trail-mossy' && (
                        <>
                          <path d="M 0 14 Q 30 8 50 8 T 100 13" fill="none" stroke="#10b981" strokeWidth="2" />
                          <path d="M 0 14 Q 30 8 50 8 T 100 13 L 100 20 L 0 20 Z" fill="url(#trailGrad)" />
                          <circle cx="50" cy="8" r="3.5" fill="#10b981" className="animate-pulse" />
                        </>
                      )}
                    </svg>

                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-slate-900/10 dark:bg-slate-900 px-2 py-1 rounded text-[9px] font-mono text-slate-500">
                      <MapPin className="w-2.5 h-2.5 text-emerald-500" /> {selectedTrail.landmark}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trail Meta Log */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Distance</span>
                    <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-100">{selectedTrail.distance} miles</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Elevation Delta</span>
                    <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-100">{selectedTrail.elevation} ft</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Major Flora</span>
                    <span className="text-sm font-bold font-sans text-slate-800 dark:text-slate-100">{selectedTrail.majorFlora}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 bg-emerald-500/5 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/10">
                    <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                      Forestry Lesson:
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {selectedTrail.lesson}
                    </p>
                  </div>

                  <div className="md:col-span-6 bg-slate-950 text-slate-300 p-4 rounded-xl border border-slate-800">
                    <div className="text-[10px] font-semibold text-teal-400 uppercase tracking-widest mb-1 font-mono">
                      Mental Compiler Analogy:
                    </div>
                    <p className="text-xs leading-relaxed font-sans text-slate-300">
                      {selectedTrail.techAnalogy}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-3 mt-6">
              * Trail logs mapped from your hikes along Malay Peninsula.
            </div>
          </div>

          {/* Right Column - DESK GREENHOUSE */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-bold font-display text-slate-900 dark:text-slate-100">
                    Mini Desktop Greenhouse
                  </h3>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest font-mono">
                  State Simulator
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-normal">
                These indoor plants live on my monitor desk. Click the buttons to Water or Sunlight them and keep them in their optimal moisture parameters (30% – 75%).
              </p>

              {/* Plant Cards list */}
              <div className="space-y-4">
                {plants.map((plant) => {
                  let statusColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-300/30';
                  if (plant.status === 'thirsty') {
                    statusColor = 'text-amber-500 bg-amber-500/10 border-amber-300/30';
                  } else if (plant.status === 'overwatered') {
                    statusColor = 'text-blue-500 bg-blue-500/10 border-blue-300/30';
                  }

                  return (
                    <div
                      key={plant.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-100 font-display">{plant.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{plant.type}</div>
                        </div>
                        <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusColor}`}>
                          {plant.status}
                        </span>
                      </div>

                      {/* Health progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                          <span>Moisture Level: {plant.moisture}%</span>
                          <span>Sunlight: {plant.sunlight}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${plant.moisture > 80 ? 'bg-blue-500' : plant.moisture < 25 ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                            style={{ width: `${plant.moisture}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Care Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleWaterPlant(plant.id)}
                          className="flex-1 py-1 px-2.5 bg-sky-600/10 hover:bg-sky-600 hover:text-white text-sky-600 dark:text-sky-400 rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Droplet className="w-3 h-3" /> Water Plant
                        </button>
                        <button
                          onClick={() => handleDryPlant(plant.id)}
                          className="flex-1 py-1 px-2.5 bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-600 dark:text-amber-400 rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Sun className="w-3 h-3" /> Dry in Sun
                        </button>
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono text-right">
                        Last Care: {plant.lastWatered}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-[10px] text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-3 mt-6">
              * A fun state simulator demonstrating clean array mutations, state boundary clampings, and property mapping hooks.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
