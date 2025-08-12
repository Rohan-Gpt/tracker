import type { TabType, LifeTimeUnit } from "@/types/calendar"

export const saveAge = (age: number): void => {
  localStorage.setItem("userAge", age.toString())
}

export const getAge = (): number | null => {
  const savedAge = localStorage.getItem("userAge")
  return savedAge ? Number.parseInt(savedAge) : null
}

export const saveActiveTab = (tab: TabType): void => {
  localStorage.setItem("activeTab", tab)
}

export const getActiveTab = (): TabType | null => {
  return localStorage.getItem("activeTab") as TabType | null
}

export const saveLifeTimeUnit = (unit: LifeTimeUnit): void => {
  localStorage.setItem("lifeTimeUnit", unit)
}

export const getLifeTimeUnit = (): LifeTimeUnit | null => {
  return localStorage.getItem("lifeTimeUnit") as LifeTimeUnit | null
}

export const clearAllData = (): void => {
  localStorage.removeItem("userAge")
  localStorage.removeItem("activeTab")
  localStorage.removeItem("lifeTimeUnit")
}
