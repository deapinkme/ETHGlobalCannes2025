import { task } from "hardhat/config";
import { bech32 } from "bech32";
import "./query"; // Import oracle-query task

task("deploy", "Deploys PriceOracle contract")
  .addPositionalParam("roflAppId", "ROFL App ID (bech32 format)")
  .setAction(async ({ roflAppId }, hre) => {
    const { ethers } = hre;

    const { prefix, words } = bech32.decode(roflAppId);
    if (prefix !== "rofl") throw new Error("Invalid ROFL App ID format");

    // Convert bech32 words to bytes and pad to 21 bytes
    const bytes = Buffer.from(bech32.fromWords(words));
    const paddedBytes = Buffer.alloc(21);
    bytes.copy(paddedBytes);
    
    // Convert to hex string with 0x prefix
    const rawAppId = "0x" + paddedBytes.toString('hex');

    const Oracle = await ethers.getContractFactory("PriceReciever");
    const oracleContract = await Oracle.deploy(rawAppId);
    await oracleContract.waitForDeployment();

    console.log(`✅ Deployed PriceOracle to ${oracleContract.target}`);
    console.log(`🔐 ROFL App ID: ${roflAppId}`);
    console.log(`📝 Raw App ID: ${rawAppId}`);
  });
