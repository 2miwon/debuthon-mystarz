import { Header } from "@/components/header"
import Image from "next/image"
import { Heart, Share2, Gift } from "lucide-react"

// This would typically come from a database or API
const getCampaignById = (id: string) => {
  const campaigns = {
    "37": {
      id: "37",
      title: "아이돌 NJZ와 함께하는 지속 가능한 패션 소재 이니셔티브",
      description:
        "대형 아이돌 그룹 NJZ와 지구를 지키자! 유기농 및 천연 염료 등의 패션 소재로 환경 보호와 사회적 책임을 동시에 실현하자!",
      daysLeft: 2,
      artist: "NJZ",
      fundingPercentage: 258,
      participants: 516,
      fundingAmount: 25800000,
      rewardType: "리싸이클링 NJZ 키링",
      quote: "NJZ는 대한민국의 5인조 다국적 걸그룹으로 5명의 멤버가 모여 자유분방하면서도 독특한 퍼포먼스를 선보인다.",
      image: "/placeholder.svg?height=500&width=800",
    },
    "38": {
      id: "38",
      title: "번우석과 함께하는 주거 취약계층 지원 이니셔티브",
      description: "배우 번우석과 함께 주거 취약계층을 위한 지원 프로젝트에 동참해주세요.",
      daysLeft: 7,
      artist: "번우석",
      fundingPercentage: 210,
      participants: 320,
      fundingAmount: 21000000,
      rewardType: "번우석 사인 텀블러",
      quote: "번우석은 다양한 작품을 통해 연기력을 인정받은 배우로, 사회 공헌 활동에도 적극적으로 참여하고 있습니다.",
      image: "/placeholder.svg?height=500&width=800",
    },
    "39": {
      id: "39",
      title: "손홍민과 함께하는 장애 아동 축구 캠프 이니셔티브",
      description: "축구선수 손홍민과 함께 장애 아동들에게 축구의 즐거움을 선사하는 캠프를 개최합니다.",
      daysLeft: 29,
      artist: "손홍민",
      fundingPercentage: 77,
      participants: 150,
      fundingAmount: 7700000,
      rewardType: "손홍민 사인 축구공",
      quote: "손홍민은 세계적인 축구 선수로, 장애 아동들에게 스포츠의 즐거움을 전하고자 이 프로젝트를 시작했습니다.",
      image: "/placeholder.svg?height=500&width=800",
    },
  }

  return campaigns[id as keyof typeof campaigns]
}

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const campaign = getCampaignById(id)

  if (!campaign) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">캠페인을 찾을 수 없습니다</h1>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Campaign Image */}
          <div>
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-6">
              <Image src={campaign.image || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
            </div>

            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">ℹ️</span>
                </div>
                <span className="font-medium">{campaign.artist}</span>
              </div>
              <p className="text-gray-700">{campaign.quote}</p>
            </div>
          </div>

          {/* Right column - Campaign Details */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                마감 D-{campaign.daysLeft}
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">소속사 {campaign.artist}</span>
            </div>

            <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
            <p className="text-gray-700 mb-8">{campaign.description}</p>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-4xl font-bold text-[#5ae2ad]">{campaign.fundingPercentage}% 달성</span>
                <span className="ml-4 bg-[#dcf9ee] text-[#5ae2ad] px-3 py-1 rounded-full text-sm">
                  {campaign.participants}명 참여
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                <div
                  className="bg-[#5ae2ad] h-2 rounded-full"
                  style={{ width: `${Math.min(campaign.fundingPercentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-2xl font-bold mb-6">{campaign.fundingAmount.toLocaleString()}원 달성</p>
            </div>

            <div className="flex items-center mb-8">
              <span className="text-[#5ae2ad] font-medium flex items-center">
                리워드패스 <Gift size={16} className="ml-1" />
              </span>
              <span className="ml-4 text-gray-700">{campaign.rewardType}</span>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-[#5ae2ad] hover:bg-[#4cd19c] text-white py-4 rounded-lg font-medium text-lg">
                이니셔티브 참여하기
              </button>

              <div className="grid grid-cols-3 gap-4">
                <button className="border border-gray-200 rounded-lg py-3 flex items-center justify-center">
                  <Heart size={20} className="mr-2" />
                  <span>찜하기</span>
                </button>
                <button className="border border-gray-200 rounded-lg py-3 flex items-center justify-center">
                  <span className="mr-2">🎉</span>
                  <span>응원해요</span>
                </button>
                <button className="border border-gray-200 rounded-lg py-3 flex items-center justify-center">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

