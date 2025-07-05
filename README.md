# 🧠 Price Oracle Chat

**Ask questions. Get reliable crypto prices. Trust your data.**

**Price Oracle Chat** is an AI-powered chatbot that answers questions about crypto prices like:
- “What’s the current spot price of ETH?”
- “Is the current SOL price on Coingecko trustworthy?”
- “What does Chainlink say about BTC right now?”

Built on trusted data sources and secure AI infrastructure, it combines real-time pricing with a conversational interface.

---

## 🛠️ Stack

- **Frontend**: [Next.js](https://nextjs.org/), modified from the [Vercel Weather Chatbot](https://github.com/vercel/ai-chatbot-weather)
- **Backend**: Python microservice querying:
  - [Chainlink](https://chain.link/) price oracles
  - [Coingecko](https://www.coingecko.com/en/api) API
  - Other trusted price feeds
- **Secure AI**: LLM runs inside an [Oasis Network](https://oasisprotocol.org/) Trusted Execution Environment (TEE) via ROFL Docker

---

## ⚙️ Features

- 💬 Natural language interface to ask price-related questions
- 📉 Inline chart generation instead of weather graphics
- 🔒 Price validation logic runs securely inside a TEE
- 🔗 Aggregation from multiple oracle sources for redundancy and reliability

---

## 🚀 Getting Started

**Coming soon** – full setup instructions. For now, high-level overview:

### 1. Backend (Python)
- Set up a virtual environment
- Install dependencies
- Configure and run price aggregation server (Chainlink + Coingecko)

### 2. Trusted Execution Environment (ROFL in Oasis)
- Install and run Oasis ROFL Docker container
- Mount the backend LLM model securely

### 3. Frontend (Next.js)
- Clone and modify the Vercel AI Chatbot (Weather)
- Replace weather API calls with your backend endpoint
- Deploy via [Vercel](https://vercel.com) or run locally

---

## 🧪 Example Prompts

> “What’s the spot price of ETH?”  
> “Is the Chainlink feed for LINK on Polygon trustworthy right now?”  
> “Has BTC price diverged more than 1% across feeds in the past hour?”

---

## 📦 Environment Variables

TBD — expected to include:
- `CHAINLINK_RPC_URL`
- `COINGECKO_API_KEY` (if needed)
- `OASIS_TEE_CONFIG`
- `LLM_MODEL_PATH`

---

## 📄 License

TBD – likely **MIT**, but not yet finalized.

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

Made with 🧠 by [Your Team Name or GitHub Handles]

---

## 📸 Screenshots / Demo

Coming soon.
