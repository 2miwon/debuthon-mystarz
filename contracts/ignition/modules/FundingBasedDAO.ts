// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const DAOAndTokenModule = buildModule("DAOAndTokenModule", (m) => {
  const tokenContract = "0x34e4ac501d77cac78aceaa05f86f522e984b39fe";

  // Token 계약이 배포된 후, FundingBasedDAO 계약 배포
  const fundingDAO = m.contract("FundingBasedDAO", [tokenContract]);

  return { fundingDAO };
});

export default DAOAndTokenModule;
