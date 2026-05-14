import React from 'react';
import PageHero from '../components/PageHero';
import { CheckCircle2, Laptop, Wifi, Wallet, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Cohorts } from '../components/Cohorts';

interface DssRequirementsProps {
  onOpenModal?: (id: string, metadata?: any) => void;
  editMode?: boolean;
}

export default function DssRequirements({ onOpenModal, editMode }: DssRequirementsProps) {
  const supportPrograms = [
    { title: 'Device Programme', desc: 'Access to high-spec engineering laptops for DSS learners who lack hardware.', icon: <Laptop className="w-6 h-6" /> },
    { title: 'Data Bundles', desc: 'Monthly data provisions for remote virtual lab access.', icon: <Wifi className="w-6 h-6" /> },
    { title: 'Technical Stipends', desc: 'Available for qualifying full-time unemployed learners in sponsored tech cohorts.', icon: <Wallet className="w-6 h-6" /> }
  ];

  const feeStructure = [
    { tier: 'Sponsored', price: 'R0', desc: 'Fully funded via corporate bursaries or skills spend.', badge: 'Priority' },
    { tier: 'Low Income', price: 'R500 - R1,500', desc: 'Subsidized co-payment for learners earning < R10k/mo.', badge: 'Subsidized' },
    { tier: 'Standard', price: 'R1,500 - R4,000', desc: 'Sliding scale based on household income bracket.', badge: 'Standard' },
    { tier: 'Corporate', price: 'R5,000+', desc: 'Commercial rate for employer-funded development.', badge: 'Commercial' }
  ];

  const steps = [
    { num: '01', title: 'Tech Aptitude Test', desc: 'Complete our logic and problem-solving assessment.' },
    { num: '02', title: 'Documentation', desc: 'Upload ID and previous academic transcripts (Grade 12/RPL).' },
    { num: '03', title: 'Financial Assessment', desc: 'We align your profile with funding or sliding-scale fees.' },
    { num: '04', title: 'Environment Setup', desc: 'Secure your laptop and IDE setup before the cohort starts.' }
  ];

  return (
    <div className="min-h-screen bg-bg">
      <PageHero
        label="Admissions & Requirements"
        title={<>Join the Next Generation of<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald">African Engineers.</span></>}
        subtitle="We value logic and grit over pedigree. Explore our entrance criteria, sliding-scale fees, and support programmes."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070"
      />

      <section className="py-16 relative z-10 border-t border-border-custom bg-bg2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-syne font-black text-text-custom uppercase tracking-tighter mb-4">DSS Entry Policy</h2>
              <p className="text-text-muted font-outfit mb-6">
                The Digital Systems Stream is rigorous but accessible. We prioritize aptitude and technical intuition.
              </p>
              <ul className="space-y-3">
                {['Minimum Grade 12 (Matric) with a focus on logic or mathematics.', 'Baseline digital literacy (ability to navigate OS and web).', 'Passing grade in the GA Technical Aptitude Assessment.'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-sm text-text-soft font-outfit">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border-custom rounded-xl p-8 relative overflow-hidden">
              <h3 className="font-syne font-bold text-xl text-text-custom mb-6 relative z-10">Application Pipeline</h3>
              <div className="space-y-6 relative z-10">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center font-syne font-bold text-brand text-sm shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-syne font-bold text-text-custom text-sm mb-1">{step.title}</h4>
                      <p className="text-xs text-text-muted font-outfit">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div id="apply">
            <Cohorts onOpenModal={onOpenModal || (() => {})} editMode={editMode} />
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border-custom">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-black text-text-custom uppercase tracking-tighter mb-4">Technical Investment Scale</h2>
            <p className="text-text-muted font-outfit max-w-2xl mx-auto">Fees are adjusted to your economic reality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feeStructure.map((fee, i) => (
              <div key={i} className="bg-glass-bg border border-border-custom p-6 rounded-xl relative hover:border-brand/30 transition-all flex flex-col">
                <div className="absolute -top-3 left-6">
                  <span className="text-[9px] font-dm-mono uppercase tracking-widest px-2 py-1 bg-brand text-navy rounded-sm font-bold">{fee.badge}</span>
                </div>
                <h3 className="font-syne font-bold text-text-custom text-sm mt-4 mb-2">{fee.tier}</h3>
                <div className="font-syne font-black text-2xl text-brand mb-4">{fee.price}</div>
                <p className="text-[13px] text-text-muted font-outfit leading-relaxed flex-1">{fee.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-bg2 border-t border-border-custom">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-3xl font-syne font-black text-text-custom uppercase mb-8">Ready to Launch?</h2>
           <button onClick={() => onOpenModal?.('apply_direct')} className="btn btn-brand btn-lg">Start DSS Application →</button>
        </div>
      </section>
    </div>
  );
}
