import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { streamsData } from '../data/streams';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

import DssAbout from './DssAbout';

interface StreamAboutProps {
  onOpenModal?: (id: string, metadata?: any) => void;
  editMode?: boolean;
}

export default function StreamAbout({ onOpenModal, editMode }: StreamAboutProps) {
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
        <DssAbout onOpenModal={onOpenModal} editMode={editMode} />
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
          <div className="font-dm-mono text-[10px] text-brand tracking-[0.2em] uppercase mb-2">About the {stream.abbr}</div>
          <h1 className="text-4xl md:text-5xl font-syne font-black text-white mb-6">Mission & Mandate</h1>
          
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl mb-8">
            <h2 className="font-syne font-bold text-2xl text-white mb-4">Strategic Purpose</h2>
            <p className="text-text-muted font-outfit text-lg leading-relaxed mb-6">
              The {stream.title} was established to address critical shortages in the African economy. 
              {stream.why}
            </p>
            <p className="text-text-muted font-outfit text-lg leading-relaxed">
              Our mandate is not just to issue certificates, but to produce deployment-ready professionals who can immediately contribute to industry, government, and civil society. We focus on practitioner-led education, meaning you learn from active professionals, not career academics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
              <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
              </div>
              <h2 className="font-syne font-bold text-xl text-white mb-3">Industry Alignment</h2>
              <p className="text-text-muted font-outfit leading-relaxed">
                Our curriculum is directly aligned with the requirements of {stream.seta} and top industry employers. We train you on the exact tools, methodologies, and standards used in production today.
              </p>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
              <div className="w-10 h-10 rounded-full bg-emerald/10 text-emerald flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h2 className="font-syne font-bold text-xl text-white mb-3">Graduate Profiles</h2>
              <p className="text-text-muted font-outfit leading-relaxed">
                Graduates from the {stream.abbr} typically step into roles such as: <br/><br/>
                <span className="text-white font-medium">{stream.graduates}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
