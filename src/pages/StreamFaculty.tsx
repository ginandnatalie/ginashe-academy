import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { streamsData } from '../data/streams';
import { ArrowLeft } from 'lucide-react';
import { AcademyStaff } from '../components/Staff';
import { SEO } from '../components/SEO';

export default function StreamFaculty({ editMode }: { editMode?: boolean }) {
  const { streamSlug } = useParams<{ streamSlug: string }>();
  const stream = streamsData.find(s => s.id === streamSlug);

  if (!stream) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <SEO title="Stream Not Found" description="The requested stream could not be found." />
        <h1 className="text-text-custom text-2xl font-syne">Stream not found</h1>
      </div>
    );
  }

  const isDss = stream.id === 'digital-systems';
  const glowColor = stream.color === 'text-sky' ? 'rgba(56,189,248,0.1)' : 'rgba(0,242,255,0.1)';

  return (
    <div className="min-h-screen bg-bg">
      <SEO 
        title={`${stream.abbr} Faculty`} 
        description={`Meet the elite industry practitioners leading the ${stream.title} curriculum.`} 
      />
      
      {/* Navigation Header */}
      <div className="pt-12 px-6 max-w-7xl mx-auto mb-8">
        <Link to={`/streams/${stream.id}`} className="inline-flex items-center gap-2 text-brand hover:text-text-custom transition-colors font-dm-mono text-sm uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      {isDss ? (
        <div className="pb-20">
          <AcademyStaff />
        </div>
      ) : (
        <div className="pb-20 max-w-7xl mx-auto px-6 text-center">
          <div className="mb-10 md:mb-12">
            <div className="section-label justify-center">Faculty & Instructors</div>
            <h2 className="section-title">Lead Technical Faculty.</h2>
            <p className="section-sub mt-4 mx-auto max-w-2xl">
              The architects behind our curriculum are active industry veterans and operational leaders. 
              The specialized faculty panel for the {stream.title} is currently being finalized.
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-card border border-border-custom rounded-2xl p-10 flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Dynamic ambient color background glow */}
            <div 
              className="absolute -inset-1 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" 
              style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
            />
            
            <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mb-6 relative z-10">
              <span className="text-3xl">⏳</span>
            </div>
            
            <h3 className="font-syne font-bold text-xl text-text-custom mb-3 relative z-10">Faculty Reveal Coming Soon</h3>
            <p className="text-sm text-text-muted font-outfit leading-relaxed mb-6 relative z-10">
              We only hire active practitioner-leaders. The accredited instructors, advisors, and mentors for {stream.abbr} will be announced ahead of the cohort launch.
            </p>
            <Link to={`/streams/${stream.id}`} className="btn btn-outline btn-sm relative z-10 w-full no-underline justify-center inline-flex items-center">
              Return to Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
