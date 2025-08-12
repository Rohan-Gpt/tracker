"use client"

import BlurFade from "@/components/blur-fade"
import type { LifeTimeUnit } from "@/types/calendar"

interface LifeTimeUnitTabsProps {
  activeUnit: LifeTimeUnit
  onUnitChange: (unit: LifeTimeUnit) => void
}

export const LifeTimeUnitTabs = ({ activeUnit, onUnitChange }: LifeTimeUnitTabsProps) => {
  return (
    <div className="flex justify-center mb-8">
      <BlurFade delay={0.1}>
        <div className="flex border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => onUnitChange("days")}
            className={`px-4 py-1 text-xs font-medium transition-colors ${
              activeUnit === "days" ? "bg-white text-black" : "bg-transparent text-gray-400 hover:text-white"
            }`}
          >
            Days
          </button>
          <button
            onClick={() => onUnitChange("weeks")}
            className={`px-4 py-1 text-xs font-medium transition-colors border-l border-gray-700 ${
              activeUnit === "weeks" ? "bg-white text-black" : "bg-transparent text-gray-400 hover:text-white"
            }`}
          >
            Weeks
          </button>
          <button
            onClick={() => onUnitChange("months")}
            className={`px-4 py-1 text-xs font-medium transition-colors border-l border-gray-700 ${
              activeUnit === "months" ? "bg-white text-black" : "bg-transparent text-gray-400 hover:text-white"
            }`}
          >
            Months
          </button>
        </div>
      </BlurFade>
    </div>
  )
}
