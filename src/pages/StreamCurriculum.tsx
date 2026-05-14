import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { streamsData } from '../data/streams';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Clock, MapPin, Users } from 'lucide-react';

import { Programs } from '../components/Programs';

interface StreamCurriculumProps {
  onOpenModal?: (id: string, metadata?: any) => void;
  editMode?: boolean;
}

export default function StreamCurriculum({ onOpenModal, editMode }: StreamCurriculumProps) {
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
    return (
      <div className="min-h-screen bg-bg pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <Link to={`/streams/${stream.id}`} className="inline-flex items-center gap-2 text-brand hover:text-text-custom transition-colors font-dm-mono text-sm uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
        <Programs onOpenModal={onOpenModal || (() => {})} editMode={editMode} />
      </div>
    );
  }

  // Parse meta tags (e.g. "⏱ 12 weeks · 📍 Hybrid · 👥 Cohort")
  const parseMeta = (metaString: string) => {
    const parts = metaString.split('·').map(s => s.trim());
    let duration = '', format = '', type = '';
    parts.forEach(p => {
      if (p.includes('⏱')) duration = p.replace('⏱', '').trim();
      else if (p.includes('📍')) format = p.replace('📍', '').trim();
      else if (p.includes('👥')) type = p.replace('👥', '').trim();
      else if (p.toLowerCase().includes('week')) duration = p;
    });
    return { duration, format, type };
  };

  return (
    <div className="min-h-screen bg-bg pt-12 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <Link to={`/streams/${stream.id}`} className="inline-flex items-center gap-2 text-brand hover:text-text-custom transition-colors mb-8 font-dm-mono text-sm uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="font-dm-mono text-[10px] text-brand tracking-[0.2em] uppercase mb-2">Academic Programmes</div>
          <h1 className="text-4xl md:text-5xl font-syne font-black text-text-custom mb-6">Curriculum & Pathways</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {stream.curriculum.map((course, idx) => {
              const meta = parseMeta(course.meta);
              return (
                <div key={idx} className="bg-glass-bg border border-border-custom rounded-3xl p-6 flex flex-col hover:border-brand/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-dm-mono text-[10px] bg-brand/10 text-brand px-2 py-1 rounded border border-brand/20 uppercase tracking-widest">
                      {course.nqf}
                    </div>
                  </div>
                  <h3 className="font-syne font-bold text-xl text-text-custom mb-4 group-hover:text-brand transition-colors">{course.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {meta.duration && (
                      <div className="flex items-center gap-1.5 text-xs text-text-muted bg-glass-bg px-2 py-1 rounded">
                        <Clock className="w-3 h-3" /> {meta.duration}
                      </div>
                    )}
                    {meta.format && (
                      <div className="flex items-center gap-1.5 text-xs text-text-muted bg-glass-bg px-2 py-1 rounded">
                        <MapPin className="w-3 h-3" /> {meta.format}
                      </div>
                    )}
                    {meta.type && (
                      <div className="flex items-center gap-1.5 text-xs text-text-muted bg-glass-bg px-2 py-1 rounded">
                        <Users className="w-3 h-3" /> {meta.type}
                      </div>
                    )}
                  </div>

                  <div className="mb-6 flex-1">
                    <div className="font-dm-mono text-[9px] text-text-muted uppercase tracking-wider mb-2">Core Modules</div>
                    <div className="text-sm text-text-soft leading-relaxed">
                      {course.modules.split('·').map((m, i) => (
                        <span key={i} className="inline-block mr-2 mb-1">• {m.trim()}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border-custom mt-auto">
                    <div className="font-dm-mono text-[9px] text-brand uppercase tracking-wider mb-1">Graduate Outcome</div>
                    <div className="text-sm text-text-custom font-medium">{course.outcome}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
