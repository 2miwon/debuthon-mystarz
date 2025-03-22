"use client";

import { useState } from "react";
import { Heart, Circle, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Campaign {
  id: string;
  creator: string;
  daysLeft: number;
  title: string;
  description: string;
  fundingPercentage: number;
  fundingAmount: number;
  tags: string[];
  image: string;
}

interface CampaignListProps {
  title: string;
  campaigns: Campaign[];
}

export function CampaignList({ title, campaigns }: CampaignListProps) {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, campaigns.length - itemsPerPage);

  const nextSlide = () => {
    setVisibleIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setVisibleIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleCampaigns = campaigns.slice(
    visibleIndex,
    visibleIndex + itemsPerPage,
  );

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium flex items-center">
          {title} <ChevronRight size={20} className="ml-1" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {visibleCampaigns.map((campaign) => (
          <div key={campaign.id} className="flex flex-col">
            <div className="flex items-center mb-4 space-x-2">
              <span className="font-medium">{campaign.creator}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">
                {campaign.daysLeft} Days Left
              </span>
            </div>

            <Link href={`/initiatives/${campaign.id}`} className="block">
              <div className="relative h-[475px] mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={
                    campaign.image || "/placeholder.svg?height=200&width=400"
                  }
                  alt={campaign.title}
                  fill
                  className="object-cover"
                />

                {/* <div className="absolute inset-x-0 bottom-0 p-4"> */}
                {/*   <p className="text-white text-sm leading-relaxed"> */}
                {/*     {campaign.title} */}
                {/*   </p> */}
                {/* </div> */}
                {/**/}
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      prevSlide();
                    }}
                    className="bg-white rounded-full p-1 shadow-md"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={16} />
                  </button>
                </div>

                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      nextSlide();
                    }}
                    className="bg-white rounded-full p-1 shadow-md"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </Link>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <button className="text-rose-500" aria-label="Like">
                  <Heart
                    size={20}
                    fill={campaign.id === "2" ? "none" : "currentColor"}
                  />
                </button>
                <button aria-label="View details">
                  <Circle size={20} />
                </button>
                <button aria-label="Play">
                  <Play size={20} />
                </button>
              </div>

              <div className="text-right">
                <span
                  className={`font-bold ${
                    campaign.fundingPercentage > 200
                      ? "text-rose-500"
                      : "text-rose-500"
                  }`}
                >
                  {campaign.fundingPercentage}
                  {title === "Initiative"
                    ? "% Funded"
                    : title === "Coming Soon"
                    ? "Waiting"
                    : "XRP"}
                </span>
              </div>
            </div>

            <div className="mb-2">
              <p className="font-medium">
                {campaign.fundingAmount.toLocaleString()} Favorites.
              </p>
            </div>

            <div className="text-sm text-gray-600">
              <p>※ Initiative {campaign.tags.join(" ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
