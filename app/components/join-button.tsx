// app/components/JoinButton.js
"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from "react";

export default function JoinButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleJoin = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      // 백엔드 API 호출
      const response = await fetch(
        "https://your-backend-api.com/join-initiative",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // 필요한 데이터를 전달
        },
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "참여가 완료되었습니다!");
      } else {
        throw new Error("참여 요청에 실패했습니다.");
      }
    } catch (error) {
      setMessage("참여 요청에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="w-full bg-[#5ae2ad] hover:bg-[#4cd19c] text-white py-4 rounded-lg font-medium text-lg"
        onClick={handleJoin}
        disabled={isLoading}
      >
        {isLoading ? "처리 중..." : "이니셔티브 참여하기"}
      </button>
      {message && (
        <p className="mt-2 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}
