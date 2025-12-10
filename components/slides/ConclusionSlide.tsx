import React from 'react';
import { motion } from 'framer-motion';

export const ConclusionSlide: React.FC = () => {
  return (
    <div className="w-full max-w-3xl text-center flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-light text-white mb-8">Conclusion</h2>

        <p className="text-xl text-academic-gray leading-relaxed mb-12">
          SAS effectively bridges the gap between static model knowledge and evolving subcultures. By treating alignment as a <span className="text-white font-medium">dynamic retrieval task</span> rather than a training objective, we ensure safer, more accurate diagnostics in high-risk digital spaces.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-lg mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <a href="https://github.com/gaivrt/SAS_Demo_Web" target="_blank" rel="noopener noreferrer" className="p-6 border border-white/10 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group block">
          <h3 className="text-white text-sm font-semibold mb-2 group-hover:text-jirai-pink transition-colors">Project Page</h3>
          <p className="text-xs text-academic-gray">github.com/gaivrt/SAS_Demo_Web</p>
        </a>
        <div className="p-6 border border-white/10 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
          <h3 className="text-white text-sm font-semibold mb-2 group-hover:text-jirai-pink transition-colors">Full Paper</h3>
          <p className="text-xs text-academic-gray">ACL 2025 Submission</p>
        </div>
      </motion.div>
    </div>
  );
};