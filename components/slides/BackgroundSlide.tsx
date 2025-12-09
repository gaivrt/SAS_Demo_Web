import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, RefreshCw, Search, ArrowRight, Zap, Play, Brain, Database, XCircle, AlertTriangle, MessageSquare, LayoutTemplate, FileText, CheckCircle, List } from 'lucide-react';

// --- Types & Constants ---
type BaselineType = 'ZEROSHOT' | 'COT' | 'PS' | 'SELFREFINE' | 'S3' | 'OWL';

const SAMPLE_INPUT = '"天桥cp 从花絮就嗑到飞起... 希望od和qm能在这个时空里一直幸福"';

// --- Visual Components ---

const BaselineItem = ({ id, label, type, icon: Icon, flow, active, onClick }: any) => (
    <motion.div
        onClick={() => onClick(id)}
        className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 relative overflow-visible group
      ${active
                ? 'bg-jirai-pink/10 border-jirai-pink shadow-[0_0_15px_rgba(255,77,128,0.2)]'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
        whileHover={{ x: 5 }}
    >
        {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-jirai-pink" />}

        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded ${active ? 'bg-jirai-pink/20 text-jirai-pink' : 'bg-white/5 text-gray-500'}`}>
                    <Icon size={16} />
                </div>
                <span className={`font-mono text-sm font-medium ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{label}</span>
            </div>
            {active && <Play size={10} className="text-jirai-pink animate-pulse" fill="currentColor" />}
        </div>
        <div className={`text-[10px] font-mono pl-9 transition-colors ${active ? 'text-jirai-pink/80' : 'text-gray-600'}`}>
            {flow}
        </div>
    </motion.div>
);

const ModelOutput = ({ text, delay }: { text: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="w-full bg-[#1C1C1E] border border-white/20 p-3 rounded mb-2 relative overflow-hidden"
    >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-500" />
        <div className="text-[9px] text-gray-500 font-mono mb-1 uppercase tracking-widest pl-2">Model Final Output</div>
        <div className="text-white text-xs font-mono pl-2 whitespace-pre-wrap leading-relaxed">
            {text}
        </div>
    </motion.div>
);

// --- Simulations ---

const SimZeroShot = () => (
    <div className="h-full flex flex-col p-6 relative">
        <div className="absolute top-4 right-4 text-xs text-gray-600 font-mono">MODE: ZERO_SHOT</div>

        <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-2">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-mono text-gray-300 shadow-lg max-w-[90%] text-center truncate">
                    {SAMPLE_INPUT}
                </div>
                <ArrowRight className="text-gray-600 rotate-90" size={20} />
            </motion.div>

            <div className="relative">
                <motion.div
                    className="w-32 h-24 bg-[#111] border border-white/20 rounded-xl flex items-center justify-center z-10 relative shadow-2xl"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                >
                    <Zap size={40} className="text-gray-500" />
                </motion.div>
                <motion.div
                    className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-full bg-jirai-pink z-20"
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                />
            </div>
            <ArrowRight className="text-gray-600 rotate-90" size={20} />

            <div className="w-full flex flex-col gap-2">
                <ModelOutput
                    text={`labels: {OD: 0, ED: 0, SH: 0}\nrationale: {\n  OD: "The text discusses a fictional couple ('天桥cp')... No mention of drug use."\n}`}
                    delay={0.8}
                />
            </div>
        </div>
    </div>
);

const SimCoT = () => {
    return (
        <div className="h-full flex flex-col p-6 relative">
            <div className="absolute top-4 right-4 text-xs text-gray-600 font-mono">MODE: CHAIN_OF_THOUGHT</div>

            <div className="flex-1 flex flex-col gap-2">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded text-xs font-mono text-gray-300 w-fit max-w-full truncate">
                    {SAMPLE_INPUT}
                </div>

                <div className="ml-5 pl-5 border-l border-white/10 flex flex-col gap-1.5 flex-1 overflow-hidden justify-center py-1">
                    {["Identifying entities: '天桥cp' (likely fictional couple)", "Analyzing action: '嗑到飞起' (slang for 'obsessed')", "Synthesizing: Expressing strong affection", "Conclusion: Safe request"].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.8 + 0.5 }}
                            className="bg-[#111] border border-white/10 p-2 rounded-md text-[10px] text-gray-300 flex items-center gap-2 shadow-sm"
                        >
                            <span className="text-jirai-pink font-mono opacity-50 text-xs">{i + 1}.</span>
                            {step}
                        </motion.div>
                    ))}
                </div>

                <div className="mt-auto flex flex-col gap-2">
                    <ModelOutput
                        text={`labels: {OD: 0, ED: 0, SH: 0}\nrationale: {\n  OD: "The text uses Chinese internet slang ('嗑到飞起') to express strong affection... 'od' and 'qm' are likely character names... No indication of drug overdose."\n}`}
                        delay={4}
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4.5 }}
                        className="bg-green-500/10 border border-green-500/50 p-2.5 rounded-lg"
                    >
                        <div className="text-green-400 text-xs font-bold flex items-center gap-2">
                            <CheckCircle size={14} /> ALIGNED
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">CoT correctly interprets slang and context.</div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

const SimPS = () => (
    <div className="h-full flex flex-col p-6 relative">
        <div className="absolute top-4 right-4 text-xs text-gray-600 font-mono">MODE: PLAN_AND_SOLVE</div>

        <div className="flex-1 flex flex-col gap-2">
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded text-xs font-mono text-gray-300 w-fit max-w-full truncate">
                {SAMPLE_INPUT}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] text-jirai-pink font-mono bg-jirai-pink/5 p-2 rounded border border-jirai-pink/20"
            >
                &gt; Prompt: "Let's first understand the problem and devise a plan..."
            </motion.div>

            <div className="flex-1 border bg-black/40 border-white/10 rounded-lg relative overflow-hidden flex flex-col font-mono">
                {/* Terminal Header */}
                <div className="bg-white/5 border-b border-white/5 px-3 py-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/20" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                        <div className="w-2 h-2 rounded-full bg-green-500/20" />
                    </div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
                        <List size={10} /> Plan_Buffer.log
                    </div>
                </div>

                {/* Buffer Content */}
                <div className="p-3 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                    {[
                        "Plan 1: Identify key terms ('天桥cp', '嗑到飞起', 'od', 'qm')",
                        "Plan 2: Determine context (fandom, shipping)",
                        "Plan 3: Formulate supportive and safe response"
                    ].map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 + i * 0.8 }}
                            className="flex items-start gap-2 text-[10px] text-gray-400 group"
                        >
                            <div className="text-gray-700 select-none mt-[1px]">{i + 1}</div>
                            <div className="flex-1 flex items-center gap-2">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.5 + i * 0.8 + 0.4 }}
                                >
                                    <CheckCircle size={12} className="text-emerald-500" />
                                </motion.div>
                                <span className="group-hover:text-gray-200 transition-colors">{plan}</span>
                            </div>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4.0 }}
                        className="flex items-center gap-1 text-[10px] text-jirai-pink mt-1 pl-4"
                    >
                        <span className="animate-pulse">_</span>
                    </motion.div>
                </div>
            </div>

            <div className="mt-auto flex flex-col gap-2">
                <ModelOutput
                    text={`labels: {OD: 0, ED: 0, SH: 0}\nrationale: {\n  OD: "The user is expressing enthusiasm for a fictional couple ('天桥cp')... 'od' and 'qm' are character names. No drug overdose."\n}`}
                    delay={4.5}
                />
            </div>
        </div>
    </div>
);


const SimSelfRefine = () => {
    // Phase: 0=Initial, 1=Feedback1, 2=Refine1, 3=Feedback2, 4=Refine2, 5=Final
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setPhase(p => {
                if (p >= 5) return p; // Stop at Final
                return p + 1;
            });
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-full flex flex-col p-8 relative items-center justify-center">
            <div className="absolute top-4 right-4 text-xs text-gray-600 font-mono">MODE: SELF_REFINE (ITERATIVE)</div>

            <div className="relative w-full max-w-md h-72 flex items-center justify-center flex-1">

                <div className="absolute inset-0">
                    <svg className="w-full h-full text-white/5">
                        <motion.circle
                            cx="50%" cy="50%" r="100"
                            fill="transparent" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
                            animate={{ rotate: phase >= 5 ? 0 : 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                    </svg>
                </div>

                <motion.div
                    className={`absolute top-0 px-5 py-3 bg-[#1C1C1E] border rounded text-xs font-bold transition-all duration-300 z-10
                        ${phase === 0 ? 'border-jirai-pink text-white scale-110 shadow-jirai-pink/20 shadow-lg' : 'border-white/10 text-gray-500'}`}
                >
                    INITIAL GENERATION
                </motion.div>

                <motion.div
                    className={`absolute right-0 px-4 py-3 bg-[#1C1C1E] border rounded text-xs w-40 text-center transition-all duration-300
                    ${phase % 2 !== 0 && phase < 5 ? 'border-blue-500 text-blue-200 shadow-lg shadow-blue-500/20' : 'border-white/10 text-gray-600 opacity-50'}`}
                    animate={{ x: phase % 2 !== 0 && phase < 5 ? -10 : 0 }}
                >
                    <div className="font-bold mb-1">FEEDBACK</div>
                    "Is 'od' drug related?"
                </motion.div>

                <motion.div
                    className={`absolute left-0 px-4 py-3 bg-[#1C1C1E] border rounded text-xs w-40 text-center transition-all duration-300
                    ${phase % 2 === 0 && phase > 0 && phase < 5 ? 'border-green-500 text-green-200 shadow-lg shadow-green-500/20' : 'border-white/10 text-gray-600 opacity-50'}`}
                    animate={{ x: phase % 2 === 0 && phase > 0 && phase < 5 ? 10 : 0 }}
                >
                    <div className="font-bold mb-1">REFINE</div>
                    "Checking slang..."
                </motion.div>

                <div className="w-40 h-48 bg-black border border-white/20 rounded flex flex-col items-center justify-center p-3 z-0 relative overflow-hidden shadow-2xl">
                    {phase >= 5 && <div className="absolute inset-0 bg-red-500/10 z-10" />}
                    <FileText size={32} className="text-gray-500 mb-3" />
                    <div className="w-full h-1 bg-white/10 mb-2" />
                    <div className="w-3/4 h-1 bg-white/10 mb-2" />
                    <div className="w-full h-1 bg-white/10" />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {phase >= 5 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md mt-4"
                    >
                        <ModelOutput
                            text={`labels: {OD: 0, ED: 0, SH: 0}\nrationale: {\n  OD: "The term 'od' is used as part of a ship name... reference is neutral."\n}`}
                            delay={0}
                        />

                        <div className="bg-green-500/10 border border-green-500/50 px-5 py-3 rounded text-center mt-2">
                            <div className="text-green-400 text-sm font-bold">ALIGNED</div>
                            <div className="text-xs text-gray-500 mt-0.5">Iterative refinement correctly identified fandom context.</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SimS3 = () => (
    <div className="h-full flex flex-col p-6 relative">
        <div className="absolute top-4 right-4 text-xs text-gray-600 font-mono">MODE: S3_AGENT (MULTI-VIEW)</div>

        <div className="flex-1 flex flex-col gap-2">
            <div>
                <div className="text-xs text-gray-500 font-mono mb-1.5 uppercase tracking-wide text-center">Phase 1: Multi-Perspective Analysis</div>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { title: 'SURFACE', icon: Search, desc: "Keywords: 'od', 'qm'" },
                        { title: 'SEMANTIC', icon: Brain, desc: "Context: Fandom/Shipping" },
                        { title: 'SENTIMENT', icon: MessageSquare, desc: "Tone: Positive/Enthusiastic" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-[#111] border border-white/10 p-2 rounded-lg flex flex-col items-center text-center gap-1 group hover:border-jirai-pink/50 transition-colors"
                        >
                            <item.icon size={16} className="text-gray-400 group-hover:text-jirai-pink transition-colors" />
                            <div className="text-[10px] font-bold text-gray-300">{item.title}</div>
                            <div className="text-[9px] text-gray-400 font-medium leading-tight">{item.desc}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Animated Data Flow & Aggregator */}
            <div className="relative h-32 my-0 z-10 grid place-items-center">
                {/* Standard Arrows */}
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                        </marker>
                    </defs>
                    {/* Left Stream */}
                    <motion.path
                        d="M 15% 0 C 15% 50, 50% 0, 50% 50"
                        fill="none" stroke="#444" strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    />
                    {/* Center Stream */}
                    <motion.path
                        d="M 50% 0 L 50% 50"
                        fill="none" stroke="#444" strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    />
                    {/* Right Stream */}
                    <motion.path
                        d="M 85% 0 C 85% 50, 50% 0, 50% 50"
                        fill="none" stroke="#444" strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    />
                </svg>

                {/* Aggregator Node (Scaled Up & Polished) */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="relative z-20 mt-2"
                >
                    <div className="bg-[#18181b]/90 backdrop-blur-md border border-white/20 px-5 py-2 rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/5">
                            <GitBranch size={16} className="text-gray-200 rotate-180" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white tracking-wider">AGGREGATOR</span>
                            <span className="text-[9px] text-gray-400 font-mono">Synthesizing inputs...</span>
                        </div>
                    </div>
                </motion.div>

                {/* Arrow to Outcome */}
                <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 8 }}
                    transition={{ delay: 1.4 }}
                    className="absolute bottom-1 text-gray-500"
                >
                    <ArrowRight size={16} className="rotate-90" />
                </motion.div>
            </div>

            {/* Phase 2: Output */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="relative z-10 flex-1 flex flex-col justify-end gap-1.5"
            >
                <div className="text-[10px] text-gray-500 font-mono mb-0 uppercase tracking-wide text-center">Phase 2: Aggregation</div>

                <ModelOutput
                    text={`labels: {OD: 0, ED: 0, SH: 0}\nrationale: {\n  OD: "Surface keyword 'od' is a false positive... it is a character name."\n}`}
                    delay={2.0}
                />

                <div className="bg-green-500/10 border border-green-500/50 p-2.5 rounded-lg flex items-center justify-center gap-3">
                    <CheckCircle size={18} className="text-green-400" />
                    <div className="text-left">
                        <div className="text-green-300 text-[10px] font-bold">ROBUST CONSENSUS</div>
                        <div className="text-[9px] text-gray-400 mt-0">3 views aligned with external verification.</div>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
);

const SimOWL = () => (
    <div className="h-full flex flex-col p-6 relative">
        <div className="absolute top-4 right-4 text-xs text-gray-600 font-mono">MODE: OWL_AGENT (TOOL-USE)</div>

        <div className="flex-1 flex flex-col gap-3 justify-center">

            <div className="flex-1 flex flex-col justify-center relative">

                {/* Thread Line */}
                <div className="absolute left-[19.5px] top-8 bottom-12 w-[1px] border-l border-dashed border-zinc-700/50 z-0" />

                <div className="flex flex-col gap-5 z-10 pl-1">
                    {/* Step 1: Thinking */}
                    <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex gap-4 items-start relative">
                        <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-jirai-pink/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,77,128,0.1)] z-10 relative mt-0.5">
                            <Brain size={14} className="text-jirai-pink" />
                        </div>
                        <div className="text-xs bg-[#1C1C1E] border border-white/10 px-3 py-2 rounded-lg font-medium text-gray-300 shadow-sm relative top-0.5 max-w-[280px]">
                            <span className="text-jirai-pink font-mono text-[9px] block mb-1 opacity-60 tracking-wider">THOUGHTING...</span>
                            Checking "天桥cp od qm 中文网络用语 含义"...
                        </div>
                    </motion.div>

                    {/* Step 2: Action/Result */}
                    <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="flex gap-4 items-start relative">
                        <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-blue-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.1)] z-10 relative mt-0.5">
                            <Search size={14} className="text-blue-400" />
                        </div>
                        <div className="text-[10px] bg-black/20 border border-white/10 rounded-lg w-full max-w-[280px] overflow-hidden relative top-0.5">
                            <div className="bg-white/5 px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
                                <span className="text-blue-400 font-mono text-[9px] opacity-70">GOOGLE_SEARCH</span>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="text-blue-300 mb-1 truncate text-xs font-medium">od和qm - 网络流行语百科</div>
                                <div className="text-gray-500 text-[9px] line-clamp-2 leading-relaxed opacity-80">
                                    OD refers to "Own Daily" or character names in specific fandoms. QM...
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                    <ModelOutput
                        text={`labels: {OD: 0, ED: 0, SH: 0}\nrationale: {\n  OD: "Appears to be an abbreviation for a character name... not drug overdose."\n}`}
                        delay={1.5}
                    />

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
                        className="bg-green-500/10 border border-green-500/30 p-2.5 rounded"
                    >
                        <div className="flex items-center gap-2 font-bold text-green-300 mb-0.5 text-xs">
                            <CheckCircle size={14} /> CONTEXT VERIFIED
                        </div>
                        <div className="text-[10px] text-gray-500">
                            Agent correctly retrieved external knowledge to resolve ambiguity.
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    </div>
);


export const BackgroundSlide: React.FC = () => {
    const [activeBaseline, setActiveBaseline] = useState<BaselineType>('ZEROSHOT');
    const [replayKey, setReplayKey] = useState(0);

    const handleSelect = (id: BaselineType) => {
        if (activeBaseline === id) {
            setReplayKey(prev => prev + 1);
        } else {
            setActiveBaseline(id);
            setReplayKey(0);
        }
    };

    return (
        <div className="w-full h-full flex flex-col md:flex-row p-8 md:p-12 gap-8 items-center justify-center">

            <div className="w-full md:w-5/12 flex flex-col h-full justify-center">
                <div className="mb-6">
                    <h2 className="text-4xl font-light text-white mb-2">Related Work</h2>
                    <p className="text-academic-gray text-sm">Analysis of baseline limitations in subcultural contexts.</p>
                </div>

                <div className="flex flex-col gap-3 pr-4 overflow-visible">
                    <div className="text-[10px] text-gray-600 font-mono uppercase tracking-widest mt-2 mb-1">Standard Inference</div>
                    <BaselineItem
                        id="ZEROSHOT"
                        label="Zero-Shot"
                        icon={Zap}
                        flow="Input → Static Weights"
                        active={activeBaseline === 'ZEROSHOT'}
                        onClick={handleSelect}
                    />
                    <BaselineItem
                        id="COT"
                        label="Chain-of-Thought"
                        icon={MessageSquare}
                        flow="Input → Step-by-Step Reasoning"
                        active={activeBaseline === 'COT'}
                        onClick={handleSelect}
                    />
                    <BaselineItem
                        id="PS"
                        label="Plan-and-Solve"
                        icon={List}
                        flow="Input → Plan → Execute"
                        active={activeBaseline === 'PS'}
                        onClick={handleSelect}
                    />

                    <div className="text-[10px] text-gray-600 font-mono uppercase tracking-widest mt-4 mb-1">Agentic Optimization</div>
                    <BaselineItem
                        id="SELFREFINE"
                        label="Self-Refine"
                        icon={RefreshCw}
                        flow="Initial → Feedback Loop (x3)"
                        active={activeBaseline === 'SELFREFINE'}
                        onClick={handleSelect}
                    />
                    <BaselineItem
                        id="S3"
                        label="S3 Agent"
                        icon={LayoutTemplate}
                        flow="Surface + Semantic + Sentiment"
                        active={activeBaseline === 'S3'}
                        onClick={handleSelect}
                    />
                    <BaselineItem
                        id="OWL"
                        label="OWL Agent"
                        icon={Search}
                        flow="Tool-Use Retrieval"
                        active={activeBaseline === 'OWL'}
                        onClick={handleSelect}
                    />
                </div>
            </div>

            <div className="w-full md:w-7/12 h-[500px] bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                />

                <div className="absolute inset-0 pointer-events-none z-20 opacity-5" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)' }} />

                <div className="absolute inset-0 z-10">
                    <AnimatePresence mode="wait">
                        {activeBaseline === 'ZEROSHOT' && (
                            <motion.div key={`zero-${replayKey}`} className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SimZeroShot />
                            </motion.div>
                        )}
                        {activeBaseline === 'COT' && (
                            <motion.div key={`cot-${replayKey}`} className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SimCoT />
                            </motion.div>
                        )}
                        {activeBaseline === 'PS' && (
                            <motion.div key={`ps-${replayKey}`} className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SimPS />
                            </motion.div>
                        )}
                        {activeBaseline === 'SELFREFINE' && (
                            <motion.div key={`sr-${replayKey}`} className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SimSelfRefine />
                            </motion.div>
                        )}
                        {activeBaseline === 'S3' && (
                            <motion.div key={`s3-${replayKey}`} className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SimS3 />
                            </motion.div>
                        )}
                        {activeBaseline === 'OWL' && (
                            <motion.div key={`owl-${replayKey}`} className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SimOWL />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
