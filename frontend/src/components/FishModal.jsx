import React, { useEffect } from 'react';
import { X, Thermometer, Droplet, Compass, Heart, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function FishModal({ fish, onClose, onSelectForCalculator }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!fish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ocean-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl glass-panel-glow rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-ocean-950/80 hover:bg-ocean-800 text-slate-300 hover:text-white border border-ocean-700 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Banner with Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={fish.image_url}
            alt={fish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/40 to-transparent" />
          
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-ocean-950/90 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
              {fish.category}
            </span>
            {fish.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyanGlow border border-cyan-400/30 backdrop-blur-md">
                {fish.badge}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{fish.name}</h2>
            <p className="text-sm text-cyan-200 italic font-mono">{fish.scientific_name}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Overview text */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {fish.description}
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-ocean-900/60 p-3 rounded-2xl border border-ocean-700/50">
              <span className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-coralAccent" /> Temp
              </span>
              <p className="text-sm font-semibold text-white mt-1">{fish.temperature_range}</p>
            </div>

            <div className="bg-ocean-900/60 p-3 rounded-2xl border border-ocean-700/50">
              <span className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-cyanGlow" /> pH Range
              </span>
              <p className="text-sm font-semibold text-white mt-1">{fish.ph_range}</p>
            </div>

            <div className="bg-ocean-900/60 p-3 rounded-2xl border border-ocean-700/50">
              <span className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-marineEmerald" /> Tank Min
              </span>
              <p className="text-sm font-semibold text-white mt-1">{fish.min_tank_size_gal} Gallons</p>
            </div>

            <div className="bg-ocean-900/60 p-3 rounded-2xl border border-ocean-700/50">
              <span className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Care Level
              </span>
              <p className="text-sm font-semibold text-white mt-1">{fish.care_level}</p>
            </div>
          </div>

          {/* Extended Bio Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-2 bg-ocean-900/40 p-4 rounded-2xl border border-ocean-800">
              <div className="flex justify-between py-1 border-b border-ocean-800">
                <span className="text-slate-400">Temperament:</span>
                <span className="font-medium text-slate-200">{fish.temperament}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-ocean-800">
                <span className="text-slate-400">Diet Type:</span>
                <span className="font-medium text-slate-200">{fish.diet}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Max Adult Size:</span>
                <span className="font-medium text-slate-200">{fish.max_size_inches} inches</span>
              </div>
            </div>

            <div className="space-y-2 bg-ocean-900/40 p-4 rounded-2xl border border-ocean-800">
              <div className="flex justify-between py-1 border-b border-ocean-800">
                <span className="text-slate-400">Natural Origin:</span>
                <span className="font-medium text-slate-200">{fish.origin}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-ocean-800">
                <span className="text-slate-400">Swimming Strata:</span>
                <span className="font-medium text-slate-200">{fish.swimming_level}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Typical Lifespan:</span>
                <span className="font-medium text-slate-200">{fish.lifespan}</span>
              </div>
            </div>
          </div>

          {/* Care Summary */}
          <div className="bg-ocean-850/70 p-4 rounded-2xl border border-ocean-700/60">
            <h4 className="text-xs uppercase font-bold tracking-wider text-cyan-300 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyanGlow" /> AquaX Aquarist Care Directive
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {fish.care_summary}
            </p>
          </div>

          {/* Compatible Species Tags */}
          {fish.compatible_species && fish.compatible_species.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                Verified Tank Mates
              </h4>
              <div className="flex flex-wrap gap-2">
                {fish.compatible_species.map((mate, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-ocean-800 text-xs text-slate-300 border border-ocean-700 flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-cyanGlow" /> {mate}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Fun Fact Callout */}
          {fish.fun_fact && (
            <div className="bg-gradient-to-r from-ocean-900 to-ocean-850 p-4 rounded-2xl border-l-4 border-cyanGlow text-xs sm:text-sm text-slate-300 italic">
              <span className="font-bold text-cyan-300 not-italic block mb-0.5">Biological Fact:</span>
              "{fish.fun_fact}"
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-ocean-950/90 border-t border-ocean-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Clinical quarantine status: <span className="text-emerald-400 font-semibold">AquaX Shield™ Verified</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onSelectForCalculator(fish);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyanGlow to-ocean-500 text-ocean-950 font-bold text-xs sm:text-sm hover:opacity-95 transition flex items-center justify-center gap-1.5"
            >
              <span>Test in Tank Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
