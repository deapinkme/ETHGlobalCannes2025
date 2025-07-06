import { task } from "hardhat/config";

task("oracle-query", "Query the deployed PriceOracle contract")
  .addPositionalParam("contractAddress", "Deployed PriceOracle contract address")
  .setAction(async ({ contractAddress }, { ethers }) => {
    const oracle = await ethers.getContractAt("PriceReciever", contractAddress);
    const [price, timestamp] = await oracle.getPrice();
    console.log(`Latest price: ${price}`);
    console.log(`Last updated: ${new Date(Number(timestamp) * 1000).toISOString()}`);
  });
