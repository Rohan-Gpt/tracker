"use client"

import BlurFade from "@/components/blur-fade"
import type { TabType } from "@/types/calendar"

interface TabNavigationProps {
  activeTab: TabType
  hasAge: boolean
  onTabChange: (tab: TabType) => void
}

export const TabNavigation = ({ activeTab, hasAge, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex justify-center mb-8">
      <BlurFade delay={0.1}>
        <div className="flex border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => onTabChange("month")}
            className={`px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === "month" ? "bg-white text-black" : "bg-transparent text-gray-400 hover:text-white"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => onTabChange("year")}
            className={`px-6 py-2 text-sm font-medium transition-colors border-l border-gray-700 ${
              activeTab === "year" ? "bg-white text-black" : "bg-transparent text-gray-400 hover:text-white"
            }`}
          >
            Year
          </button>
          <button
            onClick={() => onTabChange("life")}
            className={`px-6 py-2 text-sm font-medium transition-colors border-l border-gray-700 ${
              activeTab === "life" && hasAge ? "bg-white text-black" : "bg-transparent text-gray-400 hover:text-white"
            }`}
          >
            Life
          </button>
        </div>
      </BlurFade>
    </div>
  )
}
