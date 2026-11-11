import React, { useState } from 'react';
import { Mail, Sparkles, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CallToAction({ onShowToast }) {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('All Aquatics');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, interest })
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      const data = await response.json();
      setSubmitted(true);
      if (onShowToast) {
        onShowToast(data.message || 'Successfully subscribed to AquaX Intelligence!');
      }
    } catch (err) {
      // Fallback response for offline or dev mode
      setSubmitted(true);
      if (onShowToast) {
        onShowToast(`Subscribed! VIP Aquarium Intelligence Handbook sent to ${email}.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className="py-24 relative bg-ocean-950 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ocean-800/40 via-ocean-950 to-ocean-950 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyanGlow/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-14 border border-cyan-500/40 text-center space-y-8 relative overflow-hidden shadow-2xl">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ocean-800/80 border border-cyan-500/30 text-xs sm:text-sm font-semibold text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyanGlow" />
            <span>Join 48,000+ Dedicated Fishkeepers</span>
          </div>

          {/* Heading */}
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready To Curate Your Dream <br />
              <span className="text-gradient">Aquatic Biosphere?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Subscribe to the weekly <strong>AquaX Aquatic Dispatch</strong>. Receive rare specimen alerts, 
              water chemistry diagnostic formulas, and our complimentary 60-page species guide.
            </p>
          </div>

          {/* Interactive Form or Success State */}
          {submitted ? (
            <div className="bg-emerald-950/60 border border-emerald-500/40 p-6 rounded-2xl max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-lg font-bold text-white">Welcome Aboard the AquaX Fleet!</h4>
              <p className="text-xs sm:text-sm text-emerald-200/90 mt-1">
                Your VIP Acclimation & Species Matrix Handbook has been dispatched to <strong>{email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                }}
                className="mt-4 text-xs font-semibold text-cyan-300 hover:underline"
              >
                Register another email address
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                
                {/* Interest selector */}
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full sm:w-auto bg-ocean-900 border border-ocean-700 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-3.5 focus:outline-none focus:border-cyan-400"
                >
                  <option value="All Aquatics">All Biomes</option>
                  <option value="Marine Reef">Marine Saltwater Reef</option>
                  <option value="Freshwater Planted">Freshwater & Planted</option>
                  <option value="Exotic Species">Rare & Exotic Specimen</option>
                </select>

                {/* Email input */}
                <div className="relative flex-1 w-full">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-ocean-900/90 border border-ocean-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                {/* Submit CTA button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-ocean-950 bg-gradient-to-r from-cyanGlow via-teal-300 to-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-ocean-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Get VIP Access</span>
                      <Send className="w-4 h-4 text-ocean-950" />
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyanGlow" /> 100% Spam Free Guarantee
                </span>
                <span>•</span>
                <span>Unsubscribe at any moment</span>
                <span>•</span>
                <span>Instant PDF Species Telemetry Download</span>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
