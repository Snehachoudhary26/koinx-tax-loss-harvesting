<div align="center">

# 🪙 KoinX — Tax Loss Harvesting

### Turn unrealized crypto losses into real tax savings — visualized in real time.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-6C5CE7?style=for-the-badge)](https://koinx-tax-loss-harvesting.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/📦_Source-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Snehachoudhary26/koinx-tax-loss-harvesting)
[![Figma](https://img.shields.io/badge/🎨_Design-Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/3YqHlvx1X59Nb3iP97BGkG/KoinX-Frontend-Intern-Assigment?node-id=0-1)

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

*Built for the KoinX Frontend Internship Assignment*

</div>

<br>

## 📌 Overview

**Tax Loss Harvesting** lets an investor sell crypto assets sitting at an unrealized loss to offset gains from profitable trades — legally reducing the total tax bill.

This app simulates that decision in real time: select assets from your holdings, watch your **STCG/LTCG** recalculate instantly, and see exactly how much tax you'd save — before you make a single trade.

<br>

<div align="center">

```
┌─────────────────────────────────┐        ┌─────────────────────────────────┐
│      💰 BEFORE HARVESTING        │        │       ✅ AFTER HARVESTING      │
│                                  │        │                               │
│   Net STCG          −₹400        │  ───▶  │   Net STCG          +₹100      │
│   Net LTCG          +₹1,100      │ Select │   Net LTCG          +₹100      │
│   Realised Gains      ₹700       │ Assets │   Realised Gains      ₹200     │
└─────────────────────────────────┘        └─────────────────────────────────┘

                        🎉  YOU'RE GOING TO SAVE ₹500
```

</div>

<br>

## ✨ Features

<table>
<tr>
<td width="50%">

### 📊 Live Tax Cards
Dark **Pre-Harvest** card + vibrant **Post-Harvest** card with a real-time "You're going to save ₹X" banner.

### 🗂️ Smart Holdings Table
Checkbox selection, master "Select All", auto-filled sell amounts, and a fully responsive mobile card view.

### 🔍 Search & Filter
Instant search by coin/symbol, plus filters for **All / Loss-making / Profitable** assets.

</td>
<td width="50%">

### ⚡ One-Click Optimizer
**"Select All Losses"** instantly picks the optimal harvesting set to maximize savings.

### 🔃 Multi-Column Sorting
Sort by coin, holdings, price, STCG, or LTCG — asc/desc, one click.

### 🪄 Polished Async UX
Shimmer skeletons, simulated latency, error states, and an execution summary modal.

</td>
</tr>
</table>

<br>

## 🧮 The Math

<details>
<summary><b>Click to expand formulas & worked example</b></summary>

<br>

**Step 1 — Baseline (Capital Gains API)**

```
Net STCG               = STCG Profits − STCG Losses
Net LTCG                = LTCG Profits − LTCG Losses
Realised Capital Gains  = Net STCG + Net LTCG
```

```
Net STCG               = 100 − 500   = −₹400
Net LTCG                = 1200 − 100  = +₹1,100
Realised Capital Gains  = −400 + 1100 = ₹700
```

**Step 2 — Live simulation on selection**

| Condition | Action |
|---|---|
| STCG Gain > 0 | Add to `STCG Profits` |
| STCG Gain < 0 | Add `\|STCG Gain\|` to `STCG Losses` |
| LTCG Gain > 0 | Add to `LTCG Profits` |
| LTCG Gain < 0 | Add `\|LTCG Gain\|` to `LTCG Losses` |

**Example — selecting ETH** (STCG +₹500, LTCG −₹1,000)

```
New STCG Profits = 100 + 500  = 600         New LTCG Losses = 100 + 1000 = 1,100
New Net STCG     = 600 − 500  = +₹100       New Net LTCG    = 1200 − 1100 = +₹100
New Realised Gains = 100 + 100 = ₹200

💸 Savings = ₹700 − ₹200 = ₹500 → "You're going to save ₹500"
```

</details>

<br>

## 🛠️ Tech Stack

<div align="center">

| Layer | Tech |
|---|---|
| **Core** | React 18 · TypeScript |
| **Build** | Vite 6 |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Deploy** | Vercel |

</div>

<br>

## 📁 Project Structure

```
koinx-tax-loss-harvesting/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Top navigation & refresh trigger
│   │   ├── TaxLossCards.tsx        # Pre & Post harvesting metric cards
│   │   ├── HoldingsTable.tsx       # Desktop table — sort, search, filter
│   │   ├── HoldingsMobileCard.tsx  # Touch-friendly mobile layout
│   │   ├── HarvestModal.tsx        # Optimization summary dialog
│   │   └── SkeletonLoader.tsx      # Loading skeleton screens
│   ├── services/
│   │   └── mockApi.ts              # Mock Capital Gains & Holdings endpoints
│   ├── types/
│   │   └── tax.ts                  # TypeScript interfaces & schemas
│   ├── utils/
│   │   ├── formatters.ts           # INR currency & crypto formatting
│   │   └── taxMath.ts              # Pure financial calculation functions
│   ├── App.tsx                     # Main state orchestrator
│   ├── main.tsx                    # React root entry
│   └── index.css                   # Global Tailwind styles
├── tailwind.config.js
├── vite.config.ts
├── vercel.json
├── package.json
└── README.md
```

<br>

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/Snehachoudhary26/koinx-tax-loss-harvesting.git
cd koinx-tax-loss-harvesting

# 2. Install
npm install

# 3. Run
npm run dev
```

Then open **http://localhost:5173** 🎉

<details>
<summary><b>Build for production</b></summary>

```bash
npm run build
npm run preview
```

</details>

<br>

## 🗺️ Roadmap

- [x] Core harvesting simulation engine
- [x] Sortable / filterable holdings table
- [x] Mobile-responsive layout
- [ ] Wallet-connect for live portfolio import
- [ ] Multi-currency support (USD/EUR)
- [ ] Export harvest report as PDF

<br>

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

```bash
git checkout -b feature/your-feature
git commit -m "Add: your feature"
git push origin feature/your-feature
```

Then open a Pull Request 🚀

<br>

<div align="center">

### 💬 Feedback or questions?

Open an [issue](https://github.com/Snehachoudhary26/koinx-tax-loss-harvesting/issues) — happy to help!

<br>

**Made with ❤️ and a lot of ☕ for the KoinX Frontend Internship**

⭐ *Star this repo if you found it useful!*

</div>
