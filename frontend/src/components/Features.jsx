import React from 'react';
import { Cpu, ShieldCheck, Sliders, Waves, Headphones, Truck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Features({ features }) {
  // Mapping of icon names to lucide icons
  const iconMap = {
    Cpu: Cpu,
    ShieldCheck: ShieldCheck,
    Sliders: Sliders,
    Waves: Waves,
    Headphones: Headphones,
    Truck: Truck
  };

  const defaultFeatures = [
    {
      id: "smart-compatibility",
      title: "Smart Bio-Matrix Compatibility",
      description: "Never guess if species can live harmoniously. Our biological engine cross-references pH, GH, water hardness, swimming strata, and temperament in real time.",
      icon: "Cpu",
      metric: "100% Zero-Conflict Guarantee",
      tag: "Proprietary Tech"
    },
    {
      id: "quarantine-shield",
      title: "AquaX Shield™ 21-Day Quarantine",
      description: "Every specimen undergoes a clinical 21-day closed-system prophylactic protocol by licensed marine biologists, guaranteeing pathogen-free vitality.",
      icon: "ShieldCheck",
      metric: "Pathogen-Free Certified",
      tag: "Veterinary Grade"
    },
    {
      id: "interactive-care-guides",
      title: "Precision Care & Nutritional Telemetry",
      description: "Interactive feeding rhythms, light PAR guidelines, and automated water-change calculators tailored to your specific biome volume and live flora.",
      icon: "Sliders",
      metric: "Custom Biome Formulas",
      tag: "Telemetry"
    },
    {
      id: "eco-certified-sourcing",
      title: "100% Ethical & Captive-Bred Focus",
      description: "Committed to reef conservation. Over 88% of our saltwater fish are sustainably captive-bred, shielding wild ocean coral reefs.",
      icon: "Waves",
      metric: "Zero Wild-Reef Depletion",
      tag: "Sustainable"
    },
    {
      id: "expert-concierge",
      title: "24/7 Master Aquarist Support",
      description: "Connect with certified aquatic biologists via live video diagnostics for water clarity checks, illness identification, and scape optimization.",
      icon: "Headphones",
      metric: "< 4 Minute Avg Response",
      tag: "24/7 Live"
    },
    {
      id: "climate-control-transit",
      title: "AquaPod™ Thermal Shipping",
      description: "Custom pressurized oxygen capsules with smart temperature-regulating insulation, ensuring stable water parameters from our facility to your doorstep.",
      icon: "Truck",
      metric: "99.8% Live Arrival Rate",
      tag: "Safe Transit"
    }
  ];

  const displayList = features && features.length > 0 ? features : defaultFeatures;

  return (
    <section id="features" className="py-24 relative bg-ocean-950 overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-ocean-500/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-marineEmerald/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-800/80 border border-ocean-700 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyanGlow" />
            AquaX Ecosystem Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Engineered For The <span className="text-gradient">Modern Aquarist</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            We bridge veterinary aquatic science with cutting-edge software to ensure your freshwater 
            and marine habitats thrive for years to come.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayList.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon] || Sparkles;
            return (
              <div
                key={feature.id || idx}
                className="group relative p-8 rounded-3xl glass-panel border border-ocean-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
              >
                {/* Glow highlight on hover */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-cyanGlow/20 via-transparent to-ocean-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Card Header: Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyanGlow/20 to-ocean-700/60 p-0.5 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                      <div className="w-full h-full bg-ocean-950 rounded-[14px] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-cyanGlow group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    {feature.tag && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-ocean-900 border border-ocean-700 text-cyan-300">
                        {feature.tag}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Card Footer Metric */}
                <div className="mt-6 pt-4 border-t border-ocean-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Standard:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {feature.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* AquaX Shield Callout Banner */}
        <div id="shield" className="mt-16 rounded-3xl bg-gradient-to-r from-ocean-900 via-ocean-850 to-ocean-900 p-8 sm:p-10 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyanGlow/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-xs font-bold text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-cyanGlow" />
                The AquaX Shield™ Veterinary Promise
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Guaranteed 14-Day "Alive & Thriving" Assurance
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We don't merely ship fish — we establish sustainable underwater biospheres. 
                Every specimen is evaluated by veterinary specialists, certified free of velvet, ich, and flukes, 
                and backed by our full 14-day thriving replacement pledge.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <a
                href="#cta"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm text-ocean-950 bg-cyanGlow hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 hover:scale-105"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Read Quarantine Protocol
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
