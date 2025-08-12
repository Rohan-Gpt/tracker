"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/blur-fade";

interface AgeDialogProps {
  isOpen: boolean;
  onSave: (age: number) => void;
  onCancel: () => void;
  currentAge?: number | null;
  isChangingAge?: boolean;
}

export const AgeDialog = ({
  isOpen,
  onSave,
  onCancel,
  currentAge,
  isChangingAge,
}: AgeDialogProps) => {
  const [inputAge, setInputAge] = useState("");

  useEffect(() => {
    if (isOpen && isChangingAge && currentAge) {
      setInputAge(currentAge.toString());
    } else if (isOpen && !isChangingAge) {
      setInputAge("");
    }
  }, [isOpen, isChangingAge, currentAge]);

  const handleSave = () => {
    const ageNum = Number.parseInt(inputAge);
    if (ageNum > 0 && ageNum < 120) {
      onSave(ageNum);
      setInputAge("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <BlurFade delay={0.1}>
        <Card className="bg-black border-white/20 p-6 max-w-md mx-4">
          <div className="relative">
            <button
              onClick={onCancel}
              className="absolute -top-2 -right-2 w-6 h-6 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center text-black text-sm"
            >
              ×
            </button>

            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-lg font-medium text-white">
                {isChangingAge ? "Change Your Age" : "Enter Your Age"}
              </h2>
              <Input
                type="number"
                placeholder="Enter your age"
                value={inputAge}
                onChange={(e) => setInputAge(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-black text-white placeholder:text-gray-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                min="1"
                max="120"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  {isChangingAge ? "Update Age" : "Save Age"}
                </Button>
                <Button
                  onClick={onCancel}
                  className="bg-transparent border-[0.1px] border-white/20 text-white hover:bg-white hover:text-black"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </BlurFade>
    </div>
  );
};
