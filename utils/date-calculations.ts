import type { MonthData, YearData, LifeData } from "@/types/calendar"

export const getCurrentMonthData = (): MonthData => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const today = now.getDate()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return { today, daysInMonth, year, month }
}

export const getCurrentYearData = (): YearData => {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1
  const isLeapYear = now.getFullYear() % 4 === 0
  const daysInYear = isLeapYear ? 366 : 365

  return { dayOfYear, daysInYear, year: now.getFullYear() }
}

export const getLifeData = (age: number): LifeData => {
  const now = new Date()
  const birthYear = now.getFullYear() - age
  const birthday = new Date(birthYear, now.getMonth(), now.getDate())
  const daysSinceBirth = Math.floor((now.getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24))
  const averageLifespan = 80 * 365

  const weeksSinceBirth = Math.floor(daysSinceBirth / 7)
  const averageLifespanWeeks = Math.floor(averageLifespan / 7)

  const monthsSinceBirth = Math.floor(daysSinceBirth / 30.44)
  const averageLifespanMonths = Math.floor(averageLifespan / 30.44)

  return {
    daysSinceBirth,
    averageLifespan,
    weeksSinceBirth,
    averageLifespanWeeks,
    monthsSinceBirth,
    averageLifespanMonths,
  }
}
