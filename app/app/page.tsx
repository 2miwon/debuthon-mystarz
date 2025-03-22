import { Header } from "@/components/header";
import { Banner } from "@/components/banner";
import { CampaignList } from "@/components/campaign-list";
import EyeCatches from "@/components/eyecatches";

export default function CampaignListPage() {
  // Sample campaign data
  const initiativeCampaigns = [
    {
      id: "37",
      creator: "NJZ",
      daysLeft: 2,
      title: "An Animal Welfare Initiative with NJZ",
      description:
        "대형 아이돌 그룹 NJZ와 지구를 지키자! 유기농 및 천연 염료 등의 패션 소재로 환경 보호와 사회적 책임을 동시에 실현하자!",
      fundingPercentage: 258,
      fundingAmount: 2000,
      tags: ["An Animal Welfare Initiative with NJZ"],
      image: "/init-1.png?height=200&width=400",
    },
    {
      id: "38",
      creator: "Tom Holland",
      daysLeft: 7,
      title: "변우석과 함께하는 주거 취약계층 지원 이니셔티브",
      description: "",
      fundingPercentage: 210,
      fundingAmount: 1000,
      tags: ['"Neighborhood Heroes: Tom Holland"'],
      image: "/init-2.png?height=200&width=400",
    },
    {
      id: "39",
      creator: "Jungkook",
      daysLeft: 29,
      title: "손홍민과 함께하는 장애 아동 축구 캠프 이니셔티브",
      description: "",
      fundingPercentage: 77,
      fundingAmount: 777,
      tags: ["Jungkook’s Climate Action Initiative"],
      image: "/init-3.png?height=200&width=400",
    },
    // Add more campaigns if needed
  ];

  const upcomingCampaigns = [
    // Similar structure as above
    {
      id: "40",
      creator: "IU",
      daysLeft: 1,
      title: "한소희와 함께하는 환경 보호 캠페인",
      description: "",
      fundingPercentage: 150,
      fundingAmount: 5000,
      tags: ["IU’s Bloom for Her"],
      image: "/cs-1.png?height=200&width=400",
    },
    {
      id: "41",
      creator: "IU",
      daysLeft: 1,
      title: "한소희와 함께하는 환경 보호 캠페인",
      description: "",
      fundingPercentage: 150,
      fundingAmount: 5000,
      tags: ["IU’s Bloom for Her"],
      image: "/cs-2.png?height=200&width=400",
    },
    {
      id: "42",
      creator: "IU",
      daysLeft: 1,
      title: "한소희와 함께하는 환경 보호 캠페인",
      description: "",
      fundingPercentage: 150,
      fundingAmount: 5000,
      tags: ["IU’s Bloom for Her"],
      image: "/cs-2.png?height=200&width=400",
    },
    // Add more campaigns
  ];

  const marketplaceCampaigns = [
    // Similar structure as above
    {
      id: "51",
      creator: "NJZ",
      daysLeft: 5,
      title: "아이돌 NJZ와 함께하는 지속 가능 패션 소재",
      description: "",
      fundingPercentage: 100,
      fundingAmount: 100000,
      tags: ["An Animal Welfare Initiative with NJZ"],
      image: "/mk-1.png?height=200&width=400",
    },
    {
      id: "52",
      creator: "NJZ",
      daysLeft: 5,
      title: "아이돌 NJZ와 함께하는 지속 가능 패션 소재",
      description: "",
      fundingPercentage: 100,
      fundingAmount: 100000,
      tags: ["An Animal Welfare Initiative with NJZ"],
      image: "/mk-1.png?height=200&width=400",
    },
    {
      id: "53",
      creator: "NJZ",
      daysLeft: 5,
      title: "아이돌 NJZ와 함께하는 지속 가능 패션 소재",
      description: "",
      fundingPercentage: 100,
      fundingAmount: 100000,
      tags: ["An Animal Welfare Initiative with NJZ"],
      image: "/mk-3.png?height=200&width=400",
    },
    // Add more campaigns
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Banner />

        <EyeCatches />

        <CampaignList title="Initiative" campaigns={initiativeCampaigns} />

        <CampaignList title="Coming Soon" campaigns={upcomingCampaigns} />

        <CampaignList title="Marketplace" campaigns={marketplaceCampaigns} />
      </main>
    </div>
  );
}
