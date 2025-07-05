// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ETHPriceFeed {
    AggregatorV3Interface public priceFeed;
    
    // State variable to store the latest ETH/USD price
    int256 public latestPrice;
    
    // State variable to store the timestamp of the last update
    uint256 public lastUpdateTime;
    
    // State variable to store the number of decimals for the price feed
    uint8 public decimals;
    
    // Events
    event PriceUpdated(int256 price, uint256 timestamp);
    
    /**
     * @notice Constructor sets the price feed address for ETH/USD
     * @param _priceFeedAddress The address of the Chainlink ETH/USD price feed
     */
    constructor(address _priceFeedAddress) {
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
        decimals = priceFeed.decimals();
    }
    
    /**
     * @notice Updates the stored price by reading from Chainlink
     * @return The latest ETH/USD price
     */
    function updatePrice() public returns (int256) {
        (
            /* uint80 roundID */,
            int256 price,
            /*uint startedAt*/,
            uint256 timeStamp,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        
        // Update state variables
        latestPrice = price;
        lastUpdateTime = timeStamp;
        
        emit PriceUpdated(price, timeStamp);
        
        return price;
    }
    
    /**
     * @notice Gets the latest price from Chainlink without updating state
     * @return The latest ETH/USD price
     */
    function getLatestPrice() public view returns (int256) {
        (
            /* uint80 roundID */,
            int256 price,
            /*uint startedAt*/,
            /*uint256 timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        
        return price;
    }
    
    /**
     * @notice Gets the stored price from state variable
     * @return The stored ETH/USD price
     */
    function getStoredPrice() public view returns (int256) {
        return latestPrice;
    }
    
    /**
     * @notice Gets the timestamp of the last price update
     * @return The timestamp of the last update
     */
    function getLastUpdateTime() public view returns (uint256) {
        return lastUpdateTime;
    }
    
    /**
     * @notice Gets the number of decimals for the price feed
     * @return The number of decimals
     */
    function getDecimals() public view returns (uint8) {
        return decimals;
    }
}
