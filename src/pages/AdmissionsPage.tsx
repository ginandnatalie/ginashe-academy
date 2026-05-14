import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { CheckCircle2, Laptop, Wifi, Wallet, ArrowRight } from 'lucide-react';

interface AdmissionsPageProps {
  onOpenModal?: (id: string) => void;
  editMode?: boolean;
}

export default function AdmissionsPage({ onOpenModal, editMode }: AdmissionsPageProps) {
  const supportPrograms = [
    { title: 'Device Programme', desc: 'Access to refurbished laptops for learners who lack hardware, ensuring nobody is left behind due to lack of equipment.', icon: <Laptop className="w-6 h-6" /> },
    { title: 'Data Bundles', desc: 'Monthly data provisions for remote and hybrid learners to access the LMS and virtual labs seamlessly.', icon: <Wifi className="w-6 h-6" /> },
    { title: 'Stipend Access', desc: 'Living allowance stipends available for qualifying full-time unemployed learners via sponsored cohorts.', icon: <Wallet className="w-6 h-6" /> }
  ];

  const feeStructure = [
    { tier: 'Unemployed (Sponsored)', price: 'R0', desc: 'Fully funded via bursaries or corporate B-BBEE skills spend.', badge: 'Priority Access' },
    { tier: 'Employed (< R10k / mo)', price: 'R500 - R1,500', desc: 'Heavily subsidized co-payment model for low-income earners.', badge: 'Subsidized' },
    { tier: 'Employed (R10k - R25k / mo)', price: 'R1,500 - R4,000', desc: 'Standard sliding scale based on exact income bracket.', badge: 'Standard' },
    { tier: 'Corporate Sponsored', price: 'R5,000 - R15,000', desc: 'Full commercial rate for employer-funded professional development.', badge: 'Commercial' }
  ];

  const steps = [
    { num: '01', title: 'Career Match Assessment', desc: 'Complete a brief assessment to align your aptitudes with the right school and track.' },
    { num: '02', title: 'Application Submission', desc: 'Fill out our POPIA-compliant application form and upload necessary documentation (ID, previous qualifications).' },
    { num: '03', title: 'Funding & Support Alignment', desc: 'We assess your profile against available bursaries, stipends, and sliding-scale fee brackets.' },
    { num: '04', title: 'Cohort Placement', desc: 'Once accepted and funding is secured, you are placed into the next available intake for your chosen school.' }
  ];

  return (
    <div className="min-h-screen bg-bg">
      <PageHero
        label="Admissions & Funding"
        title={<>A Pathway for<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-emerald">Every Learner.</span></>}
        subtitle="We assess potential, not just history. Explore our sliding-scale fees, support programmes, and application process."
      />

      {/* Global Entry Policy */}
      <section className="py-16 relative z-10 border-t border-border-custom bg-bg2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-syne font-black text-text-custom uppercase tracking-tighter mb-4">Global Entry Policy</h2>
              <p className="text-text-muted font-outfit mb-6">
                Ginashe Academy is built on the premise that Africa's talent is evenly distributed, but opportunity is not. 
                Our admissions process prioritizes aptitude, resilience, and commitment over traditional academic pedigree.
              </p>
              <ul className="space-y-3">
                {['No prior coding or technical experience required for foundational tracks.', 'Matric/Grade 12 is recommended but alternative RPL (Recognition of Prior Learning) paths exist.', 'All applicants undergo a baseline aptitude and career-match assessment.'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-sm text-text-soft font-outfit">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border-custom rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-brand/5 blur-3xl rounded-full mix-blend-screen pointer-events-none" />
              <h3 className="font-syne font-bold text-xl text-text-custom mb-6 relative z-10">Application Process</h3>
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
              <div className="mt-8 pt-6 border-t border-border2 relative z-10">
                <Link to="/apply" className="inline-flex items-center gap-2 text-sm font-bold font-syne uppercase tracking-widest text-brand hover:text-text-custom transition-colors">
                  Start Your Application <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Scale Fees */}
      <section className="py-20 relative z-10 border-t border-border-custom">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-black text-text-custom uppercase tracking-tighter mb-4">Sliding-Scale Fee Model</h2>
            <p className="text-text-muted font-outfit max-w-2xl mx-auto">
              We do not believe in a one-size-fits-all tuition. Our fees are dynamically adjusted based on your employment status and income bracket to ensure maximum accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feeStructure.map((fee, i) => (
              <div key={i} className="bg-glass-bg border border-border-custom p-6 rounded-xl relative hover:border-brand/30 transition-all flex flex-col">
                <div className="absolute -top-3 left-6">
                  <span className="text-[9px] font-dm-mono uppercase tracking-widest px-2 py-1 bg-brand text-navy rounded-sm font-bold shadow-lg">
                    {fee.badge}
                  </span>
                </div>
                <h3 className="font-syne font-bold text-text-custom text-sm mt-4 mb-2">{fee.tier}</h3>
                <div className="font-syne font-black text-2xl text-brand mb-4">{fee.price}</div>
                <p className="text-[13px] text-text-muted font-outfit leading-relaxed flex-1">{fee.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learner Support */}
      <section className="py-20 relative z-10 border-t border-border-custom bg-bg2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-syne font-black text-text-custom uppercase tracking-tighter mb-4">Learner Support Programmes</h2>
            <p className="text-text-muted font-outfit max-w-2xl">
              We understand that tuition isn't the only barrier to education. Our wraparound support programmes ensure that logistical challenges don't stand in the way of your transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportPrograms.map((prog, i) => (
              <div key={i} className="bg-card border border-border-custom p-8 rounded-xl flex flex-col items-center text-center hover:bg-glass-bg transition-colors">
                <div className="text-sky mb-5 bg-sky/10 w-16 h-16 flex items-center justify-center rounded-full">{prog.icon}</div>
                <h3 className="font-syne font-bold text-text-custom text-lg mb-3">{prog.title}</h3>
                <p className="text-sm text-text-muted font-outfit leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
