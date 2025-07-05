# ETH/USD Price Feed Contract

This project contains a simple Solidity contract that reads the ETH/USD price from Chainlink's price feed and stores it as a state variable.

## Features

- **Real-time Price Reading**: Connects to Chainlink's ETH/USD price feed
- **State Storage**: Stores the latest price as a state variable
- **Multiple Networks**: Supports various networks including Ethereum mainnet, testnets, and L2s
- **Event Logging**: Emits events when prices are updated
- **Comprehensive Testing**: Includes mock contracts and test suites

## Contract Overview

### `ETHPriceFeed.sol`

The main contract that:
- Connects to Chainlink's ETH/USD price feed
- Stores the latest price in `latestPrice` state variable
- Provides functions to update and retrieve prices
- Emits events for price updates

### Key Functions

- `updatePrice()`: Fetches the latest price from Chainlink and updates state variables
- `getLatestPrice()`: Returns the current price from Chainlink (view function)
- `getStoredPrice()`: Returns the stored price from state variable (view function)
- `getLastUpdateTime()`: Returns the timestamp of the last price update
- `getDecimals()`: Returns the number of decimals for the price feed

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Chainlink contracts:
```bash
npm install @chainlink/contracts
```

## Usage

### Deployment

1. Set up your environment variables in a `.env` file:
```env
PRIVATE_KEY=your_private_key_here
RPC_URL=your_rpc_url_here
```

2. Deploy the contract using the provided script:
```bash
npx hardhat run scripts/deploy-eth-price-feed.ts --network <network_name>
```

### Supported Networks

The deployment script automatically detects the network and uses the appropriate Chainlink price feed address:

- **Ethereum Mainnet**: `0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419`
- **Sepolia Testnet**: `0x694AA1769357215DE4FAC081bf1f309aDC325306`
- **Goerli Testnet**: `0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e`
- **Polygon Mumbai**: `0x0715A7794a1dc8e42615F059dD6e406A6594651A`
- **Polygon Mainnet**: `0xF9680D99D6C9589e2a93a78A04A279e509205945`
- **Arbitrum One**: `0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612`
- **Optimism**: `0x13e3Ee699D1909E989722E753853AE30b17e08c5`
- **Base**: `0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70`

### Interacting with the Contract

After deployment, you can interact with the contract:

```javascript
// Get the latest price from Chainlink
const latestPrice = await contract.getLatestPrice();
console.log(`Latest ETH/USD price: ${latestPrice}`);

// Update the stored price
const tx = await contract.updatePrice();
await tx.wait();

// Get the stored price
const storedPrice = await contract.getStoredPrice();
console.log(`Stored ETH/USD price: ${storedPrice}`);

// Get the last update time
const lastUpdateTime = await contract.getLastUpdateTime();
console.log(`Last update: ${new Date(Number(lastUpdateTime) * 1000)}`);

// Get decimals
const decimals = await contract.getDecimals();
const priceInUSD = Number(storedPrice) / Math.pow(10, decimals);
console.log(`ETH/USD price: $${priceInUSD.toFixed(2)}`);
```

## Testing

Run the test suite:

```bash
npx hardhat test
```

The tests include:
- Deployment verification
- Price update functionality
- Event emission
- State variable updates
- Price retrieval methods

## Contract Architecture

```
ETHPriceFeed
├── State Variables
│   ├── priceFeed (AggregatorV3Interface)
│   ├── latestPrice (int256)
│   ├── lastUpdateTime (uint256)
│   └── decimals (uint8)
├── Functions
│   ├── updatePrice() - Updates stored price from Chainlink
│   ├── getLatestPrice() - Gets current price from Chainlink
│   ├── getStoredPrice() - Gets stored price from state
│   ├── getLastUpdateTime() - Gets last update timestamp
│   └── getDecimals() - Gets price feed decimals
└── Events
    └── PriceUpdated - Emitted when price is updated
```

## Security Considerations

- The contract uses Chainlink's decentralized price feeds
- Price feeds are updated by decentralized oracle networks
- The contract includes timestamp validation
- All price data comes from verified Chainlink sources

## Gas Optimization

- `getLatestPrice()` is a view function that doesn't modify state
- `getStoredPrice()` reads from state variables (cheaper than external calls)
- Events are used for efficient off-chain price tracking

## License

MIT License - see LICENSE file for details.
