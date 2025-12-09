import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Background3D } from './components/Background3D';
import { Layout } from './components/Layout';
import { IntroSlide } from './components/slides/IntroSlide';
import { ProblemSlide } from './components/slides/ProblemSlide';
import { SolutionSlide } from './components/slides/SolutionSlide';
import { ResultsSlide } from './components/slides/ResultsSlide';
import { ConclusionSlide } from './components/slides/ConclusionSlide';
import { ReferenceSlide } from './components/slides/ReferenceSlide';
import { BackgroundSlide } from './components/slides/BackgroundSlide';
import { FutureWorkSlide } from './components/slides/FutureWorkSlide';
import { SLIDES } from './types';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 800 : -800,
      opacity: 0,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
      rotateY: direction < 0 ? 15 : -15,
    })
  };
  const renderSlide = () => {
    switch (currentIndex) {
      case 0: return <IntroSlide />;
      case 1: return <ProblemSlide />;
      case 2: return <BackgroundSlide />;
      case 3: return <SolutionSlide />;
      case 4: return <ResultsSlide />;
      case 5: return <FutureWorkSlide />;
      case 6: return <ConclusionSlide />;
      case 7: return <ReferenceSlide />;
      default: return <IntroSlide />;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black text-white perspective-1000">
      {/* 3D Background */}
      <Background3D currentSlide={SLIDES[currentIndex].id} />

      {/* Content Overlay */}
      <Layout
        currentIndex={currentIndex}
        totalSlides={SLIDES.length}
        onNext={handleNext}
        onPrev={handlePrev}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.8 }, // Apple-style easing
              opacity: { duration: 0.4 },
              rotateY: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
            }}
            className={`absolute w-full px-4 ${currentIndex === 7
              ? 'h-full'
              : 'flex justify-center items-center'
              }`}
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </Layout>
    </div>
  );
};

export default App;