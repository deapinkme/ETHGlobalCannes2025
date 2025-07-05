import { ethers } from "hardhat";

async function main() {
  // Chainlink ETH/USD Price Feed addresses for different networks
  const ETH_USD_PRICE_FEED_ADDRESSES = {
    // Ethereum Mainnet
    mainnet: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    // Sepolia Testnet
    sepolia: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    // Goerli Testnet
    goerli: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    // Polygon Mumbai Testnet
    mumbai: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
    // Polygon Mainnet
    polygon: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    // Arbitrum One
    arbitrum: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    // Arbitrum Sepolia
    arbitrumSepolia: "0x2C5d91dE7D10e9dEF5C856905C5Fd3acA1A3C9D6",
    // Optimism
    optimism: "0x13e3Ee699D1909E989722E753853AE30b17e08c5",
    // Optimism Sepolia
    optimismSepolia: "0x2B5AD9c1a1cBd0bB40Ed0e5eB1A8cE9B0aD21632",
    // Base
    base: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
    // Base Sepolia
    baseSepolia: "0x4aDC67696bA383c43A60EeB4C9A1B5483e1e7A02",
  };

  console.log("Deploying ETH Price Feed contract...");

  // Get the network name
  const network = await ethers.provider.getNetwork();
  const networkName = network.name;
  
  console.log(`Network: ${networkName} (Chain ID: ${network.chainId})`);

  // Get the appropriate price feed address for the current network
  let priceFeedAddress: string;
  
  switch (Number(network.chainId)) {
    case 1: // Ethereum Mainnet
      priceFeedAddress = ETH_USD_PRICE_FEED_ADDRESSES.mainnet;
      break;
    case 11155111: // Sepolia
      priceFeedAddress = ETH_USD_PRICE_FEED_ADDRESSES.sepolia;
      break;
    case 5: // Goerli
      priceFeedAddress = ETH_USD_PRICE_FEED_ADDRESSES.goerli;
      break;
    case 80001: // Mumbai
      priceFeedAddress = ETH_USD_PRICE_FEED_ADDRESSES.mumbai;
      break;
    case 137: // Polygon
      priceFeedAddress = ETH_USD_PRICE_FEED_ADDRESSES.polygon;
      break;
    case 42161: // Arbitrum One
      priceFeedAddress = ETH_USD_PRICE_FEED_ADDRESSES.arbitrum;
      break;
    case 421614: // Arbitrum Sepolia
      priceFeedAddress = ETH_USD_PRICE_FEED_ADDRESSES.arbitrumSepolia;
      break;
    case 10: // Optimism
      priceFeedAddress = ETH_USD_PRICE_FEED_ADDRESSES.optimism;
      break;
    case 11155420: // Optimism Sepolia
      priceFeedAddress = ETH_USD_PRICE_FEED_ADDRESSES.optimismSepolia;
      break;
    case 8453: // Base
      priceFeedAddress = ETH_USD_PRICE_FEED_ADDRESSES.base;
      break;
    case 84532: // Base Sepolia
      priceFeedAddress = ETH_USD_PRICE_FEED_ADDRESSES.baseSepolia;
      break;
    default:
      throw new Error(`Unsupported network: ${networkName} (Chain ID: ${network.chainId})`);
  }

  console.log(`Using ETH/USD Price Feed address: ${priceFeedAddress}`);

  // Deploy the contract
  const ETHPriceFeed = await ethers.getContractFactory("ETHPriceFeed");
  const ethPriceFeed = await ETHPriceFeed.deploy(priceFeedAddress);

  await ethPriceFeed.waitForDeployment();

  const contractAddress = await ethPriceFeed.getAddress();
  console.log(`ETH Price Feed deployed to: ${contractAddress}`);

  // // Get initial price data
  // const decimals = await ethPriceFeed.getDecimals();
  // console.log(`Price feed decimals: ${decimals}`);

  // // Update the price to get initial data
  // console.log("Updating price...");
  // const tx = await ethPriceFeed.updatePrice();
  // await tx.wait();

  // const storedPrice = await ethPriceFeed.getStoredPrice();
  // const lastUpdateTime = await ethPriceFeed.getLastUpdateTime();
  
  // console.log(`Initial ETH/USD price: ${storedPrice}`);
  // console.log(`Last update time: ${new Date(Number(lastUpdateTime) * 1000).toISOString()}`);
  
  // // Convert price to readable format
  // const priceInUSD = Number(storedPrice) / Math.pow(10, decimals);
  // console.log(`ETH/USD price: $${priceInUSD.toFixed(2)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 