import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Globe2, 
  Briefcase, 
  Coins, 
  Rocket, 
  Award, 
  Users, 
  Building2, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  GraduationCap,
  ExternalLink,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from '../components/Hero';
import { CTA } from '../components/Footer';
import { streamsData } from '../data/streams';
import { SEO } from '../components/SEO';

interface AcademyHomeProps {
  onOpenModal?: (id: string) => void;
  editMode?: boolean;
}

export default function AcademyHome({ onOpenModal = () => {}, editMode }: AcademyHomeProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeFundingTab, setActiveFundingTab] = useState<'individual' | 'corporate' | 'seta'>('individual');

  const facultyCategories = [
    { id: 'all', label: 'All Disciplines', count: 10 },
    { id: 'digital', label: 'Digital & AI', streamIds: ['digital-systems', 'creative-media'] },
    { id: 'health', label: 'Health & Care', streamIds: ['health-sciences', 'early-childhood'] },
    { id: 'energy-trades', label: 'Energy & Trades', streamIds: ['energy-infrastructure', 'applied-trades', 'environment-climate'] },
    { id: 'business-agri', label: 'Business & Agri', streamIds: ['financial-literacy', 'agriculture-food', 'leadership-entrepreneurship'] },
  ];

  const filteredStreams = streamsData.filter(stream => {
    if (activeCategory === 'all') return true;
    const cat = facultyCategories.find(c => c.id === activeCategory);
    return cat?.streamIds?.includes(stream.id);
  });

  const regulatoryAlignments = [
    { name: 'QCTO', desc: 'Occupational Framework Aligned' },
    { name: 'MICT SETA', desc: 'Curriculum Framework Aligned' },
    { name: 'HWSETA', desc: 'Health Framework Aligned' },
    { name: 'MERSETA', desc: 'Engineering Framework Aligned' },
    { name: 'AgriSETA', desc: 'Agricultural Standard Aligned' },
    { name: 'EWSETA', desc: 'Energy Standard Aligned' },
    { name: 'AWS Academy', desc: 'Curriculum & Cloud Partner' },
    { name: 'Microsoft Learn', desc: 'Official Academic Partner' },
  ];

  const pillars = [
    { 
      icon: <CheckCircle2 className="w-6 h-6 text-brand" />, 
      badge: 'Curriculum Standard',
      title: 'Industry-Co-Designed Curricula', 
      desc: 'Every module is engineered directly with enterprise hiring managers across Johannesburg and Cape Town to address acute national skills deficits.' 
    },
    { 
      icon: <ShieldCheck className="w-6 h-6 text-emerald" />, 
      badge: 'Faculty Standard',
      title: '100% Practitioner-Led', 
      desc: 'No theoretical career academics. Facilitators are active solutions architects, clinical leaders, and master artisans who bring live production fire into class.' 
    },
    { 
      icon: <Globe2 className="w-6 h-6 text-sky" />, 
      badge: 'Sovereignty',
      title: 'Engineered for Africa', 
      desc: 'Contextualised solutions tackling real continental realities: load-shedding resilience, township economy digitization, and public clinic capacity.' 
    },
    { 
      icon: <Briefcase className="w-6 h-6 text-fuchsia-400" />, 
      badge: 'Career Pipeline',
      title: 'Pre-Vetted Hiring Linkages', 
      desc: 'Graduates enter an established employer ecosystem with direct placement pipelines, interview days, and structured apprenticeships.' 
    },
    { 
      icon: <Coins className="w-6 h-6 text-yellow-400" />, 
      badge: 'Financial Inclusion',
      title: 'Flexible Funding Frameworks', 
      desc: 'Accessible 0% interest monthly terms, employer B-BBEE Skills Development Levy allocations, and SETA-aligned grant guidance.' 
    },
    { 
      icon: <Rocket className="w-6 h-6 text-coral" />, 
      badge: 'Venture Incubation',
      title: 'Dual Track: Career & Venture', 
      desc: 'Beyond employment, every stream provides a structured incubation bridge to launch licensed contracting, agritech, or clinic support businesses.' 
    },
  ];

  const practitionerFaculty = [
    { 
      name: 'George K', 
      role: 'Managing Director & Strategic Lead', 
      stream: 'Institutional Governance & Leadership',
      quote: "At Ginashe, we aren't just teaching technical skills; we are architecting the foundation of African sovereign capability across every critical sector.", 
      image: '/images/faculty/george.jpg',
      credentials: 'MBA · 15+ Yrs Enterprise Strategy'
    },
    { 
      name: 'Talent K', 
      role: 'Lead Cloud & Systems Architect', 
      stream: 'Digital Systems & AI',
      quote: 'Our curriculum is live fire. Learners deploy to multi-region cloud environments, debug production downtime, and write compliance-ready automation from Week 2.',
      credentials: 'AWS Certified Solutions Architect Pro · Senior SRE'
    },
    { 
      name: 'Dr. N. Mthembu', 
      role: 'Clinical Practice Director', 
      stream: 'Health Sciences & Community Care',
      quote: 'Community healthcare is Africa’s frontline defense. We train practitioners who can step into regional triage, primary clinics, and home care with absolute competence.',
      credentials: 'MBChB · Public Health Consultant'
    },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <SEO 
        title="Ginashe Academy | Africa's Premier Multi-Disciplinary Institution"
        description="Practitioner-led academy engineering talent across 10 vital streams: Cloud & AI, Health Sciences, Renewable Energy, Agriculture, Trades, and FinTech."
      />

      {/* Hero Section */}
      <Hero onOpenModal={onOpenModal} editMode={editMode} />

      {/* Regulatory Alignment & Industry Standards Strip */}
      <section className="border-y border-border-custom bg-surface/70 backdrop-blur-md py-8 relative z-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left shrink-0">
              <span className="font-dm-mono text-[9px] uppercase tracking-[0.25em] text-brand font-bold block">
                Regulatory Frameworks & Curriculum Alignment
              </span>
              <span className="font-syne font-extrabold text-[15px] text-text-custom block">
                Aligned to National Qualification Standards & Global Vendors
              </span>
              <span className="font-dm-mono text-[9px] text-text-muted mt-0.5 block">
                Independent academy curricula structured to unit standards while progressing towards formal accreditation.
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 w-full md:w-auto">
              {regulatoryAlignments.map((item) => (
                <div 
                  key={item.name} 
                  className="bg-card/70 border border-border-custom hover:border-brand/40 px-3 py-2 rounded-lg text-center transition-colors group cursor-default"
                  title={item.desc}
                >
                  <span className="font-syne font-bold text-[11px] text-text-custom group-hover:text-brand block transition-colors">
                    {item.name}
                  </span>
                  <span className="font-dm-mono text-[7.5px] text-brand/80 truncate block">
                    Aligned
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Faculty Stream Directory */}
      <section id="programs" className="py-24 bg-bg2/40 border-b border-border-custom relative z-10">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 font-dm-mono text-[10px] tracking-[0.25em] uppercase text-brand font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                Academic Architecture · 10 Streams
              </div>
              <h2 className="font-syne font-black text-3xl md:text-5xl text-text-custom tracking-tight">
                Explore the Faculties.
              </h2>
              <p className="font-outfit text-text-soft text-base mt-2 max-w-2xl">
                Rigorous, industry-aligned curricula spanning high-growth technologies, healthcare infrastructure, sustainable agriculture, and artisanal engineering.
              </p>
            </div>

            {/* Discipline Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-surface border border-border-custom rounded-xl overflow-x-auto max-w-full">
              {facultyCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-lg font-dm-mono text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brand text-navy shadow-[0_0_12px_rgba(0,242,255,0.25)]'
                      : 'text-text-muted hover:text-text-custom hover:bg-card/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stream Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredStreams.map((stream, idx) => (
                <motion.div
                  key={stream.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className="flex flex-col"
                >
                  <div className={`p-7 rounded-2xl border ${stream.border} bg-surface/90 hover:bg-surface transition-all group relative overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl hover:border-brand/50`}>
                    {/* Top status & metadata */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="font-dm-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-card border border-border-custom text-text-soft font-bold">
                          {stream.seta} Aligned
                        </span>
                        <span className="font-dm-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-brand/10 border border-brand/20 text-brand font-semibold">
                          {stream.nqf} Aligned
                        </span>
                      </div>
                      <span className={`text-[10px] font-dm-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                        stream.status === 'Enrolling' 
                          ? 'bg-emerald/10 text-emerald border-emerald/30 font-bold' 
                          : 'bg-card text-text-muted border-border-custom'
                      }`}>
                        {stream.status}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl ${stream.bg} ${stream.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner`}>
                        {stream.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-syne font-bold text-text-custom group-hover:text-brand transition-colors leading-tight">
                          {stream.title}
                        </h3>
                        <p className="text-[11px] font-dm-mono text-brand/80 uppercase tracking-widest mt-1">
                          {stream.abbr} · {stream.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-soft font-outfit leading-relaxed mb-6 line-clamp-3">
                      {stream.why || stream.desc}
                    </p>

                    {/* Career Outcomes Preview */}
                    <div className="mb-6 p-3 rounded-xl bg-card/60 border border-border-custom/80">
                      <span className="font-dm-mono text-[8.5px] uppercase tracking-widest text-text-muted block mb-1">
                        Typical Graduate Roles:
                      </span>
                      <p className="font-syne font-semibold text-[11.5px] text-text-custom line-clamp-1">
                        {stream.graduates}
                      </p>
                    </div>

                    {/* Stream Details & Actions */}
                    <div className="mt-auto pt-4 border-t border-border-custom flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-text-muted font-dm-mono text-[10px]">
                        <Clock className="w-3.5 h-3.5 text-brand" />
                        <span>{stream.duration}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenModal('apply_direct')}
                          className="px-3 py-1.5 rounded-lg bg-brand/10 hover:bg-brand text-brand hover:text-navy font-syne font-bold text-[10.5px] uppercase tracking-wider transition-colors"
                        >
                          Fast Apply
                        </button>
                        <Link 
                          to={stream.path} 
                          className="p-1.5 rounded-lg bg-card border border-border-custom hover:border-brand text-text-custom hover:text-brand transition-colors"
                          title="View Full Curriculum"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* The 6 Institutional Pillars */}
      <section className="py-24 border-b border-border-custom relative z-10 bg-bg">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 font-dm-mono text-[10px] tracking-[0.25em] uppercase text-brand font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              The Ginashe Standard
            </div>
            <h2 className="text-3xl md:text-5xl font-syne font-black text-text-custom tracking-tight">
              Why We Are Fundamentally Different.
            </h2>
            <p className="text-text-soft font-outfit mt-4 text-base md:text-lg leading-relaxed">
              We eliminated the disconnect between traditional classroom theory and real enterprise execution. Our students learn within production constraints from Day One.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }} 
                className="bg-surface border border-border-custom hover:border-brand/40 rounded-2xl p-7 transition-all group flex flex-col h-full shadow-md"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border-custom flex items-center justify-center group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="font-dm-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-card border border-border-custom text-text-muted">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="font-syne font-bold text-lg text-text-custom mb-2.5 group-hover:text-brand transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-text-soft font-outfit leading-relaxed flex-1">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tuition & Institutional Funding Navigator */}
      <section className="py-24 bg-bg2/50 border-b border-border-custom relative z-10">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-dm-mono text-[10px] tracking-[0.25em] uppercase text-brand font-semibold block mb-2">
              Accessible Pathways · Transparent Investment
            </span>
            <h2 className="font-syne font-black text-3xl md:text-4xl text-text-custom tracking-tight">
              Three Flexible Routes to Fund Your Education
            </h2>
            <p className="font-outfit text-text-soft text-sm md:text-base mt-3">
              Whether you are an ambitious self-funded professional, an employer leveraging B-BBEE Skills Development Spend, or seeking SETA bursaries, we have an established track for you.
            </p>
          </div>

          {/* Funding Mode Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-surface border border-border-custom rounded-2xl">
              {[
                { id: 'individual', label: '1. Self-Funded & Installments' },
                { id: 'corporate', label: '2. Corporate B-BBEE Sponsorship' },
                { id: 'seta', label: '3. SETA Bursaries & Discretionary' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFundingTab(tab.id as any)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl font-dm-mono text-[11px] sm:text-[12px] font-bold tracking-wide transition-all ${
                    activeFundingTab === tab.id
                      ? 'bg-brand text-navy shadow-[0_0_15px_rgba(0,242,255,0.25)]'
                      : 'text-text-muted hover:text-text-custom'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Funding Card Details */}
          <div className="max-w-4xl mx-auto bg-surface border border-brand/30 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

            {activeFundingTab === 'individual' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-custom">
                  <div>
                    <span className="font-dm-mono text-[10px] text-brand uppercase tracking-wider block font-bold">
                      Direct Enrollment Track
                    </span>
                    <h3 className="font-syne font-black text-2xl text-text-custom mt-1">
                      Self-Paced or Cohort Installment Plans
                    </h3>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-emerald/10 border border-emerald/30 text-emerald font-dm-mono text-[11px] font-bold shrink-0">
                    0% Interest Available
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-card border border-border-custom">
                    <span className="font-dm-mono text-[9px] uppercase tracking-wider text-text-muted block">Deposit Requirement</span>
                    <strong className="font-syne font-bold text-lg text-text-custom mt-1 block">Low Initial Deposit</strong>
                    <p className="font-outfit text-xs text-text-soft mt-1">Secure your cohort seat with 15–20% down upon admissions acceptance.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border-custom">
                    <span className="font-dm-mono text-[9px] uppercase tracking-wider text-text-muted block">Duration</span>
                    <strong className="font-syne font-bold text-lg text-text-custom mt-1 block">3 to 12 Months</strong>
                    <p className="font-outfit text-xs text-text-soft mt-1">Spread tuition payments aligned with course milestones or monthly salary cycles.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border-custom">
                    <span className="font-dm-mono text-[9px] uppercase tracking-wider text-text-muted block">Guaranteed Access</span>
                    <strong className="font-syne font-bold text-lg text-text-custom mt-1 block">Full Lab & WIL Access</strong>
                    <p className="font-outfit text-xs text-text-soft mt-1">Unlimited access to cloud sandboxes, simulation suites, and mentor offices.</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs font-dm-mono text-text-muted">
                    Ready to begin? Complete your short admissions assessment today.
                  </span>
                  <button
                    onClick={() => onOpenModal('apply_direct')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand text-navy font-syne font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)]"
                  >
                    Start Direct Application
                  </button>
                </div>
              </div>
            )}

            {activeFundingTab === 'corporate' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-custom">
                  <div>
                    <span className="font-dm-mono text-[10px] text-brand uppercase tracking-wider block font-bold">
                      Enterprise & Employer Sponsored
                    </span>
                    <h3 className="font-syne font-black text-2xl text-text-custom mt-1">
                      B-BBEE Skills Development & Section 12H Tax Rebates
                    </h3>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-sky/10 border border-sky/30 text-sky font-dm-mono text-[11px] font-bold shrink-0">
                    Max Scorecard Return
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-card border border-border-custom">
                    <span className="font-dm-mono text-[9px] uppercase tracking-wider text-text-muted block">Scorecard Optimization</span>
                    <strong className="font-syne font-bold text-lg text-text-custom mt-1 block">Category B/C/D Points</strong>
                    <p className="font-outfit text-xs text-text-soft mt-1">Full compliance with Skills Development targets on your annual B-BBEE audit.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border-custom">
                    <span className="font-dm-mono text-[9px] uppercase tracking-wider text-text-muted block">Corporate Cohorts</span>
                    <strong className="font-syne font-bold text-lg text-text-custom mt-1 block">Customized Curricula</strong>
                    <p className="font-outfit text-xs text-text-soft mt-1">Dedicated cohorts tailored to your proprietary stack, security policies, and workflows.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border-custom">
                    <span className="font-dm-mono text-[9px] uppercase tracking-wider text-text-muted block">Tax Efficiency</span>
                    <strong className="font-syne font-bold text-lg text-text-custom mt-1 block">SARS Section 12H</strong>
                    <p className="font-outfit text-xs text-text-soft mt-1">Substantial learnership tax allowances upon registration and completion.</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs font-dm-mono text-text-muted">
                    Request an executive briefing or custom proposal for your L&D and Transformation team.
                  </span>
                  <button
                    onClick={() => onOpenModal('corporate_sponsor')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand text-navy font-syne font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)]"
                  >
                    Request Enterprise Proposal
                  </button>
                </div>
              </div>
            )}

            {activeFundingTab === 'seta' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-custom">
                  <div>
                    <span className="font-dm-mono text-[10px] text-brand uppercase tracking-wider block font-bold">
                      Public Sector & Subsidized Learning
                    </span>
                    <h3 className="font-syne font-black text-2xl text-text-custom mt-1">
                      SETA Discretionary Grants & Bursary Allocations
                    </h3>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-dm-mono text-[11px] font-bold shrink-0">
                    Fully Subsidized Quotas
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-card border border-border-custom">
                    <span className="font-dm-mono text-[9px] uppercase tracking-wider text-text-muted block">SETA Window</span>
                    <strong className="font-syne font-bold text-lg text-text-custom mt-1 block">9 Aligned SETAs</strong>
                    <p className="font-outfit text-xs text-text-soft mt-1">Facilitation for MICT, HWSETA, MERSETA, AgriSETA, and EWSETA windows.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border-custom">
                    <span className="font-dm-mono text-[9px] uppercase tracking-wider text-text-muted block">Learner Stipends</span>
                    <strong className="font-syne font-bold text-lg text-text-custom mt-1 block">Workplace Allowance</strong>
                    <p className="font-outfit text-xs text-text-soft mt-1">Qualifying learners in eligible learnerships receive standard monthly stipends.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border-custom">
                    <span className="font-dm-mono text-[9px] uppercase tracking-wider text-text-muted block">Application Support</span>
                    <strong className="font-syne font-bold text-lg text-text-custom mt-1 block">Institutional Endorsement</strong>
                    <p className="font-outfit text-xs text-text-soft mt-1">We assist prospective candidates and employers with documentation and submissions.</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs font-dm-mono text-text-muted">
                    Learn more about active bursary quotas and upcoming government funding windows.
                  </span>
                  <button
                    onClick={() => onOpenModal('apply_direct')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand text-navy font-syne font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)]"
                  >
                    Check Bursary Eligibility
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Practitioner Faculty & Institutional Voices */}
      <section className="py-24 border-b border-border-custom relative z-10 bg-bg">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 font-dm-mono text-[10px] tracking-[0.25em] uppercase text-brand font-semibold mb-3">
                <GraduationCap className="w-4 h-4" />
                Executive Faculty & Mentorship
              </div>
              <h2 className="font-syne font-black text-3xl md:text-5xl text-text-custom tracking-tight">
                Mentored by Active Practitioners.
              </h2>
            </div>
            <p className="font-outfit text-text-soft text-sm md:text-base max-w-md">
              Learn directly from professionals currently shipping systems, running hospital programs, and advising national infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {practitionerFaculty.map((v, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }} 
                className="bg-surface border border-border-custom rounded-2xl p-8 flex flex-col h-full hover:border-brand/30 transition-all shadow-md group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/25 flex items-center justify-center font-syne font-extrabold text-brand text-lg overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                    {v.image ? (
                      <img src={v.image} alt={v.name} className="w-full h-full object-cover" onError={(e) => {
                        // Fallback to initials if image doesn't exist
                        (e.target as HTMLElement).style.display = 'none';
                      }} />
                    ) : null}
                    <span>{v.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-base text-text-custom group-hover:text-brand transition-colors">
                      {v.name}
                    </h4>
                    <p className="font-dm-mono text-[10px] text-brand/90 uppercase tracking-wider font-semibold">
                      {v.role}
                    </p>
                    <span className="font-dm-mono text-[9px] text-text-muted block mt-0.5">
                      {v.credentials}
                    </span>
                  </div>
                </div>

                <blockquote className="text-[13.5px] text-text-soft font-outfit leading-relaxed flex-1 italic mb-6">
                  "{v.quote}"
                </blockquote>

                <div className="pt-4 border-t border-border-custom flex items-center justify-between text-[10px] font-dm-mono text-text-muted">
                  <span>Stream Focus:</span>
                  <span className="font-semibold text-text-custom">{v.stream.split(' ')[0]}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Call to Action */}
      <CTA onOpenModal={onOpenModal} editMode={editMode} />
    </div>
  );
}
