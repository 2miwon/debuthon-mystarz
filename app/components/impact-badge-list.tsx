import { Heart, Play, Award } from "lucide-react";
import Image from "next/image";

// Sample impact badge data
const impactBadges = [
  {
    id: "1",
    artist: "NJZ",
    date: "2025.05.25",
    image: "/impact-badge.png?height=400&width=300",
    impact: "환경 보호",
    initiative: "아이돌 NJZ와 함께하는 지속 가능 패션 소재",
    type: "지속 가능 패션 선도자",
  },
  {
    id: "2",
    artist: "BTS",
    date: "2025.04.15",
    image: "/impact-badge.png?height=400&width=300",
    impact: "교육 지원",
    initiative: "BTS와 함께하는 글로벌 교육 캠페인",
    type: "교육 후원자",
  },
  {
    id: "3",
    artist: "손홍민",
    date: "2025.03.10",
    image: "/impact-badge.png?height=400&width=300",
    impact: "장애 인식 개선",
    initiative: "축구선수 손홍민과 함께하는 장애 아동 축구 캠프",
    type: "포용적 스포츠 지지자",
  },
  {
    id: "4",
    artist: "한소희",
    date: "2025.02.20",
    image: "/impact-badge.png?height=400&width=300",
    impact: "환경 보호",
    initiative: "배우 한소희와 함께하는 환경 보호 캠페인",
    type: "지구 지킴이",
  },
  {
    id: "5",
    artist: "변우석",
    date: "2025.01.15",
    image: "/impact-badge.png?height=400&width=300",
    impact: "주거 지원",
    initiative: "배우 변우석과 함께하는 주거 취약계층 지원",
    type: "주거 권리 옹호자",
  },
  {
    id: "6",
    artist: "NJZ",
    date: "2024.12.25",
    image: "/impact-badge.png?height=400&width=300",
    impact: "해양 보호",
    initiative: "NJZ와 함께하는 해양 플라스틱 줄이기",
    type: "바다 지킴이",
  },
];

interface ImpactBadgeCardProps {
  badge: {
    id: string;
    artist: string;
    date: string;
    image: string;
    impact: string;
    initiative: string;
    type: string;
  };
}

function ImpactBadgeCard({ badge }: ImpactBadgeCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 flex items-center space-x-2">
        <div className="w-6 h-6 flex items-center justify-center">
          <span className="text-xs">ℹ️</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-bold">{badge.artist}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">{badge.date}</span>
        </div>
      </div>

      <div className="relative h-[475px] w-full bg-gray-100">
        <Image
          src={badge.image || "/impact-badge.png"}
          alt={`${badge.artist} impact badge`}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-[#5ae2ad] text-white px-3 py-1 rounded-full text-sm">
          {badge.impact}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-4 mb-2">
          <button className="text-rose-500">
            <Heart size={24} fill="currentColor" />
          </button>
          <button>
            <Play size={24} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-1">
          ※ 이니셔티브 {badge.initiative}
        </p>

        <div className="flex items-center space-x-1 text-sm">
          <span className="font-medium flex items-center">
            <Award size={16} className="mr-1 text-[#5ae2ad]" /> 임팩트배지
          </span>
          <span>{badge.type}</span>
        </div>
      </div>
    </div>
  );
}

export function ImpactBadgeList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {impactBadges.map((badge) => (
        <ImpactBadgeCard key={badge.id} badge={badge} />
      ))}
    </div>
  );
}
