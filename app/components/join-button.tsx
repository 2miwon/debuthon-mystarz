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
          className="w-full bg-white border border-[#EC407A] hover:bg-gray-100 text-[#EC407A] py-4 rounded-lg font-medium text-lg"
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
          className="w-full bg-white border border-[#EC407A] hover:bg-gray-100 text-[#EC407A] py-4 rounded-lg font-medium text-lg"
          onClick={handleJoin}
          disabled={isLoading}
        >
          {isLoading
            ? "Processing..."
            : text !== undefined
            ? text
            : "Send Support"}
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
