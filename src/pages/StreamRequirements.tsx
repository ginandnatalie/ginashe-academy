import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { streamsData } from '../data/streams';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

import DssRequirements from './DssRequirements';

interface StreamRequirementsProps {
  onOpenModal?: (id: string, metadata?: any) => void;
  editMode?: boolean;
}

export default function StreamRequirements({ onOpenModal, editMode }: StreamRequirementsProps) {
  const { streamSlug } = useParams<{ streamSlug: string }>();
  const stream = streamsData.find(s => s.id === streamSlug);

  if (!stream) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <h1 className="text-white text-2xl font-syne">Stream not found</h1>
      </div>
    );
  }

  if (stream.id === 'digital-systems') {
    return (
      <div className="min-h-screen bg-bg">
        <div className="pt-12 px-6 max-w-7xl mx-auto mb-8">
          <Link to={`/streams/${stream.id}`} className="inline-flex items-center gap-2 text-brand hover:text-white transition-colors font-dm-mono text-sm uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
        <DssRequirements onOpenModal={onOpenModal} editMode={editMode} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-12 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link to={`/streams/${stream.id}`} className="inline-flex items-center gap-2 text-brand hover:text-white transition-colors mb-8 font-dm-mono text-sm uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="font-dm-mono text-[10px] text-brand tracking-[0.2em] uppercase mb-2">Admissions & Requirements</div>
          <h1 className="text-4xl md:text-5xl font-syne font-black text-white mb-6">Who Can Apply?</h1>
          
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl mb-8">
            <h2 className="font-syne font-bold text-2xl text-white mb-4">Aptitude over Academics</h2>
            <p className="text-text-muted font-outfit text-lg leading-relaxed mb-6">
              At the {stream.title}, we believe that potential is evenly distributed, but opportunity is not. 
              While some of our advanced programmes require specific prior qualifications, our foundational tracks are designed to evaluate your aptitude, grit, and logic — not just your matric results.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-syne font-bold text-2xl text-white">Course-Specific Prerequisites</h2>
            {stream.curriculum.map((course, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-syne font-bold text-white text-lg mb-1">{course.title}</h3>
                  <div className="font-dm-mono text-xs text-brand uppercase tracking-wider mb-2">{course.nqf}</div>
                  <p className="text-text-muted text-sm">{course.entry}</p>
                </div>
                <div className="shrink-0 flex items-center gap-2 text-emerald text-sm font-bold bg-emerald/10 px-3 py-1.5 rounded-full border border-emerald/20">
                  <CheckCircle2 className="w-4 h-4" /> Eligible to Apply
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/apply" className="inline-block px-8 py-4 bg-brand text-navy font-outfit font-black text-sm uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-[0_10px_30px_rgba(0,242,255,0.2)] no-underline">
              Start Application
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
