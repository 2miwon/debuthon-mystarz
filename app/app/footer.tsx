"use client";

import { useAuthLoading } from "./auth-loading-context";

export function Footer() {
  const { isAuthLoading } = useAuthLoading();

  // 인증 로딩 중에는 푸터를 렌더링하지 않음
  if (isAuthLoading) {
    return null;
  }

  // 로딩이 완료되면 푸터 표시
  return (
    <footer className="w-full bg-pink-50 mt-[120px] pt-[380px]">
      {/* 푸터 콘텐츠 */}
    </footer>
  );
}
