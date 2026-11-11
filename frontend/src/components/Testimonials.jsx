import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export default function Testimonials({ testimonials }) {
  const defaultTestimonials = [
    {
      name: "Dr. Julian Vance",
      role: "Marine Biologist & Reef Aquarist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      tank: "180 Gal SPS Coral Reef",
      quote: "AquaX has redefined the hobby. The precision of their species compatibility data and the clinical condition of the fish upon arrival are unmatched in my 20 years of keeping marine tanks.",
      rating: 5
    },
    {
      name: "Elena Rostova",
      role: "Aquascaping World Competitor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      tank: "75 Gal High-Tech Planted Iwagumi",
      quote: "The water calculator and micro-parameter breakdown saved my schooling Celestial Danios. The UI is gorgeous, and their technical recommendations are scientifically sound.",
      rating: 5
    },
    {
      name: "Marcus Chen",
      role: "Freshwater Discus Keeper",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      tank: "120 Gal Amazonian Blackwater",
      quote: "Acclimating wild-origin Discus used to be nerve-wracking. With AquaX Shield™ certified fish and water profile telemetry, my school settled in within hours without a single spike.",
      rating: 5
    }
  ];

  const list = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24 relative bg-ocean-950 overflow-hidden">
      
      {/* Decorative ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyanGlow/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-800/80 border border-ocean-700 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyanGlow" />
            Verified Hobbyist Endorsements
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Trusted By Passionate <span className="text-gradient">Aquascapers</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            From competition-winning aquascapes to expansive home reef habitats, 
            see how AquaX equips fishkeepers with infallible guidance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-ocean-700/50 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-cyan-400/20 absolute top-6 right-6" />

              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-ocean-800/80 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-cyan-200">{item.role}</p>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                    Biome: {item.tank}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
