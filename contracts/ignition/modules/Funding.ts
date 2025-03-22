// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const FundingModule = buildModule("FundingModule", (m) => {
  const sbtContract = "0x7bab83293c0a1bC8a39F101E45Fa35EbefeFd75d";
  const goalAmount = ethers.parseUnits("1", 18).toString();
  const duration = 10 * 60;
  const SBT_URI =
    "https://gateway.pinata.cloud/ipfs/bafkreiebmr2om6gimkmoyu3ycxemv7yetosutb3mh4vtm2rucpin4gpz3a";
  const Funding = m.contract("Funding", [
    sbtContract,
    goalAmount,
    duration,
    SBT_URI,
  ]);

  return { Funding };
});

export default FundingModule;
