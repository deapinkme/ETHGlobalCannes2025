import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

describe("ETHPriceFeed", function () {
  let ethPriceFeed: Contract;
  let mockPriceFeed: Contract;
  
  // Mock price feed address for testing
  const mockPriceFeedAddress = "0x1234567890123456789012345678901234567890";
  
  beforeEach(async function () {
    // Deploy a mock price feed for testing
    const MockPriceFeed = await ethers.getContractFactory("MockPriceFeed");
    mockPriceFeed = await MockPriceFeed.deploy();
    await mockPriceFeed.waitForDeployment();
    
    // Deploy the ETH price feed contract with the mock address
    const ETHPriceFeed = await ethers.getContractFactory("ETHPriceFeed");
    ethPriceFeed = await ETHPriceFeed.deploy(await mockPriceFeed.getAddress());
    await ethPriceFeed.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct price feed address", async function () {
      expect(await ethPriceFeed.priceFeed()).to.equal(await mockPriceFeed.getAddress());
    });

    it("Should set the correct decimals", async function () {
      expect(await ethPriceFeed.getDecimals()).to.equal(8);
    });
  });

  describe("Price Updates", function () {
    it("Should update the stored price when updatePrice is called", async function () {
      // Set a mock price in the mock contract
      await mockPriceFeed.setPrice(250000000000); // $2500.00 with 8 decimals
      
      // Update the price
      await ethPriceFeed.updatePrice();
      
      // Check that the stored price was updated
      expect(await ethPriceFeed.getStoredPrice()).to.equal(250000000000);
    });

    it("Should emit PriceUpdated event", async function () {
      await mockPriceFeed.setPrice(300000000000); // $3000.00 with 8 decimals
      
      await expect(ethPriceFeed.updatePrice())
        .to.emit(ethPriceFeed, "PriceUpdated")
        .withArgs(300000000000, await mockPriceFeed.getTimestamp());
    });

    it("Should update the last update time", async function () {
      await mockPriceFeed.setPrice(200000000000); // $2000.00 with 8 decimals
      
      await ethPriceFeed.updatePrice();
      
      expect(await ethPriceFeed.getLastUpdateTime()).to.equal(await mockPriceFeed.getTimestamp());
    });
  });

  describe("Price Retrieval", function () {
    it("Should return the latest price from Chainlink", async function () {
      await mockPriceFeed.setPrice(400000000000); // $4000.00 with 8 decimals
      
      const latestPrice = await ethPriceFeed.getLatestPrice();
      expect(latestPrice).to.equal(400000000000);
    });

    it("Should return the stored price from state", async function () {
      await mockPriceFeed.setPrice(350000000000); // $3500.00 with 8 decimals
      
      // Update the stored price
      await ethPriceFeed.updatePrice();
      
      // Change the mock price but don't update the stored price
      await mockPriceFeed.setPrice(500000000000); // $5000.00 with 8 decimals
      
      // Should still return the stored price
      expect(await ethPriceFeed.getStoredPrice()).to.equal(350000000000);
    });
  });
});

// Mock Price Feed contract for testing
const mockPriceFeedSource = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract MockPriceFeed is AggregatorV3Interface {
    int256 private _price;
    uint256 private _timestamp;
    uint8 private _decimals = 8;
    
    function setPrice(int256 price) external {
        _price = price;
        _timestamp = block.timestamp;
    }
    
    function getTimestamp() external view returns (uint256) {
        return _timestamp;
    }
    
    function latestRoundData() external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) {
        return (1, _price, _timestamp, _timestamp, 1);
    }
    
    function getRoundData(uint80 _roundId) external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) {
        return (_roundId, _price, _timestamp, _timestamp, _roundId);
    }
    
    function decimals() external view returns (uint8) {
        return _decimals;
    }
    
    function description() external pure returns (string memory) {
        return "Mock ETH/USD Price Feed";
    }
    
    function version() external pure returns (uint256) {
        return 1;
    }
}
`;

// Note: In a real test environment, you would need to deploy the MockPriceFeed contract
// separately or use a testing framework that supports multiple contract compilation. 