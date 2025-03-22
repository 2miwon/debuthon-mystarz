import { Header } from "@/components/header";
import { Banner } from "@/components/banner";
import { CampaignList } from "@/components/campaign-list";

export default function CampaignListPage() {
  // Sample campaign data
  const initiativeCampaigns = [
    {
      id: "37",
      creator: "NJZ",
      daysLeft: 2,
      title: "아이돌 NJZ와 함께하는 지속 가능한 패션 소재 이니셔티브",
      description:
        "대형 아이돌 그룹 NJZ와 지구를 지키자! 유기농 및 천연 염료 등의 패션 소재로 환경 보호와 사회적 책임을 동시에 실현하자!",
      fundingPercentage: 258,
      fundingAmount: 2000,
      tags: ["아이돌 NJZ와 함께하는 지속 가능 패션 소재"],
      image: "/njz.png?height=200&width=400",
    },
    {
      id: "38",
      creator: "번우석",
      daysLeft: 7,
      title: "번우석과 함께하는 주거 취약계층 지원 이니셔티브",
      description: "",
      fundingPercentage: 210,
      fundingAmount: 1000,
      tags: ["배우 번우석과 함께 주거 취약계층 지원하기"],
      image: "/njz.png?height=200&width=400",
    },
    {
      id: "39",
      creator: "손홍민",
      daysLeft: 29,
      title: "손홍민과 함께하는 장애 아동 축구 캠프 이니셔티브",
      description: "",
      fundingPercentage: 77,
      fundingAmount: 777,
      tags: ["축구선수 손홍민과 함께하는장애 아동 축구 캠프"],
      image: "/njz.png?height=200&width=400",
    },
    // Add more campaigns if needed
  ];

  const upcomingCampaigns = [
    // Similar structure as above
    {
      id: "40",
      creator: "한소희",
      daysLeft: 1,
      title: "한소희와 함께하는 환경 보호 캠페인",
      description: "",
      fundingPercentage: 150,
      fundingAmount: 5000,
      tags: ["배우 한소희 후원"],
      image: "/njz.png?height=200&width=400",
    },
    // Add more campaigns
  ];

  const marketplaceCampaigns = [
    // Similar structure as above
    {
      id: "41",
      creator: "NJZ",
      daysLeft: 5,
      title: "아이돌 NJZ와 함께하는 지속 가능 패션 소재",
      description: "",
      fundingPercentage: 100,
      fundingAmount: 100000,
      tags: ["라이브콘서트 NJZ 키링"],
      image: "/njz.png?height=200&width=400",
    },
    // Add more campaigns
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Banner />

        <CampaignList title="이니셔티브" campaigns={initiativeCampaigns} />

        <CampaignList title="오픈예정" campaigns={upcomingCampaigns} />

        <CampaignList title="마켓플레이스" campaigns={marketplaceCampaigns} />
      </main>
    </div>
  );
}
