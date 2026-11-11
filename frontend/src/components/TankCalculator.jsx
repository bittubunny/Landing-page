import React, { useState } from 'react';
import { Droplet, Waves, Sparkles, AlertCircle, CheckCircle2, ArrowRight, Gauge, Cpu } from 'lucide-react';

export default function TankCalculator({ onOpenFishModal, preselectedFish }) {
  const [gallons, setGallons] = useState(preselectedFish?.min_tank_size_gal || 30);
  const [waterType, setWaterType] = useState(preselectedFish?.category || 'freshwater');
  const [experience, setExperience] = useState('Beginner');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const presets = [
    { label: 'Nano (10 Gal)', val: 10 },
    { label: 'Standard (30 Gal)', val: 30 },
    { label: 'Showcase (55 Gal)', val: 55 },
    { label: 'Reef Master (100 Gal)', val: 100 },
  ];

  const handleCalculate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tank_gallons: Number(gallons),
          water_type: waterType,
          experience_level: experience
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from calculator service');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      // Offline fallback computation
      const galNum = Number(gallons);
      const isSalt = waterType === 'saltwater';
      setResult({
        tank_gallons: galNum,
        water_type: waterType,
        max_safe_fish_count: isSalt ? Math.max(1, Math.floor(galNum * 0.4)) : Math.max(1, Math.floor(galNum * 0.85)),
        filtration_recommendation: isSalt
          ? `Recommended: Protein skimmer with ${Math.round(galNum * 12)} GPH circulation.`
          : `Recommended: Canister filter with ${Math.round(galNum * 4)} GPH turnover.`,
        water_chemistry_guide: isSalt ? {
          target_temp: "76°F - 80°F",
          target_ph: "8.1 - 8.4",
          specific_gravity: "1.024 - 1.026",
          nitrate: "< 10 ppm"
        } : {
          target_temp: "74°F - 78°F",
          target_ph: "6.8 - 7.4",
          ammonia: "0.0 ppm",
          nitrate: "< 20 ppm"
        },
        recommended_species: []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calculator" className="py-24 relative bg-ocean-900/60 border-y border-ocean-800">
      
      {/* Background aquatic ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyanGlow/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-800 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <Cpu className="w-3.5 h-3.5 text-cyanGlow" />
            Biological Telemetry Matcher
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            AquaX Smart <span className="text-gradient">Bio-Matrix Matcher</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Input your tank volume and water biome to calculate safe biological carrying capacity, 
            filtration flow rates, and algorithmically matched fish species.
          </p>
        </div>

        {/* Interactive Calculator Body */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form Card */}
          <div className="lg:col-span-5 glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-cyanGlow" />
              Biosphere Configuration
            </h3>

            <form onSubmit={handleCalculate} className="space-y-6">
              
              {/* Water Type Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Aquarium Environment
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWaterType('freshwater')}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition flex items-center justify-center gap-2 ${
                      waterType === 'freshwater'
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-950'
                        : 'bg-ocean-950/60 border-ocean-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Waves className="w-4 h-4 text-emerald-400" />
                    Freshwater
                  </button>

                  <button
                    type="button"
                    onClick={() => setWaterType('saltwater')}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition flex items-center justify-center gap-2 ${
                      waterType === 'saltwater'
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-950'
                        : 'bg-ocean-950/60 border-ocean-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Droplet className="w-4 h-4 text-cyanGlow" />
                    Marine Saltwater
                  </button>
                </div>
              </div>

              {/* Tank Volume Input with Slider & Presets */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Tank Capacity (Gallons)
                  </label>
                  <span className="text-base font-extrabold text-cyanGlow font-mono bg-ocean-950 px-3 py-0.5 rounded-lg border border-ocean-700">
                    {gallons} Gallons <span className="text-xs text-slate-400 font-sans">({Math.round(gallons * 3.785)} L)</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={gallons}
                  onChange={(e) => setGallons(Number(e.target.value))}
                  className="w-full h-2 bg-ocean-950 rounded-lg appearance-none cursor-pointer accent-cyanGlow"
                />

                {/* Quick Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setGallons(preset.val)}
                      className={`text-[11px] py-1.5 px-2 rounded-lg font-medium border transition ${
                        gallons === preset.val
                          ? 'bg-ocean-700 text-cyan-300 border-cyan-500/50'
                          : 'bg-ocean-950/60 text-slate-400 border-ocean-800 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Aquarist Experience Level
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-ocean-950 border border-ocean-700/80 text-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400"
                >
                  <option value="Beginner">Beginner (Hardy species, simple upkeep)</option>
                  <option value="Intermediate">Intermediate (Planted tanks, soft coral)</option>
                  <option value="Advanced">Advanced (SPS Reef, sensitive wild specimens)</option>
                </select>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-ocean-950 bg-gradient-to-r from-cyanGlow via-teal-300 to-cyan-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-ocean-950 border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing Biological Load...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-ocean-950" />
                    <span>Calculate Compatibility Profile</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Results Analysis Display */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6 animate-in fade-in duration-300">
                
                {/* Result Top Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ocean-800">
                  <div>
                    <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">
                      Bio-Matrix Telemetry
                    </span>
                    <h3 className="text-2xl font-extrabold text-white mt-0.5">
                      {result.tank_gallons} Gal {result.water_type.toUpperCase()} Profile
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Est. Safe Bioload</span>
                    <span className="text-2xl font-black text-cyanGlow">
                      ~{result.max_safe_fish_count} Fishes
                    </span>
                  </div>
                </div>

                {/* Filtration Recommendation */}
                <div className="p-4 rounded-2xl bg-ocean-900/80 border border-ocean-700/60 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-marineEmerald flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-200 tracking-wider">
                      Filtration & Flow Benchmark
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      {result.filtration_recommendation}
                    </p>
                  </div>
                </div>

                {/* Chemical Water Parameters Guide */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                    Target Biological Chemistry
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {Object.entries(result.water_chemistry_guide).map(([key, val]) => (
                      <div key={key} className="p-3 rounded-xl bg-ocean-950/70 border border-ocean-800 text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                          {key.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-bold text-cyan-300 mt-1 block">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Algorithmic Species Recommendations */}
                {result.recommended_species && result.recommended_species.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                      Compatible Species Suggestions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {result.recommended_species.slice(0, 4).map((f) => (
                        <div
                          key={f.id}
                          onClick={() => onOpenFishModal(f)}
                          className="flex items-center gap-3 p-3 rounded-2xl bg-ocean-950/80 border border-ocean-800 hover:border-cyan-500/50 cursor-pointer transition group"
                        >
                          <img
                            src={f.image_url}
                            alt={f.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-white group-hover:text-cyanGlow transition truncate">
                              {f.name}
                            </h5>
                            <p className="text-[10px] text-slate-400 font-mono truncate">{f.scientific_name}</p>
                            <span className="text-[10px] text-emerald-400 font-semibold">{f.min_tank_size_gal} Gal Min</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="glass-panel p-8 rounded-3xl border border-dashed border-ocean-700/80 text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-2xl bg-ocean-800/80 border border-ocean-700 flex items-center justify-center mx-auto text-cyanGlow">
                  <Droplet className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Awaiting Biosphere Parameters</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Adjust tank volume and aquatic ecosystem type on the left, then click 
                  <strong> "Calculate Compatibility Profile"</strong> to reveal customized biological metrics.
                </p>
                <button
                  onClick={() => handleCalculate()}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500/20 text-cyanGlow border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30 transition"
                >
                  Run Sample 30 Gallon Check
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
