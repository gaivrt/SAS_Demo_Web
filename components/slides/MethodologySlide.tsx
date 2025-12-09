import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Activity, ArrowRight, Database, BrainCircuit, ScanLine, AlertCircle, ShieldCheck } from 'lucide-react';

// --- Types ---

const STEPS = [
    {
        id: 0,
        title: "Subculture Retrieval",
        subtitle: "Knowledge Update",
        icon: Database,
        desc: "Dynamically queries external indices (Google/Bing) to fetch real-time usage contexts of slang terms, bridging the temporal gap of static LLMs."
    },
    {
        id: 1,
        title: "Alignment Report",
        subtitle: "Context Synthesis",
        icon: FileText,
        desc: "Synthesizes retrieved fragments into a structured 'Subculture Definition' that maps benign surface meanings to their hidden risk semantics."
    },
    {
        id: 2,
        title: "Culture Solver",
        subtitle: "Inference & Labeling",
        icon: BrainCircuit,
        desc: "The final classification head utilizes the Alignment Report as a 'decoder ring' to correctly interpret the input sentence and assign risk labels."
    }
];

// --- Visual Components ---

const PipelineNode = ({ active, completed, icon: Icon, label, onClick }: any) => {
    return (
        <div
            onClick={onClick}
            className={`relative flex flex-col items-center gap-3 cursor-pointer group z-10 transition-all duration-500 ${active ? 'scale-110' : 'scale-100 opacity-60 hover:opacity-100'}`}
        >
            <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 shadow-2xl
                ${active
                    ? 'bg-jirai-pink text-white border-jirai-pink shadow-[0_0_30px_rgba(255,77,128,0.4)]'
                    : completed
                        ? 'bg-[#1C1C1E] text-jirai-pink border-jirai-pink/30'
                        : 'bg-[#1C1C1E] text-gray-500 border-white/10 group-hover:border-white/30'
                }`}
            >
                <Icon size={24} strokeWidth={1.5} />
            </div>
            <span className={`text-[10px] uppercase tracking-widest font-mono transition-colors duration-300 ${active ? 'text-white' : 'text-gray-600'}`}>
                {label}
            </span>

            {/* Active Indicator Dot */}
            {active && (
                <motion.div
                    layoutId="active-dot"
                    className="absolute -bottom-4 w-1 h-1 bg-jirai-pink rounded-full"
                />
            )}
        </div>
    );
};

const ConnectionLine = ({ active }: { active: boolean }) => (
    <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden mx-4">
        {active && (
            <motion.div
                className="absolute inset-0 bg-jirai-pink"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
        )}
    </div>
);

// --- Animation Views ---

// View 1: Radar Scan for Retrieval
const RetrievalViz = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Radar Rings */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute border border-jirai-pink/20 rounded-full"
                    style={{ width: i * 150, height: i * 150 }}
                    animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
            ))}

            {/* Center Node */}
            <div className="absolute z-10 bg-[#1C1C1E] border border-jirai-pink p-4 rounded-full shadow-[0_0_50px_rgba(255,77,128,0.2)]">
                <Search size={32} className="text-jirai-pink" />
            </div>

            {/* Flying Data Points */}
            <AnimatePresence>
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute flex items-center gap-2"
                        initial={{
                            x: (Math.random() - 0.5) * 400,
                            y: (Math.random() - 0.5) * 400,
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{
                            x: 0,
                            y: 0,
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="w-2 h-2 bg-jirai-pink rounded-full" />
                        <span className="text-[10px] text-jirai-pink font-mono bg-black/50 px-1 rounded border border-jirai-pink/20">
                            Term_{i + 102}
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>

            <div className="absolute bottom-8 left-8">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 font-mono uppercase">Query Target</span>
                    <span className="text-sm text-white font-mono">"Jirai Kei" + "Angel"</span>
                </div>
            </div>
        </div>
    );
};

// View 2: Document Synthesis
const AlignmentViz = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Stacking Effect */}
            <div className="relative w-64 h-80">
                <motion.div
                    className="absolute inset-0 bg-[#2C2C2E] border border-white/10 rounded-lg transform rotate-6"
                    initial={{ opacity: 0, rotate: 12, scale: 0.9 }}
                    animate={{ opacity: 0.5, rotate: 6, scale: 0.95 }}
                />
                <motion.div
                    className="absolute inset-0 bg-[#2C2C2E] border border-white/10 rounded-lg transform -rotate-3"
                    initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
                    animate={{ opacity: 0.7, rotate: -3, scale: 0.98 }}
                    transition={{ delay: 0.1 }}
                />

                {/* Main Doc */}
                <motion.div
                    className="absolute inset-0 bg-[#1C1C1E] border border-jirai-pink/50 rounded-lg p-6 shadow-2xl flex flex-col gap-4 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="w-1/3 h-2 bg-jirai-pink/40 rounded-full mb-4" />

                    {/* Simulated Text Lines */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="h-2 bg-white/10 rounded-full w-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.random() * 40 + 60}%` }}
                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        />
                    ))}

                    {/* Scanning Beam */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-jirai-pink shadow-[0_0_15px_#FF4D80]"
                        animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            </div>

            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                <div className="bg-[#1C1C1E] border border-white/10 p-3 rounded text-xs font-mono text-gray-400">
                    <span className="text-jirai-pink block mb-1">Detected Polysemy:</span>
                    "Angel" → <span className="text-red-400">Suicide (Jump)</span>
                </div>
                <div className="bg-[#1C1C1E] border border-white/10 p-3 rounded text-xs font-mono text-gray-400">
                    <span className="text-jirai-pink block mb-1">Risk Weight:</span>
                    Level 4 (High)
                </div>
            </div>
        </div>
    );
};

// View 3: Solver Logic
const SolverViz = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Input Stream */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-20 flex items-center justify-center">
                <motion.div
                    className="bg-white/5 border border-white/10 px-4 py-2 rounded text-sm text-white font-mono"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    "I want to become an angel"
                </motion.div>
                <ArrowRight className="text-gray-600 ml-4" />
            </div>

            {/* Central Logic Gate */}
            <div className="relative z-10">
                <motion.div
                    className="w-32 h-32 bg-[#1C1C1E] border border-white/20 rounded-2xl flex items-center justify-center"
                    animate={{ borderColor: ['rgba(255,255,255,0.1)', '#FF453A', 'rgba(255,255,255,0.1)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <BrainCircuit size={40} className="text-white" />
                </motion.div>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 uppercase tracking-widest font-mono text-center w-40">
                    Aligning with Report...
                </div>
            </div>

            {/* Output Stream */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-20 flex items-center justify-center">
                <ArrowRight className="text-gray-600 mr-4" />
                <motion.div
                    className="bg-red-500/10 border border-red-500/50 px-4 py-2 rounded text-sm text-red-400 font-mono flex items-center gap-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <AlertCircle size={14} />
                    Suicidal Ideation
                </motion.div>
            </div>
        </div>
    );
};


export const SolutionSlide: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-advance for demonstration if user doesn't interact
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            setActiveStep(prev => (prev + 1) % 3);
        }, 6000);
        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    const handleManualStep = (id: number) => {
        setActiveStep(id);
        setIsAutoPlaying(false);
    };

    return (
        <div className="w-full h-full flex flex-col p-4 md:p-8">

            {/* Top: Pipeline Navigation */}
            <div className="w-full max-w-4xl mx-auto mb-8 flex items-center justify-between">
                <PipelineNode
                    active={activeStep === 0}
                    completed={activeStep > 0}
                    icon={STEPS[0].icon}
                    label="Retrieval"
                    onClick={() => handleManualStep(0)}
                />
                <ConnectionLine active={activeStep >= 1} />
                <PipelineNode
                    active={activeStep === 1}
                    completed={activeStep > 1}
                    icon={STEPS[1].icon}
                    label="Alignment"
                    onClick={() => handleManualStep(1)}
                />
                <ConnectionLine active={activeStep >= 2} />
                <PipelineNode
                    active={activeStep === 2}
                    completed={activeStep > 2}
                    icon={STEPS[2].icon}
                    label="Solver"
                    onClick={() => handleManualStep(2)}
                />
            </div>

            {/* Main Content Split */}
            <div className="flex-1 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/5 pt-8">

                {/* Left: Text Description */}
                <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center gap-3 mb-4 text-jirai-pink/80">
                                <ScanLine size={18} />
                                <span className="font-mono text-xs uppercase tracking-wider">System Process {String(activeStep + 1).padStart(2, '0')}</span>
                            </div>
                            <h2 className="text-3xl font-light text-white mb-2">{STEPS[activeStep].title}</h2>
                            <h3 className="text-lg text-white/60 mb-6 font-light">{STEPS[activeStep].subtitle}</h3>
                            <p className="text-academic-gray leading-relaxed text-sm">
                                {STEPS[activeStep].desc}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="pt-8 border-t border-white/5">
                        <div className="text-[10px] text-gray-600 font-mono mb-2 uppercase tracking-widest">Input/Output Protocol</div>
                        <div className="font-mono text-xs text-gray-400 bg-black/30 p-3 rounded border border-white/5">
                            {activeStep === 0 && `>> GET /query?q="Jirai Kei" \n<< [200 OK] { keywords: [...] }`}
                            {activeStep === 1 && `>> SYNTHESIZE(keywords) \n<< Report_ID: 0x8F2A`}
                            {activeStep === 2 && `>> CLASSIFY(input, Report_ID) \n<< LABEL: "DANGER_HIGH"`}
                        </div>
                    </div>
                </div>

                {/* Right: Dynamic Visualization */}
                <div className="lg:col-span-8 relative bg-[#0a0a0a] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <AnimatePresence mode="wait">
                            {activeStep === 0 && (
                                <motion.div key="viz0" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <RetrievalViz />
                                </motion.div>
                            )}
                            {activeStep === 1 && (
                                <motion.div key="viz1" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <AlignmentViz />
                                </motion.div>
                            )}
                            {activeStep === 2 && (
                                <motion.div key="viz2" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <SolverViz />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Status Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-[#1C1C1E] border-t border-white/10 flex items-center px-4 justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full bg-status-success ${isAutoPlaying ? 'animate-pulse' : ''}`}></div>
                            <span className="text-[10px] text-gray-400 font-mono">{isAutoPlaying ? 'DEMO MODE' : 'INTERACTIVE MODE'}</span>
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono">
                            SAS_CORE_V1.2
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};