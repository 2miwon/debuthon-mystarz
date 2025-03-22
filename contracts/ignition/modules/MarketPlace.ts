// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const MarketPlaceModule = buildModule("MarketPlaceModule", (m) => {
  const MarketPlace = m.contract("MarketPlace", []);

  return { MarketPlace };
});

export default MarketPlaceModule;
