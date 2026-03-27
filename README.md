<div align="center">

<img src="assets/images/logo.svg" alt="Alpha Quant Academy" width="120" />

# Alpha Quant Academy

### Quant finance curriculum, datasets, projects, and AI-assisted analysis in one open repository

[![Binder](https://img.shields.io/badge/Launch-JupyterLab-F37626?style=for-the-badge&logo=jupyter)](http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![Jupyter](https://img.shields.io/badge/JupyterLab-4-orange?style=for-the-badge&logo=jupyter)](https://jupyter.org/)
[![React + Vite](https://img.shields.io/badge/React_%2B_Vite-2025-blue?style=for-the-badge&logo=react)](https://vitejs.dev/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)](LICENSE)

[Features](#-features) • [Stack](#-stack) • [Quick Start](#-quick-start) • [Structure](#-project-structure) • [Scripts](#-scripts) • [License](#-license) • [Contact](#-contact)

</div>

---

## Table of Contents

- [About](#-about)
- [Features](#-features)
- [Stack](#-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [License](#-license)
- [Contact](#-contact)

## About

Alpha Quant Academy is a hands-on learning repo for Python, statistics, and quantitative finance. It combines notebook-based curriculum tracks, reusable datasets, practical projects, and a React + Vite web experience so learners can move from fundamentals to applied market analysis without leaving the repository.

## Features

- Guided curriculum tracks for Python, data analysis, visualization, finance, and machine learning
- Sample datasets for stock prices, options chains, portfolios, and economic indicators
- Beginner, intermediate, and advanced projects, including an AI stock analyst toolkit
- Binder support for launching the curriculum in the browser
- A separate webapp with an interactive landing page and AI assistant
- Reproducible workflows for notebooks, sample data generation, and visual outputs

## Stack

| Area | Technologies |
| --- | --- |
| Core | Python 3.12+, JupyterLab, NumPy, pandas, SciPy |
| Visualization | Matplotlib, Plotly, Altair, mplfinance, Seaborn |
| ML & Finance | scikit-learn, XGBoost, yfinance, Backtrader, QuantLib |
| Web | React, Vite, Tailwind CSS, Framer Motion, Zustand |
| Tooling | pytest, MkDocs, Binder, GitHub Actions |

## Quick Start

### Cloud

Launch the hosted notebook environment with Binder:

[![Binder](https://mybinder.org/badge_logo.svg)](http://mybinder.org/v2/gh/mangeshraut712/alpha-quant-academy/main?urlpath=lab)

### Local

```bash
git clone https://github.com/mangeshraut712/alpha-quant-academy.git
cd alpha-quant-academy
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
jupyter lab
```

### Web app

```bash
cd webapp
npm install
npm run dev
```

Open the notebook environment in JupyterLab, or browse the web app at the Vite dev server.

## Project Structure

```text
alpha-quant-academy/
├── curriculum/     # Notebook tracks and lesson paths
├── projects/       # Beginner, intermediate, and advanced projects
├── exercises/      # Practice material and solutions
├── data/           # Sample CSV datasets
├── webapp/         # React + Vite UI
├── assets/         # Logos and reference images
├── docs/           # Status reports and summaries
├── binder/         # Binder runtime and post-build hooks
└── requirements.txt
```

## Scripts

Common local commands:

```bash
python scripts/generate_sample_data.py
jupyter lab
python projects/advanced/ai_stock_analyst/ai_analyst.py --feature 1 --stock AAPL
python projects/advanced/ai_stock_analyst/enhanced_engine.py
```

Web app commands:

```bash
cd webapp
npm run dev
npm run build
npm run preview
npm run lint
```

## License

Apache 2.0. See [LICENSE](LICENSE) for the full text.

## Contact

- Repository: [mangeshraut712/alpha-quant-academy](https://github.com/mangeshraut712/alpha-quant-academy)
- Issues: open a GitHub issue in this repository
