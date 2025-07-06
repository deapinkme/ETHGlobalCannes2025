import { task } from "hardhat/config";
import { bech32 } from "bech32";

task("deploy", "Deploys PriceOracle contract")
  .addPositionalParam("roflAppId", "ROFL App ID (bech32 format)")
  .addOptionalParam("oracle", "EOA address of ROFL oracle", "")
  .setAction(async ({ roflAppId, oracle }, hre) => {
    const { ethers } = hre;

    const { prefix, words } = bech32.decode(roflAppId);
    if (prefix !== "rofl") throw new Error("Invalid ROFL App ID format");

    const rawAppId = new Uint8Array(bech32.fromWords(words));
    const deployer = (await ethers.getSigners())[0];
    const oracleAddr = oracle || deployer.address;

    const Oracle = await ethers.getContractFactory("PriceReciever");
    const oracleContract = await Oracle.deploy(rawAppId, oracleAddr);
    await oracleContract.waitForDeployment();

    console.log(`✅ Deployed PriceOracle to ${oracleContract.target}`);
    console.log(`👤 Oracle: ${oracleAddr}`);
    console.log(`🔐 ROFL App ID: ${roflAppId}`);
  });
