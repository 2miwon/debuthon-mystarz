"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Filter } from "lucide-react";
import { RewardPassList } from "@/components/reward-pass-list";
import { ImpactBadgeList } from "@/components/impact-badge-list";

export default function RewardPassPage() {
  const [activeTab, setActiveTab] = useState<"reward" | "impact">("reward");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-0">
          <h1 className="text-2xl font-bold">
            {activeTab === "reward" ? "Rewardpass" : "Impactbadge"}
          </h1>
          <div className="flex items-center space-x-4">
            <button
              className={`font-medium ${
                activeTab === "reward" ? "text-gray-700" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("reward")}
            >
              Rewardpass
            </button>
            <button
              className={`font-medium ${
                activeTab === "impact" ? "text-gray-700" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("impact")}
            >
              Impactbadge
            </button>
            <button className="p-2">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {activeTab === "reward" ? <RewardPassList /> : <ImpactBadgeList />}
      </main>
    </div>
  );
}
