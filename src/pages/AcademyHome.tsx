import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Hero from '../components/Hero';
import { TrustBar } from '../components/Programs';
import { CTA } from '../components/Footer';
import { streamsData } from '../data/streams';

interface AcademyHomeProps {
  onOpenModal?: (id: string) => void;
  editMode?: boolean;
}

export default function AcademyHome({ onOpenModal, editMode }: AcademyHomeProps) {
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
      {/* Sophisticated Hero (from previous SDS Home) */}
      <Hero onOpenModal={onOpenModal || (() => {})} editMode={editMode} />

      {/* Stream Directory */}
      <section id="programs" className="py-20 bg-black/20 border-t border-white/5 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-brand" />
            <h2 className="font-syne font-black text-2xl text-white uppercase tracking-wider">Stream Directory</h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streamsData.map((stream, idx) => (
              <motion.div key={stream.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx }}>
                <Link to={stream.path} className={`block p-8 rounded-2xl border ${stream.border} bg-white/[0.02] hover:bg-white/[0.04] transition-all group relative overflow-hidden h-full`}>
                  <div className="absolute top-0 right-0 p-4">
                    <span className={`text-[10px] font-jetbrains uppercase tracking-widest px-2 py-1 rounded border ${stream.status === 'Live' ? 'bg-brand/10 text-brand border-brand/20' : 'bg-white/5 text-text-muted border-white/10'}`}>{stream.status}</span>
                  </div>
                  <div className={`w-16 h-16 rounded-xl ${stream.bg} ${stream.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>{stream.icon}</div>
                  <h3 className="text-xl font-syne font-bold text-white mb-2 group-hover:text-brand transition-colors">{stream.title}</h3>
                  <p className="text-[11px] font-dm-mono text-brand/60 uppercase tracking-widest mb-3 italic">"{stream.tagline}"</p>
                  <p className="text-sm text-text-muted font-outfit leading-relaxed mb-8">{stream.desc}</p>
                  <div className="mt-auto flex items-center gap-2 text-xs font-bold text-white group-hover:text-brand transition-colors uppercase tracking-wider">
                    {stream.status === 'Live' ? 'Enter Stream' : 'View Curriculum'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TrustBar for Social Proof */}
      <TrustBar />

      {/* Why Ginashe Academy */}
      <section className="py-20 border-t border-white/5 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-brand font-jetbrains text-[10px] uppercase tracking-[0.3em] mb-4"><div className="w-8 h-px bg-brand/40" /> Why Ginashe Academy <div className="w-8 h-px bg-brand/40" /></div>
            <h2 className="text-3xl md:text-4xl font-syne font-black text-white uppercase tracking-tighter">Not just another training provider.</h2>
            <p className="text-text-muted font-outfit mt-3 max-w-2xl mx-auto">We're a premier skills institution built on practitioner-led teaching and curricula co-developed with industry leaders for the African market.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyReasons.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-brand/20 transition-all group">
                <div className="text-2xl mb-3">{r.icon}</div>
                <h3 className="font-syne font-bold text-[15px] text-white mb-2 group-hover:text-brand transition-colors">{r.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Voices */}
      <section className="py-20 bg-black/20 border-t border-white/5 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-brand" />
            <h2 className="font-syne font-black text-2xl text-white uppercase tracking-wider">Institutional Voices</h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voices.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 flex flex-col h-full hover:border-brand/20 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center font-syne font-bold text-brand text-sm overflow-hidden">
                    {v.image ? <img src={v.image} alt={v.name} className="w-full h-full object-cover" /> : v.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-syne font-bold text-[13px] text-white">{v.name}</div>
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
    </div>
  );
}
