"use client"

import { cn } from "@/lib/utils"
import { useCallback, useEffect, useRef, useState } from "react"
import { ProgressiveBlur } from "./ui/skiper-ui/progressive-blur"

interface ResizableWindowProps {
  children: React.ReactNode
  className?: string
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
}

export function ResizableWindow({
  children,
  className,
  minWidth = 400,
  minHeight = 300,
  maxWidth,
  maxHeight,
}: ResizableWindowProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [dimensions, setDimensions] = useState({
    width: 1200,
    height: 800,
  })

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const effectiveMaxWidth = maxWidth || windowSize.width - 64
  const effectiveMaxHeight = maxHeight || windowSize.height - 200

  const [isResizing, setIsResizing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLElement>(null)

  const handleMouseDown = useCallback(
    (direction: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const startX = e.clientX
      const startY = e.clientY
      const startWidth = dimensions.width
      const startHeight = dimensions.height

      setIsResizing(true)

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX
        const deltaY = e.clientY - startY

        let newWidth = startWidth
        let newHeight = startHeight

        if (direction.includes("right")) {
          newWidth = Math.max(
            minWidth,
            Math.min(effectiveMaxWidth, startWidth + deltaX)
          )
        }
        if (direction.includes("left")) {
          newWidth = Math.max(
            minWidth,
            Math.min(effectiveMaxWidth, startWidth - deltaX)
          )
        }
        if (direction.includes("bottom")) {
          newHeight = Math.max(
            minHeight,
            Math.min(effectiveMaxHeight, startHeight + deltaY)
          )
        }
        if (direction.includes("top")) {
          newHeight = Math.max(
            minHeight,
            Math.min(effectiveMaxHeight, startHeight - deltaY)
          )
        }

        setDimensions({ width: newWidth, height: newHeight })
      }

      const handleMouseUp = () => {
        setIsResizing(false)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [
      dimensions.width,
      dimensions.height,
      minWidth,
      minHeight,
      effectiveMaxWidth,
      effectiveMaxHeight,
    ]
  )

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const startX = e.clientX
      const startY = e.clientY
      const startPosX = position.x
      const startPosY = position.y

      setIsDragging(true)

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX
        const deltaY = e.clientY - startY

        setPosition({
          x: startPosX + deltaX,
          y: startPosY + deltaY,
        })
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [position.x, position.y]
  )

  return (
    <main
      ref={windowRef}
      className={cn(
        "bg-background relative flex flex-col rounded-3xl shadow-2xl backdrop-blur-3xl transition-all duration-150",
        (isResizing || isDragging) && "select-none",
        className
      )}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        transform: `translate(${position.x}px, ${position.y}px)`,
        margin: "auto",
        marginTop: "8px",
        marginBottom: "16px",
      }}
    >
      {/* Content flows under title bar - full height */}
      <div className="absolute inset-0 overflow-auto rounded-3xl">
        {children}
      </div>

      {/* Progressive blur overlay at top */}
      <ProgressiveBlur
        position="top"
        height="100px"
        className="pointer-events-none absolute top-0 right-0 left-0 z-10 rounded-t-3xl"
        blurAmount="50px"
        transparent={true}
      />

      {/* Title bar floats on top - completely transparent */}
      <div
        className={cn(
          "absolute top-0 right-0 left-0 z-50 flex cursor-move items-center justify-between rounded-t-3xl bg-transparent px-6 py-4",
          isDragging && "cursor-grabbing"
        )}
        onMouseDown={handleDragStart}
      >
        <div className="flex items-center gap-3">
          {/* macOS-style window controls */}
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500 shadow-lg transition-colors hover:bg-red-600"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500 shadow-lg transition-colors hover:bg-yellow-600"></div>
            <div className="h-3 w-3 rounded-full bg-green-500 shadow-lg transition-colors hover:bg-green-600"></div>
          </div>
          <span className="text-foreground text-center text-sm font-medium drop-shadow-lg">
            jiaweing/ui
          </span>
        </div>
        <div className="text-xs text-white/70 drop-shadow-lg">
          {dimensions.width} × {dimensions.height}
        </div>
      </div>

      {/* Resize handles */}
      {/* Corners */}
      <div
        className="absolute -top-2 -left-2 z-10 h-6 w-6 cursor-nw-resize rounded-full border-2 border-blue-500/40 bg-blue-500/20 opacity-0 transition-opacity hover:opacity-100"
        onMouseDown={handleMouseDown("top-left")}
      />
      <div
        className="absolute -top-2 -right-2 z-10 h-6 w-6 cursor-ne-resize rounded-full border-2 border-blue-500/40 bg-blue-500/20 opacity-0 transition-opacity hover:opacity-100"
        onMouseDown={handleMouseDown("top-right")}
      />
      <div
        className="absolute -bottom-2 -left-2 z-10 h-6 w-6 cursor-sw-resize rounded-full border-2 border-blue-500/40 bg-blue-500/20 opacity-0 transition-opacity hover:opacity-100"
        onMouseDown={handleMouseDown("bottom-left")}
      />
      <div
        className="absolute -right-2 -bottom-2 z-10 h-6 w-6 cursor-se-resize rounded-full border-2 border-blue-500/40 bg-blue-500/20 opacity-0 transition-opacity hover:opacity-100"
        onMouseDown={handleMouseDown("bottom-right")}
      />

      {/* Edges */}
      <div
        className="absolute -top-2 right-6 left-6 z-10 h-4 cursor-n-resize rounded border border-blue-500/30 bg-blue-500/10 opacity-0 transition-opacity hover:opacity-100"
        onMouseDown={handleMouseDown("top")}
      />
      <div
        className="absolute right-6 -bottom-2 left-6 z-10 h-4 cursor-s-resize rounded border border-blue-500/30 bg-blue-500/10 opacity-0 transition-opacity hover:opacity-100"
        onMouseDown={handleMouseDown("bottom")}
      />
      <div
        className="absolute top-6 bottom-6 -left-2 z-10 w-4 cursor-w-resize rounded border border-blue-500/30 bg-blue-500/10 opacity-0 transition-opacity hover:opacity-100"
        onMouseDown={handleMouseDown("left")}
      />
      <div
        className="absolute top-6 -right-2 bottom-6 z-10 w-4 cursor-e-resize rounded border border-blue-500/30 bg-blue-500/10 opacity-0 transition-opacity hover:opacity-100"
        onMouseDown={handleMouseDown("right")}
      />

      {/* Visual feedback when resizing or dragging */}
      {isResizing && (
        <div className="pointer-events-none absolute inset-0 animate-pulse rounded-3xl border-2 border-blue-500" />
      )}
      {isDragging && (
        <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-green-500" />
      )}
    </main>
  )
}
