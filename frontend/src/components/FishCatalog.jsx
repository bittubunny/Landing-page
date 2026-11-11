import React, { useState, useMemo } from 'react';
import { Search, Filter, Droplet, Thermometer, Compass, Sparkles, ExternalLink, ShieldAlert, Check } from 'lucide-react';

export default function FishCatalog({ fishes, onOpenFishModal, onSelectForCalculator }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCare, setSelectedCare] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFishes = useMemo(() => {
    return fishes.filter((fish) => {
      // Category filter
      if (selectedCategory === 'freshwater' && fish.category !== 'freshwater') return false;
      if (selectedCategory === 'saltwater' && fish.category !== 'saltwater') return false;
      if (selectedCategory === 'featured' && !fish.featured) return false;

      // Care level filter
      if (selectedCare !== 'all' && fish.care_level.toLowerCase() !== selectedCare.toLowerCase()) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = fish.name.toLowerCase().includes(query);
        const matchSci = fish.scientific_name.toLowerCase().includes(query);
        const matchDiet = fish.diet?.toLowerCase().includes(query);
        const matchTemp = fish.temperament?.toLowerCase().includes(query);
        if (!matchName && !matchSci && !matchDiet && !matchTemp) return false;
      }

      return true;
    });
  }, [fishes, selectedCategory, selectedCare, searchQuery]);

  return (
    <section id="species" className="py-24 relative bg-ocean-950">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-ocean-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyanGlow/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-800/80 border border-ocean-700 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyanGlow" />
            Biological Species Encyclopedia
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Curated Aquarium <span className="text-gradient">Species Matrix</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Explore meticulously documented freshwater and saltwater specimens. 
            Every entry includes validated water chemistry, behavioral traits, and tank compatibility.
          </p>
        </div>

        {/* Filter & Search Bar Toolbar */}
        <div className="mt-12 p-4 rounded-2xl glass-panel border border-ocean-700/60 shadow-xl space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search species by common name, scientific taxonomy, or diet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ocean-900/80 border border-ocean-700/70 text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-ocean-900/60 p-1 rounded-xl border border-ocean-800">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedCategory === 'all'
                    ? 'bg-cyanGlow text-ocean-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white hover:bg-ocean-800'
                }`}
              >
                All Species
              </button>
              <button
                onClick={() => setSelectedCategory('saltwater')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedCategory === 'saltwater'
                    ? 'bg-cyanGlow text-ocean-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white hover:bg-ocean-800'
                }`}
              >
                Saltwater Reef
              </button>
              <button
                onClick={() => setSelectedCategory('freshwater')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedCategory === 'freshwater'
                    ? 'bg-cyanGlow text-ocean-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white hover:bg-ocean-800'
                }`}
              >
                Freshwater
              </button>
              <button
                onClick={() => setSelectedCategory('featured')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedCategory === 'featured'
                    ? 'bg-cyanGlow text-ocean-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white hover:bg-ocean-800'
                }`}
              >
                Featured
              </button>
            </div>

            {/* Care Level Dropdown Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
              <select
                value={selectedCare}
                onChange={(e) => setSelectedCare(e.target.value)}
                className="bg-ocean-900/80 border border-ocean-700/70 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="all">All Care Levels</option>
                <option value="beginner">Beginner Friendly</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced Specialist</option>
              </select>
            </div>

          </div>

          {/* Results feedback status */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-ocean-800/80">
            <span>
              Displaying <strong className="text-cyan-300">{filteredFishes.length}</strong> cataloged specimens
            </span>
            {(searchQuery || selectedCategory !== 'all' || selectedCare !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCare('all');
                  setSearchQuery('');
                }}
                className="text-cyan-400 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Fish Cards Grid */}
        {filteredFishes.length === 0 ? (
          <div className="mt-16 text-center py-16 px-4 rounded-3xl glass-panel border border-ocean-800 max-w-xl mx-auto">
            <ShieldAlert className="w-12 h-12 text-cyan-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-xl font-bold text-white">No Matching Species Found</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
              We couldn't locate species matching your current search parameters. Try broadening your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCare('all');
                setSearchQuery('');
              }}
              className="mt-5 px-5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30 transition"
            >
              Show All Specimens
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFishes.map((fish) => (
              <div
                key={fish.id}
                className="group relative rounded-3xl glass-panel border border-ocean-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col overflow-hidden"
              >
                {/* Fish Image Card Header */}
                <div className="relative h-52 w-full overflow-hidden bg-ocean-900">
                  <img
                    src={fish.image_url}
                    alt={fish.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-md ${
                        fish.category === 'saltwater'
                          ? 'bg-blue-950/80 text-cyan-300 border-cyan-500/40'
                          : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {fish.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-md ${
                        fish.care_level === 'Beginner'
                          ? 'bg-emerald-900/80 text-emerald-300 border-emerald-500/40'
                          : fish.care_level === 'Intermediate'
                          ? 'bg-amber-900/80 text-amber-300 border-amber-500/40'
                          : 'bg-rose-900/80 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {fish.care_level}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Labels */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-cyanGlow transition-colors">
                      {fish.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-mono italic truncate">
                      {fish.scientific_name}
                    </p>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {fish.description}
                  </p>

                  {/* Quick Parameters Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-ocean-900/60 p-2 rounded-xl border border-ocean-800">
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-0.5 mb-0.5">
                        <Thermometer className="w-3 h-3 text-coralAccent" /> Temp
                      </div>
                      <span className="font-semibold text-slate-200 text-[11px] truncate block">
                        {fish.temperature_range.split('(')[0]}
                      </span>
                    </div>

                    <div className="bg-ocean-900/60 p-2 rounded-xl border border-ocean-800">
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-0.5 mb-0.5">
                        <Droplet className="w-3 h-3 text-cyanGlow" /> pH
                      </div>
                      <span className="font-semibold text-slate-200 text-[11px] block">
                        {fish.ph_range}
                      </span>
                    </div>

                    <div className="bg-ocean-900/60 p-2 rounded-xl border border-ocean-800">
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-0.5 mb-0.5">
                        <Compass className="w-3 h-3 text-marineEmerald" /> Tank
                      </div>
                      <span className="font-semibold text-slate-200 text-[11px] block">
                        {fish.min_tank_size_gal} Gal+
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onOpenFishModal(fish)}
                      className="flex-1 py-2 px-3 rounded-xl bg-ocean-800/80 hover:bg-ocean-700/80 text-cyan-300 hover:text-white border border-ocean-600/40 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                    >
                      <span>Care & Biology</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onSelectForCalculator(fish)}
                      title="Test compatibility with your tank dimensions"
                      className="p-2 rounded-xl bg-cyanGlow/10 hover:bg-cyanGlow/20 text-cyanGlow border border-cyan-500/30 transition flex items-center justify-center"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
