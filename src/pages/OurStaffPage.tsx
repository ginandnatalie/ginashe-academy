import { SEO } from '../components/SEO';
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Users, ShieldAlert, ArrowLeft, Cpu, GraduationCap, Briefcase, Landmark } from 'lucide-react';

export default function OurStaffPage() {
  const staffSectors = [
    {
      title: 'Technical Instruction & Mentorship',
      desc: 'Active cloud engineers, database developers, and systems architects who bridge classroom learning with live codebases.',
      icon: <Cpu className="w-5 h-5 text-brand" />,
      status: 'Commissioning'
    },
    {
      title: 'Academic Council & Board',
      desc: 'Governing board members and external moderators ensuring alignment with tertiary standards and rigorous curriculum governance.',
      icon: <GraduationCap className="w-5 h-5 text-sky" />,
      status: 'Finalising Rosters'
    },
    {
      title: 'Institutional Operations',
      desc: 'Admissions directors, resident support specialists, and campus management operators handling student success pipelines.',
      icon: <Briefcase className="w-5 h-5 text-emerald" />,
      status: 'Onboarding'
    },
    {
      title: 'Strategic & B-BBEE Advisory',
      desc: 'Liaisons interfacing with corporate partners, government funding units, and global educational foundations.',
      icon: <Landmark className="w-5 h-5 text-amber-400" />,
      status: 'Rosters Pending'
    }
  ];

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden flex flex-col justify-between pt-32 pb-24 px-6 md:px-14">
      <SEO 
        title="Our Staff" 
        description="Meet the team and leadership driving academic operations at Ginashe Academy." 
      />
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Navigation back link */}
        <div className="mb-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-text-muted hover:text-brand transition-colors font-dm-mono text-[10px] tracking-widest uppercase group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <span className="font-dm-mono text-[10px] text-brand uppercase tracking-[0.4em] mb-2 block">GA Staff Directory</span>
            <h1 className="font-syne font-black text-4xl md:text-6xl leading-tight text-text-custom uppercase tracking-tighter">
              Meet Our <span className="text-brand">Pioneers.</span>
            </h1>
            <p className="text-text-soft text-base md:text-lg leading-relaxed opacity-85 max-w-xl font-outfit">
              We are assembling a team of practitioners, operators, and industry leaders to guide the next generation of African technology and financial specialists.
            </p>
          </motion.div>
        </div>

        {/* Coming Soon / Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {staffSectors.map((sector, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="group relative bg-card border border-border-custom hover:border-brand/40 p-6 rounded-2xl transition-all duration-500 overflow-hidden shadow-lg"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand/0 via-brand/40 to-brand/0 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border-custom flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {sector.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-syne font-bold text-text-custom text-base leading-snug group-hover:text-brand transition-colors">
                      {sector.title}
                    </h3>
                    <span className="font-dm-mono text-[8px] tracking-wider uppercase bg-brand/10 border border-brand/20 text-brand px-2 py-0.5 rounded shrink-0">
                      {sector.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted font-outfit leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Callout box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-[#0a0d14] border border-brand/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand/[0.01] pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl text-brand">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-syne font-bold text-sm text-text-custom uppercase tracking-wider">Roster Under Active Integration</h4>
              <p className="text-[11px] text-text-muted font-outfit mt-1 leading-relaxed max-w-md">
                Our faculty rosters are undergoing academic review and certification verification. The complete directory with active practitioner portfolios is coming soon.
              </p>
            </div>
          </div>
          <Link 
            to="/contact" 
            className="btn btn-outline text-[10px] font-dm-mono uppercase tracking-widest whitespace-nowrap"
          >
            Inquire About Open Roles →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
