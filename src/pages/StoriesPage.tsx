import React from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-bg pt-20 px-6">
      <div className="max-w-7xl mx-auto py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-pink-400/10 text-pink-400 flex items-center justify-center">
            <Users className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-syne font-black text-white uppercase tracking-tighter">Graduate Stories</h1>
          <p className="text-text-muted font-outfit max-w-2xl mx-auto text-lg">Real outcomes, real impact. Hear from Ginashe Academy graduates who built something real.</p>
        </motion.div>
      </div>
    </div>
  );
}
