# 🍃 TruEphirE

**Get reliable crypto prices on Oasis Sapphire. Trust your data.**

**TruEphirE** uses Oasis ROFL to provide that data pulled from other sources, such as Chainlink data feeds and Flare, onto Oasis Sapphire.

---

## 🛠️ Stack

- **Smart Contract**:
  - [Chainlink](https://chain.link/) price oracles
  - [Flare](https://dev.flare.network/) read feeds offchain
  - (Potentially other trusted price feeds)
- **TEE**: Python microservice querying:
  - [Chainlink](https://chain.link/) price oracles
  - [Flare](https://dev.flare.network/) read feeds offchain
  - Trusted price feeds run inside an [Oasis](https://oasisprotocol.org/) Trusted Execution Environment (TEE) via ROFL Docker

---

## ⚙️ Features

- Expanding the list of supported data feeds and chains on the [Oasis network](https://docs.chain.link/data-feeds/price-feeds/addresses?page=1&testnetPage=1)

---

## 🚀 Getting Started

### 1. Smart Contracts (Solidity)
- Set up a virtual environment
- Install dependencies
- Configure and run price aggregation server (Chainlink + Coingecko)

### 2. Trusted Execution Environment (ROFL in Oasis)
- Install and run Oasis ROFL Docker container
- Mount the backend LLM model securely

---

## 🧭 Roadmap

- [ ] Set up Python backend service
- [ ] Integrate Chainlink + Coingecko APIs
- [ ] Deploy LLM in Oasis ROFL Docker
- [ ] Replace weather graphics with price charts
- [ ] Connect frontend chatbot to backend
- [ ] Add trust evaluation heuristics

---

## 👥 Credits

Made with ❤️ by @deapinkme and @harpoondev

---

## 📸 Screenshots / Demo

Coming soon.


## Deployment

To deploy smart contract on Sepolia for Chainlink feed reading:
```
cd hardhat
npx hardhat run scripts/deploy-eth-price-feed.ts --network sepolia
```
to get
```
Deploying ETH Price Feed contract...
Network: sepolia (Chain ID: 11155111)
Using ETH/USD Price Feed address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
ETH Price Feed deployed to: 0x1960Dc99EdC8F7e336A2d90843481d31Ad9455aA
```



Sapphire deployment:

✅ Deployed PriceOracle to 0xcF780e57D5ce8E07abCF60AA0aeC9227850db685
👤 Oracle: 0x9844dbEEeF7EDc74011718362e90af9F9397d97F
🔐 ROFL App ID: rofl1qz0amqhzy5xksnskfkdfrfm7hr2yjp36pc8hxw7m
