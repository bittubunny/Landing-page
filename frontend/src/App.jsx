import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FishCatalog from './components/FishCatalog';
import FishModal from './components/FishModal';
import TankCalculator from './components/TankCalculator';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { FALLBACK_FISH, FALLBACK_STATS } from './data/fallbackData';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [fishes, setFishes] = useState(FALLBACK_FISH);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [features, setFeatures] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [selectedFishModal, setSelectedFishModal] = useState(null);
  const [calcSelectedFish, setCalcSelectedFish] = useState(null);
  const [toast, setToast] = useState(null);

  // Check FastAPI backend and load initial data
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const healthRes = await fetch('/api/health');
        if (healthRes.ok) {
          setIsBackendOnline(true);

          // Fetch fishes from backend
          const fishRes = await fetch('/api/fish');
          if (fishRes.ok) {
            const fishData = await fishRes.json();
            if (Array.isArray(fishData) && fishData.length > 0) {
              setFishes(fishData);
            }
          }

          // Fetch stats
          const statsRes = await fetch('/api/stats');
          if (statsRes.ok) {
            const statsData = await statsRes.json();
            setStats(statsData);
          }

          // Fetch features
          const featRes = await fetch('/api/features');
          if (featRes.ok) {
            const featData = await featRes.json();
            setFeatures(featData);
          }

          // Fetch testimonials
          const testRes = await fetch('/api/testimonials');
          if (testRes.ok) {
            const testData = await testRes.json();
            setTestimonials(testData);
          }
        } else {
          setIsBackendOnline(false);
        }
      } catch (err) {
        console.warn('Backend not detected on /api, running in client-side mode with rich cached data:', err);
        setIsBackendOnline(false);
      }
    };

    fetchApiData();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const handleSelectForCalculator = (fish) => {
    setCalcSelectedFish(fish);
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Loaded "${fish.name}" into Smart Bio-Matrix Matcher!`);
  };

  return (
    <div className="min-h-screen bg-[#030a16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-ocean-950">
      
      {/* Navigation */}
      <Navbar
        isBackendOnline={isBackendOnline}
        onOpenSearch={() => {
          const el = document.getElementById('species');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          stats={stats}
          onSelectFish={(fish) => setSelectedFishModal(fish)}
        />

        {/* Fish Species Catalog */}
        <FishCatalog
          fishes={fishes}
          onOpenFishModal={(fish) => setSelectedFishModal(fish)}
          onSelectForCalculator={handleSelectForCalculator}
        />

        {/* Interactive Bio-Matrix Tank Calculator */}
        <TankCalculator
          onOpenFishModal={(fish) => setSelectedFishModal(fish)}
          preselectedFish={calcSelectedFish}
        />

        {/* AquaX Platform Features */}
        <Features features={features} />

        {/* Testimonials & Endorsements */}
        <Testimonials testimonials={testimonials} />

        {/* High-Converting CTA */}
        <CallToAction onShowToast={showToast} />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Quick View Fish Modal */}
      {selectedFishModal && (
        <FishModal
          fish={selectedFishModal}
          onClose={() => setSelectedFishModal(null)}
          onSelectForCalculator={handleSelectForCalculator}
        />
      )}

      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md glass-panel-glow border border-cyan-400 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-cyanGlow flex-shrink-0" />
            <p className="text-xs sm:text-sm text-slate-100 font-medium">{toast}</p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-ocean-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
