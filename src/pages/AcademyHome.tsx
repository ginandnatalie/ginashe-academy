import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, Calendar, Clock, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from '../components/Hero';
import { CTA } from '../components/Footer';
import { streamsData } from '../data/streams';

import { SEO } from '../components/SEO';

interface AcademyHomeProps {
  onOpenModal?: (id: string) => void;
  editMode?: boolean;
}

export default function AcademyHome({ onOpenModal, editMode }: AcademyHomeProps) {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('gda_sauma_dismissed_2026');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setShowPromo(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismissPromo = () => {
    localStorage.setItem('gda_sauma_dismissed_2026', 'true');
    setShowPromo(false);
  };

  const getPromoWording = () => {
    const today = new Date();
    const SAST_offset = 2 * 60; // GMT+2 in minutes
    const local_offset = today.getTimezoneOffset();
    const sastTime = new Date(today.getTime() + (SAST_offset + local_offset) * 60 * 1000);
    
    const year = sastTime.getFullYear();
    const month = sastTime.getMonth() + 1;
    const date = sastTime.getDate();
    
    if (year === 2026 && month === 6 && date === 2) {
      return {
        intro: "An exclusive live interview with our Managing Director, George Kapendeka.",
        dateLabel: "Today, June 2nd, 2026",
        buttonLabel: "Tune In Live Now"
      };
    } else if (year > 2026 || (year === 2026 && (month > 6 || (month === 6 && date > 2)))) {
      return {
        intro: "Listen to the playback of the exclusive live interview with our Managing Director, George Kapendeka.",
        dateLabel: "Aired June 2nd, 2026",
        buttonLabel: "Listen to Playback"
      };
    }
    
    return {
      intro: "Tune in tomorrow to an exclusive live interview with our Managing Director, George Kapendeka.",
      dateLabel: "Tomorrow, June 2nd, 2026",
      buttonLabel: "Tune In Live"
    };
  };

  const promoWording = getPromoWording();
  const voices = [
    { name: 'George K', role: 'Managing Director, Ginashe Group', quote: "At Ginashe, we aren't just teaching skills; we're architecting the future of African sovereignty across every sector that matters.", image: '/images/faculty/george.jpg' },
    { name: 'Talent K', role: 'Lead Faculty', quote: 'Our curriculum is live fire. We prepare candidates to handle production-scale challenges from Day 1, bridging the gap between theory and mastery.' },
    { name: 'Lebo C', role: 'Prospective Learner', quote: 'I chose Ginashe Academy because I wanted a path that was practitioner-led. The focus on real-world impact is what the market is actually demanding.' },
  ];

  const whyReasons = [
    { icon: '🎯', title: 'Industry-Designed Curriculum', desc: 'Every module is co-built with hiring managers and sector leaders — so you learn what the market actually needs.' },
    { icon: '👨‍🏫', title: 'Practitioner-Led Teaching', desc: 'No career academics. Our facilitators are active professionals who bring real production problems into the classroom.' },
    { icon: '🌍', title: 'Built for Africa', desc: 'From cloud engineering to community health, everything is contextualised for the African economy and its most urgent skills gaps.' },
    { icon: '🤝', title: 'Strategic Industry Bridging', desc: 'We align our curriculum with active hiring cycles across our institutional network to ensure graduates are priority-listed.' },
    { icon: '💰', title: 'Flexible Funding', desc: 'Instalment plans, B-BBEE employer-sponsored cohorts, SETA funding, or self-funded — we have a path for every budget.' },
    { icon: '🚀', title: 'Entrepreneur Empowerment', desc: "We don't just train employees; we build entrepreneurs. Specialized pathways for launching your own venture exist across every stream." },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <SEO 
        title="Home"
        description="Africa's definitive practitioner-led institution housing multiple schools of excellence across Cloud, AI, Cybersecurity, Data, and Digital Business."
      />
      {/* Sophisticated Hero (from previous SDS Home) */}
      <Hero onOpenModal={onOpenModal || (() => {})} editMode={editMode} />

      {/* Stream Directory */}
      <section id="programs" className="py-20 bg-bg2 border-t border-border-custom relative z-10">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-brand" />
            <h2 className="font-syne font-black text-2xl text-text-custom uppercase tracking-wider">Stream Directory</h2>
            <div className="flex-1 h-px bg-glass-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streamsData.map((stream, idx) => (
              <motion.div key={stream.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx }}>
                <Link to={stream.path} className={`stream-card block p-8 rounded-2xl border ${stream.border} bg-surface transition-all group relative overflow-hidden h-full`}>
                  <div className="absolute top-0 right-0 p-4">
                    <span className={`stream-card-status text-[10px] font-jetbrains uppercase tracking-widest px-2 py-1 rounded border transition-colors ${(stream.status === 'Live' || stream.status === 'Enrolling') ? 'bg-brand/10 text-brand border-brand/20' : 'bg-bg2 text-text-muted border-border2'}`}>{stream.status}</span>
                  </div>
                  <div className={`w-16 h-16 rounded-xl ${stream.bg} ${stream.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>{stream.icon}</div>
                  <h3 className="stream-card-title text-xl font-syne font-bold text-text-custom mb-2 group-hover:text-brand transition-colors">{stream.title}</h3>
                  <p className="stream-card-tagline text-[11px] font-dm-mono text-text-muted uppercase tracking-widest mb-3 italic transition-colors">"{stream.tagline}"</p>
                  <p className="stream-card-desc text-sm text-text-muted font-outfit leading-relaxed mb-8 transition-colors">{stream.desc}</p>
                  <div className="stream-card-cta mt-auto flex items-center gap-2 text-xs font-bold text-text-custom group-hover:text-brand transition-colors uppercase tracking-wider">
                    {(stream.status === 'Live' || stream.status === 'Enrolling') ? 'Enter Stream' : 'View Curriculum'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Ginashe Academy */}
      <section className="py-20 border-t border-border-custom relative z-10">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label mb-4 mx-auto">Why Ginashe Academy</div>
            <h2 className="text-3xl md:text-4xl font-syne font-black text-text-custom uppercase tracking-tighter">Not just another training provider.</h2>
            <p className="text-text-muted font-outfit mt-3 max-w-2xl mx-auto">We're a premier skills institution built on practitioner-led teaching and curricula co-developed with industry leaders for the African market.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyReasons.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }} className="bg-surface border border-border-custom rounded-xl p-6 hover:border-brand/20 transition-all group">
                <div className="text-2xl mb-3">{r.icon}</div>
                <h3 className="font-syne font-bold text-[15px] text-text-custom mb-2 group-hover:text-brand transition-colors">{r.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Voices */}
      <section className="py-20 bg-bg2 border-t border-border-custom relative z-10">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-brand" />
            <h2 className="font-syne font-black text-2xl text-text-custom uppercase tracking-wider">Institutional Voices</h2>
            <div className="flex-1 h-px bg-glass-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voices.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-surface border border-border-custom rounded-xl p-6 flex flex-col h-full hover:border-brand/20 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center font-syne font-bold text-brand text-sm overflow-hidden">
                    {v.image ? <img src={v.image} alt={v.name} className="w-full h-full object-cover" /> : v.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-syne font-bold text-[13px] text-text-custom">{v.name}</div>
                    <div className="font-dm-mono text-[9px] text-text-muted uppercase tracking-wider">{v.role}</div>
                  </div>
                </div>
                <blockquote className="text-[13px] text-text-muted leading-relaxed flex-1 italic">"{v.quote}"</blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA onOpenModal={onOpenModal || (() => {})} editMode={editMode} />

      {/* Promo Splash Modal */}
      <AnimatePresence>
        {showPromo && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDismissPromo}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl bg-gradient-to-br from-navy via-[#121620] to-[#0A0B0E] border border-brand/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,242,255,0.15)] overflow-hidden z-10"
            >
              {/* Close Button */}
              <button
                onClick={handleDismissPromo}
                className="absolute top-6 right-6 text-slate-400 hover:text-brand transition-colors p-2 rounded-full hover:bg-white/5 z-20"
                aria-label="Close Promo"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
                {/* Left Side (Content) */}
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 font-dm-mono text-[10px] tracking-[0.25em] uppercase text-brand mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
                    </span>
                    Live Radio Broadcast
                  </div>
                  
                  <h3 className="font-syne font-black text-2xl sm:text-4xl text-white leading-tight tracking-tight mb-5">
                    George Kapendeka <br />
                    <span className="text-brand italic font-light font-dm-sans">Live on SAUMA HD Radio</span>
                  </h3>
                  
                  <p className="text-slate-300 text-[13px] sm:text-[14px] leading-relaxed mb-6">
                    {promoWording.intro} He will discuss Ginashe Academy's 2026 academic cohorts, digital economy readiness, and our practitioner-led skills development pipelines designed to shape Africa's future economy.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm">
                      <Calendar size={16} className="text-brand shrink-0" />
                      <span>{promoWording.dateLabel}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm">
                      <Clock size={16} className="text-brand shrink-0" />
                      <span>11:00 AM SAST (GMT+2)</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm">
                      <Volume2 size={16} className="text-brand shrink-0" />
                      <span>Broadcasting globally online</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://saumahdradio0.webradiosite.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-brand justify-center text-center no-underline"
                      onClick={handleDismissPromo}
                    >
                      {promoWording.buttonLabel}
                      <ArrowRight size={14} />
                    </a>
                    <button
                      onClick={handleDismissPromo}
                      className="btn border border-white/10 text-white hover:bg-white/5 hover:border-brand/40 justify-center text-center transition-all"
                    >
                      Remind Me Later
                    </button>
                  </div>
                </div>

                {/* Right Side (Visual Card) */}
                <div className="relative bg-[#07080a] border-t md:border-t-0 md:border-l border-brand/10 p-8 sm:p-12 flex flex-col items-center justify-center overflow-hidden group">
                  {/* Neon Grid Backdrop */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.06),transparent_70%)] z-0" />
                  
                  {/* Glowing waves or graphic design */}
                  <div className="relative z-10 w-full max-w-[240px] aspect-square rounded-3xl overflow-hidden border border-brand/20 shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105">
                    <img
                      src="/sauma_logo.jpg"
                      alt="SAUMA HD Radio Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="relative z-10 text-center mt-6">
                    <div className="font-dm-mono text-[9px] text-slate-500 uppercase tracking-[0.3em] mb-1">Broadcaster</div>
                    <div className="font-syne font-extrabold text-sm text-white tracking-wider">SAUMA HD RADIO</div>
                    <p className="text-[10px] text-slate-400/60 mt-1">HD Streaming Portal</p>
                  </div>

                  {/* Audio visualization simulation animation */}
                  <div className="flex items-center gap-1.5 mt-5 relative z-10 h-6">
                    {[16, 24, 12, 28, 18, 14, 22, 10].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-brand rounded-full transition-all duration-300 animate-pulse"
                        style={{
                          height: `${h}px`,
                          animationDelay: `${i * 0.15}s`,
                          animationDuration: '0.8s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
