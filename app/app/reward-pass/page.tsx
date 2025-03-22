import { Header } from "@/components/header"
import Image from "next/image"
import { Heart, Play, Filter } from "lucide-react"

export default function RewardPassPage() {
  // Sample reward pass data
  const rewardPasses = [
    {
      id: "1",
      artist: "NJZ",
      date: "2025.05.25",
      image: "/placeholder.svg?height=400&width=300",
      count: 12,
      initiative: "아이돌 NJZ와 함께하는 지속 가능 패션 소재",
      type: "리싸이클링 NJZ 키링",
    },
    {
      id: "2",
      artist: "NJZ",
      date: "2025.05.25",
      image: "/placeholder.svg?height=400&width=300",
      count: 12,
      initiative: "아이돌 NJZ와 함께하는 지속 가능 패션 소재",
      type: "리싸이클링 NJZ 키링",
    },
    {
      id: "3",
      artist: "NJZ",
      date: "2025.05.25",
      image: "/placeholder.svg?height=400&width=300",
      count: 12,
      initiative: "아이돌 NJZ와 함께하는 지속 가능 패션 소재",
      type: "리싸이클링 NJZ 키링",
    },
    {
      id: "4",
      artist: "BTS",
      date: "2025.06.15",
      image: "/placeholder.svg?height=400&width=300",
      count: 5,
      initiative: "BTS와 함께하는 환경 보호 캠페인",
      type: "콘서트 티켓",
    },
    {
      id: "5",
      artist: "손홍민",
      date: "2025.07.10",
      image: "/placeholder.svg?height=400&width=300",
      count: 3,
      initiative: "축구선수 손홍민과 함께하는 장애 아동 축구 캠프",
      type: "축구교실 참가권",
    },
    {
      id: "6",
      artist: "한소희",
      date: "2025.08.20",
      image: "/placeholder.svg?height=400&width=300",
      count: 1,
      initiative: "배우 한소희와 함께하는 환경 보호 캠페인",
      type: "팬미팅 티켓",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">리워드패스</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 font-medium">리워드패스</button>
            <button className="text-gray-400 font-medium">임팩트배지</button>
            <button className="p-2">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewardPasses.map((pass) => (
            <RewardPassCard key={pass.id} pass={pass} />
          ))}
        </div>
      </main>
    </div>
  )
}

interface RewardPassCardProps {
  pass: {
    id: string
    artist: string
    date: string
    image: string
    count: number
    initiative: string
    type: string
  }
}

function RewardPassCard({ pass }: RewardPassCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 flex items-center space-x-2">
        <div className="w-6 h-6 flex items-center justify-center">
          <span className="text-xs">ℹ️</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-bold">{pass.artist}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">{pass.date}</span>
        </div>
      </div>

      <div className="relative h-[300px] w-full bg-gray-100">
        <Image
          src={pass.image || "/placeholder.svg"}
          alt={`${pass.artist} reward pass`}
          fill
          className="object-cover"
        />
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

        <p className="font-medium mb-2">{pass.count}개 보유 중</p>

        <p className="text-sm text-gray-600 mb-1">※ 이니셔티브 {pass.initiative}</p>

        <div className="flex items-center space-x-1 text-sm">
          <span className="font-medium">📦 리워드패스</span>
          <span>{pass.type}</span>
        </div>
      </div>
    </div>
  )
}

