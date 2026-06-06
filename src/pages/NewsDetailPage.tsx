import { SEO } from '../components/SEO';
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, ChevronRight, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';

const MOCK_POSTS = [
  {
    id: '4',
    title: 'Digital Systems and Financial Literacy Streams Now Open for Enrollment',
    excerpt: 'Ginashe Academy is officially accepting applications for our flagship Digital Systems (DSS) and Financial Literacy (FLS) streams for the upcoming cohort.',
    content: `
      <p>Ginashe Academy is pleased to announce that applications are officially open for both our <strong>Digital Systems Stream (DSS)</strong> and <strong>Financial Literacy Stream (FLS)</strong> for the 2026 academic year.</p>
      <h3>Shape Your Professional Future</h3>
      <p>These two streams represent our core institutional focus on equipping students with practical, industry-aligned capabilities. Whether you are aiming to master cloud-native systems and analytics, or build solid financial accounting, bookkeeping, and digital payments expertise, Ginashe Academy provides the roadmap to get you there.</p>
      <blockquote>
        "By offering concurrent enrollment in these high-demand streams, we are enabling our students to master both the technological and financial architectures that drive modern businesses."
      </blockquote>
      <h3>Intake Details</h3>
      <p>Both streams feature practitioner-led courses designed for immediate market application. We encourage all interested candidates to apply early as seats are strictly capped to ensure high-quality mentorship.</p>
    `,
    category: 'Academy Updates',
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    published_at: '2026-05-24T09:00:00Z',
    slug: 'dss-fls-enrolling-2026',
    author: 'Ginashe Academy Admissions Office'
  },
  {
    id: '5',
    title: 'New Physical Campus Scheduled to Open in Johannesburg by September 2026',
    excerpt: 'Ginashe Academy is expanding its footprint with a brand-new physical campus in Johannesburg, scheduled to welcome students by the end of September.',
    content: `
      <p>Ginashe Academy is thrilled to announce the upcoming launch of our new <strong>Johannesburg Physical Campus</strong>, scheduled to open its doors by the end of September 2026.</p>
      <h3>Expanding Our Footprint</h3>
      <p>This brand-new campus will serve as our primary physical learning node, featuring state-of-the-art infrastructure, collaborative code labs, and high-performance seminar rooms designed to facilitate peer learning and active mentorship.</p>
      <blockquote>
        "Our new physical space in Johannesburg is designed to create a premium, immersive hub where developers, analysts, and finance pioneers can connect, build, and innovate together."
      </blockquote>
      <h3>Hybrid Learning Options</h3>
      <p>While our digital platforms continue to host thousands of students online, the Johannesburg campus will offer hybrid study options, executive weekend bootcamps, and direct face-to-face mentorship channels with our resident practitioners.</p>
    `,
    category: 'Academy Updates',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    published_at: '2026-05-10T10:00:00Z',
    slug: 'new-jhb-campus-september-2026',
    author: 'Campus Operations Team'
  },
  {
    id: '1',
    title: 'Ginashe Academy looks to upskill the african continent.',
    excerpt: 'We are proud to share our strategic expansion roadmap to upskill the African continent, driving technical capability and digital equity.',
    content: `
      <p>Ginashe Academy has officially detailed its strategic expansion roadmap to upskill the African continent, driving digital equity and high-value technical capability.</p>
      <h3>Upskilling Africa</h3>
      <p>With Africa representing the youngest and fastest-growing workforce globally, the demand for practical, industry-aligned training in cloud engineering, cybersecurity, financial technology, and data science has reached a critical turning point.</p>
      <blockquote>
        "Our goal is to build a massive network of practitioners and scholars who can lead technical execution and solve regional challenges from within."
      </blockquote>
      <h3>Practitioner-Led Impact</h3>
      <p>Rather than relying on academic theory, Ginashe Academy partners with leading cloud vendors and financial institutions to ensure every module has direct market relevance, preparing learners for global opportunities.</p>
     `,
    category: 'Academy Updates',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    published_at: '2026-04-01T10:00:00Z',
    slug: 'ginashe-academy-upskill-african-continent',
    author: 'Ginashe Academy Leadership Team'
  },
  {
    id: '2',
    title: 'The Future of AI in African Fintech: What Students Need to Know',
    excerpt: 'A deep dive into how artificial intelligence is reshaping the financial landscape across the continent and the skills required to lead.',
    content: `
      <p>A deep dive into how artificial intelligence is reshaping the financial landscape across the continent and the skills required to lead.</p>
      <h3>The AI Revolution in Payments</h3>
      <p>African Fintech has been a global beacon of innovation, but the integration of machine learning and generative AI is taking it to the next level. In this article, we look at how students can prepare themselves for this shift.</p>
      <p>From predictive credit scoring for microfinance in rural areas to automated fraud detection in mobile wallets, AI is rapidly becoming the core technology stack for regional fintech giants.</p>
    `,
    category: 'Tech Trends',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    published_at: '2026-04-05T14:30:00Z',
    slug: 'future-of-ai-african-fintech',
    author: 'Fintech Faculty Lead'
  },
  {
    id: '3',
    title: '5 Tips for Transitioning from Traditional IT to Cloud Engineering',
    excerpt: 'Our career experts share the essential roadmap for developers looking to specialise in AWS and Azure environments.',
    content: `
      <p>Our career experts share the essential roadmap for developers looking to specialise in AWS and Azure environments.</p>
      <h3>Embracing Cloud Native Architectures</h3>
      <p>Transitioning from traditional on-premise IT administration to cloud-native architecture requires a shift in mindset—from server management to automation and infrastructure-as-code.</p>
      <p>We recommend starting with foundational cloud certifications (such as AWS Cloud Practitioner or Microsoft Azure Fundamentals) and developing strong capabilities in scripting and CI/CD pipelines.</p>
    `,
    category: 'Career Advice',
    image_url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200',
    published_at: '2026-03-28T09:15:00Z',
    slug: 'it-to-cloud-engineering-roadmap',
    author: 'Cloud Engineering Advisor'
  }
];

export default function NewsDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*, author:profiles(first_name, last_name)')
        .eq('slug', slug)
        .single();
      
      if (error) {
        // Fallback to mock data for design preview
        const mock = MOCK_POSTS.find(p => p.slug === slug);
        if (mock) setPost(mock);
        else navigate('/news');
      } else {
        setPost(data);
      }
    } catch (err) {
      const mock = MOCK_POSTS.find(p => p.slug === slug);
      if (mock) setPost(mock);
      else navigate('/news');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
    </div>
  );

  if (!post) return null;

  return (
    <div className="min-h-screen pt-32 pb-24">
      <SEO 
        title={post.title}
        description={post.excerpt}
      />
      {/* Article Hero */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/news" className="inline-flex items-center gap-2 text-text-muted hover:text-brand transition-colors font-dm-mono text-[10px] tracking-widest uppercase mb-8 group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to News
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-brand/10 text-brand border border-brand/20 rounded-full font-dm-mono text-[9px] tracking-widest uppercase">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-text-dim text-[10px] font-dm-mono uppercase tracking-widest">
              <Clock size={14} /> 6 MIN READ
            </div>
          </div>

          <h1 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 py-8 border-y border-border-custom">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface border border-brand/20 flex items-center justify-center text-brand">
                <User size={20} />
              </div>
              <div>
                <div className="text-[12px] font-bold text-text-custom">{post.author?.first_name ? `${post.author.first_name} ${post.author.last_name}` : post.author || 'Ginashe Academy Insights Team'}</div>
                <div className="text-[10px] text-text-dim font-dm-mono uppercase tracking-widest">Lead Strategist</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-brand" />
              <div>
                <div className="text-[12px] font-bold text-text-custom">{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <div className="text-[10px] text-text-dim font-dm-mono uppercase tracking-widest">Published On</div>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <button className="p-2 rounded-full border border-border-custom hover:border-brand/50 hover:text-brand transition-all"><Twitter size={16} /></button>
              <button className="p-2 rounded-full border border-border-custom hover:border-brand/50 hover:text-brand transition-all"><Linkedin size={16} /></button>
              <button className="p-2 rounded-full border border-border-custom hover:border-brand/50 hover:text-brand transition-all"><Share2 size={16} /></button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Image */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-surface border border-border-custom"
        >
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-[1fr_80px] gap-12">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-brand max-w-none"
        >
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            className="text-text-soft leading-[1.8] text-lg space-y-8"
          />
          
          <div className="mt-16 pt-8 border-t border-border-custom flex flex-wrap gap-2">
            <span className="flex items-center gap-2 text-text-dim text-[10px] font-dm-mono uppercase tracking-widest mr-4">
              <Tag size={12} /> Tags:
            </span>
            {['Cloud', 'Innovation', 'South Africa', 'Careers'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-surface border border-border-custom rounded-md text-[10px] font-dm-mono text-text-muted hover:text-brand transition-colors cursor-pointer">#{tag}</span>
            ))}
          </div>
        </motion.article>

        {/* Floating Sidebar (Desktop) */}
        <div className="hidden md:flex flex-col gap-6 sticky top-32 h-fit">
           <div className="w-px h-24 bg-gradient-to-b from-brand to-transparent mx-auto"></div>
           <span className="font-dm-mono text-[9px] tracking-widest uppercase vertical-text text-text-dim rotate-180">Article Progress</span>
        </div>
      </div>

      {/* Related Posts? */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-syne font-extrabold text-3xl">Continue <span className="text-brand">Reading</span></h2>
          <Link to="/news" className="text-brand font-dm-mono text-[10px] tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all">
            All Insights <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
           {MOCK_POSTS.filter(p => p.id !== post.id).slice(0, 2).map((p) => (
              <Link key={p.id} to={`/news/${p.slug}`} className="group block bg-surface/50 border border-border-custom rounded-3xl p-6 hover:border-brand/30 transition-all">
                 <div className="flex gap-6 items-center">
                   <img src={p.image_url} className="w-32 h-32 rounded-xl object-cover" />
                   <div>
                     <span className="text-brand font-dm-mono text-[9px] tracking-widest uppercase mb-2 block">{p.category}</span>
                     <h4 className="font-syne font-bold text-lg group-hover:text-brand transition-colors line-clamp-2">{p.title}</h4>
                   </div>
                 </div>
              </Link>
           ))}
        </div>
      </div>
    </div>
  );
}
