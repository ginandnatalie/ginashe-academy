import React from 'react';
import PageHero from '../components/PageHero';
import { Shield, BookOpen, Truck, Landmark, Handshake, Network } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPageProps {
  onOpenModal: (id: string, metadata?: any) => void;
  editMode?: boolean;
}

export default function AboutPage({ onOpenModal, editMode }: AboutPageProps) {
  const deliveryChannels = [
    { title: 'Community Campuses', desc: 'Physical hubs in townships, peri-urban, and rural areas with shared equipment and fibre connectivity.', icon: <Landmark className="w-6 h-6" /> },
    { title: 'Online-First LMS', desc: 'Mobile-first platform designed for low-bandwidth environments, reaching every South African province.', icon: <Network className="w-6 h-6" /> },
    { title: 'Employer Partnerships', desc: 'B-BBEE skills spend cohorts customized for corporate talent pipelines with on-site or hybrid delivery.', icon: <Handshake className="w-6 h-6" /> },
    { title: 'Mobile Learning Units', desc: 'Solar-powered campuses-on-wheels that rotate through rural municipalities to bring learning to the student.', icon: <Truck className="w-6 h-6" /> }
  ];

  const governance = [
    { title: 'Board of Directors', desc: 'The legal, fiduciary, and strategic governing body, ensuring oversight and public credibility.' },
    { title: 'Academic Council', desc: 'Governs curriculum and assessment, comprising school leads and external academics.' },
    { title: 'External Moderation', desc: 'Independent panel that reviews assessments to ensure rigorous academic standards.' }
  ];

  const partners = [
    { tier: 'Tier 1', name: 'Founding Partners', desc: 'Establishing credibility across major sectors (e.g., AWS Africa, SAPVIA, SAICA).' },
    { tier: 'Tier 2', name: 'B-BBEE Partners', desc: 'Corporates funding cohorts as part of their skills development strategy.' },
    { tier: 'Tier 3', name: 'Government', desc: 'Strategic alignments with DHET, NEF, IDC, NSF, and NYDA for large-scale impact.' },
    { tier: 'Tier 4', name: 'Global Foundations', desc: 'International development partners supporting thematic goals like the energy transition.' }
  ];

  return (
    <div className="min-h-screen bg-bg">
      <PageHero
        label="Institutional Overview"
        title={<>Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald">Real.</span></>}
        subtitle="Making transformation a reality — one learner at a time. Africa's most trusted and accessible skills academy."
      />

      <section className="py-20 relative z-10 border-t border-border-custom bg-bg2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-syne font-black text-text-custom uppercase tracking-tighter mb-4">Our Architecture</h2>
            <p className="text-text-muted font-outfit max-w-2xl">We operate 10 purpose-built schools designed to close Africa's most urgent skills gaps, supported by a robust infrastructure that removes the barriers to learning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {deliveryChannels.map((channel, i) => (
              <div key={i} className="bg-card border border-border-custom p-6 rounded-xl hover:border-brand/30 transition-colors">
                <div className="text-brand mb-4 bg-brand/10 w-12 h-12 flex items-center justify-center rounded-lg">{channel.icon}</div>
                <h3 className="font-syne font-bold text-text-custom text-lg mb-2">{channel.title}</h3>
                <p className="text-sm text-text-muted font-outfit leading-relaxed">{channel.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Shield className="w-8 h-8 text-sky" />
                <h3 className="text-2xl font-syne font-black text-text-custom uppercase">Governance</h3>
              </div>
              <div className="space-y-6">
                {governance.map((gov, i) => (
                  <div key={i} className="bg-glass-bg border border-border-custom p-5 rounded-lg border-l-2 border-l-sky">
                    <h4 className="font-bold text-text-custom font-syne mb-1">{gov.title}</h4>
                    <p className="text-sm text-text-muted font-outfit">{gov.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-8 h-8 text-emerald" />
                <h3 className="text-2xl font-syne font-black text-text-custom uppercase">Partnership Framework</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {partners.map((partner, i) => (
                  <div key={i} className="bg-glass-bg border border-border-custom p-5 rounded-lg border-t-2 border-t-emerald">
                    <span className="text-[10px] font-dm-mono uppercase tracking-widest text-emerald mb-2 block">{partner.tier}</span>
                    <h4 className="font-bold text-text-custom font-syne mb-2 text-sm">{partner.name}</h4>
                    <p className="text-[12px] text-text-muted font-outfit">{partner.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
