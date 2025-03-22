import { Header } from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

// Sample marketplace data
const marketplaceItems = [
  {
    id: "1",
    title: "리싸이클링 NJZ 키링",
    description:
      "이니셔티브 아이돌 NJZ와 함께하는 지속 가능한 패션 소재 이니셔티브",
    price: 100000,
    totalSupply: 500,
    onSale: 17,
    image: "/marketplace-list.png?height=300&width=400",
    liked: true,
  },
  {
    id: "2",
    title: "리싸이클링 NJZ 키링",
    description:
      "이니셔티브 아이돌 NJZ와 함께하는 지속 가능한 패션 소재 이니셔티브",
    price: 100000,
    totalSupply: 500,
    onSale: 17,
    image: "/marketplace-list.png?height=300&width=400",
    liked: false,
  },
  {
    id: "3",
    title: "리싸이클링 NJZ 키링",
    description:
      "이니셔티브 아이돌 NJZ와 함께하는 지속 가능한 패션 소재 이니셔티브",
    price: 100000,
    totalSupply: 500,
    onSale: 17,
    image: "/marketplace-list.png?height=300&width=400",
    liked: false,
  },
  {
    id: "4",
    title: "리싸이클링 NJZ 키링",
    description:
      "이니셔티브 아이돌 NJZ와 함께하는 지속 가능한 패션 소재 이니셔티브",
    price: 100000,
    totalSupply: 500,
    onSale: 17,
    image: "/marketplace-list.png?height=300&width=400",
    liked: false,
  },
  {
    id: "5",
    title: "리싸이클링 NJZ 키링",
    description:
      "이니셔티브 아이돌 NJZ와 함께하는 지속 가능한 패션 소재 이니셔티브",
    price: 100000,
    totalSupply: 500,
    onSale: 17,
    image: "/marketplace-list.png?height=300&width=400",
    liked: false,
  },
  {
    id: "6",
    title: "리싸이클링 NJZ 키링",
    description:
      "이니셔티브 아이돌 NJZ와 함께하는 지속 가능한 패션 소재 이니셔티브",
    price: 100000,
    totalSupply: 500,
    onSale: 17,
    image: "/marketplace-list.png?height=300&width=400",
    liked: false,
  },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">마켓플레이스</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceItems.map((item) => (
            <MarketplaceItem key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

interface MarketplaceItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    price: number;
    totalSupply: number;
    onSale: number;
    image: string;
    liked: boolean;
  };
}

function MarketplaceItem({ item }: MarketplaceItemProps) {
  return (
    <Link
      href={`/marketplace/${item.id}`}
      className="rounded-lg overflow-hidden block"
    >
      <div className="relative">
        {/* <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-sm"> */}
        {/*   {item.totalSupply}개 발행 */}
        {/* </div> */}

        {/* {item.liked && ( */}
        {/*   <div className="absolute top-3 right-3 text-rose-500"> */}
        {/*     <Heart size={24} fill="currentColor" /> */}
        {/*   </div> */}
        {/* )} */}

        <div className="bg-[#e9ecef] rounded-lg overflow-hidden">
          <Image
            src={item.image || "/marketplace-list.png"}
            alt={item.title}
            width={400}
            height={300}
            className="w-full h-[240px] object-cover"
          />
        </div>
      </div>

      <div className="mt-3">
        <div className="bg-[#e9ecef] text-gray-600 inline-block px-2 py-1 rounded text-sm mb-2">
          {item.onSale}개 판매 중
        </div>

        <h3 className="font-bold text-lg mb-1">{item.title}</h3>

        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {item.description}
        </p>

        <p className="text-[#5ae2ad] text-2xl font-bold">
          {item.price.toLocaleString()}원
        </p>
      </div>
    </Link>
  );
}
