import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Clock, MapPin, Users, GraduationCap, Filter, ChevronDown } from 'lucide-react';

const allCourses = [
  // SDS
  { school: 'SDS', schoolFull: 'Digital Systems', name: 'Cloud Launchpad', nqf: 'L3-L4', weeks: 12, mode: 'Hybrid', type: 'Cohort', outcome: 'Cloud Support Technician', salary: 'R180-280k/yr', entry: 'Matric or equivalent. Basic computer literacy.', color: 'text-brand' },
  { school: 'SDS', schoolFull: 'Digital Systems', name: 'Web Development Fundamentals', nqf: 'L4', weeks: 16, mode: 'Online', type: 'Self-paced', outcome: 'Junior Web Developer', salary: 'R150-240k/yr', entry: 'Basic computer literacy. No prior coding.', color: 'text-brand' },
  { school: 'SDS', schoolFull: 'Digital Systems', name: 'AI & Machine Learning Foundations', nqf: 'L5', weeks: 20, mode: 'Hybrid', type: 'Cohort', outcome: 'AI/ML Associate', salary: 'R350-550k/yr', entry: 'Cloud Launchpad or Web Dev. Python basics.', color: 'text-brand' },
  { school: 'SDS', schoolFull: 'Digital Systems', name: 'Cybersecurity Essentials', nqf: 'L5', weeks: 16, mode: 'Hybrid', type: 'Cohort', outcome: 'Security Analyst', salary: 'R280-480k/yr', entry: 'Cloud Launchpad or equivalent networking.', color: 'text-brand' },
  { school: 'SDS', schoolFull: 'Digital Systems', name: 'Data Engineering', nqf: 'L5', weeks: 18, mode: 'Online', type: 'Cohort', outcome: 'Data Engineer', salary: 'R320-520k/yr', entry: 'Web Dev Fundamentals or equivalent.', color: 'text-brand' },
  { school: 'SDS', schoolFull: 'Digital Systems', name: 'DevOps & Cloud Automation', nqf: 'L6', weeks: 20, mode: 'Hybrid', type: 'Cohort', outcome: 'DevOps Engineer', salary: 'R420-720k/yr', entry: 'Cloud Launchpad + basic scripting.', color: 'text-brand' },
  { school: 'SDS', schoolFull: 'Digital Systems', name: 'Digital Literacy for the Workplace', nqf: 'L2', weeks: 4, mode: 'In-person', type: 'Workshop', outcome: 'Workplace digital competence', salary: '', entry: 'None. First-time computer users.', color: 'text-brand' },
  { school: 'SDS', schoolFull: 'Digital Systems', name: 'Software Entrepreneurship', nqf: 'L5', weeks: 12, mode: 'Hybrid', type: 'Cohort', outcome: 'Technical Founder', salary: '', entry: 'Any SDS course completion.', color: 'text-brand' },
  // SHS
  { school: 'SHS', schoolFull: 'Health Sciences', name: 'Community Health Worker', nqf: 'L4', weeks: 32, mode: 'In-person', type: 'Cohort', outcome: 'Registered CHW', salary: 'R6-10k/mo', entry: 'Grade 10 minimum.', color: 'text-rose-400' },
  { school: 'SHS', schoolFull: 'Health Sciences', name: 'Mental Health First Aid', nqf: 'L4', weeks: 8, mode: 'In-person', type: 'Workshop', outcome: 'MHFA Certified', salary: '', entry: 'None. Open to all adults.', color: 'text-rose-400' },
  { school: 'SHS', schoolFull: 'Health Sciences', name: 'HIV/AIDS Counselling & Care', nqf: 'L4', weeks: 12, mode: 'Hybrid', type: 'Cohort', outcome: 'HIV Counsellor', salary: '', entry: 'Grade 10.', color: 'text-rose-400' },
  { school: 'SHS', schoolFull: 'Health Sciences', name: 'Maternal & Child Health', nqf: 'L4', weeks: 16, mode: 'In-person', type: 'Cohort', outcome: 'Maternal Health Worker', salary: '', entry: 'Grade 10.', color: 'text-rose-400' },
  { school: 'SHS', schoolFull: 'Health Sciences', name: 'Nutrition Science & Food Security', nqf: 'L5', weeks: 20, mode: 'Hybrid', type: 'Cohort', outcome: 'Nutritional Advisor', salary: '', entry: 'Matric. Biology preferred.', color: 'text-rose-400' },
  { school: 'SHS', schoolFull: 'Health Sciences', name: 'Emergency Medical Response', nqf: 'L5', weeks: 16, mode: 'In-person', type: 'Cohort', outcome: 'Emergency First Responder', salary: '', entry: 'Matric. Physical fitness.', color: 'text-rose-400' },
  // SEI
  { school: 'SEI', schoolFull: 'Energy & Infrastructure', name: 'Solar PV Installation & Commissioning', nqf: 'L4', weeks: 16, mode: 'In-person', type: 'Cohort', outcome: 'Solar PV Technician', salary: 'R15-35k/mo', entry: 'Grade 10. Basic electrical.', color: 'text-yellow-400' },
  { school: 'SEI', schoolFull: 'Energy & Infrastructure', name: 'Battery Storage & Off-Grid Systems', nqf: 'L5', weeks: 12, mode: 'Hybrid', type: 'Cohort', outcome: 'Battery Systems Specialist', salary: '', entry: 'Solar PV Installation or equivalent.', color: 'text-yellow-400' },
  { school: 'SEI', schoolFull: 'Energy & Infrastructure', name: 'Electrical Wiring & Installations', nqf: 'L3', weeks: 16, mode: 'In-person', type: 'Cohort', outcome: 'Electrical Installer', salary: '', entry: 'Grade 10. Maths preferred.', color: 'text-yellow-400' },
  { school: 'SEI', schoolFull: 'Energy & Infrastructure', name: 'Energy Auditing & Efficiency', nqf: 'L5', weeks: 10, mode: 'Hybrid', type: 'Cohort', outcome: 'Junior Energy Auditor', salary: 'R200-400k/yr', entry: 'Matric. Basic electrical.', color: 'text-yellow-400' },
  // SAF
  { school: 'SAF', schoolFull: 'Agriculture & Food', name: 'Smallholder & Subsistence Farming', nqf: 'L3', weeks: 16, mode: 'In-person', type: 'Cohort', outcome: 'Commercial farmer transition', salary: '', entry: 'None. Suitable for rural communities.', color: 'text-emerald' },
  { school: 'SAF', schoolFull: 'Agriculture & Food', name: 'Hydroponics & Urban Farming', nqf: 'L4', weeks: 12, mode: 'Hybrid', type: 'Cohort', outcome: 'Urban Farmer', salary: '', entry: 'Grade 10.', color: 'text-emerald' },
  { school: 'SAF', schoolFull: 'Agriculture & Food', name: 'Agritech & Precision Farming', nqf: 'L5', weeks: 16, mode: 'Hybrid', type: 'Cohort', outcome: 'Agritech Specialist', salary: '', entry: 'Matric. Digital literacy.', color: 'text-emerald' },
  { school: 'SAF', schoolFull: 'Agriculture & Food', name: 'Food Processing & Value Addition', nqf: 'L4', weeks: 12, mode: 'In-person', type: 'Cohort', outcome: 'Food Processing Technician', salary: '', entry: 'Grade 10.', color: 'text-emerald' },
  // SFL
  { school: 'SFL', schoolFull: 'Financial Literacy', name: 'Personal Finance & Money Management', nqf: 'L3', weeks: 6, mode: 'Online', type: 'Self-paced', outcome: 'Financial independence', salary: '', entry: 'None. Grade 9 reading level.', color: 'text-sky' },
  { school: 'SFL', schoolFull: 'Financial Literacy', name: 'FinTech Fundamentals', nqf: 'L5', weeks: 14, mode: 'Hybrid', type: 'Cohort', outcome: 'FinTech Associate', salary: '', entry: 'Matric. Digital literacy.', color: 'text-sky' },
  { school: 'SFL', schoolFull: 'Financial Literacy', name: 'Business Accounting & Bookkeeping', nqf: 'L4', weeks: 16, mode: 'Online', type: 'Cohort', outcome: 'Bookkeeper', salary: 'R12-20k/mo', entry: 'Matric with Maths or Accounting.', color: 'text-sky' },
  // SAT
  { school: 'SAT', schoolFull: 'Applied Trades', name: 'Electrical Installation & Wiring', nqf: 'L4', weeks: 24, mode: 'In-person', type: 'Cohort', outcome: 'Registered Electrical Installer', salary: 'R25-60k/mo', entry: 'Grade 10. Maths and Physical Science.', color: 'text-orange-400' },
  { school: 'SAT', schoolFull: 'Applied Trades', name: 'Plumbing & Sanitation', nqf: 'L4', weeks: 20, mode: 'In-person', type: 'Cohort', outcome: 'Qualified Plumber', salary: 'R20-50k/mo', entry: 'Grade 10.', color: 'text-orange-400' },
  { school: 'SAT', schoolFull: 'Applied Trades', name: 'Welding & Metal Fabrication', nqf: 'L4', weeks: 16, mode: 'In-person', type: 'Cohort', outcome: 'Welder/Fabricator', salary: '', entry: 'Grade 10. Physical aptitude.', color: 'text-orange-400' },
  { school: 'SAT', schoolFull: 'Applied Trades', name: 'Automotive Mechanics & Servicing', nqf: 'L4', weeks: 24, mode: 'In-person', type: 'Cohort', outcome: 'Motor Mechanic', salary: 'R18-40k/mo', entry: 'Grade 10.', color: 'text-orange-400' },
  // SCD
  { school: 'SCD', schoolFull: 'Creative & Digital Media', name: 'Graphic Design Fundamentals', nqf: 'L4', weeks: 16, mode: 'Online', type: 'Cohort', outcome: 'Junior Graphic Designer', salary: 'R15-30k/mo', entry: 'Grade 10. Creativity.', color: 'text-fuchsia-400' },
  { school: 'SCD', schoolFull: 'Creative & Digital Media', name: 'UI/UX Design', nqf: 'L5', weeks: 20, mode: 'Online', type: 'Cohort', outcome: 'UI/UX Designer', salary: 'R30-60k/mo', entry: 'Graphic Design or equivalent.', color: 'text-fuchsia-400' },
  { school: 'SCD', schoolFull: 'Creative & Digital Media', name: 'Video Production & Editing', nqf: 'L4', weeks: 14, mode: 'Hybrid', type: 'Cohort', outcome: 'Video Producer/Editor', salary: 'R20-50k/mo', entry: 'Grade 10. Camera access.', color: 'text-fuchsia-400' },
  { school: 'SCD', schoolFull: 'Creative & Digital Media', name: 'Music Production & Audio Engineering', nqf: 'L4', weeks: 16, mode: 'In-person', type: 'Cohort', outcome: 'Music Producer', salary: '', entry: 'Grade 10. Musical interest.', color: 'text-fuchsia-400' },
  // SLE
  { school: 'SLE', schoolFull: 'Leadership & Entrepreneurship', name: 'Business Fundamentals & Entrepreneurship', nqf: 'L4', weeks: 10, mode: 'Hybrid', type: 'Cohort', outcome: 'SMME founder-ready', salary: '', entry: 'Grade 10.', color: 'text-indigo-400' },
  { school: 'SLE', schoolFull: 'Leadership & Entrepreneurship', name: 'Social Entrepreneurship', nqf: 'L5', weeks: 12, mode: 'Hybrid', type: 'Cohort', outcome: 'Social enterprise founder', salary: 'R20-40k/mo', entry: 'Matric. Community involvement.', color: 'text-indigo-400' },
  { school: 'SLE', schoolFull: 'Leadership & Entrepreneurship', name: 'Startup Finance & Fundraising', nqf: 'L5', weeks: 10, mode: 'Online', type: 'Cohort', outcome: 'Startup CFO-ready', salary: '', entry: 'Matric. Own business idea.', color: 'text-indigo-400' },
  // SEC
  { school: 'SEC', schoolFull: 'Early Childhood & Education', name: 'ECD Practitioner (Birth to 4 years)', nqf: 'L4', weeks: 32, mode: 'In-person', type: 'Cohort', outcome: 'Registered ECD Practitioner', salary: 'R6-12k/mo', entry: 'Grade 10. Police clearance.', color: 'text-pink-400' },
  { school: 'SEC', schoolFull: 'Early Childhood & Education', name: 'Grade R & Foundation Phase Support', nqf: 'L4', weeks: 20, mode: 'Hybrid', type: 'Cohort', outcome: 'Teacher Assistant', salary: '', entry: 'Matric. Clear criminal record.', color: 'text-pink-400' },
  { school: 'SEC', schoolFull: 'Early Childhood & Education', name: 'EdTech & Digital Classrooms', nqf: 'L4', weeks: 12, mode: 'Hybrid', type: 'Cohort', outcome: 'EdTech Coordinator', salary: '', entry: 'Matric.', color: 'text-pink-400' },
  // SCA
  { school: 'SCA', schoolFull: 'Environment & Climate', name: 'Climate Literacy & Action', nqf: 'L3', weeks: 6, mode: 'Online', type: 'Self-paced', outcome: 'Climate ambassador', salary: '', entry: 'None. Grade 9 reading level.', color: 'text-teal-400' },
  { school: 'SCA', schoolFull: 'Environment & Climate', name: 'Conservation & Wildlife Management', nqf: 'L4', weeks: 20, mode: 'In-person', type: 'Cohort', outcome: 'Game Ranger', salary: 'R10-25k/mo', entry: "Grade 10. Driver's licence.", color: 'text-teal-400' },
  { school: 'SCA', schoolFull: 'Environment & Climate', name: 'Waste Management & Circular Economy', nqf: 'L4', weeks: 12, mode: 'Hybrid', type: 'Cohort', outcome: 'Waste Entrepreneur', salary: 'R15-50k/mo', entry: 'Grade 10.', color: 'text-teal-400' },
];

const schoolAbbrs = ['All', 'SDS', 'SHS', 'SEI', 'SAF', 'SFL', 'SAT', 'SCD', 'SLE', 'SEC', 'SCA'];
const modes = ['All', 'Online', 'Hybrid', 'In-person'];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');

  const filtered = useMemo(() => {
    return allCourses.filter(c => {
      const matchSearch = searchQuery === '' || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.outcome.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSchool = selectedSchool === 'All' || c.school === selectedSchool;
      const matchMode = selectedMode === 'All' || c.mode === selectedMode;
      return matchSearch && matchSchool && matchMode;
    });
  }, [searchQuery, selectedSchool, selectedMode]);

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy via-bg to-bg" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 text-brand font-jetbrains text-[10px] uppercase tracking-[0.3em] mb-4"><div className="w-8 h-px bg-brand/40" /> Course Catalogue <div className="w-8 h-px bg-brand/40" /></div>
            <h1 className="text-4xl md:text-6xl font-syne font-black text-white uppercase tracking-tighter mb-4">Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-sky">Course</span></h1>
            <p className="text-lg text-text-muted font-outfit max-w-2xl mb-8">Search 78+ practitioner-led courses across 10 schools. NQF L2–L6. Online, Hybrid, or In-person.</p>
          </motion.div>

          {/* Search */}
          <div className="relative max-w-xl mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by course name or outcome..." className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-outfit text-[14px] placeholder:text-text-muted focus:border-brand/40 focus:outline-none transition-all" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-dm-mono text-text-muted uppercase tracking-widest">School:</span>
              {schoolAbbrs.map(s => (
                <button key={s} onClick={() => setSelectedSchool(s)} className={`px-3 py-1.5 rounded-lg font-outfit font-bold text-[11px] transition-all border ${selectedSchool === s ? 'bg-brand text-navy border-brand' : 'bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10'}`}>{s}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-dm-mono text-text-muted uppercase tracking-widest">Mode:</span>
              {modes.map(m => (
                <button key={m} onClick={() => setSelectedMode(m)} className={`px-3 py-1.5 rounded-lg font-outfit font-bold text-[11px] transition-all border ${selectedMode === m ? 'bg-brand text-navy border-brand' : 'bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10'}`}>{m}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-[11px] font-dm-mono text-text-muted uppercase tracking-widest mb-6">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * idx }} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-brand/20 transition-all group flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-syne font-black text-[13px] ${course.color}`}>{course.school}</span>
                  <span className="text-[9px] font-jetbrains text-text-dim uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">NQF {course.nqf}</span>
                </div>
                <h3 className="font-syne font-bold text-[15px] text-white mb-2 group-hover:text-brand transition-colors leading-tight">{course.name}</h3>
                <div className="flex flex-wrap gap-3 mb-4 text-[10px] text-text-muted font-outfit">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.weeks} weeks</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{course.mode}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.type}</span>
                </div>
                <div className="flex-1">
                  <div className="text-[9px] font-dm-mono text-text-dim uppercase tracking-widest mb-1">Outcome</div>
                  <p className="text-[12px] text-white/70 font-outfit mb-1">{course.outcome}</p>
                  {course.salary && <p className="text-[11px] text-brand font-bold">{course.salary}</p>}
                </div>
                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className="text-[9px] font-dm-mono text-text-dim uppercase tracking-widest mb-1">Entry</div>
                  <p className="text-[11px] text-text-muted">{course.entry}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl font-syne font-bold text-white/30 mb-2">No courses found</p>
              <p className="text-sm text-text-muted">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
