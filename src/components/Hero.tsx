import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import InstitutionalHeroVisual from './InstitutionalHeroVisual';

interface HeroProps {
  onOpenModal: (id: string) => void;
  editMode?: boolean;
}

export default function Hero({ onOpenModal, editMode }: HeroProps) {
  const [counters, setCounters] = useState({ graduates: 0, employers: 0, programmes: 0, placement: 0, uplift: 0, countries: 0 });
  const [isExplorer, setIsExplorer] = useState(false);
  const [isHighDemand, setIsHighDemand] = useState(true); // Marketing signal

  const [heroContent, setHeroContent] = useState({
    title: "Africa's Future Economy Built Here",
    subtitle: "Africa's multi-disciplinary academy for practitioner-led skills development. Spanning 10 purpose-built streams—from Health Sciences and Trades to Tech and Agriculture—we engineer talent for the continental economy, from Johannesburg to the world.",
    intakeStatus: 'OPEN'
  });

  const [matcherGoal, setMatcherGoal] = useState<string>('switch');
  const [selectedStreamId, setSelectedStreamId] = useState<string>('digital-systems');

  const streamDetails: Record<string, { flagship: string; nqf: string; duration: string; seta: string; outcome: string }> = {
    'digital-systems': {
      flagship: 'Cloud Launchpad & DevOps Architecture',
      nqf: 'NQF L4–L5',
      duration: '12–16 wks',
      seta: 'MICT SETA',
      outcome: 'AWS Cloud Support & DevOps Engineer with Live-Fire labs.'
    },
    'health-sciences': {
      flagship: 'Community Health & Clinical Support',
      nqf: 'NQF L4',
      duration: '16–32 wks',
      seta: 'HWSETA',
      outcome: 'Registered CHW & Clinic Administrator deployed in regional care.'
    },
    'energy-infrastructure': {
      flagship: 'Solar PV & Off-Grid Storage Systems',
      nqf: 'NQF L4–L5',
      duration: '12–16 wks',
      seta: 'EWSETA',
      outcome: 'Certified Solar PV & Battery Storage Technician for SA grid.'
    },
    'financial-literacy': {
      flagship: 'FinTech Engineering & Digital Banking',
      nqf: 'NQF L4–L5',
      duration: '10–14 wks',
      seta: 'INSETA',
      outcome: 'Digital Payments Specialist & FSCA Compliance Practitioner.'
    },
    'agriculture-food': {
      flagship: 'Agritech & Precision Food Systems',
      nqf: 'NQF L4–L5',
      duration: '12–16 wks',
      seta: 'AgriSETA',
      outcome: 'Commercial Farm Digital Operator & Hydroponic Systems Lead.'
    },
    'applied-trades': {
      flagship: 'Electrical Installation & Trades Mastery',
      nqf: 'NQF L3–L5',
      duration: '16–24 wks',
      seta: 'MERSETA',
      outcome: 'Licensed Trade Artisan & Contracting Enterprise Operator.'
    },
  };

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 1)
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') return;
          if (error.message?.includes('Could not find the table')) return;
          throw error;
        }

        if (data) {
          setHeroContent({
            title: data.herotitle,
            subtitle: data.herosubtitle,
            intakeStatus: data.intakestatus || 'OPEN'
          });
        }
      } catch (err) {
        console.error('Error fetching hero settings:', err);
      }
    }
    fetchSettings();
  }, []);

  useEffect(() => {
    const handleSave = async () => {
      try {
        const { error } = await supabase
          .from('site_settings')
          .update({
            herotitle: heroContent.title,
            herosubtitle: heroContent.subtitle
          })
          .eq('id', 1);
        
        if (error) throw error;
      } catch (err) {
        console.error('Error saving hero content:', err);
      }
    };

    window.addEventListener('save-site-content', handleSave);
    return () => window.removeEventListener('save-site-content', handleSave);
  }, [heroContent]);

  // Removed legacy particle canvas logic to use InstitutionalHeroVisual

  useEffect(() => {
    const targets = { graduates: 1247, employers: 48, programmes: 12, placement: 94, uplift: 62, countries: 7 };
    const dur = 1400;
    const step = 16;
    const timers: any[] = [];

    Object.entries(targets).forEach(([key, target]) => {
      const inc = target / (dur / step);
      let cur = 0;
      const timer = setInterval(() => {
        cur = Math.min(cur + inc, target);
        setCounters(prev => ({ ...prev, [key]: Math.floor(cur) }));
        if (cur >= target) clearInterval(timer);
      }, step);
      timers.push(timer);
    });

    return () => timers.forEach(clearInterval);
  }, []);

  useEffect(() => {
    // Check if user has visited curriculum before
    const explorerState = localStorage.getItem('gda_explorer_state');
    if (explorerState === 'active') {
      setIsExplorer(true);
    }
  }, []);

  return (
    <section id="hero" className="min-h-[100svh] flex flex-col pt-[72px] overflow-hidden relative bg-bg">
      {/* Background Visual — high-fidelity video and overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <InstitutionalHeroVisual showBackground={false} className="opacity-100" />
        
        {/* LIGHT MODE VIGOUR: Adding a vibrant radial wash for light mode specifically */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,242,255,0.15),transparent_50%)] dark:hidden z-[1]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,242,255,0.1),transparent_50%)] dark:hidden z-[1]"></div>

        {/* Multi-layer fade: hard left edge → transparent right */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/75 via-40% to-transparent z-[5]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent z-[5]"></div>
        {/* Extra protection for text area on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg/90 to-transparent md:hidden z-[5]"></div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 md:px-14 py-10 sm:py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-[10] flex-1">
        <div className="hero-left">
          <div className="inline-flex items-center gap-2.5 font-dm-mono text-[10px] tracking-[0.25em] uppercase text-brand mb-5 animate-fadeUp">
            <div className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-full font-bold transition-all ${heroContent.intakeStatus === 'OPEN' ? 'bg-navy dark:bg-navy border-brand/40 text-brand shadow-[0_0_20px_rgba(0,242,255,0.25)]' : 'bg-navy border-coral/30 text-coral shadow-[0_0_15px_rgba(248,113,113,0.15)]'}`}>
              <span className="pulse"></span>
              2026 Cohorts — {heroContent.intakeStatus === 'OPEN' ? 'Applications Open' : heroContent.intakeStatus === 'CLOSED' ? 'Applications Closed' : 'Waitlist Only'}
            </div>
          </div>

          <h1 className="font-syne font-extrabold text-[32px] sm:text-[42px] md:text-[56px] lg:text-[76px] leading-[0.92] tracking-[-0.035em] mb-5 animate-fadeUp delay-100 relative group text-text-custom">
            {editMode ? (
              <textarea 
                className="w-full bg-surface/50 border border-brand/30 rounded p-2 text-text-custom outline-none focus:border-brand"
                value={heroContent.title}
                onChange={e => setHeroContent({...heroContent, title: e.target.value})}
              />
            ) : (
              <>
                Africa's
                <span className="block italic font-light font-dm-sans text-brand tracking-[-0.02em] drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">Future</span>
                <span>Economy</span>
                <br />
                <span className="bg-gradient-to-r from-text-custom via-brand to-text-custom bg-clip-text text-transparent opacity-90 transition-all duration-700 group-hover:via-brand-light" style={{ WebkitTextStroke: '1.2px var(--text-stroke)' }}>Built Here</span>
              </>
            )}
            {editMode && <span className="absolute -top-6 left-0 text-[10px] text-brand font-dm-mono uppercase">Edit Hero Title</span>}
          </h1>

          <div className="relative group mb-6 sm:mb-8">
            {editMode ? (
              <textarea 
                className="w-full bg-surface/50 border border-brand/30 rounded p-2 text-[16px] text-text-soft leading-[1.75] h-32 outline-none focus:border-brand"
                value={heroContent.subtitle}
                onChange={e => setHeroContent({...heroContent, subtitle: e.target.value})}
              />
            ) : (
              <p className="text-[14px] sm:text-[15px] md:text-[16px] text-text-soft leading-[1.7] max-w-[480px] animate-fadeUp delay-200">
                {heroContent.subtitle}
              </p>
            )}
            {editMode && <span className="absolute -top-6 left-0 text-[10px] text-brand font-dm-mono uppercase">Edit Hero Subtitle</span>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-wrap mb-8 animate-fadeUp delay-300">
            <button className="btn btn-brand btn-lg w-full sm:w-auto justify-center whitespace-nowrap" onClick={() => onOpenModal('apply_direct')}>
              Apply Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
            </button>
            <a href="#programs" className="btn btn-outline btn-lg w-full sm:w-auto text-center justify-center whitespace-nowrap">Explore Streams</a>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap animate-fadeUp delay-400">
            <span className="font-dm-mono text-[8px] sm:text-[9px] tracking-[0.15em] text-text-dim uppercase mr-1">Aligned Across 9 SETAs Including</span>
            {[
              { label: 'MICT SETA', color: '#3b82f6' },
              { label: 'HWSETA', color: '#f43f5e' },
              { label: 'MERSETA', color: '#f97316' },
              { label: 'AgriSETA', color: '#10b981' },
            ].map(c => (
              <span key={c.label} className="flex items-center gap-1 bg-card border border-border-custom px-2 py-1 rounded-sm font-dm-mono text-[8px] sm:text-[9px] tracking-[0.06em] text-text-muted hover:border-border2 hover:text-text-custom transition-all">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.color }}></span>{c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:flex flex-col items-center justify-center relative animate-fadeUp delay-200">
          {/* World-Class Admissions & Stream Matcher Console */}
          <div className="w-full max-w-[500px] bg-surface/90 border border-brand/25 rounded-2xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden group">
            {/* Ambient edge light */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-80" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-border-custom">
              <div>
                <span className="font-dm-mono text-[9px] tracking-[0.2em] uppercase text-brand font-semibold block">
                  ADMISSIONS CONSOLE · 2026
                </span>
                <span className="font-syne font-bold text-[16px] text-text-custom mt-0.5 block">
                  Fast-Track Eligibility & Matcher
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand font-dm-mono text-[9px] font-bold">
                <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
                Active Cohort
              </div>
            </div>

            {/* Interactive Stream Matcher Widget */}
            <div className="space-y-4">
              <div>
                <label className="block font-dm-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                  1. Select Your Objective:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'switch', label: 'Career Switch' },
                    { id: 'upskill', label: 'Upskill & Cert' },
                    { id: 'bbee', label: 'B-BBEE / Team' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setMatcherGoal(tab.id)}
                      className={`py-2 px-2 rounded-lg font-dm-mono text-[10px] tracking-tight border transition-all text-center ${
                        matcherGoal === tab.id
                          ? 'bg-brand text-navy font-bold border-brand shadow-[0_0_15px_rgba(0,242,255,0.25)]'
                          : 'bg-card/60 text-text-soft border-border-custom hover:border-brand/40'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-dm-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                  2. Focus Faculty Stream:
                </label>
                <select
                  value={selectedStreamId}
                  onChange={(e) => setSelectedStreamId(e.target.value)}
                  className="w-full bg-card border border-border-custom focus:border-brand rounded-xl px-3.5 py-2.5 text-[12px] font-syne font-semibold text-text-custom outline-none transition-colors"
                >
                  <option value="digital-systems">Digital Systems & Cloud (AWS/AI/DevOps)</option>
                  <option value="health-sciences">Health Sciences (Community Care & Nursing)</option>
                  <option value="energy-infrastructure">Energy & Infrastructure (Solar PV & Wind)</option>
                  <option value="financial-literacy">Financial Literacy & FinTech (Banking APIs)</option>
                  <option value="agriculture-food">Agriculture & Food Security (Precision Agri)</option>
                  <option value="applied-trades">Applied Trades & Engineering (Electrician/Plumbing)</option>
                </select>
              </div>

              {/* Match Result Preview */}
              <div className="bg-card/80 border border-border-custom rounded-xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[9px] font-dm-mono uppercase tracking-wider bg-brand/10 text-brand border border-brand/20 mb-1.5">
                      {streamDetails[selectedStreamId]?.seta} Aligned · {streamDetails[selectedStreamId]?.nqf || 'NQF L4–L5'}
                    </span>
                    <h4 className="font-syne font-bold text-[14px] text-text-custom leading-snug">
                      {streamDetails[selectedStreamId]?.flagship || 'Practitioner Diploma'}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-dm-mono text-[10px] text-brand font-bold block">
                      {streamDetails[selectedStreamId]?.duration || '12–16 wks'}
                    </span>
                    <span className="font-dm-mono text-[8px] text-text-muted uppercase">
                      Hybrid / Live-Fire
                    </span>
                  </div>
                </div>

                <p className="font-outfit text-[11px] text-text-muted mt-2 leading-relaxed">
                  {streamDetails[selectedStreamId]?.outcome || 'Industry capstone with guaranteed interview pipeline.'}
                </p>

                <div className="mt-3.5 pt-3 border-t border-border-custom/60 flex items-center justify-between text-[10px] font-dm-mono text-text-soft">
                  <span>Next Cohort: <strong className="text-text-custom">14 April 2026</strong></span>
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 18 Seats Left
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onOpenModal('apply_direct')}
                  className="py-3 px-4 rounded-xl bg-brand text-navy font-syne font-black text-[11px] uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] text-center flex items-center justify-center gap-1.5"
                >
                  Apply Direct
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                </button>
                <Link
                  to={`/streams/${selectedStreamId}`}
                  className="py-3 px-4 rounded-xl bg-card border border-border-custom hover:border-brand text-text-custom font-syne font-bold text-[11px] uppercase tracking-wider text-center transition-all flex items-center justify-center"
                >
                  View Syllabus
                </Link>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={() => onOpenModal('corporate_sponsor')}
                  className="font-dm-mono text-[9px] uppercase tracking-widest text-text-muted hover:text-brand transition-colors inline-flex items-center gap-1"
                >
                  Need corporate B-BBEE group funding? <span className="underline text-brand">Corporate Enquiries</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[2] border-t border-border-custom bg-bg/70 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 md:px-14 py-4 sm:py-5 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-y-4 gap-x-2">
          {[
            { value: '10', suffix: '', label: 'Purpose-Built Streams' },
            { value: '80', suffix: '+', label: 'Curriculum Courses' },
            { value: '9', suffix: '', label: 'SETAs Aligned' },
            { value: '100', suffix: '%', label: 'Practitioner Led' },
            { value: 'Built', suffix: '', label: 'For Africa' },
          ].map((stat, i) => (
            <div key={i} className={`flex flex-col gap-0.5 text-center md:text-left px-2 md:px-4 ${i < 4 ? 'md:border-r border-border-custom' : ''}`}>
              <div className="font-syne font-extrabold text-[20px] sm:text-[24px] md:text-[28px] tracking-[-0.04em] leading-none text-text-custom">{stat.value}<span className="text-brand">{stat.suffix}</span></div>
              <div className="font-dm-mono text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.12em] uppercase text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
