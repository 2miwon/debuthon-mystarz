// app/components/JoinButton.js
"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from "react";
import { useWriteContract, useAccount, useConnect } from "wagmi";
import { contractABI, contractAddress } from "../app/contractConfig";

export default function JoinButton({
  text,
  subText,
  type,
}: {
  type?: string;
  text?: string;
  subText?: string;
}) {
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
          functionName: "contribute",
          value: drops,
        },
        {
          onSuccess(data) {
            setMessage("Initiative succeeded!");
            setIsLoading(false);
          },
          onError(error) {
            setMessage("Try again.");
            setIsLoading(false);
          },
        },
      );
    } catch (error) {
      setMessage("Process failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {type === "Marketplace" ? (
        <button
          className="w-full bg-[#EC407A] hover:bg-pink-500 text-white py-4 rounded-lg font-medium text-lg"
          onClick={handleJoin}
          disabled={isLoading}
        >
          {isLoading
            ? "Processing..."
            : text !== undefined
            ? text
            : "Join the Initiative"}
          <span className="pl-2.5">
            {isLoading ? "" : subText !== undefined ? subText : ""}
          </span>
        </button>
      ) : (
        <button
          className="w-full grid bg-[#EC407A] hover:bg-pink-500 text-white py-4 rounded-lg font-medium text-lg"
          onClick={handleJoin}
          disabled={isLoading}
        >
          {isLoading
            ? "Processing..."
            : text !== undefined
            ? text
            : "Join the Initiative"}
          <span className="text-xs">
            {isLoading ? "" : subText !== undefined ? subText : ""}
          </span>
        </button>
      )}

      {message && (
        <p className="mt-2 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}
