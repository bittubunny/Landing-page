import React from 'react';
import { Waves, Heart, ShieldCheck, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ocean-950 border-t border-ocean-800/80 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-ocean-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyanGlow to-ocean-500 p-0.5">
                <div className="w-full h-full bg-ocean-950 rounded-[10px] flex items-center justify-center">
                  <Waves className="w-5 h-5 text-cyanGlow" />
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-wider text-white">Aqua<span className="text-cyanGlow">X</span></span>
            </a>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              AquaX is the world’s foremost aquatic biological intelligence platform. 
              We curate veterinary-certified freshwater and saltwater specimens with 
              uncompromising health standards and precision water telemetry.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Captive-Bred & Sustainable Reef Sourcing Certified</span>
            </div>
          </div>

          {/* Column 1: Species Guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Species Taxonomy
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#species" className="hover:text-cyanGlow transition">Marine Clownfish</a></li>
              <li><a href="#species" className="hover:text-cyanGlow transition">Amazonian Discus</a></li>
              <li><a href="#species" className="hover:text-cyanGlow transition">Pacific Blue Tangs</a></li>
              <li><a href="#species" className="hover:text-cyanGlow transition">Celestial Danios</a></li>
              <li><a href="#species" className="hover:text-cyanGlow transition">Mandarin Dragonets</a></li>
              <li><a href="#species" className="hover:text-cyanGlow transition">Nano Aquascape Fish</a></li>
            </ul>
          </div>

          {/* Column 2: Platform & Tech */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Biosphere Tech
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#calculator" className="hover:text-cyanGlow transition">Smart Tank Matcher</a></li>
              <li><a href="#features" className="hover:text-cyanGlow transition">Bio-Matrix Engine</a></li>
              <li><a href="#shield" className="hover:text-cyanGlow transition">AquaX Shield™ Quarantine</a></li>
              <li><a href="#features" className="hover:text-cyanGlow transition">Thermal AquaPod™ Shipping</a></li>
              <li><a href="#features" className="hover:text-cyanGlow transition">FastAPI Telemetry API</a></li>
            </ul>
          </div>

          {/* Column 3: Company & Ethics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Ethics & Support
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#shield" className="hover:text-cyanGlow transition">14-Day Thrive Guarantee</a></li>
              <li><a href="#testimonials" className="hover:text-cyanGlow transition">Hobbyist Reviews</a></li>
              <li><a href="#features" className="hover:text-cyanGlow transition">Reef Conservation Fund</a></li>
              <li><a href="#cta" className="hover:text-cyanGlow transition">VIP Acclimation Guides</a></li>
              <li><a href="#cta" className="hover:text-cyanGlow transition">Master Aquarist Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AquaX Marine Intelligence, Inc. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-300 transition cursor-pointer">Biosphere Terms</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-ocean-900 hover:bg-ocean-800 text-cyanGlow hover:text-white border border-ocean-800 transition flex items-center gap-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
