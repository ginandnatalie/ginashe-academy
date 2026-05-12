import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Code, Activity, Battery, Leaf, Coins, Wrench, Palette, Rocket, BookOpen, SunMedium, ArrowRight, Search } from 'lucide-react';

const streamsData = [
  { id: 'digital-systems', abbr: 'SDS', title: 'Stream of Digital Systems', tagline: 'Deploy to Cape Town', desc: 'Software, cloud & artificial intelligence', why: 'Largest skills gap in SA — over 20,000 unfilled cloud jobs by 2027. Direct POPIA compliance demand. AWS af-south-1 in Cape Town gives SA learners a uniquely accessible entry point.', courses: '8 courses', nqf: 'NQF L2–L6', duration: '4–20 weeks', seta: 'MICT SETA', graduates: 'Cloud Engineer · AI/ML Specialist · Full-Stack Developer · Security Analyst', icon: <Code className="w-10 h-10" />, color: 'text-brand', bg: 'bg-brand/10', border: 'border-brand/30', path: '/streams/digital-systems', status: 'Live', tier: 'Flagship' },
  { id: 'health-sciences', abbr: 'SHS', title: 'Stream of Health Sciences', tagline: 'Heal Your Community', desc: 'Community health, nursing & mental wellbeing', why: 'SA has 1 doctor per 1,700 people. Community Health Workers are the most scalable health intervention. Post-COVID mental health crisis is the most underserved public health concern.', courses: '9 courses', nqf: 'NQF L4–L5', duration: '8–32 weeks', seta: 'HWSETA', graduates: 'Community Health Worker · Mental Health Counsellor · Clinic Administrator · Health Educator', icon: <Activity className="w-10 h-10" />, color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/30', path: '/streams/health-sciences', status: 'Coming Soon', tier: 'Flagship' },
  { id: 'energy-infrastructure', abbr: 'SEI', title: 'Stream of Energy & Infrastructure', tagline: 'Power the Future', desc: 'Renewable energy, power & water systems', why: 'Eskom crisis and Just Energy Transition will create 50,000+ jobs in renewable energy by 2030. Solar PV technicians are in chronic shortage.', courses: '8 courses', nqf: 'NQF L3–L5', duration: '10–16 weeks', seta: 'EWSETA', graduates: 'Solar PV Technician · Energy Auditor · Renewable Systems Designer · Utility Manager', icon: <Battery className="w-10 h-10" />, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', path: '/streams/energy-infrastructure', status: 'Coming Soon', tier: 'Flagship' },
  { id: 'agriculture-food', abbr: 'SAF', title: 'Stream of Agriculture & Food Security', tagline: 'Feed the Continent', desc: 'Modern farming, agritech & food systems', why: 'SA has 6 million smallholder farmers. Food insecurity affects 1 in 5 households. Agritech is creating new categories of well-paid rural employment.', courses: '8 courses', nqf: 'NQF L3–L5', duration: '10–16 weeks', seta: 'AgriSETA', graduates: 'Agripreneur · Precision Farmer · Food Processing Technician · Agritech Specialist', icon: <Leaf className="w-10 h-10" />, color: 'text-emerald', bg: 'bg-emerald/10', border: 'border-emerald/30', path: '/streams/agriculture-food', status: 'Coming Soon', tier: 'Flagship' },
  { id: 'financial-literacy', abbr: 'SFL', title: 'Stream of Financial Literacy & FinTech', tagline: 'Own Your Money', desc: 'Personal finance, banking & digital payments', why: 'SAICA reports 70% of SA youth cannot manage a basic budget. The township economy is digitising rapidly, creating demand for FinTech-literate professionals.', courses: '7 courses', nqf: 'NQF L3–L5', duration: '6–16 weeks', seta: 'INSETA', graduates: 'Financial Advisor · FinTech Specialist · SACCO Manager · Tax Practitioner', icon: <Coins className="w-10 h-10" />, color: 'text-sky', bg: 'bg-sky/10', border: 'border-sky/30', path: '/streams/financial-literacy', status: 'Coming Soon', tier: 'Flagship' },
  { id: 'applied-trades', abbr: 'SAT', title: 'Stream of Applied Trades & Engineering', tagline: 'Build with Your Hands', desc: 'Electrical, plumbing, construction & repair', why: 'SA needs 30,000 more artisans every year. TVET colleges are under-enrolled. Trades produce immediate employment AND entrepreneurship pathways.', courses: '9 courses', nqf: 'NQF L3–L5', duration: '12–24 weeks', seta: 'MERSETA', graduates: 'Master Electrician · Plumber · Automotive Technician · Hardware Engineer', icon: <Wrench className="w-10 h-10" />, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30', path: '/streams/applied-trades', status: 'Coming Soon', tier: 'Strategic' },
  { id: 'creative-media', abbr: 'SCD', title: 'Stream of Creative & Digital Media', tagline: "Tell Africa's Story", desc: 'Design, film, music & content creation', why: "Africa's creative economy is projected at $4.2B by 2025. Nollywood, Afrobeats, Amapiano, and SA fashion are global cultural exports.", courses: '8 courses', nqf: 'NQF L4–L5', duration: '10–20 weeks', seta: 'MICT SETA', graduates: 'Creative Director · Content Creator · UI/UX Designer · Brand Strategist', icon: <Palette className="w-10 h-10" />, color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10', border: 'border-fuchsia-400/30', path: '/streams/creative-media', status: 'Coming Soon', tier: 'Strategic' },
  { id: 'leadership-entrepreneurship', abbr: 'SLE', title: 'Stream of Leadership & Entrepreneurship', tagline: 'Make Things Happen', desc: 'Business strategy, venture building & governance', why: "SA's 32% youth unemployment cannot be solved by job-seeker programmes alone. We need job CREATORS. This stream is the multiplier.", courses: '7 courses', nqf: 'NQF L4–L5', duration: '8–12 weeks', seta: 'SERVICES SETA', graduates: 'Entrepreneur · Technical Founder · NGO Manager · Corporate Leader', icon: <Rocket className="w-10 h-10" />, color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/30', path: '/streams/leadership-entrepreneurship', status: 'Coming Soon', tier: 'Strategic' },
  { id: 'early-childhood', abbr: 'SEC', title: 'Stream of Early Childhood & Education', tagline: 'Shape Every Child', desc: 'Teaching, ECD & education technology', why: 'PIRLS 2021: 81% of SA Grade 4 learners cannot read for meaning. Early Childhood Development is the single highest-leverage education intervention available.', courses: '7 courses', nqf: 'NQF L4–L5', duration: '12–32 weeks', seta: 'ETDP SETA', graduates: 'ECD Practitioner · Primary Teacher · Educational Therapist · EdTech Coordinator', icon: <BookOpen className="w-10 h-10" />, color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/30', path: '/streams/early-childhood', status: 'Coming Soon', tier: 'Strategic' },
  { id: 'environment-climate', abbr: 'SCA', title: 'Stream of Environment & Climate Action', tagline: "Protect What's Ours", desc: 'Conservation, climate resilience & green economy', why: 'SA is among the top 20 global emitters. Conservation is a continent-wide economic asset. Carbon markets and climate finance will be among the fastest-growing job categories.', courses: '7 courses', nqf: 'NQF L3–L5', duration: '6–20 weeks', seta: 'WRSETA', graduates: 'Conservation Officer · Climate Advisor · Waste Entrepreneur · Green Building Assessor', icon: <SunMedium className="w-10 h-10" />, color: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/30', path: '/streams/environment-climate', status: 'Coming Soon', tier: 'Emerging' },
];

const tiers = ['All', 'Flagship', 'Strategic', 'Emerging'];

export default function StreamsPage() {
  const [activeTier, setActiveTier] = useState('All');
  const filtered = activeTier === 'All' ? streamsData : streamsData.filter(s => s.tier === activeTier);

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy via-bg to-bg" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 text-brand font-jetbrains text-[10px] uppercase tracking-[0.3em] mb-4"><div className="w-8 h-px bg-brand/40" /> Stream Directory <div className="w-8 h-px bg-brand/40" /></div>
            <h1 className="text-4xl md:text-6xl font-syne font-black text-white uppercase tracking-tighter mb-4">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald">Streams</span></h1>
            <p className="text-lg text-text-muted font-outfit max-w-2xl mb-8">10 purpose-built streamsData spanning 80+ courses, aligned to 9 SETAs, designed to close Africa's most urgent skills gaps.</p>
          </motion.div>

          {/* Tier Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {tiers.map(tier => (
              <button key={tier} onClick={() => setActiveTier(tier)} className={`px-4 py-2 rounded-lg font-outfit font-bold text-[12px] uppercase tracking-wider transition-all border ${activeTier === tier ? 'bg-brand text-navy border-brand' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'}`}>
                {tier} {tier !== 'All' && <span className="ml-1 text-[10px] opacity-60">({streamsData.filter(s => tier === 'All' || s.tier === tier).length})</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Streams Grid */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-6">
            {filtered.map((stream, idx) => (
              <motion.div key={stream.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx }}>
                <Link to={stream.path} className={`block rounded-2xl border ${stream.border} bg-white/[0.02] hover:bg-white/[0.04] transition-all group relative overflow-hidden no-underline`}>
                  <div className="flex flex-col lg:flex-row">
                    {/* Left: Stream Identity */}
                    <div className="p-8 lg:w-[320px] shrink-0 flex flex-col items-start">
                      <div className={`w-16 h-16 rounded-xl ${stream.bg} ${stream.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>{stream.icon}</div>
                      <span className={`font-syne font-black text-3xl ${stream.color} mb-1`}>{stream.abbr}</span>
                      <h2 className="text-lg font-syne font-bold text-white mb-1 group-hover:text-brand transition-colors">{stream.title}</h2>
                      <p className="text-[11px] font-dm-mono text-brand/60 uppercase tracking-widest italic mb-3">"{stream.tagline}"</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[9px] font-jetbrains uppercase tracking-widest px-2 py-0.5 rounded border ${stream.status === 'Live' ? 'bg-brand/10 text-brand border-brand/20' : 'bg-white/5 text-text-muted border-white/10'}`}>{stream.status}</span>
                        <span className="text-[9px] font-jetbrains uppercase tracking-widest text-white/30 px-2 py-0.5 rounded border border-white/5">{stream.tier}</span>
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div className="flex-1 p-8 border-t lg:border-t-0 lg:border-l border-white/5">
                      <p className="text-[13px] text-text-muted leading-relaxed mb-6">{stream.why}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        <div><div className="text-[8px] font-dm-mono text-text-dim uppercase tracking-widest mb-1">Courses</div><div className="font-syne font-bold text-sm text-white">{stream.courses}</div></div>
                        <div><div className="text-[8px] font-dm-mono text-text-dim uppercase tracking-widest mb-1">NQF Range</div><div className="font-syne font-bold text-sm text-white">{stream.nqf}</div></div>
                        <div><div className="text-[8px] font-dm-mono text-text-dim uppercase tracking-widest mb-1">Duration</div><div className="font-syne font-bold text-sm text-white">{stream.duration}</div></div>
                        <div><div className="text-[8px] font-dm-mono text-text-dim uppercase tracking-widest mb-1">SETA</div><div className="font-syne font-bold text-sm text-white">{stream.seta}</div></div>
                      </div>
                      <div>
                        <div className="text-[8px] font-dm-mono text-text-dim uppercase tracking-widest mb-2">Graduate Outcomes</div>
                        <p className="text-[12px] text-white/70 font-outfit">{stream.graduates}</p>
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-xs font-bold text-white group-hover:text-brand transition-colors uppercase tracking-wider">
                        {stream.status === 'Live' ? 'Enter Stream' : 'View Curriculum'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-black/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '78+', label: 'Courses' },
              { value: '9', label: 'SETAs Aligned' },
              { value: 'NQF L2–L6', label: 'Qualification Range' },
              { value: '4–52 wks', label: 'Duration Range' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-syne font-black text-brand mb-1">{s.value}</div>
                <div className="text-[11px] font-outfit text-text-muted uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
