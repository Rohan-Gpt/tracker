export interface MonthData {
  today: number
  daysInMonth: number
  year: number
  month: number
}

export interface YearData {
  dayOfYear: number
  daysInYear: number
  year: number
}

export interface LifeData {
  daysSinceBirth: number
  averageLifespan: number
  weeksSinceBirth: number
  averageLifespanWeeks: number
  monthsSinceBirth: number
  averageLifespanMonths: number
}

export type CalendarData = MonthData | YearData | LifeData

export type TabType = "month" | "year" | "life"
export type LifeTimeUnit = "days" | "weeks" | "months"
