import React, { useState, useEffect } from 'react';
import { Waves, Sparkles, Menu, X, ShieldCheck, Activity, Search } from 'lucide-react';

export default function Navbar({ isBackendOnline, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Species Matrix', href: '#species' },
    { name: 'Biosphere Features', href: '#features' },
    { name: 'Tank Matcher', href: '#calculator' },
    { name: 'AquaX Shield™', href: '#shield' },
    { name: 'Hobbyist Stories', href: '#testimonials' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ocean-950/85 backdrop-blur-md border-b border-ocean-700/40 shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyanGlow to-ocean-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
              <div className="w-full h-full bg-ocean-950 rounded-[10px] flex items-center justify-center">
                <Waves className="w-5 h-5 text-cyanGlow group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-wider text-white">Aqua<span className="text-cyanGlow">X</span></span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-ocean-700/50 text-cyan-300 border border-cyan-500/30">Intelligence</span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-1 tracking-wider hidden sm:block">Aquatic Biosystems & Care Matrix</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-cyanGlow transition-colors duration-200 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyanGlow to-ocean-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Backend status badge */}
            <div
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all ${
                isBackendOnline
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
              }`}
              title={isBackendOnline ? 'FastAPI Python Backend Connected' : 'Running with Local Cached Bio-Data'}
            >
              <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
              <span className="font-medium">{isBackendOnline ? 'FastAPI Active' : 'Offline Mode'}</span>
            </div>

            {/* Quick Search trigger */}
            <a
              href="#species"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-ocean-800/60 border border-transparent hover:border-ocean-600/40 transition"
              title="Search Species"
            >
              <Search className="w-4 h-4" />
            </a>

            {/* CTA Button */}
            <a
              href="#species"
              className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-ocean-950 transition-all duration-300 rounded-lg bg-gradient-to-r from-cyanGlow via-teal-300 to-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-ocean-950" />
              Explore Fishes
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${isBackendOnline ? 'bg-emerald-400' : 'bg-amber-400'}`}
              title={isBackendOnline ? 'FastAPI Connected' : 'Offline Cache'}
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-ocean-850 border border-ocean-700/50"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-ocean-700/60 px-5 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between py-2 border-b border-ocean-800">
            <span className="text-xs uppercase tracking-wider text-slate-400">System Telemetry</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${isBackendOnline ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' : 'bg-amber-950/40 border-amber-500/30 text-amber-300'}`}>
              {isBackendOnline ? 'FastAPI Synchronized' : 'Offline Cache'}
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-cyanGlow hover:bg-ocean-800/40 transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#species"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyanGlow to-ocean-400 text-ocean-950 font-bold text-sm shadow-md shadow-cyan-500/20"
            >
              <Sparkles className="w-4 h-4 text-ocean-950" />
              Explore Fish Catalog
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
