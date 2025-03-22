// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const NFTModule = buildModule("NFTModule", (m) => {
  const marketcontract = "0xBb12D052f0df41baaAe353Fa025DfAF21797a52C";
  const NFT = m.contract("MyStarzNFT", [marketcontract]);

  return { NFT };
});

export default NFTModule;
