import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, Globe } from 'lucide-react';

export const ProblemSlide: React.FC = () => {
    return (
        <div className="w-full max-w-7xl h-full flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full lg:h-[600px]">

                {/* Left: Problem Statement */}
                <motion.div
                    className="lg:col-span-5 flex flex-col justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <h2 className="text-3xl font-semibold text-white mb-6">Semantic Drift & <br />Knowledge Cutoffs</h2>
                        <p className="text-academic-gray text-lg leading-relaxed mb-8">
                            LLMs trained on general corpora fail to detect high-risk behaviors in niche subcultures due to two fundamental limitations in their architecture.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="glass-panel p-6 rounded-xl">
                            <div className="flex items-center gap-3 mb-2 text-jirai-pink">
                                <Clock size={20} />
                                <h3 className="font-medium text-white">Temporal Latency</h3>
                            </div>
                            <p className="text-sm text-academic-gray">
                                Subcultural slang evolves faster than model training cycles. "Static" knowledge bases become obsolete within weeks.
                            </p>
                        </div>
                        <div className="glass-panel p-6 rounded-xl">
                            <div className="flex items-center gap-3 mb-2 text-jirai-pink">
                                <Globe size={20} />
                                <h3 className="font-medium text-white">Contextual Misalignment</h3>
                            </div>
                            <p className="text-sm text-academic-gray">
                                Benign dictionary definitions are repurposed. The semantic gap between general usage and subcultural intent leads to false negatives.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Clinical Comparison Table */}
                <motion.div
                    className="lg:col-span-7 glass-panel rounded-2xl p-8 border border-white/10 flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-sm font-mono uppercase tracking-widest text-academic-gray">Case Study: Polysemy in "Jirai Kei"</h3>
                        <div className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs border border-red-500/20">High Risk Factor</div>
                    </div>

                    <div className="flex-1 flex flex-col gap-0 border border-white/10 rounded-lg overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-3 bg-white/5 p-4 text-xs font-semibold text-white/60 uppercase tracking-wider">
                            <div>Term</div>
                            <div>General Corpus Meaning</div>
                            <div className="text-red-400">Subcultural Intent</div>
                        </div>

                        {/* Rows */}
                        <div className="grid grid-cols-3 border-t border-white/10 p-6 items-center hover:bg-white/5 transition-colors">
                            <div className="font-mono text-white text-lg">"Take Pills"</div>
                            <div className="text-academic-gray text-sm pr-4">
                                Medical adherence, vitamins, maintaining health.
                                <span className="block mt-1 text-green-500/80 text-xs flex items-center gap-1">
                                    ● Benign
                                </span>
                            </div>
                            <div className="text-white/90 text-sm font-medium pl-4 border-l border-white/10">
                                Overdose (OD), escapism, self-harm ritual.
                                <span className="block mt-1 text-red-400 text-xs flex items-center gap-1">
                                    <AlertCircle size={10} /> Critical Danger
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 border-t border-white/10 p-6 items-center hover:bg-white/5 transition-colors">
                            <div className="font-mono text-white text-lg">"Angel"</div>
                            <div className="text-academic-gray text-sm pr-4">
                                Divine being, symbol of purity, moral goodness.
                                <span className="block mt-1 text-green-500/80 text-xs flex items-center gap-1">
                                    ● Positive Sentiment
                                </span>
                            </div>
                            <div className="text-white/90 text-sm font-medium pl-4 border-l border-white/10">
                                Reference to Jumping (Suicide), "flying" away.
                                <span className="block mt-1 text-red-400 text-xs flex items-center gap-1">
                                    <AlertCircle size={10} /> Critical Danger
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="mt-6 text-xs text-academic-gray text-center italic">
                        Figure 1: Comparison of semantic interpretations between base foundation models and subcultural context.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};