import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { streamsData } from '../data/streams';
import { ArrowRight, FileText, Info, GraduationCap, Users } from 'lucide-react';
import { motion } from 'motion/react';

import DssDashboard from './DssDashboard';

export default function StreamDashboard({ onOpenModal, editMode }: { onOpenModal: (id: string, metadata?: any) => void, editMode?: boolean }) {
  const { streamSlug } = useParams<{ streamSlug: string }>();
  const stream = streamsData.find(s => s.id === streamSlug);

  if (!stream) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <h1 className="text-text-custom text-2xl font-syne">Stream not found</h1>
      </div>
    );
  }

  if (stream.id === 'digital-systems') {
    return <DssDashboard stream={stream} onOpenModal={onOpenModal} editMode={editMode} />;
  }

  return (
    <div className="min-h-screen bg-bg pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
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
          <p className="text-sm text-brand font-dm-mono italic mt-4">
            "{stream.tagline}"
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to={`/streams/${stream.id}/curriculum`} className="bg-glass-bg border border-border-custom p-6 rounded-2xl hover:border-brand/30 hover:bg-glass-bg transition-all group">
            <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-syne font-bold text-text-custom text-lg mb-2">Curriculum</h3>
            <p className="text-sm text-text-muted mb-4">{stream.courses_count} covering {stream.nqf}</p>
            <div className="flex items-center text-xs font-bold text-brand uppercase tracking-wider mt-auto">
              View Courses <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to={`/streams/${stream.id}/requirements`} className="bg-glass-bg border border-border-custom p-6 rounded-2xl hover:border-brand/30 hover:bg-glass-bg transition-all group">
            <div className="w-10 h-10 rounded-full bg-sky/10 text-sky flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-syne font-bold text-text-custom text-lg mb-2">Requirements</h3>
            <p className="text-sm text-text-muted mb-4">Admissions, pathways, and prerequisites.</p>
            <div className="flex items-center text-xs font-bold text-sky uppercase tracking-wider mt-auto">
              View Requirements <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to={`/streams/${stream.id}/about`} className="bg-glass-bg border border-border-custom p-6 rounded-2xl hover:border-brand/30 hover:bg-glass-bg transition-all group">
            <div className="w-10 h-10 rounded-full bg-emerald/10 text-emerald flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="font-syne font-bold text-text-custom text-lg mb-2">About Stream</h3>
            <p className="text-sm text-text-muted mb-4">Mission, philosophy, and industry impact.</p>
            <div className="flex items-center text-xs font-bold text-emerald uppercase tracking-wider mt-auto">
              Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to={`/faculty`} className="bg-glass-bg border border-border-custom p-6 rounded-2xl hover:border-brand/30 hover:bg-glass-bg transition-all group">
            <div className="w-10 h-10 rounded-full bg-fuchsia-400/10 text-fuchsia-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-syne font-bold text-text-custom text-lg mb-2">Faculty</h3>
            <p className="text-sm text-text-muted mb-4">Meet the practitioners leading the {stream.abbr}.</p>
            <div className="flex items-center text-xs font-bold text-fuchsia-400 uppercase tracking-wider mt-auto">
              Meet Faculty <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12 bg-glass-bg border border-border-custom p-8 rounded-3xl">
          <h2 className="font-syne font-bold text-2xl text-text-custom mb-6">Why {stream.abbr}?</h2>
          <p className="text-text-muted font-outfit text-lg leading-relaxed max-w-4xl">{stream.why}</p>
        </motion.div>

      </div>
    </div>
  );
}
