import React from 'react';
import { Link } from 'react-router-dom';
import { TrustBar, Programs } from '../components/Programs';
import { CTA } from '../components/Footer';
import { motion } from 'motion/react';

interface DssDashboardProps {
  stream: any;
  onOpenModal?: (id: string, metadata?: any) => void;
  editMode?: boolean;
}

// ─── WHY GDA — Social Proof Section ─────────
function WhySection() {
  const reasons = [
    { icon: '🎯', title: 'Industry-Designed Curriculum', desc: 'Every module is co-built with hiring managers from leading tech firms — so you learn what the global market actually needs.' },
    { icon: '👨‍🏫', title: 'Practitioner-Led Teaching', desc: 'No career academics. Our instructors are active Cloud Architects, ML Engineers, and CTOs who bring real production problems into the classroom.' },
    { icon: '🤝', title: 'Strategic Industry Bridging', desc: 'Our Career Services team doesn\'t just wait for graduation. We align our curriculum with active technical hiring cycles across our institutional network to ensure our candidates are priority-listed.' },
    { icon: '🌍', title: 'Built for Africa', desc: 'From cloud engineering to digital transformation, everything is contextualised for the African digital economy.' },
    { icon: '💰', title: 'Flexible Funding', desc: 'Instalment plans, employer-sponsored, or self-funded — we have a path for every budget. No one is turned away for financial reasons alone.' },
    { icon: '🚀', title: 'Founder & Freelance Empowerment', desc: 'We don\'t just train employees; we build digital entrepreneurs. Our curriculum includes specialized pathways for launching your own tech consultancy, freelancing globally, or founding a startup.' },
  ];

  return (
    <section className="bg-bg2 border-t border-b border-border-custom">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-10 md:mb-12">
          <div className="font-dm-mono text-[10px] text-brand uppercase tracking-[0.4em] mb-4 flex justify-center">Why Digital Systems Stream</div>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-text-custom mb-4">Not just another bootcamp.</h2>
          <p className="text-text-soft text-sm md:text-base leading-relaxed max-w-2xl mx-auto">We're a premier digital institution built on practitioner-led teaching and curricula co-developed with industry leaders for the African market.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((r, i) => (
            <div key={i} className="bg-card border border-border-custom rounded-xl p-5 md:p-6 hover:border-brand/20 transition-all group">
              <div className="text-2xl mb-3">{r.icon}</div>
              <h3 className="font-syne font-bold text-[15px] mb-2 group-hover:text-brand transition-colors text-text-custom">{r.title}</h3>
              <p className="text-[13px] text-text-soft leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────
function Testimonials() {
  const testimonials = [
    { name: 'George K', role: 'Executive Director', programme: 'Digital Strategy & Governance', quote: 'At Ginashe, we aren\'t just teaching code; we\'re architecting the future of African sovereignty in the global digital economy.', link: '/streams/digital-systems/authority', image: '/images/faculty/george.jpg' },
    { name: 'Talent K', role: 'Lead Faculty (Cloud Specialist)', programme: 'Cloud Architecture Residency', quote: 'Our curriculum is live fire. We prepare candidates to handle production-scale architectures from Day 1, bridging the gap between theory and technical mastery.', link: '/streams/digital-systems/authority' },
    { name: 'Lebo C', role: 'Prospective Candidate', programme: 'Software Engineering Peak', quote: 'I chose the Digital Systems Stream because I wanted a path that was practitioner-led. The focus on real-world impact over generic accreditation is what the market is actually demanding.' },
  ];

  return (
    <section className="bg-bg border-t border-border-custom py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 md:mb-10 text-center">
          <div className="font-dm-mono text-[10px] text-brand uppercase tracking-[0.4em] mb-4">Institutional Voices</div>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-text-custom">Leading the Digital Frontier.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((t, i) => {
            const CardContent = (
              <div key={i} className={`bg-card border border-border-custom rounded-xl p-5 md:p-6 flex flex-col h-full transition-all duration-300 ${t.link ? 'hover:border-brand/40 hover:bg-glass-bg' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center font-syne font-bold text-brand text-sm overflow-hidden">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      t.name.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                  <div>
                    <div className="font-syne font-bold text-[13px] text-text-custom">{t.name}</div>
                    <div className="font-dm-mono text-[9px] text-text-muted uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
                <blockquote className="text-[13px] text-text-soft leading-relaxed flex-1 italic">"{t.quote}"</blockquote>
                <div className="mt-4 pt-3 border-t border-border-custom">
                  <span className="font-dm-mono text-[8px] text-brand uppercase tracking-widest">{t.programme}</span>
                </div>
              </div>
            );

            return t.link ? (
              <Link key={i} to={t.link} className="no-underline block h-full">
                {CardContent}
              </Link>
            ) : (
              <div key={i} className="h-full">
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function DssDashboard({ stream, onOpenModal, editMode }: DssDashboardProps) {
  return (
    <div className="bg-bg">
      {/* Custom DSS Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className={`w-16 h-16 rounded-2xl ${stream.bg} ${stream.color} flex items-center justify-center`}>
              {stream.icon}
            </div>
            <div>
              <div className="font-dm-mono text-[10px] text-brand tracking-[0.2em] uppercase mb-1">{stream.abbr}</div>
              <h1 className="text-3xl md:text-5xl font-syne font-black text-text-custom">{stream.title}</h1>
            </div>
          </div>
          <p className="text-xl text-text-muted font-outfit max-w-3xl leading-relaxed">
            {stream.desc}
          </p>
          <p className="text-sm text-brand font-dm-mono italic mt-4 mb-8">
            "{stream.tagline}"
          </p>
        </motion.div>
      </div>

      <Programs onOpenModal={onOpenModal || (() => {})} editMode={editMode} isHomePage={true} />
      <WhySection />
      <TrustBar />
      <Testimonials />
      <CTA onOpenModal={onOpenModal || (() => {})} editMode={editMode} />
    </div>
  );
}
