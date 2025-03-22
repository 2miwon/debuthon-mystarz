"use client";

import { useState } from "react";
import { Heart, Circle, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Campaign {
  id: string;
  creator: string;
  daysLeft: number;
  icon: string;
  title: string;
  description: string;
  fundingPercentage: number;
  fundingAmount: number;
  tags: string[];
  rewardPass: string;
  image: string;
}

interface CampaignListProps {
  title: string;
  campaigns: Campaign[];
  type?: string | "RewardPass";
}

export function CampaignList({ title, campaigns, type }: CampaignListProps) {
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
        {title && (
          <h2 className="text-xl font-bold flex items-center">
            {title} <ChevronRight size={20} className="ml-1" />
          </h2>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {visibleCampaigns.map((campaign) => (
          <div key={campaign.id} className="flex flex-col">
            <div className="flex items-center mb-4 space-x-2">
              <Image
                src={campaign.icon || ""}
                alt="icon"
                width={50}
                height={50}
              />
              <span className="font-medium">{campaign.creator}</span>
              {type === "Marketplace" ? (
                ""
              ) : (
                <span className="text-gray-500">•</span>
              )}
              {type === "Marketplace" ? (
                ""
              ) : type === "RewardPass" || type === "ImpactBadge" ? (
                <span className="text-gray-500">2025.05.25</span>
              ) : (
                <span className="text-gray-500">
                  {campaign.daysLeft} Days Left
                </span>
              )}
            </div>

            <Link
              href={
                type === "ImpactBadge"
                  ? `impact-badge/${campaign.id}`
                  : type === "Marketplace"
                  ? `marketplace/${campaign.id}`
                  : type === "RewardPass"
                  ? `reward-pass/${campaign.id}`
                  : `/initiatives/${campaign.id}`
              }
              className="block"
            >
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
                {/* <div className="absolute left-2 top-1/2 -translate-y-1/2"> */}
                {/*   <button */}
                {/*     onClick={(e) => { */}
                {/*       e.preventDefault(); */}
                {/*       prevSlide(); */}
                {/*     }} */}
                {/*     className="bg-white rounded-full p-1 shadow-md" */}
                {/*     aria-label="Previous slide" */}
                {/*   > */}
                {/*     <ChevronLeft size={16} /> */}
                {/*   </button> */}
                {/* </div> */}

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
                  {/* <Heart */}
                  {/*   size={20} */}
                  {/*   fill={campaign.id === "2" ? "none" : "currentColor"} */}
                  {/* /> */}
                  {/**/}
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 26L13.26 24.4414C11.24 22.6231 9.57 21.0545 8.25 19.7357C6.93 18.4169 5.88 17.233 5.1 16.1839C4.32 15.1349 3.775 14.1708 3.465 13.2916C3.155 12.4124 3 11.5132 3 10.594C3 8.71571 3.63 7.14714 4.89 5.88828C6.15 4.62943 7.72 4 9.6 4C10.64 4 11.63 4.2198 12.57 4.6594C13.51 5.099 14.32 5.71844 15 6.51771C15.68 5.71844 16.49 5.099 17.43 4.6594C18.37 4.2198 19.36 4 20.4 4C22.28 4 23.85 4.62943 25.11 5.88828C26.37 7.14714 27 8.71571 27 10.594C27 11.5132 26.845 12.4124 26.535 13.2916C26.225 14.1708 25.68 15.1349 24.9 16.1839C24.12 17.233 23.07 18.4169 21.75 19.7357C20.43 21.0545 18.76 22.6231 16.74 24.4414L15 26Z"
                      fill="#DC2626"
                    />
                  </svg>
                </button>
                {type === "RewardPass" || type === "ImpactBadge" ? (
                  <></>
                ) : (
                  <button aria-label="View details">
                    {/* <Circle size={20} />'' */}

                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.0588 26L14.7794 22.7H14.5C11.8549 22.7 9.61029 21.7925 7.76618 19.9775C5.92206 18.1625 5 15.9533 5 13.35C5 10.7467 5.92206 8.5375 7.76618 6.7225C9.61029 4.9075 11.8549 4 14.5 4C15.8225 4 17.0566 4.24292 18.2022 4.72875C19.3478 5.21458 20.3537 5.88375 21.2199 6.73625C22.086 7.58875 22.7659 8.57875 23.2596 9.70625C23.7532 10.8337 24 12.0483 24 13.35C24 14.725 23.7718 16.045 23.3154 17.31C22.8591 18.575 22.2351 19.7483 21.4434 20.83C20.6517 21.9117 19.711 22.8925 18.6213 23.7725C17.5316 24.6525 16.3441 25.395 15.0588 26ZM17.2941 21.985C18.6167 20.885 19.6924 19.5971 20.5213 18.1212C21.3502 16.6454 21.7647 15.055 21.7647 13.35C21.7647 11.3517 21.0615 9.66042 19.6551 8.27625C18.2488 6.89208 16.5304 6.2 14.5 6.2C12.4696 6.2 10.7512 6.89208 9.34485 8.27625C7.93848 9.66042 7.23529 11.3517 7.23529 13.35C7.23529 15.3483 7.93848 17.0396 9.34485 18.4237C10.7512 19.8079 12.4696 20.5 14.5 20.5H17.2941V21.985Z"
                        fill="#1F1F1F"
                      />
                    </svg>
                  </button>
                )}
                <button aria-label="Play">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 26V4L27 15L3 26ZM5.52632 21.875L20.4947 15L5.52632 8.125V12.9375L13.1053 15L5.52632 17.0625V21.875Z"
                      fill="#1F1F1F"
                    />
                  </svg>
                  {/* <Play size={20} /> */}
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
                  {type === "Marketplace"
                    ? "30"
                    : type === "RewardPass" || type === "ImpactBadge"
                    ? undefined
                    : campaign.fundingPercentage}
                  {type === "RewardPass" || type === "ImpactBadge"
                    ? ""
                    : title === "Initiative"
                    ? "% Funded"
                    : title === "Coming Soon"
                    ? "Waiting"
                    : "XRP"}
                </span>
              </div>
            </div>

            <div className="mb-2">
              <p className="font-medium">
                {type === "Marketplace"
                  ? "200"
                  : type === "RewardPass" || type === "ImpactBadge"
                  ? "1 Item Owned"
                  : campaign.fundingAmount.toLocaleString()}{" "}
                {type === "Marketplace"
                  ? "Items Sold"
                  : type === "RewardPass" || type === "ImpactBadge"
                  ? ""
                  : "Favorites."}
              </p>
            </div>

            {type === "xxx" ? (
              <></>
            ) : (
              <>
                <div className="flex text-sm text-gray-600">
                  <InitiativeIcon />
                  <p>
                    <span className="font-bold">Initiative</span>{" "}
                    {campaign.tags.join(" ")}
                  </p>
                </div>

                <div className="flex text-sm text-gray-600">
                  <RewardPass />
                  <p>
                    <span className="font-bold">Rewardpass</span>{" "}
                    {campaign.rewardPass}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function InitiativeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9533 16.1842L15.7103 13.8158L16.757 12.7105L19 15.0789L17.9533 16.1842ZM15.2617 6.71053L14.215 5.60526L16.4579 3.23684L17.5047 4.34211L15.2617 6.71053ZM6.73832 6.71053L4.49533 4.34211L5.54206 3.23684L7.78505 5.60526L6.73832 6.71053ZM4.04673 16.1842L3 15.0789L5.24299 12.7105L6.28972 13.8158L4.04673 16.1842ZM8.64486 14.7039L11 13.2039L13.3551 14.7237L12.7383 11.8816L14.8131 9.98684L12.0841 9.73026L11 7.04605L9.91589 9.71053L7.18692 9.9671L9.26168 11.8816L8.64486 14.7039ZM6.38318 18L7.59813 12.4539L3.52336 8.72368L8.90654 8.23026L11 3L13.0935 8.23026L18.4766 8.72368L14.4019 12.4539L15.6168 18L11 15.0592L6.38318 18Z"
        fill="#1F1F1F"
      />
    </svg>
  );
}

function RewardPass() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.76 13.75L11 12.0437L13.2 13.75L12.36 10.9875L14.6 9.2H11.88L11 6.4375L10.12 9.2H7.4L9.6 10.9875L8.76 13.75ZM4.6 17C4.16 17 3.78333 16.8409 3.47 16.5227C3.15667 16.2044 3 15.8219 3 15.375V12.6328C3 12.4839 3.04667 12.3552 3.14 12.2469C3.23333 12.1385 3.35333 12.0708 3.5 12.0437C3.82 11.9354 4.08333 11.7391 4.29 11.4547C4.49667 11.1703 4.6 10.8521 4.6 10.5C4.6 10.1479 4.49667 9.82969 4.29 9.54531C4.08333 9.26094 3.82 9.06458 3.5 8.95625C3.35333 8.92917 3.23333 8.86146 3.14 8.75312C3.04667 8.64479 3 8.51615 3 8.36719V5.625C3 5.17812 3.15667 4.79557 3.47 4.47734C3.78333 4.15911 4.16 4 4.6 4H17.4C17.84 4 18.2167 4.15911 18.53 4.47734C18.8433 4.79557 19 5.17812 19 5.625V8.36719C19 8.51615 18.9533 8.64479 18.86 8.75312C18.7667 8.86146 18.6467 8.92917 18.5 8.95625C18.18 9.06458 17.9167 9.26094 17.71 9.54531C17.5033 9.82969 17.4 10.1479 17.4 10.5C17.4 10.8521 17.5033 11.1703 17.71 11.4547C17.9167 11.7391 18.18 11.9354 18.5 12.0437C18.6467 12.0708 18.7667 12.1385 18.86 12.2469C18.9533 12.3552 19 12.4839 19 12.6328V15.375C19 15.8219 18.8433 16.2044 18.53 16.5227C18.2167 16.8409 17.84 17 17.4 17H4.6ZM4.6 15.375H17.4V13.3031C16.9067 13.0052 16.5167 12.6091 16.23 12.1148C15.9433 11.6206 15.8 11.0823 15.8 10.5C15.8 9.91771 15.9433 9.37943 16.23 8.88516C16.5167 8.39089 16.9067 7.99479 17.4 7.69687V5.625H4.6V7.69687C5.09333 7.99479 5.48333 8.39089 5.77 8.88516C6.05667 9.37943 6.2 9.91771 6.2 10.5C6.2 11.0823 6.05667 11.6206 5.77 12.1148C5.48333 12.6091 5.09333 13.0052 4.6 13.3031V15.375Z"
        fill="black"
      />
    </svg>
  );
}
