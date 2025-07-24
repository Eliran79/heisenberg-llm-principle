# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains research materials and visualizations exploring the "Uncertainty Principle of Large Language Models" - fundamental trade-offs in AI systems analogous to Heisenberg's Uncertainty Principle in quantum mechanics.

## Project Structure

- `uncertainty_principle_llms.md` - Main theoretical document explaining the four core uncertainty trade-offs in LLMs
- `llm_uncertainty_tradeoffs.md` - Comprehensive analysis with numerical scores and optimized prompts for 30+ use cases
- `llm_uncertainty_radar.tsx` - React component creating interactive radar chart visualizations of uncertainty trade-offs
- `Screenshot From 2025-07-24 11-46-26.png` - Visual example of the radar chart output

## Key Concepts

The project explores four fundamental uncertainty relationships in LLMs:

1. **Precision vs. Creativity Trade-off** - More precise models are less creative, and vice versa
2. **Memorization vs. Generalization** - Models that memorize training data well generalize poorly to new situations
3. **Context Breadth vs. Attention Depth** - Broader context means less focused attention on specific details
4. **Confidence vs. Calibration** - High confidence often correlates with poor uncertainty quantification

## Architecture Notes

### React Component (`llm_uncertainty_radar.tsx`)
- Uses Recharts library for radar chart visualization
- Implements responsive design with 3x3 grid layout
- Contains hardcoded data for 9 use cases with 4-dimensional trade-off scores
- Styled with Tailwind CSS using dark theme with gradient backgrounds
- Each use case has color-coded visualization and descriptive insights

### Data Structure
The visualization component uses a structured format where each use case contains:
- Numerical scores (1-10) for each of the four trade-off dimensions
- Color coding for visual distinction
- Short names and descriptions for UI display
- Interactive hover effects and detailed breakdowns

## Development Notes

This appears to be a research/documentation project rather than a traditional software application. There are no package.json, build scripts, or test frameworks present. The React component is standalone and would need to be integrated into a larger application to be functional.

## Content Focus

The project emphasizes theoretical AI research with practical applications across domains like:
- Safety-critical systems (medical, legal, mathematical proofs)
- Creative applications (poetry, writing, game dialogue)
- Research and analysis tasks (literature review, academic assistance)
- Decision-support applications (investment advice, fraud detection)

The work suggests these trade-offs are fundamental information-theoretic limits rather than engineering problems to be solved.