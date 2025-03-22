// app/components/JoinButton.js
"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from "react";
import { useWriteContract, useAccount, useConnect } from "wagmi";
import { contractABI, contractAddress } from "../app/contractConfig";

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
          functionName: "contribute",
          value: drops,
        },
        {
          onSuccess(data) {
            setMessage("참여가 성공적으로 완료되었습니다!");
            setIsLoading(false);
          },
          onError(error) {
            setMessage("다시 시도해주세요.");
            setIsLoading(false);
          },
        },
      );
    } catch (error) {
      setMessage("요청에 실패했습니다.");
      setIsLoading(false);
    }
  };

  const handleFinal = async () => {
    setIsLoading(true);
    setMessage("");

    if (!isConnected) {
      // If not connected, trigger the wallet connection
      connect({ connector: connectors[0] }); // Connect to the first available connector (e.g., MetaMask)
      return;
    }

    const xrpAmount = 1;
    // const drops = BigInt(xrpAmount * 1_000_000);
    const drops = BigInt(xrpAmount * 1);

    try {
      writeContract(
        {
          address: contractAddress,
          abi: contractABI,
          functionName: "finalize",
          value: BigInt(0),
        },
        {
          onSuccess(data) {
            setMessage("참여가 성공적으로 완료되었습니다!");
            setIsLoading(false);
          },
          onError(error) {
            setMessage("다시 시도해주세요.");
            setIsLoading(false);
          },
        },
      );
    } catch (error) {
      setMessage("요청에 실패했습니다.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-full">
      <button
        className="bg-[#5ae2ad] w-full h-full hover:bg-[#4cd19c] text-white py-4 rounded-lg font-medium text-lg"
        onClick={handleJoin}
        disabled={isLoading}
      >
        {isLoading ? (
          "처리 중..."
        ) : (
          <>
            <div>구매하기</div>
            <div className="text-sm font-normal">{100}개 판매 중</div>
          </>
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
