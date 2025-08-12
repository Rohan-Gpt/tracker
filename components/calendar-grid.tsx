"use client"

import { useEffect, useRef, useState } from "react"

interface CalendarGridProps {
  passed: number
  total: number
  cols: number
}

export const CalendarGrid = ({ passed, total, cols }: CalendarGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    const updateScreenWidth = () => setScreenWidth(window.innerWidth)
    updateScreenWidth()
    window.addEventListener("resize", updateScreenWidth)
    return () => window.removeEventListener("resize", updateScreenWidth)
  }, [])

  const getOptimalGrid = () => {
    let responsiveCols = cols

    // Adjust columns based on screen size
    if (screenWidth > 0) {
      if (screenWidth < 640) {
        // mobile
        responsiveCols = Math.min(cols, Math.floor(screenWidth / 16)) // 16px per dot + gap
      } else if (screenWidth < 1024) {
        // tablet
        responsiveCols = Math.min(cols, Math.floor(screenWidth / 14))
      }
    }

    // Ensure we have at least 10 columns minimum for readability
    responsiveCols = Math.max(10, responsiveCols)

    // Calculate perfect grid dimensions
    const rows = Math.ceil(total / responsiveCols)
    const perfectTotal = rows * responsiveCols

    return { cols: responsiveCols, rows, perfectTotal }
  }

  const { cols: finalCols, rows, perfectTotal } = getOptimalGrid()

  // Use Canvas for large numbers of dots (like days view), DOM for smaller numbers
  const useCanvas = total > 5000

  useEffect(() => {
    if (!useCanvas || !canvasRef.current || screenWidth === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Calculate canvas dimensions
    const dotSize = 4
    const gap = 8
    const canvasWidth = finalCols * dotSize + (finalCols - 1) * gap
    const canvasHeight = rows * dotSize + (rows - 1) * gap

    // Set canvas size
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    for (let i = 0; i < perfectTotal; i++) {
      const row = Math.floor(i / finalCols)
      const col = i % finalCols
      const x = col * (dotSize + gap)
      const y = row * (dotSize + gap)

      // Set color: white for passed days, gray for remaining/extra days
      if (i < passed) {
        ctx.fillStyle = "#ffffff"
      } else {
        ctx.fillStyle = "#4b5563"
      }

      ctx.beginPath()
      ctx.arc(x + dotSize / 2, y + dotSize / 2, dotSize / 2, 0, 2 * Math.PI)
      ctx.fill()
    }
  }, [passed, total, finalCols, rows, perfectTotal, useCanvas, screenWidth])

  if (useCanvas) {
    return (
      <div className="flex justify-center px-4">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    )
  }

  const dots = []
  for (let i = 0; i < perfectTotal; i++) {
    dots.push(<div key={i} className={`w-1 h-1 rounded-full ${i < passed ? "bg-white" : "bg-gray-600"}`} />)
  }

  return (
    <div className="px-4">
      <div className="grid gap-2 justify-center mx-auto" style={{ gridTemplateColumns: `repeat(${finalCols}, 4px)` }}>
        {dots}
      </div>
    </div>
  )
}
