import React from 'react';
import { SLIDES, SlideType } from '../types';
import { ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';

interface LayoutProps {
  currentIndex: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentIndex, totalSlides, onNext, onPrev, children }) => {
  const currentSlide = SLIDES[currentIndex];

  return (
    <div className="relative w-full h-full flex flex-col font-sans">
      {/* Top Bar - Minimalist Academic Header */}
      <header className="absolute top-0 w-full px-8 py-6 flex justify-between items-start z-50 border-b border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="flex flex-col">
          <span className="text-jirai-pink text-xs font-semibold tracking-widest uppercase mb-1">ACL Submission</span>
          <h1 className="text-academic-text text-sm font-medium tracking-wide">Subcultural Alignment Solver</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <span className="block text-academic-gray text-[10px] uppercase tracking-wider">Section</span>
            <span className="text-academic-text text-xs font-medium">{currentSlide.sectionNumber} — {currentSlide.title}</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
          <div className="text-academic-gray text-xs font-mono">
            {String(currentIndex + 1).padStart(2, '0')} <span className="text-white/20">/</span> {String(totalSlides).padStart(2, '0')}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex items-center justify-center p-8 md:p-12 lg:p-24 overflow-hidden">
        {children}
      </main>

      {/* Keyboard Hint */}
      <div className="absolute bottom-6 right-8 z-40 hidden md:flex items-center gap-2 text-white/10">
        <Keyboard size={14} />
        <span className="text-[10px] font-mono tracking-wider">USE ARROW KEYS</span>
      </div>

      {/* Bottom Controls - Apple style pill */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 p-1 rounded-full bg-[#1C1C1E]/80 backdrop-blur-md border border-white/10 shadow-2xl">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="p-3 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="w-px h-4 bg-white/10 mx-1"></div>

          <button
            onClick={onNext}
            disabled={currentIndex === totalSlides - 1}
            className="p-3 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};