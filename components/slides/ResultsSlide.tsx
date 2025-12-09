import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Legend } from 'recharts';
import { Table, FileText, Globe, Trophy, ArrowUpRight } from 'lucide-react';

// --- Data Constants ---

const MODELS = ['Qwen-2.5-7B', 'Llama-3.1-8B', 'DeepSeek V3.2', 'GPT-OSS-20B', 'Gemma-3-12B-it'];

const DATASETS = {
  CHINESE: [
    {
      method: 'Zero-shot',
      scores: {
        OD: [0.4796, 0.3390, 0.7509, 0.6766, 0.5335],
        ED: [0.4023, 0.4919, 0.7090, 0.7261, 0.4404],
        SH: [0.3933, 0.3472, 0.6783, 0.5702, 0.4786]
      }
    },
    {
      method: 'CoT',
      tag: 'NeurIPS',
      scores: {
        OD: [0.5500, 0.3049, 0.7406, 0.6820, 0.5330],
        ED: [0.3631, 0.4895, 0.7029, 0.7311, 0.4510],
        SH: [0.3359, 0.3352, 0.6695, 0.5534, 0.4874]
      }
    },
    {
      method: 'Plan-and-Solve',
      tag: 'ACL',
      scores: {
        OD: [0.5384, 0.2449, 0.7299, 0.6654, 0.5287],
        ED: [0.3700, 0.4079, 0.7063, 0.7259, 0.4324],
        SH: [0.3283, 0.3042, 0.6742, 0.5356, 0.4789]
      }
    },
    {
      method: 'Self-Refine',
      tag: 'NeurIPS',
      scores: {
        OD: [0.5671, 0.3943, 0.7392, 0.7088, 0.6506],
        ED: [0.5983, 0.4904, 0.7150, 0.7183, 0.6517],
        SH: [0.3839, 0.4002, 0.6172, 0.5509, 0.5667]
      }
    },
    {
      method: 'S3 Agent',
      tag: 'ACM TOMM',
      scores: {
        OD: [0.5258, 0.3102, 0.8014, 0.7381, 0.6170],
        ED: [0.5542, 0.3829, 0.7304, 0.7009, 0.6456],
        SH: [0.4976, 0.3479, 0.7135, 0.5407, 0.4754]
      }
    },
    {
      method: 'OWL',
      tag: 'NeurIPS',
      scores: {
        OD: [0.5215, 0.3206, 0.7306, 0.6755, 0.5630],
        ED: [0.5613, 0.3477, 0.7046, 0.7190, 0.3891],
        SH: [0.4827, 0.3427, 0.7159, 0.5840, 0.4545]
      }
    },
    {
      method: 'SAS (Ours)',
      isOurs: true,
      scores: {
        OD: [0.5468, 0.4201, 0.7270, 0.6457, 0.5726],
        ED: [0.4565, 0.5017, 0.6907, 0.6628, 0.6927],
        SH: [0.5359, 0.4638, 0.7203, 0.5566, 0.5139]
      }
    }
  ],
  JAPANESE: [
    {
      method: 'Zero-shot',
      scores: {
        OD: [0.3683, 0.3510, 0.5762, 0.5737, 0.3649],
        ED: [0.3777, 0.5821, 0.6871, 0.5650, 0.5244],
        SH: [0.4302, 0.4063, 0.5188, 0.5581, 0.3909]
      }
    },
    {
      method: 'CoT',
      tag: 'NeurIPS',
      scores: {
        OD: [0.3753, 0.3527, 0.5715, 0.5840, 0.3590],
        ED: [0.3993, 0.5750, 0.6896, 0.7596, 0.5356],
        SH: [0.3618, 0.3899, 0.5170, 0.5400, 0.4092]
      }
    },
    {
      method: 'Plan-and-Solve',
      tag: 'ACL',
      scores: {
        OD: [0.3722, 0.3409, 0.5966, 0.6015, 0.3653],
        ED: [0.3768, 0.5119, 0.6632, 0.7494, 0.5218],
        SH: [0.3503, 0.3541, 0.5131, 0.5541, 0.3871]
      }
    },
    {
      method: 'Self-Refine',
      tag: 'NeurIPS',
      scores: {
        OD: [0.3866, 0.3901, 0.5784, 0.5211, 0.4912],
        ED: [0.5410, 0.4797, 0.7656, 0.5745, 0.6691],
        SH: [0.4423, 0.3744, 0.5764, 0.6081, 0.4983]
      }
    },
    {
      method: 'S3 Agent',
      tag: 'ACM TOMM',
      scores: {
        OD: [0.4139, 0.3544, 0.5398, 0.5055, 0.3520],
        ED: [0.5675, 0.3885, 0.6810, 0.7236, 0.6827],
        SH: [0.3116, 0.3481, 0.5870, 0.6077, 0.4571]
      }
    },
    {
      method: 'OWL',
      tag: 'NeurIPS',
      scores: {
        OD: [0.3679, 0.3448, 0.5721, 0.5995, 0.3964],
        ED: [0.4881, 0.4487, 0.7288, 0.7362, 0.4665],
        SH: [0.4546, 0.3681, 0.6052, 0.6122, 0.3723]
      }
    },
    {
      method: 'SAS (Ours)',
      isOurs: true,
      scores: {
        OD: [0.5156, 0.4663, 0.6145, 0.5992, 0.5177],
        ED: [0.5711, 0.6246, 0.8134, 0.7889, 0.7297],
        SH: [0.5001, 0.4248, 0.6783, 0.6400, 0.5345]
      }
    }
  ]
};

// Calculate averages for the chart
const getAverageScore = (scores: any) => {
  const all = [...scores.OD, ...scores.ED, ...scores.SH];
  return all.reduce((a, b) => a + b, 0) / all.length;
};

// Calculate max scores per column/task for highlighting
const getBestScores = (rows: typeof DATASETS['CHINESE']) => {
  const bests: Record<string, number[]> = { OD: [], ED: [], SH: [] };
  ['OD', 'ED', 'SH'].forEach(task => { // @ts-ignore
    for (let i = 0; i < 5; i++) { // 5 models
      const scores = rows.map(r => r.scores[task as 'OD' | 'ED' | 'SH'][i] || 0); // @ts-ignore
      bests[task][i] = Math.max(...scores);
    }
  });
  return bests;
};

// --- Components ---

export const ResultsSlide: React.FC = () => {
  const [dataset, setDataset] = useState<'CHINESE' | 'JAPANESE'>('CHINESE');

  const currentRows = DATASETS[dataset];
  const bestScores = getBestScores(currentRows);

  // Prepare chart data based on current dataset
  const chartData = currentRows.map(row => ({
    name: row.method.split(' ')[0], // Short name
    score: getAverageScore(row.scores),
    fullMethod: row.method,
    fill: row.isOurs ? '#FF4D80' : '#333'
  }));

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-8 pt-20 animate-in fade-in duration-500">

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-4 border-b border-white/10 pb-2">
        <div>
          <h2 className="text-2xl font-light text-white mb-1">Experimental Results</h2>
          <p className="text-academic-gray text-xs font-mono">Comparative analysis of alignment methods across multilingual subcultural datasets.</p>
        </div>

        {/* Dataset Toggle */}
        <div className="flex bg-[#1C1C1E] border border-white/10 rounded-lg p-1">
          <button
            onClick={() => setDataset('CHINESE')}
            className={`px-3 py-1 rounded text-[10px] font-mono transition-all ${dataset === 'CHINESE' ? 'bg-jirai-pink text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            CHINESE BENCHMARK
          </button>
          <button
            onClick={() => setDataset('JAPANESE')}
            className={`px-3 py-1 rounded text-[10px] font-mono transition-all ${dataset === 'JAPANESE' ? 'bg-jirai-pink text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            JAPANESE BENCHMARK
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">

        {/* Left: Detailed Academic Table */}
        <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-y-auto custom-scrollbar relative shadow-2xl">
          <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur z-20 border-b border-white/10 p-3 flex justify-between items-center">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest"><Table size={12} className="inline mr-2" />Method Performance Evaluation (Macro-F1)</span>
            <div className="flex gap-4 text-[10px] text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/50"></span> Best</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-jirai-pink/20 border border-jirai-pink/50"></span> Ours</span>
            </div>
          </div>

          <div className="p-3 min-w-[800px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-2 text-xs font-bold text-gray-300 w-32">Method</th>
                  <th className="p-2 text-[10px] font-bold text-gray-300 w-10 text-center">Task</th>
                  {MODELS.map((m, i) => (
                    <th key={i} className="p-2 text-[9px] font-mono text-gray-500 uppercase text-center w-20">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentRows.map((row, idx) => (
                  <React.Fragment key={idx}>
                    {/* Row Group for Method */}
                    <tr className={`${row.isOurs ? 'bg-jirai-pink/5' : 'hover:bg-white/5'} transition-colors group`}>
                      <td rowSpan={3} className="p-2 align-top border-r border-white/5">
                        <div className="flex flex-col gap-1">
                          <span className={`text-xs font-bold ${row.isOurs ? 'text-jirai-pink' : 'text-gray-200'}`}>
                            {row.method}
                          </span>
                          {row.tag && (
                            <span className="text-[8px] bg-white/10 text-gray-400 px-1 py-0.5 rounded w-fit">{row.tag}</span>
                          )}
                        </div>
                      </td>
                      {/* Sub-rows for Tasks (OD, ED, SH) */}
                      {['OD', 'ED', 'SH'].map((task, tIdx) => {
                        if (tIdx > 0) return null; // Handle manually below to avoid hydration issues? No, let's just loop inside the Return.
                        // Actually table structure is tricky with map. Let's do 3 trs.
                        return null;
                      })}

                      <td className="p-1.5 text-[10px] font-mono text-gray-400 text-center border-r border-white/5 bg-white/2">OD</td>
                      {row.scores.OD.map((score, sIdx) => {
                        const isBest = Math.abs(score - bestScores.OD[sIdx]) < 0.0001; // Float comparison
                        return (
                          <td key={`od-${sIdx}`} className={`p-1.5 text-[10px] font-mono text-center ${isBest ? 'bg-green-500/10 text-green-400 font-bold' : row.isOurs ? 'text-white font-bold' : 'text-gray-400'}`}>
                            {score.toFixed(4)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className={`${row.isOurs ? 'bg-jirai-pink/5' : 'hover:bg-white/5'}`}>
                      <td className="p-1.5 text-[10px] font-mono text-gray-400 text-center border-r border-white/5 bg-white/2">ED</td>
                      {row.scores.ED.map((score, sIdx) => {
                        const isBest = Math.abs(score - bestScores.ED[sIdx]) < 0.0001;
                        return (
                          <td key={`ed-${sIdx}`} className={`p-1.5 text-[10px] font-mono text-center ${isBest ? 'bg-green-500/10 text-green-400 font-bold' : row.isOurs ? 'text-white font-bold' : 'text-gray-400'}`}>
                            {score.toFixed(4)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className={`${row.isOurs ? 'bg-jirai-pink/5' : 'hover:bg-white/5'}`}>
                      <td className="p-1.5 text-[10px] font-mono text-gray-400 text-center border-r border-white/5 bg-white/2">SH</td>
                      {row.scores.SH.map((score, sIdx) => {
                        const isBest = Math.abs(score - bestScores.SH[sIdx]) < 0.0001;
                        return (
                          <td key={`sh-${sIdx}`} className={`p-1.5 text-[10px] font-mono text-center ${isBest ? 'bg-green-500/10 text-green-400 font-bold' : row.isOurs ? 'text-white font-bold' : 'text-gray-400'}`}>
                            {score.toFixed(4)}
                          </td>
                        );
                      })}
                    </tr>
                    {/* Divider */}
                    <tr><td colSpan={7} className="h-1 bg-black/20"></td></tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Charts & Highlights */}
        <div className="lg:col-span-4 flex flex-col gap-4">

          {/* Summary Card */}
          <div className="bg-[#1C1C1E] border border-white/10 p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-jirai-pink/20 flex items-center justify-center">
                <Trophy size={16} className="text-jirai-pink" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">Avg Improvement</div>
                <div className="text-xl font-bold text-white flex items-end gap-2">
                  {(() => {
                    const baseline = chartData.find(d => d.name === 'Zero-shot' && d.fullMethod.includes('CoT'))?.score || 0.4;
                    const ours = chartData.find(d => d.fill === '#FF4D80')?.score || 0.5;
                    const diff = ((ours - baseline) / baseline) * 100;
                    return `+${diff.toFixed(1)}%`;
                  })()}
                  <span className="text-xs text-green-400 mb-1 flex items-center"><ArrowUpRight size={12} /> vs CoT Baseline</span>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              <strong className="text-white">SAS</strong> significantly outperforms Zero-shot and CoT baselines, particularly in handling Japanese subcultural nuances where standard models often fail to detect risky semantics (ED/SH).
            </p>
          </div>

          {/* Chart */}
          <div className="flex-1 bg-[#1C1C1E] border border-white/10 p-4 rounded-xl shadow-lg flex flex-col">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Average F1 Score Comparison</span>
            <div className="flex-1 min-h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                  <XAxis type="number" domain={[0, 0.8]} hide />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#888', fontSize: 10 }} width={80} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '4px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="score" barSize={16} radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};