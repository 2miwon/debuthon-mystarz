// app/components/JoinButton.js
"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from "react";
import { useWriteContract, useAccount, useConnect } from "wagmi";
import { contractABI, contractAddress } from "../app/contractMarketplaceConfig";

export default function PurchaseButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { writeContract } = useWriteContract();

  const handleJoin = async () => {
    setIsLoading(true);
    setMessage("");

    if (!isConnected) {
      // If not connected, trigger the wallet connection
      connect({ connector: connectors[0] }); // Connect to the first available connector (e.g., MetaMask)
      return;
    }

    const xrpAmount = 1_000_000_000_000;
    const drops = BigInt(xrpAmount * 1_000_000);

    try {
      writeContract(
        {
          address: contractAddress,
          abi: contractABI,
          functionName: "buy",
          args: ["0x7bDC5dCd118831d8AC895C753d76bB671eaB6482", BigInt(4)],
          value: BigInt(1),
        },
        {
          onSuccess(data) {
            setMessage("Success to buy.");
            setIsLoading(false);
          },
          onError(error) {
            setMessage("Try again.");
            setIsLoading(false);
          },
        },
      );
    } catch (error) {
      setMessage("Buy failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-full w-full">
      <button
        className="w-full h-full bg-white border border-[#EC407A] hover:bg-gray-100 text-[#EC407A] py-4 rounded-lg font-medium text-lg"
        onClick={handleJoin}
        disabled={isLoading}
      >
        {isLoading ? (
          "Processing..."
        ) : (
          <div>
            Buy <span className=" font-normal">{30} XRP</span>
          </div>
        )}
      </button>

      {message && (
        <p className="absolute pt-2 left-1/2 -translate-x-1/2 text-center text-sm text-gray-600">
          {message}
        </p>
      )}
    </div>
  );
}
