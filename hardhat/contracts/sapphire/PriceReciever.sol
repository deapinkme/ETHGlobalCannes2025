// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Subcall } from "@oasisprotocol/sapphire-contracts/contracts/Subcall.sol";

contract PriceReciever {
    address public oracle;
    bytes21 public roflAppId;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    event PriceUpdated(uint256 price, uint256 timestamp);

    error NotAuthorized();
    error NotROFL();

    modifier onlyROFL(bytes21 expectedAppId) {
        Subcall.roflEnsureAuthorizedOrigin(expectedAppId);
        _;
    }

    modifier onlyOracle() {
        if (msg.sender != oracle) revert NotAuthorized();
        _;
    }

    constructor(bytes21 _roflAppId, address _oracle) {
        roflAppId = _roflAppId;
        oracle = _oracle;
    }

    function setOracle(address _oracle) external onlyROFL(roflAppId) {
        oracle = _oracle;
    }

    function setPrice(uint256 price, uint256 timestamp) external onlyOracle {
        latestPrice = price;
        lastUpdate = timestamp;
        emit PriceUpdated(price, timestamp);
    }

    function getPrice() external view returns (uint256 price, uint256 timestamp) {
        return (latestPrice, lastUpdate);
    }
}
