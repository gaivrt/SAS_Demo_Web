import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Globe, GitBranch, FlaskConical, Microscope } from 'lucide-react';

export const FutureWorkSlide: React.FC = () => {
    const plans = [
        {
            icon: <Brain size={24} className="text-pink-400" />,
            title: "Mechanism Analysis (Log Attribution)",
            desc: "Using GPT-4o to analyze decision logs. Proving Baselines are often \"Right for the wrong reason\", while SAS truly understands subcultural semantics."
        },
        {
            icon: <Globe size={24} className="text-blue-400" />,
            title: "Cross-lingual Impact",
            desc: "Translating high-quality Japanese Alignment Reports to assist Chinese tasks, solving the \"ambiguous definition\" issue in CN subcultures."
        },
        {
            icon: <GitBranch size={24} className="text-purple-400" />,
            title: "RAG vs Fine-tuning",
            desc: "Benchmarking against fine-tuned models (e.g., Qwen-2.5-7B). Exploring the efficiency/boundary between Retrieval and Training in evolving domains."
        },
        {
            icon: <FlaskConical size={24} className="text-green-400" />,
            title: "Synthetic Subculture Construction",
            desc: "Testing generalization on self-constructed/emerging concepts beyond Jirai Kei to verify rapid adaptation capabilities."
        },
        {
            icon: <Microscope size={24} className="text-yellow-400" />,
            title: "Failure Case Study",
            desc: "Deep dive into failure cases to identify root causes of residual alignment errors."
        }
    ];

    return (
        <div className="w-full h-full flex flex-col justify-center max-w-6xl mx-auto pl-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <h2 className="text-4xl font-light text-white mb-2">Future Work</h2>
                <p className="text-academic-gray text-lg">Research Roadmap & Upcoming Experiments</p>
            </motion.div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Decorative connecting line */}
                <div className="absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-white/10 via-jirai-pink/30 to-white/10 hidden md:block transform -translate-x-1/2" />

                {plans.map((plan, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className={`
              relative p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group
              ${i === 4 ? 'md:col-span-2 md:w-2/3 md:mx-auto' : ''} 
            `}
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-black/40 border border-white/10 shrink-0 group-hover:scale-110 transition-transform duration-300">
                                {plan.icon}
                            </div>
                            <div>
                                <h3 className="text-white font-medium text-lg mb-2 group-hover:text-jirai-pink transition-colors">
                                    {plan.title}
                                </h3>
                                <p className="text-academic-gray text-sm leading-relaxed">
                                    {plan.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
