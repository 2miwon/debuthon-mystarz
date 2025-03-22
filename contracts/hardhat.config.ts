import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-docgen";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    "xrpl-evm-dev": {
      url: process.env.XRPL_EVM_DEVNET_URL,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  etherscan: {
    apiKey: {
      "xrpl-evm": "empty",
    },
    customChains: [
      {
        network: "xrpl-evm",
        chainId: 1440002,
        urls: {
          apiURL: "https://explorer.xrplevm.org/api",
          browserURL: "https://explorer.xrplevm.org:3000",
        },
      },
    ],
  },
  docgen: {
    outputDir: "docs",
    pages: "files",
  },
};

export default config;
