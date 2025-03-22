import { Header } from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// This would typically come from a database or API
const getMarketplaceItemById = (id: string) => {
  const items = {
    "1": {
      id: "1",
      title: "리싸이클링 NJZ 키링",
      description:
        "이니셔티브 아이돌 NJZ와 함께하는 지속 가능한 패션 소재 이니셔티브",
      currentPrice: 100000,
      initialPrice: 50000,
      totalSupply: 500,
      unusedRewardPasses: 83,
      onSale: 17,
      wantToBuy: 100,
      image: "/marketplace-item.png?height=500&width=600",
      issueDate: "2025.06.05",
    },
    "2": {
      id: "2",
      title: "리싸이클링 NJZ 키링",
      description:
        "이니셔티브 아이돌 NJZ와 함께하는 지속 가능한 패션 소재 이니셔티브",
      currentPrice: 100000,
      initialPrice: 50000,
      totalSupply: 500,
      unusedRewardPasses: 83,
      onSale: 17,
      wantToBuy: 100,
      image: "/marketplace-item.png?height=500&width=600",
      issueDate: "2025.06.05",
    },
  };

  return items[id as keyof typeof items];
};

export default function MarketplaceItemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = getMarketplaceItemById(params.id);

  if (!item) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">상품을 찾을 수 없습니다</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* <Link */}
        {/*   href="/marketplace" */}
        {/*   className="inline-flex items-center text-gray-600 mb-6" */}
        {/* > */}
        {/*   <ChevronLeft size={20} /> */}
        {/*   <span>마켓플레이스로 돌아가기</span> */}
        {/* </Link> */}
        {/**/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Product Image */}
          <div className="rounded-lg content-center overflow-hidden h-[356px]">
            <Image
              src={item.image || "/marketplace-item.png"}
              alt={item.title}
              width={600}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right column - Product Details */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {item.totalSupply}개 발행
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                미사용 리워드패스 {item.unusedRewardPasses}개
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
            <p className="text-gray-700 mb-2">{item.description}</p>

            <p className="text-gray-600 mb-8">발행일: {item.issueDate}</p>

            <div className="mb-2">
              <p className="text-[#5ae2ad] text-3xl font-bold">
                즉시 구매가 {item.currentPrice.toLocaleString()}원
              </p>
            </div>

            <p className="text-gray-600 mb-8">
              초기 가격 {item.initialPrice.toLocaleString()}원
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button className="bg-[#5ae2ad] hover:bg-[#4cd19c] text-white py-4 rounded-lg font-medium text-lg">
                <div>구매하기</div>
                <div className="text-sm font-normal">
                  {item.onSale}개 판매 중
                </div>
              </button>

              <button className="bg-[#5aace2] hover:bg-[#4a9ad2] text-white py-4 rounded-lg font-medium text-lg">
                <div>판매하기</div>
                <div className="text-sm font-normal">
                  {item.wantToBuy}명 구매 희망 중
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
