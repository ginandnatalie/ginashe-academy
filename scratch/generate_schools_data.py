import json
import re

def generate():
    with open('courses.json', 'r', encoding='utf-8') as f:
        courses_data = json.load(f)

    # Clean up the JSON (some entries have trailing junk from headers like "Section 3...")
    for abbr in courses_data:
        for c in courses_data[abbr]:
            if "Section " in c['entry']:
                c['entry'] = c['entry'].split("Section ")[0].strip()

    ts_code = """import React from 'react';
import { Code, Activity, Battery, Leaf, Coins, Wrench, Palette, Rocket, BookOpen, SunMedium } from 'lucide-react';

export interface Course {
  title: string;
  nqf: string;
  meta: string;
  modules: string;
  outcome: string;
  entry: string;
}

export interface School {
  id: string;
  abbr: string;
  title: string;
  tagline: string;
  desc: string;
  why: string;
  courses_count: string;
  nqf: string;
  duration: string;
  seta: string;
  graduates: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  path: string;
  status: string;
  tier: string;
  curriculum: Course[];
}

export const schoolsData: School[] = [
  { id: 'digital-systems', abbr: 'SDS', title: 'School of Digital Systems', tagline: 'Deploy to Cape Town', desc: 'Software, cloud & artificial intelligence', why: 'Largest skills gap in SA — over 20,000 unfilled cloud jobs by 2027. Direct POPIA compliance demand. AWS af-south-1 in Cape Town gives SA learners a uniquely accessible entry point.', courses_count: '8 courses', nqf: 'NQF L2–L6', duration: '4–20 weeks', seta: 'MICT SETA', graduates: 'Cloud Engineer · AI/ML Specialist · Full-Stack Developer · Security Analyst', icon: <Code className="w-10 h-10" />, color: 'text-brand', bg: 'bg-brand/10', border: 'border-brand/30', path: '/schools/digital-systems', status: 'Live', tier: 'Flagship', curriculum: %s },
  { id: 'health-sciences', abbr: 'SHS', title: 'School of Health Sciences', tagline: 'Heal Your Community', desc: 'Community health, nursing & mental wellbeing', why: 'SA has 1 doctor per 1,700 people. Community Health Workers are the most scalable health intervention. Post-COVID mental health crisis is the most underserved public health concern.', courses_count: '9 courses', nqf: 'NQF L4–L5', duration: '8–32 weeks', seta: 'HWSETA', graduates: 'Community Health Worker · Mental Health Counsellor · Clinic Administrator · Health Educator', icon: <Activity className="w-10 h-10" />, color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/30', path: '/schools/health-sciences', status: 'Coming Soon', tier: 'Flagship', curriculum: %s },
  { id: 'energy-infrastructure', abbr: 'SEI', title: 'School of Energy & Infrastructure', tagline: 'Power the Future', desc: 'Renewable energy, power & water systems', why: 'Eskom crisis and Just Energy Transition will create 50,000+ jobs in renewable energy by 2030. Solar PV technicians are in chronic shortage.', courses_count: '8 courses', nqf: 'NQF L3–L5', duration: '10–16 weeks', seta: 'EWSETA', graduates: 'Solar PV Technician · Energy Auditor · Renewable Systems Designer · Utility Manager', icon: <Battery className="w-10 h-10" />, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', path: '/schools/energy-infrastructure', status: 'Coming Soon', tier: 'Flagship', curriculum: %s },
  { id: 'agriculture-food', abbr: 'SAF', title: 'School of Agriculture & Food Security', tagline: 'Feed the Continent', desc: 'Modern farming, agritech & food systems', why: 'SA has 6 million smallholder farmers. Food insecurity affects 1 in 5 households. Agritech is creating new categories of well-paid rural employment.', courses_count: '8 courses', nqf: 'NQF L3–L5', duration: '10–16 weeks', seta: 'AgriSETA', graduates: 'Agripreneur · Precision Farmer · Food Processing Technician · Agritech Specialist', icon: <Leaf className="w-10 h-10" />, color: 'text-emerald', bg: 'bg-emerald/10', border: 'border-emerald/30', path: '/schools/agriculture-food', status: 'Coming Soon', tier: 'Flagship', curriculum: %s },
  { id: 'financial-literacy', abbr: 'SFL', title: 'School of Financial Literacy & FinTech', tagline: 'Own Your Money', desc: 'Personal finance, banking & digital payments', why: 'SAICA reports 70%% of SA youth cannot manage a basic budget. The township economy is digitising rapidly, creating demand for FinTech-literate professionals.', courses_count: '7 courses', nqf: 'NQF L3–L5', duration: '6–16 weeks', seta: 'INSETA', graduates: 'Financial Advisor · FinTech Specialist · SACCO Manager · Tax Practitioner', icon: <Coins className="w-10 h-10" />, color: 'text-sky', bg: 'bg-sky/10', border: 'border-sky/30', path: '/schools/financial-literacy', status: 'Coming Soon', tier: 'Flagship', curriculum: %s },
  { id: 'applied-trades', abbr: 'SAT', title: 'School of Applied Trades & Engineering', tagline: 'Build with Your Hands', desc: 'Electrical, plumbing, construction & repair', why: 'SA needs 30,000 more artisans every year. TVET colleges are under-enrolled. Trades produce immediate employment AND entrepreneurship pathways.', courses_count: '9 courses', nqf: 'NQF L3–L5', duration: '12–24 weeks', seta: 'MERSETA', graduates: 'Master Electrician · Plumber · Automotive Technician · Hardware Engineer', icon: <Wrench className="w-10 h-10" />, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30', path: '/schools/applied-trades', status: 'Coming Soon', tier: 'Strategic', curriculum: %s },
  { id: 'creative-media', abbr: 'SCD', title: 'School of Creative & Digital Media', tagline: "Tell Africa's Story", desc: 'Design, film, music & content creation', why: "Africa's creative economy is projected at $4.2B by 2025. Nollywood, Afrobeats, Amapiano, and SA fashion are global cultural exports.", courses_count: '8 courses', nqf: 'NQF L4–L5', duration: '10–20 weeks', seta: 'MICT SETA', graduates: 'Creative Director · Content Creator · UI/UX Designer · Brand Strategist', icon: <Palette className="w-10 h-10" />, color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10', border: 'border-fuchsia-400/30', path: '/schools/creative-media', status: 'Coming Soon', tier: 'Strategic', curriculum: %s },
  { id: 'leadership-entrepreneurship', abbr: 'SLE', title: 'School of Leadership & Entrepreneurship', tagline: 'Make Things Happen', desc: 'Business strategy, venture building & governance', why: "SA's 32%% youth unemployment cannot be solved by job-seeker programmes alone. We need job CREATORS. This school is the multiplier.", courses_count: '7 courses', nqf: 'NQF L4–L5', duration: '8–12 weeks', seta: 'SERVICES SETA', graduates: 'Entrepreneur · Technical Founder · NGO Manager · Corporate Leader', icon: <Rocket className="w-10 h-10" />, color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/30', path: '/schools/leadership-entrepreneurship', status: 'Coming Soon', tier: 'Strategic', curriculum: %s },
  { id: 'early-childhood', abbr: 'SEC', title: 'School of Early Childhood & Education', tagline: 'Shape Every Child', desc: 'Teaching, ECD & education technology', why: 'PIRLS 2021: 81%% of SA Grade 4 learners cannot read for meaning. Early Childhood Development is the single highest-leverage education intervention available.', courses_count: '7 courses', nqf: 'NQF L4–L5', duration: '12–32 weeks', seta: 'ETDP SETA', graduates: 'ECD Practitioner · Primary Teacher · Educational Therapist · EdTech Coordinator', icon: <BookOpen className="w-10 h-10" />, color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/30', path: '/schools/early-childhood', status: 'Coming Soon', tier: 'Strategic', curriculum: %s },
  { id: 'environment-climate', abbr: 'SCA', title: 'School of Environment & Climate Action', tagline: "Protect What's Ours", desc: 'Conservation, climate resilience & green economy', why: 'SA is among the top 20 global emitters. Conservation is a continent-wide economic asset. Carbon markets and climate finance will be among the fastest-growing job categories.', courses_count: '7 courses', nqf: 'NQF L3–L5', duration: '6–20 weeks', seta: 'WRSETA', graduates: 'Conservation Officer · Climate Advisor · Waste Entrepreneur · Green Building Assessor', icon: <SunMedium className="w-10 h-10" />, color: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/30', path: '/schools/environment-climate', status: 'Coming Soon', tier: 'Emerging', curriculum: %s }
];
""" % (
    json.dumps(courses_data.get('SDS', [])),
    json.dumps(courses_data.get('SHS', [])),
    json.dumps(courses_data.get('SEI', [])),
    json.dumps(courses_data.get('SAF', [])),
    json.dumps(courses_data.get('SFL', [])),
    json.dumps(courses_data.get('SAT', [])),
    json.dumps(courses_data.get('SCD', [])),
    json.dumps(courses_data.get('SLE', [])),
    json.dumps(courses_data.get('SEC', [])),
    json.dumps(courses_data.get('SCA', []))
)

    with open('../src/data/schools.tsx', 'w', encoding='utf-8') as f:
        f.write(ts_code)

if __name__ == '__main__':
    generate()
