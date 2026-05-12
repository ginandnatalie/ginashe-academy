import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X, Menu, LayoutDashboard, BookOpen, ClipboardList, Landmark, Users as UsersIcon } from 'lucide-react';
import { streamsData } from '../data/streams';

export default function StreamNavbar() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract stream slug from path e.g. /streams/health-sciences/about
  const parts = pathname.split('/');
  const streamSlug = parts[2];
  const stream = streamsData.find(s => s.id === streamSlug);

  if (!stream) return null;

  const menuItems = [
    { label: 'Dashboard', path: `/streams/${stream.id}`, icon: LayoutDashboard },
    { label: 'Curriculum', path: `/streams/${stream.id}/curriculum`, icon: BookOpen },
    { label: 'Requirements', path: `/streams/${stream.id}/requirements`, icon: ClipboardList },
    { label: 'Authority', path: `/streams/${stream.id}/authority`, icon: Landmark },
    { label: 'Faculty', path: '/faculty', icon: UsersIcon },
  ];

  const floatingButton = (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsMenuOpen(true)}
      className={`fixed top-24 right-4 z-[2000] w-11 h-11 rounded-full ${stream.bg} ${stream.color} border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center group overflow-hidden md:hidden`}
      title="Open Stream Menu"
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Menu className="w-4 h-4 relative z-10" />
    </motion.button>
  );

  return (
    <>
      {/* Horizontal Navbar (Desktop) */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-[90px] left-0 right-0 z-[990] bg-[#0b0e14]/90 backdrop-blur-xl border-b border-brand/20 h-10 flex items-center px-4 sm:px-8 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)] hidden md:flex"
          >
            <div className="flex items-center max-w-7xl mx-auto w-full gap-6">
              <Link to={`/streams/${stream.id}`} className="flex items-center gap-2 group no-underline shrink-0">
                <span className="font-syne font-black text-[12px] text-white group-hover:text-brand transition-colors uppercase tracking-wide">{stream.title}</span>
                <span className={`text-[8px] font-jetbrains uppercase tracking-widest ${stream.color} px-1.5 py-0.5 rounded border ${stream.border} ${stream.bg}`}>({stream.abbr})</span>
              </Link>

              <div className="h-5 w-px bg-white/10 hidden sm:block"></div>

              <div className="flex items-center gap-1 flex-1" ref={dropdownRef}>
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-outfit tracking-wide no-underline transition-all flex items-center gap-1 ${
                      pathname === item.path || (item.path !== `/streams/${stream.id}` && pathname.startsWith(item.path))
                        ? 'bg-brand/15 text-brand font-bold'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <button
                onClick={() => setIsVisible(false)}
                className="flex items-center gap-1.5 text-white/30 hover:text-white/80 transition-colors px-2 py-1 rounded-lg hover:bg-white/5 group"
                title="Minimise stream menu"
              >
                <span className="text-[9px] font-dm-mono uppercase tracking-widest">Minimise</span>
                <X className="w-3 h-3" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop Maximise Toggle */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => setIsVisible(true)}
            className="fixed top-[92px] right-6 z-[1000] bg-brand text-navy px-3 py-1.5 rounded-lg font-syne font-black text-[10px] uppercase tracking-widest hidden md:flex items-center gap-2 hover:bg-white hover:scale-105 transition-all shadow-[0_10px_25px_rgba(0,242,255,0.2)]"
          >
            Maximise
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Button (Mobile Only) */}
      <div className="md:hidden">
        {floatingButton}
      </div>

      {/* Floating Side Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[2001] bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[2002] w-full max-w-[320px] bg-[#0b0e14] border-l border-white/10 shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-12 h-12 rounded-xl ${stream.bg} ${stream.color} flex items-center justify-center text-xl`}>
                    {stream.icon}
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <div className="font-dm-mono text-[9px] text-brand uppercase tracking-[0.4em] mb-1">{stream.abbr} Dimension</div>
                  <h2 className="font-syne font-black text-2xl text-white uppercase tracking-tight leading-none">{stream.title}</h2>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 py-8">
                <div className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path || (item.path !== `/streams/${stream.id}` && pathname.startsWith(item.path));
                    
                    return (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl no-underline transition-all group ${
                          isActive 
                            ? `${stream.bg} ${stream.color} font-bold shadow-lg shadow-black/20` 
                            : 'text-white/40 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`} />
                        <span className="font-syne text-sm uppercase tracking-widest">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-12 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                  <div className="font-dm-mono text-[8px] text-white/20 uppercase tracking-[0.3em] mb-3">Institutional Mandate</div>
                  <p className="text-[11px] text-text-muted leading-relaxed italic">
                    "{stream.tagline}"
                  </p>
                </div>
              </div>

              <div className="p-8 border-t border-white/5">
                <button
                  onClick={() => { setIsMenuOpen(false); setIsVisible(true); }}
                  className="w-full py-4 rounded-xl border border-white/10 font-syne font-black text-[10px] uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all"
                >
                  Restore Header Bar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
