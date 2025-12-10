import React from 'react';
import { motion } from 'framer-motion';

export const IntroSlide: React.FC = () => {
  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
      {/* Background Anime Image with Gradient Mask */}
      <div className="absolute inset-0 z-0 select-none">
        <div
          // 1. opacity-40: Controls the transparency (0.4 = 40% visible). 
          //    Increasing transparency = Decreasing opacity value (e.g. 0.8 -> 0.4).
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url("/intro_bg_v2.png")',

            // 2. mask-image: Creates a gradient transparency map.
            //    - transparent from 0% to 10% (Left side invisible for text readability)
            //    - black from 60% to 100% (Right side fully visible image)
            //    - The transition creates a smooth fade-in from left to right.
            maskImage: 'linear-gradient(to right, transparent 0%, transparent 40%, black 60%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 40%, black 60%, black 100%)'
          }}
        />
        {/* Subtle Pink/Purple decorative glow for atmosphere */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-jirai-pink/5 to-transparent pointer-events-none" />
      </div>

      <div className="w-full max-w-5xl relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="text-jirai-pink font-medium tracking-widest text-xs uppercase mb-6 block">
            Research Presentation
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-[1.1] tracking-tight mb-8">
            Can Large Language Models <br />
            Keep Up with <span className="font-semibold text-white">Self-Destructive</span> <br />
            Subcultures?
          </h1>
          <div className="h-1 w-24 bg-jirai-pink rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-academic-gray font-light">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col justify-between"
          >
            <p className="text-lg leading-relaxed text-white/80 mb-8">
              A case study on the limitations of static LLMs in evolving, high-risk digital environments and a proposed framework for dynamic alignment.
            </p>

            <div className="flex flex-col gap-1 border-l-2 border-white/10 pl-4 mt-auto">
              <span className="text-white text-base font-medium tracking-wide">Tao Xilin</span>
              <span className="text-sm font-mono text-academic-gray">1220032801</span>
              <span className="text-sm text-academic-gray block mb-1">Supervisor: Li Dagang</span>
              <span className="text-sm text-academic-gray">Macau University of Science and Technology</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="flex flex-col gap-4 text-sm"
          >
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Keywords</span>
              <span className="text-white">LLM, Mental Health, Alignment</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Focus</span>
              <span className="text-white">Subcultural Semantics</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Method</span>
              <span className="text-white">Retrieval-Augmented Agents</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};