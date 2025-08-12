"use client";

import { Button } from "@/components/ui/button";
import { CalendarGrid } from "./calendar-grid";
import BlurFade from "@/components/blur-fade";
import type {
  MonthData,
  YearData,
  LifeData,
  LifeTimeUnit,
} from "@/types/calendar";

interface MonthViewProps {
  data: MonthData;
}

export const MonthView = ({ data }: MonthViewProps) => (
  <div className="space-y-8">
    <BlurFade delay={0.1} inView>
      <CalendarGrid passed={data.today} total={data.daysInMonth} cols={7} />
    </BlurFade>
    <BlurFade delay={0.2}>
      <div className="flex justify-between items-center text-sm max-w-md mx-auto px-4">
        <span className="text-xs sm:text-sm">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className="text-gray-400 text-xs sm:text-sm">
          {data.daysInMonth - data.today} days left
        </span>
      </div>
    </BlurFade>
  </div>
);

interface YearViewProps {
  data: YearData;
}

export const YearView = ({ data }: YearViewProps) => (
  <div className="space-y-8">
    <BlurFade delay={0.1} inView>
      <CalendarGrid passed={data.dayOfYear} total={data.daysInYear} cols={25} />
    </BlurFade>
    <BlurFade delay={0.2}>
      <div className="flex justify-between items-center text-sm max-w-2xl mx-auto px-4">
        <span className="text-xs sm:text-sm">{data.year}</span>
        <span className="text-gray-400 text-xs sm:text-sm">
          {data.daysInYear - data.dayOfYear} days left
        </span>
      </div>
    </BlurFade>
  </div>
);

interface LifeViewProps {
  data: LifeData;
  age: number;
  timeUnit: LifeTimeUnit;
  onChangeAge: () => void;
}

export const LifeView = ({
  data,
  age,
  timeUnit,
  onChangeAge,
}: LifeViewProps) => {
  const getGridConfig = () => {
    switch (timeUnit) {
      case "days":
        return {
          passed: data.daysSinceBirth,
          total: data.averageLifespan,
          cols: 60,
        };
      case "weeks":
        return {
          passed: data.weeksSinceBirth,
          total: data.averageLifespanWeeks,
          cols: 35,
        };
      case "months":
        return {
          passed: data.monthsSinceBirth,
          total: data.averageLifespanMonths,
          cols: 25,
        };
    }
  };

  const getRemainingText = () => {
    switch (timeUnit) {
      case "days":
        return `${data.averageLifespan - data.daysSinceBirth} days left`;
      case "weeks":
        return `${data.averageLifespanWeeks - data.weeksSinceBirth} weeks left`;
      case "months":
        return `${
          data.averageLifespanMonths - data.monthsSinceBirth
        } months left`;
    }
  };

  const { passed, total, cols } = getGridConfig();

  if (timeUnit === "days" || timeUnit === "weeks") {
    return (
      <div className="space-y-8">
        <BlurFade delay={0.1}>
          <div className="flex justify-between items-center text-sm max-w-4xl mx-auto px-4">
            <span className="text-xs text-gray-400 sm:text-sm">
              Life (Age {age})
            </span>
            <Button
              onClick={onChangeAge}
              className="text-xs bg-transparent border border-gray-700/0 cursor-pointer"
            >
              Change Age
            </Button>
            <span className="text-gray-400 text-xs sm:text-sm">
              {getRemainingText()}
            </span>
          </div>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <CalendarGrid passed={passed} total={total} cols={cols} />
        </BlurFade>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <BlurFade delay={0.1} inView>
        <CalendarGrid passed={passed} total={total} cols={cols} />
      </BlurFade>
      <BlurFade delay={0.2}>
        <div className="flex justify-between items-center text-sm max-w-4xl mx-auto px-4">
          <span className="text-xs sm:text-sm">Life (Age {age})</span>
          <Button
            onClick={onChangeAge}
            className="text-xs bg-transparent border border-gray-700/0 cursor-pointer"
          >
            Change Age
          </Button>
          <span className="text-gray-400 text-xs sm:text-sm">
            {getRemainingText()}
          </span>
        </div>
      </BlurFade>
    </div>
  );
};
