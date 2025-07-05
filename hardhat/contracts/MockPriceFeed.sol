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