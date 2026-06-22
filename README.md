# Apexto Mining Tech — ASIC Miner E-Commerce & Hosting Console

A high-performance, premium e-commerce platform built with React, TypeScript, and Vite for viewing and comparing profitable cryptocurrency ASIC miners, calculating real-time daily net yields based on custom electricity rates, configuring hydro liquid cooling cabinet hosting slots, and verifying official employee contact coordinates to prevent impersonation fraud.

---

## 🚀 Key Features

* **ASIC Miner Catalog**: Real-time mock inventory featuring 25 highly profitable miner specifications from Bitmain, Whatsminer, Goldshell, Jasminer, and Canaan.
* **Dynamic Profit Yield Calculator**: Automatically calculates gross daily yield and net profit margin based on hashrates, power draw, custom electricity rates (adjustable from `$0.00` to `$0.30` per kWh), and live network difficulty.
* **Hosting Slot Configurator**: Liquid/Hydro cooled cabinet loops calculator supporting deionized water CDU rigs, dry coolers, and standard air container space rentals.
* **Staff Contact Verifier**: Cryptographic and handle search check console to protect client transactions from Telegram/WhatsApp impersonator scams.
* **Operations Admin Dashboard**: In-browser control panel to add, edit, or delete catalog items, update prices, and register official staff handles.
* **Web3 Checkout Terminal**: Consolidated payment routing supporting multi-chain crypto checkout (USDT ERC20/TRC20, BTC, LTC, DOGE, KAS) and global bank wire details.
* **Fully Responsive UI**: High-end glassmorphism styling utilizing custom CSS variables, dark tech design language, and subtle micro-animations.

---

## 🛠️ Local Development

### Prerequisites
* **Node.js**: `v18.x` or higher
* **npm**: `v9.x` or higher

### Installation & Startup
1. Clone the repository and navigate to the directory:
   ```bash
   git clone <your-repository-url>
   cd blockchian_coin_market
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/blockchian_coin_market/` in your browser.

---

## 🚀 GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages under the path `/blockchian_coin_market/` using GitHub Actions.

### Automated Deployment (Recommended)
1. Push your changes to the default branch (`main` or `master`).
2. The included GitHub Actions workflow inside `.github/workflows/deploy.yml` will automatically build the production files and push them to the `gh-pages` branch.
3. In your GitHub repository settings, go to **Settings > Pages** and ensure the source is set to build from the `gh-pages` branch.

### Manual Local Build
To manually build the compiled assets for static hosting:
```bash
npm run build
```
The compiled files will be generated in the `dist/` directory, ready to be served statically.
