import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ExternalLink, ArrowRight } from 'lucide-react';

export const ReferenceSlide: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const references = [
        {
            authors: "Sandhini Agarwal, Lama Ahmad, Jason Ai, et al.",
            year: "2025",
            title: "gpt-oss-120b & gpt-oss-20b model card",
            source: "arXiv:2508.10925",
            link: "https://arxiv.org/abs/2508.10925"
        },
        {
            authors: "Matteo Cinelli, Gianmarco De Francisci Morales, Alessandro Galeazzi, et al.",
            year: "2021",
            title: "The echo chamber effect on social media",
            source: "PNAS 118(9):e2023301118",
            link: "https://www.pnas.org/doi/10.1073/pnas.2023301118"
        },
        {
            authors: "DeepSeek-AI, Aixin Liu, Aoxue Mei, et al.",
            year: "2025",
            title: "Deepseek-v3.2: Pushing the frontier of open large language models",
            source: "arXiv preprint",
            link: "https://arxiv.org/abs/2501.00000"
        },
        {
            authors: "Robert W Firestone and Richard H Seiden",
            year: "1990",
            title: "Suicide and the continuum of self-destructive behavior",
            source: "Journal of American College Health, 38(5):207–213",
            link: "https://www.tandfonline.com/doi/abs/10.1080/07448481.1990.9936200"
        },
        {
            authors: "Aaron Grattafiori, Abhimanyu Dubey, Abhinav Jauhri, et al.",
            year: "2024",
            title: "The llama 3 herd of models",
            source: "arXiv:2407.21783",
            link: "https://arxiv.org/abs/2407.21783"
        },
        {
            authors: "Mengkang Hu, Yuhang Zhou, Wendong Fan, et al.",
            year: "2025",
            title: "Owl: Optimized workforce learning for general multi-agent assistance in real-world task automation",
            source: "arXiv:2505.23885",
            link: "https://arxiv.org/abs/2505.23885"
        },
        {
            authors: "Shaoxiong Ji, Tianlin Zhang, Luna Ansari, et al.",
            year: "2022",
            title: "Mental-BERT: Publicly available pretrained language models for mental healthcare",
            source: "LREC 2022, pp. 7184–7190",
            link: "https://aclanthology.org/2022.lrec-1.778/"
        },
        {
            authors: "Takeshi Kojima, Shixiang Shane Gu, Machel Reid, et al.",
            year: "2022",
            title: "Large language models are zero-shot reasoners",
            source: "NeurIPS 35:22199–22213",
            link: "https://proceedings.neurips.cc/paper_files/paper/2022/hash/8bb0d291acd4acf06ef11774501940d9-Abstract-Conference.html"
        },
        {
            authors: "Aman Madaan, Niket Tandon, Prakhar Gupta, et al.",
            year: "2023",
            title: "Self-refine: Iterative refinement with self-feedback",
            source: "NeurIPS 36:46534–46594",
            link: "https://arxiv.org/abs/2303.17651"
        },
        {
            authors: "Augusto R. Mendes and Helena Caseli",
            year: "2024",
            title: "Identifying fine-grained depression signs in social media posts",
            source: "LREC-COLING 2024, pp. 8594–8604",
            link: "https://aclanthology.org/2024.lrec-main.753/"
        },
        {
            authors: "Humza Naveed, Asad Ullah Khan, Shi Qiu, et al.",
            year: "2025",
            title: "A comprehensive overview of large language models",
            source: "ACM TIST 16(5):1–72",
            link: "https://dl.acm.org/doi/10.1145/3618105"
        },
        {
            authors: "Carolyn M Rutledge, Don Rimer, and Micah Scott",
            year: "2008",
            title: "Vulnerable goth teens: The role of schools in this psychosocial high-risk culture",
            source: "Journal of School Health, 78(9):459–464",
            link: "https://pubmed.ncbi.nlm.nih.gov/18786041/"
        },
        {
            authors: "Elizabeth C Stade, Shannon Wiltsey Stirman, Lyle H Ungar, et al.",
            year: "2024",
            title: "Large language models could change the future of behavioral healthcare",
            source: "NPJ Mental Health Research, 3(1):12",
            link: "https://www.nature.com/articles/s44184-024-00056-2"
        },
        {
            authors: "Gemma Team, Aishwarya Kamath, Johan Ferret, et al.",
            year: "2025",
            title: "Gemma 3 technical report",
            source: "arXiv:2503.19786",
            link: "https://arxiv.org/abs/2503.19786"
        },
        {
            authors: "Lei Wang, Wanyu Xu, Yihuai Lan, et al.",
            year: "2023",
            title: "Plan-and-solve prompting: Improving zero-shot chain-of-thought reasoning by large language models",
            source: "ACL 2023, pp. 2609–2634",
            link: "https://aclanthology.org/2023.acl-long.147/"
        },
        {
            authors: "Peng Wang, Wenpeng Lu, Chunlin Lu, et al.",
            year: "2025a",
            title: "Large language model for medical images: A survey",
            source: "Big Data Mining and Analytics",
            link: "https://ieeexplore.ieee.org/document/10834241"
        },
        {
            authors: "Peng Wang, Yongheng Zhang, Hao Fei, et al.",
            year: "2025b",
            title: "S3 agent: Unlocking the power of vllm for zero-shot multi-modal sarcasm detection",
            source: "ACM Trans. Multimedia Comput.",
            link: "https://dl.acm.org/doi/abs/10.1145/3702998"
        },
        {
            authors: "Yunze Xiao, Tingyu He, Lionel Z Wang, et al.",
            year: "2025",
            title: "Jiraibench: A bilingual benchmark for evaluating large language models' detection of human self-destructive behavior content in jirai community",
            source: "arXiv:2503.21679",
            link: "https://arxiv.org/abs/2503.21679"
        },
        {
            authors: "An Yang, Anfeng Li, Baosong Yang, et al.",
            year: "2025",
            title: "Qwen3 technical report",
            source: "arXiv:2505.09388",
            link: "https://arxiv.org/abs/2505.09388"
        },
        {
            authors: "Wayne Xin Zhao, Kun Zhou, Junyi Li, et al.",
            year: "2023",
            title: "A survey of large language models",
            source: "arXiv:2303.18223",
            link: "https://arxiv.org/abs/2303.18223"
        }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col pt-32 pb-20 font-mono">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4"
            >
                <Terminal size={20} className="text-jirai-pink animate-pulse" />
                <span className="text-academic-gray text-sm uppercase tracking-widest">// SYSTEM_LOG.BIBLIOGRAPHY</span>
            </motion.div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                <div className="flex flex-col gap-1 pb-20">
                    {references.map((ref, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 + 0.2 }}
                        >
                            <a
                                href={ref.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block relative pl-4 hover:pl-6 transition-all duration-300"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Hover Background Line */}
                                <div className={`absolute inset-0 bg-white/5 -z-10 rounded transition-opacity duration-200 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />

                                {/* Pink Line Indicator */}
                                <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-jirai-pink transition-all duration-200 ${hoveredIndex === index ? 'opacity-100 h-full' : 'opacity-0 h-0'}`} />

                                <div className="py-3 flex items-baseline gap-4">
                                    <span className={`font-mono text-xs w-12 flex-shrink-0 transition-colors ${hoveredIndex === index ? 'text-jirai-pink' : 'text-academic-gray/50'}`}>
                                        [{String(index + 1).padStart(2, '0')}]
                                    </span>

                                    <div className="flex-1">
                                        <h3 className={`font-medium text-sm leading-relaxed transition-colors ${hoveredIndex === index ? 'text-jirai-pink text-shadow-glow' : 'text-gray-300'}`}>
                                            {ref.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1 text-xs text-academic-gray/60 font-light">
                                            <span className="truncate max-w-md">{ref.authors}</span>
                                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                                            <span className="text-white/40">{ref.source}</span>
                                            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-jirai-pink flex items-center gap-1">
                                                OPEN_LINK <ArrowRight size={10} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        .text-shadow-glow {
            text-shadow: 0 0 10px rgba(255, 77, 128, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FF4D80;
        }
      `}</style>
        </div>
    );
};
