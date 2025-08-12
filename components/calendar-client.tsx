"use client"

import { useState, useEffect } from "react"
import { AgeDialog } from "@/components/age-dialog"
import { LoadingAnimation } from "@/components/loading-animation"
import { TabNavigation } from "@/components/tab-navigation"
import { LifeTimeUnitTabs } from "@/components/life-time-unit-tabs"
import { MonthView, YearView, LifeView } from "@/components/calendar-views"
import BlurFade from "@/components/blur-fade"
import { getLifeData } from "@/utils/date-calculations"
import {
  saveAge as saveAgeToStorage,
  getAge,
  saveActiveTab,
  getActiveTab,
  saveLifeTimeUnit,
  getLifeTimeUnit,
} from "@/utils/local-storage"
import type { TabType, LifeTimeUnit, MonthData, YearData } from "@/types/calendar"

interface CalendarClientProps {
  monthData: MonthData
  yearData: YearData
}

export function CalendarClient({ monthData, yearData }: CalendarClientProps) {
  const [age, setAge] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>("month")
  const [lifeTimeUnit, setLifeTimeUnit] = useState<LifeTimeUnit>("weeks")
  const [showAgeDialog, setShowAgeDialog] = useState(false)
  const [isLoadingDays, setIsLoadingDays] = useState(false)
  const [daysRendered, setDaysRendered] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isChangingAge, setIsChangingAge] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    const savedAge = getAge()
    const savedTab = getActiveTab()
    const savedLifeTimeUnit = getLifeTimeUnit()

    if (savedAge) setAge(savedAge)
    if (savedTab) setActiveTab(savedTab)
    if (savedLifeTimeUnit) setLifeTimeUnit(savedLifeTimeUnit)
  }, [])

  const handleSaveAge = (newAge: number) => {
    if (!age || newAge !== age) {
      setAge(newAge)
      saveAgeToStorage(newAge)

      if (!isChangingAge) {
        setLifeTimeUnit("weeks")
        saveLifeTimeUnit("weeks")
        setActiveTab("life")
        saveActiveTab("life")
      }

      setDaysRendered(false)
    }

    setShowAgeDialog(false)
    setIsChangingAge(false)
  }

  const handleTabChange = (tab: TabType) => {
    if (isHydrated) {
      saveActiveTab(tab)
    }

    if (tab === "life") {
      if (!age) {
        setShowAgeDialog(true)
        setIsChangingAge(false)
      } else {
        if (lifeTimeUnit === "days" && !daysRendered) {
          setIsLoadingDays(true)
          setTimeout(() => {
            setActiveTab("life")
            setDaysRendered(true)
            setIsLoadingDays(false)
          }, 100)
        } else {
          setActiveTab("life")
        }
      }
    } else {
      setActiveTab(tab)
    }
  }

  const handleLifeTimeUnitChange = (unit: LifeTimeUnit) => {
    if (isHydrated) {
      saveLifeTimeUnit(unit)
    }

    if (unit === "days" && !daysRendered) {
      setIsLoadingDays(true)
      setTimeout(() => {
        setLifeTimeUnit(unit)
        setDaysRendered(true)
        setIsLoadingDays(false)
      }, 100)
    } else {
      setLifeTimeUnit(unit)
    }
  }

  const handleChangeAge = () => {
    setIsChangingAge(true)
    setShowAgeDialog(true)
  }

  const handleCancelAgeDialog = () => {
    setShowAgeDialog(false)
    setIsChangingAge(false)
  }

  const lifeData = age ? getLifeData(age) : null

  return (
    <>
      <BlurFade delay={0.1}>
        <TabNavigation activeTab={activeTab} hasAge={!!age} onTabChange={handleTabChange} />
      </BlurFade>

      <AgeDialog
        isOpen={showAgeDialog}
        onSave={handleSaveAge}
        onCancel={handleCancelAgeDialog}
        currentAge={age}
        isChangingAge={isChangingAge}
      />

      {activeTab === "life" && age && (
        <BlurFade delay={0.2}>
          <LifeTimeUnitTabs activeUnit={lifeTimeUnit} onUnitChange={handleLifeTimeUnitChange} />
        </BlurFade>
      )}

      <BlurFade delay={0.3} className="flex-1 flex flex-col justify-center px-8">
        {isLoadingDays ? (
          <LoadingAnimation />
        ) : (
          <>
            {activeTab === "month" && <MonthView data={monthData} />}
            {activeTab === "year" && <YearView data={yearData} />}
            {activeTab === "life" && age && lifeData && (
              <LifeView data={lifeData} age={age} timeUnit={lifeTimeUnit} onChangeAge={handleChangeAge} />
            )}
          </>
        )}
      </BlurFade>
    </>
  )
}
