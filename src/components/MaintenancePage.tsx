import React from 'react';
import { Mail, Phone, Clock } from 'lucide-react';
import { SEO } from './SEO';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col justify-between selection:bg-[#00f2ff]/30 selection:text-[#00f2ff] relative overflow-hidden font-sans">
      <SEO 
        title="Scheduled Updates in Progress | Ginashe Academy"
        description="Ginashe Academy is undergoing scheduled system updates and curriculum enhancements. Systems will resume shortly."
      />

      {/* Atmospheric Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,242,255,0.08)_0%,transparent_70%)] blur-[90px]" />
        <div className="absolute -bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] blur-[100px]" />
        {/* Subtle Architectural Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[length:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_85%)]" />
      </div>

      {/* Minimal Top Brand Bar */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00f2ff]/10 border border-[#00f2ff]/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.15)]">
            <span className="font-syne font-extrabold text-[#00f2ff] text-base tracking-tighter">G</span>
          </div>
          <div>
            <span className="font-syne font-extrabold text-sm sm:text-base tracking-tight text-white block">
              GINASHE ACADEMY
            </span>
            <span className="font-dm-mono text-[8.5px] uppercase tracking-[0.22em] text-[#00f2ff]/80 block">
              Johannesburg · South Africa
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] font-dm-mono text-[10px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#00f2ff] animate-ping" />
          System Maintenance
        </div>
      </header>

      {/* Main Hero Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/70 font-dm-mono text-[11px] mb-8">
            <Clock className="w-3.5 h-3.5 text-[#00f2ff]" />
            <span>Scheduled Platform & Curriculum Updates</span>
          </div>

          {/* Heading */}
          <h1 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] mb-6">
            Under Active <br />
            <span className="bg-gradient-to-r from-white via-[#00f2ff] to-white bg-clip-text text-transparent">
              Maintenance & Updates
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-outfit text-white/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            We are currently rolling out system upgrades, curriculum framework updates, and platform optimizations. Normal access will be restored shortly.
          </p>

          {/* Direct Contact Channels */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-xl mb-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a 
                href="mailto:skills@ginashe.academy"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00f2ff]/40 text-white/80 hover:text-white transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#00f2ff]/10 flex items-center justify-center text-[#00f2ff] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-dm-mono text-[9px] uppercase tracking-wider text-white/50 block">Admissions Desk</span>
                  <span className="font-syne font-semibold text-xs truncate block group-hover:text-[#00f2ff] transition-colors">
                    skills@ginashe.academy
                  </span>
                </div>
              </a>

              <a 
                href="tel:+27688526155"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00f2ff]/40 text-white/80 hover:text-white transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#00f2ff]/10 flex items-center justify-center text-[#00f2ff] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-dm-mono text-[9px] uppercase tracking-wider text-white/50 block">Direct Line / WhatsApp</span>
                  <span className="font-syne font-semibold text-xs truncate block group-hover:text-[#00f2ff] transition-colors">
                    +27 (0) 68 852 6155
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <span className="font-dm-mono text-[10px] text-white/40 tracking-wider">
          © {new Date().getFullYear()} Ginashe Academy. All Rights Reserved.
        </span>
        <span className="font-dm-mono text-[10px] text-white/40 tracking-wider">
          Practitioner-Led Multi-Disciplinary Education
        </span>
      </footer>
    </div>
  );
}
