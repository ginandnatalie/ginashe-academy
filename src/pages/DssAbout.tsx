import React from 'react';
import PageHero from '../components/PageHero';
import { WhyGDA, Alumni } from '../components/WhyGDA';
import { Ecosystem } from '../components/Cohorts';
import { AcademyStaff } from '../components/Staff';
import InstitutionalHeroVisual from '../components/InstitutionalHeroVisual';
import { Landmark, Network, Handshake, Truck, Shield, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface DssAboutProps {
  onOpenModal?: (id: string, metadata?: any) => void;
  editMode?: boolean;
}

export default function DssAbout({ onOpenModal, editMode }: DssAboutProps) {
  const deliveryChannels = [
    { title: 'Digital Systems Residency', desc: 'High-fidelity technical hubs with dedicated server rooms and fibre connectivity for immersive mastering.', icon: <Landmark className="w-6 h-6" /> },
    { title: 'Cloud-Native LMS', desc: 'Our proprietary learning systems designed for asynchronous mastery and technical validation.', icon: <Network className="w-6 h-6" /> },
    { title: 'Institutional Pipelines', desc: 'B-BBEE skills spend cohorts customized for corporate digital transformation strategies.', icon: <Handshake className="w-6 h-6" /> },
    { title: 'Mobile Sandbox Units', desc: 'Edge-computing labs that rotate through underserviced regions to surface latent technical talent.', icon: <Truck className="w-6 h-6" /> }
  ];

  const governance = [
    { title: 'Technical Council', desc: 'Governs the engineering curriculum and validation protocols, comprising Lead Faculty and external CTOs.' },
    { title: 'Industry Moderation', desc: 'Independent panel from global tech firms (AWS, Google, Microsoft) that reviews our mastery standards.' },
    { title: 'Sovereignty Board', desc: 'Ensures our digital systems curriculum aligns with African sovereignty and data governance goals.' }
  ];

  return (
    <div className="min-h-screen bg-bg">
      <PageHero
        label="Institutional Authority"
        title={<>The Sovereign Authority on<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald">Cloud & AI Engineering.</span></>}
        subtitle="Africa's definitive practitioner-led academy for high-fidelity technical mastery — headquartered in Sandton, Johannesburg."
        visual={<InstitutionalHeroVisual />}
      />

      <section className="py-20 relative z-10 border-t border-border-custom bg-bg2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-syne font-black text-text-custom uppercase tracking-tighter mb-4">DSS Architecture</h2>
            <p className="text-text-muted font-outfit max-w-2xl">The Digital Systems Stream operates as the technical vanguard of the academy, removing barriers to high-end engineering roles through localized mastery.</p>
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
                <h3 className="text-2xl font-syne font-black text-text-custom uppercase">Stream Governance</h3>
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

            <div className="bg-glass-bg border border-border-custom p-10 rounded-3xl flex flex-col justify-center items-center text-center">
              <BookOpen className="w-12 h-12 text-brand mb-6" />
              <h3 className="text-2xl font-syne font-black text-text-custom uppercase mb-4">Institutional Standards</h3>
              <p className="text-text-muted font-outfit text-sm leading-relaxed mb-8">Our Digital Systems curriculum is validated against global vendor certifications and NQF standards to ensure cross-border employability.</p>
              <button className="btn btn-brand" onClick={() => onOpenModal?.('partner')}>View Partnership Framework</button>
            </div>
          </div>
        </div>
      </section>
      
      <WhyGDA editMode={editMode} />
      <AcademyStaff />
      <Alumni editMode={editMode} />
    </div>
  );
}
