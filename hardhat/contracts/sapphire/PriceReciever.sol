// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Subcall } from "@oasisprotocol/sapphire-contracts/contracts/Subcall.sol";

contract PriceReciever {
    bytes21 public roflAppId;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    event PriceUpdated(uint256 price, uint256 timestamp);

    error NotROFL();

    constructor(bytes21 _roflAppId) {
        roflAppId = _roflAppId;
    }

    function setPrice(uint256 price, uint256 timestamp) external {
        // Only allow the authorized ROFL app to set prices
        Subcall.roflEnsureAuthorizedOrigin(roflAppId);
        
        latestPrice = price;
        lastUpdate = timestamp;
        emit PriceUpdated(price, timestamp);
    }

    function getPrice() external view returns (uint256 price, uint256 timestamp) {
        return (latestPrice, lastUpdate);
    }
}
