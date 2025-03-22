// app/wagmiClient.js
import { createConfig, http } from "wagmi";
import { metaMask } from "wagmi/connectors";

// XRPL EVM Devnet 체인 설정
const xrplDevnet = {
  id: 1440002, // XRPL EVM Devnet 체인 ID
  name: "XRPL EVM Devnet",
  network: "xrpl-evm-devnet",
  nativeCurrency: {
    decimals: 18,
    name: "XRP",
    symbol: "XRP",
  },
  rpcUrls: {
    default: { http: ["https://rpc-evm-sidechain.xrpl.org"] },
  },
  blockExplorers: {
    default: { name: "XRPL Explorer", url: "https://evm-sidechain.xrpl.org" },
  },
  testnet: true,
};

export const config = createConfig({
  chains: [xrplDevnet],
  connectors: [metaMask()],
  transports: {
    [xrplDevnet.id]: http(),
  },
});
