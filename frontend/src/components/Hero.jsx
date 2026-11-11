import React, { useState } from 'react';
import { ArrowRight, Droplet, ShieldCheck, Sparkles, Thermometer, Compass, Heart, CheckCircle2 } from 'lucide-react';

export default function Hero({ stats, onSelectFish }) {
  const [activeHeroTab, setActiveHeroTab] = useState('saltwater');

  const heroShowcase = {
    saltwater: {
      name: "Ocellaris Clownfish",
      sub: "Amphiprion ocellaris",
      tag: "Reef Safe Icon",
      temp: "73°F - 82°F",
      ph: "8.1 - 8.4",
      tank: "20 Gal Min",
      care: "Beginner Friendly",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      quote: "Bred for resilience, peaceful community behavior, and brilliant natural coloration."
    },
    freshwater: {
      name: "Royal Blue Discus",
      sub: "Symphysodon aequifasciatus",
      tag: "Amazonian Royalty",
      temp: "82°F - 86°F",
      ph: "6.0 - 6.8",
      tank: "55 Gal Min",
      care: "Advanced Collector",
      img: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80",
      quote: "Hypnotic disc-like majesty conditioned in pristine low-mineral blackwater."
    }
  };

  const current = heroShowcase[activeHeroTab];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden ocean-glow-bg">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyanGlow/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-ocean-600/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-marineEmerald/10 blur-[110px] rounded-full pointer-events-none"></div>

      {/* Floating subtle aquatic bubble decorations */}
      <div className="absolute top-28 left-[15%] w-3 h-3 rounded-full bg-cyan-400/30 animate-pulse-glow"></div>
      <div className="absolute top-64 right-[20%] w-4 h-4 rounded-full bg-cyan-300/20 animate-float-slow"></div>
      <div className="absolute bottom-24 left-[10%] w-2 h-2 rounded-full bg-blue-400/40 animate-float-reverse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ocean-800/80 border border-cyan-500/30 text-xs sm:text-sm font-medium text-cyan-300 shadow-sm shadow-cyan-900/30">
              <Sparkles className="w-4 h-4 text-cyanGlow animate-spin" style={{ animationDuration: '6s' }} />
              <span>Next-Gen Aquarium Species Intelligence Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Breathe Life Into Your <br />
              <span className="text-gradient">Living Waters.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Curate, match, and care for exotic freshwater & saltwater fishes with veterinary-grade precision. 
              Powered by real-time water chemistry matrices, verified tank compatibility, and the 
              <span className="text-cyanGlow font-semibold"> AquaX Shield™</span> health guarantee.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#species"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold text-base text-ocean-950 bg-gradient-to-r from-cyanGlow via-teal-300 to-cyan-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
              >
                <span>Explore Fish Catalog</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-base text-slate-200 glass-panel hover:bg-ocean-800/80 hover:text-white border border-ocean-600/50 hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <Droplet className="w-5 h-5 mr-2 text-cyanGlow group-hover:scale-110 transition-transform" />
                <span>Launch Tank Matcher</span>
              </a>
            </div>

            {/* Trust highlights under CTA */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyanGlow flex-shrink-0" />
                <span>21-Day Quarantined</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyanGlow flex-shrink-0" />
                <span>Zero Wild Reef Damage</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-cyanGlow flex-shrink-0" />
                <span>FastAPI Live Telemetry</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Species Spotlight Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient Backlight */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyanGlow/30 via-ocean-500/20 to-marineEmerald/30 blur-2xl opacity-70"></div>

            <div className="relative w-full max-w-md glass-panel-glow rounded-3xl p-5 border border-cyan-500/30 shadow-2xl overflow-hidden">
              
              {/* Category switcher inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-ocean-700/60">
                <span className="text-xs uppercase font-bold tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  Species Spotlight
                </span>
                
                <div className="flex items-center bg-ocean-950/80 p-0.5 rounded-lg border border-ocean-700/60 text-xs">
                  <button
                    onClick={() => setActiveHeroTab('saltwater')}
                    className={`px-2.5 py-1 rounded-md transition font-medium ${
                      activeHeroTab === 'saltwater'
                        ? 'bg-ocean-700 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Marine Saltwater
                  </button>
                  <button
                    onClick={() => setActiveHeroTab('freshwater')}
                    className={`px-2.5 py-1 rounded-md transition font-medium ${
                      activeHeroTab === 'freshwater'
                        ? 'bg-ocean-700 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Freshwater
                  </button>
                </div>
              </div>

              {/* Spotlight Image with Badge */}
              <div className="relative mt-4 rounded-2xl overflow-hidden h-56 group">
                <img
                  src={current.img}
                  alt={current.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/20 to-transparent"></div>
                
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ocean-950/80 backdrop-blur-md border border-cyan-500/40 text-[11px] font-semibold text-cyan-300">
                  {current.tag}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{current.name}</h3>
                    <p className="text-xs text-cyan-200 italic font-light">{current.sub}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-ocean-800/90 text-emerald-300 border border-emerald-500/30">
                    {current.care}
                  </span>
                </div>
              </div>

              {/* Water Parameters Grid */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="bg-ocean-900/70 p-2.5 rounded-xl border border-ocean-700/50">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                    <Thermometer className="w-3.5 h-3.5 text-coralAccent" />
                    Temp
                  </div>
                  <div className="text-xs font-bold text-slate-100">{current.temp}</div>
                </div>

                <div className="bg-ocean-900/70 p-2.5 rounded-xl border border-ocean-700/50">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                    <Droplet className="w-3.5 h-3.5 text-cyanGlow" />
                    pH Level
                  </div>
                  <div className="text-xs font-bold text-slate-100">{current.ph}</div>
                </div>

                <div className="bg-ocean-900/70 p-2.5 rounded-xl border border-ocean-700/50">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                    <Compass className="w-3.5 h-3.5 text-marineEmerald" />
                    Min Tank
                  </div>
                  <div className="text-xs font-bold text-slate-100">{current.tank}</div>
                </div>
              </div>

              {/* Care insight snippet */}
              <p className="mt-3.5 text-xs text-slate-300 italic bg-ocean-950/60 p-2.5 rounded-xl border border-ocean-800">
                "{current.quote}"
              </p>

              {/* Quick Action */}
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-ocean-800/80">
                <span className="text-xs text-slate-400">Species ID: #AQX-{activeHeroTab === 'saltwater' ? '01' : '02'}</span>
                <a
                  href="#species"
                  className="text-xs font-semibold text-cyanGlow hover:text-cyan-300 flex items-center gap-1 group"
                >
                  View Complete Matrix
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* Live Metrics Strip */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-ocean-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl glass-panel border border-ocean-700/30 hover:border-cyan-500/30 transition">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyanGlow">{stats.species_cataloged || '640+'}</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Cataloged Species</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-ocean-700/30 hover:border-cyan-500/30 transition">
            <div className="text-3xl sm:text-4xl font-extrabold text-marineEmerald">{stats.healthy_arrival_rate || '99.8%'}</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Healthy Arrival Guarantee</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-ocean-700/30 hover:border-cyan-500/30 transition">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300">{stats.verified_hobbyists || '48,500+'}</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Verified Aquarists</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-ocean-700/30 hover:border-cyan-500/30 transition">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">{stats.active_community_members || '120K+'}</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Community Members</div>
          </div>
        </div>

      </div>
    </section>
  );
}
