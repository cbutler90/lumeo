"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ActionMenu } from "./action-menu"

export function ModuleStats() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
      },
    },
  }

  const circleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.6,
      },
    },
  }

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.7,
      },
    },
  }

  const dotVariants = {
    hover: {
      scale: 1.2,
    },
    tap: {
      scale: 0.9,
    },
  }

  const stats = [
    {
      title: "Completed Modules",
      value: "631",
      color: "completedGradient",
      progress: 70,
      delay: 0.7,
    },
    {
      title: "Badges",
      value: "87%",
      color: "badgesGradient",
      progress: 87,
      delay: 0.5,
    },
    {
      title: "Peaked",
      value: "41",
      color: "peakedGradient",
      progress: 30,
      delay: 0.9,
    },
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current)
      }

      autoPlayTimeoutRef.current = setTimeout(() => {
        setActiveIndex((prev) => (prev === stats.length - 1 ? 0 : prev + 1))
      }, 10000)
    }

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current)
      }
    }
  }, [activeIndex, isAutoPlaying, stats.length])

  const goToStat = (index: number) => {
    setActiveIndex(index)

    setIsAutoPlaying(false)

    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 15000)
  }

  const calculateOffset = (progress: number) => {
    const circumference = 2 * Math.PI * 45
    return circumference - (progress / 100) * circumference
  }

  // Action Menu
  const widgetActions = [
    {
      label: "Edit",
      onClick: () => console.log("Edit Widget"),
    },
    {
      label: "View Details",
      onClick: () => console.log("View module stats details"),
    },
    {
      label: "Export Data",
      onClick: () => console.log("Export module stats data"),
    },
    {
      label: "Remove",
      onClick: () => console.log("Remove Widget"),
      destructive: true,
    },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="bg-[linear-gradient(135deg,#252a59_0%,#1e2142_50%,#171b36_100%)] mb-6 py-5">
        <CardHeader className="flex flex-row items-center justify-between w-full">
          <CardTitle className="text-base font-medium">Overall Module Stats</CardTitle>
          <ActionMenu actions={widgetActions}/>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-2">
            <div className="relative flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="relative w-44 h-44"
                  variants={circleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#2e3151" strokeWidth="8" />

                    <defs>
                      <linearGradient id="completedGradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="25%" stopColor="#ec4899" />
                        <stop offset="50%" stopColor="#d946ef" />
                        <stop offset="75%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                      <linearGradient id="badgesGradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <linearGradient id="peakedGradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="#0c4a6e" />
                        <stop offset="50%" stopColor="#0284c7" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>

                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={`url(#${stats[activeIndex].color})`}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: calculateOffset(stats[activeIndex].progress) }}
                      transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                      transform="rotate(-90 50 50)"
                    />

                    <text
                      x="50"
                      y="35"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontSize="8"
                      fill="#a0aec0"
                      className="select-none"
                    >
                      {stats[activeIndex].title.split(" ")[0]}
                    </text>
                    {stats[activeIndex].title.split(" ").length > 1 && (
                      <text
                        x="50"
                        y="45"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="8"
                        fill="#a0aec0"
                        className="select-none"
                      >
                        {stats[activeIndex].title.split(" ")[1]}
                      </text>
                    )}
                    <motion.text
                      x="50"
                      y="65"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontSize="24"
                      fontWeight="bold"
                      fill="white"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="select-none"
                    >
                      {stats[activeIndex].value}
                    </motion.text>
                  </svg>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-2">
            {stats.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors cursor-pointer ${
                  index === activeIndex ? "bg-white" : "bg-gray-600"
                }`}
                onClick={() => goToStat(index)}
                aria-label={`Go to stat ${index + 1}`}
                variants={dotVariants}
                whileHover="hover"
                whileTap="tap"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}