# SAS: Subcultural Alignment Solver

> **Can Large Language Models Keep Up with Self-Destructive Subcultures?**
> *A case study on "Jirai Kei" (Landmine Type) and the limitations of static alignment in evolving digital environments.*

## 📖 Overview

**SAS (Subcultural Alignment Solver)** is a proposed multi-agent framework designed to bridge the semantic gap between general-purpose LLMs and high-risk, rapidly evolving online subcultures. 

This repository hosts the **Interactive Web Presentation** for the SAS research paper (ACL 2025 Submission). It demonstrates the "Jirai Kei" case study, visualizes the alignment failures of current baselines (CoT, Self-Refine, etc.), and showcases the SAS retrieval-augmented methodology.

**Live Demo**: [github.com/gaivrt/SAS_Demo_Web](https://github.com/gaivrt/SAS_Demo_Web)

## ✨ Key Features

- **Interactive Presentation Deck**: A seamless, single-page application (SPA) acting as a research slide deck.
- **Dynamic Simulations**:
  - **Gap Analysis**: Visualizing how standard agents fail on slang like "Angel" (OD) or "Ticket" (Self-harm).
  - **SAS Pipeline**: Step-by-step visualization of the Retrieval -> Report -> Solver flow.
- **Academic Visualization**:
  - High-density result tables with performant rendering.
  - Interactive charts comparing SAS against SOTA baselines (S3, OWL, etc.).
- **Immersive Aesthetic**:
  - "Jirai Kei" themed design (Dark mode, Neon Pink, Glitch effects).
  - Atmospheric 3D/Anime backgrounds.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: TypeScript

## 🚀 Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/gaivrt/SAS_Demo_Web.git
   cd SAS_Demo_Web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

## 📊 Slides Structure

1. **Introduction**: Research question & Context.
2. **Problem**: Semantic Drift in subcultures.
3. **Background**: Why existing baselines (CoT, RAG, Agents) fail.
4. **Methodology**: The SAS Framework (Subculture Retrieval -> Alignment Report).
5. **Evaluation**: Results on `JiraiBench` (F1 Scores & Safety Rates).
6. **Future Work**: Roadmap (Log Analysis, Cross-lingual, Synthetic Subcultures).
7. **Conclusion**: Summary & Resources.

## 📄 License

MIT License.
