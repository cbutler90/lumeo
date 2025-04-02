"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, BarChart, PieChart } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ChangeChip } from "./change-chip"
import { ActionMenu, type ActionItem } from "./action-menu"

export function StatsCards() {
  const stats = [
    {
      title: "Active Students",
      value: "1.5K",
      numericValue: 1500,
      change: "+4.5%",
      icon: Users,
      color: "text-[var(--primary)]",
    },
    {
      title: "Active Courses",
      value: "8",
      numericValue: 8,
      icon: BookOpen,
      color: "text-[var(--secondary)]",
    },
    {
      title: "Average Grade",
      value: "95%",
      numericValue: 95,
      change: "-1.2%",
      icon: BarChart,
      color: "text-[var(--destructive)]",
    },
    {
      title: "Completion Rate",
      value: "91%",
      numericValue: 91,
      change: "+2.7%",
      icon: PieChart,
      color: "text-[var(--success)]",
    },
  ]

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  const iconVariants = {
    initial: { scale: 0 },
    animate: (index: number) => ({
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2 + index * 0.1,
      },
    }),
  }

  const changeChipVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.5, duration: 0.3 },
    },
  }

  // Action Menu
  const getActions = (statTitle: string): ActionItem[] => {
    return [
      {
        label: "Edit",
        onClick: () => console.log(`Edit ${statTitle} Widget`),
      },
      {
        label: "Settings",
        onClick: () => console.log(`Settings for ${statTitle} Widget`),
      },
      {
        label: "Remove",
        onClick: () => console.log(`Remove ${statTitle} Widget`),
        destructive: true,
      },
    ]
  }

  return (
    <motion.div
      className="col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={item}>
          <Card className="bg-[linear-gradient(279deg,rgba(255,255,255,0.07)_0.99%,rgba(255,255,255,0.04)_96.11%)]">
            <CardContent className="px-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between items-start w-full">
                    <div className="flex flex-row items-center mb-2">
                      <motion.div
                        className={`${stat.color}`}
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        custom={index}
                      >
                        <stat.icon className="h-5 w-5" fill="currentColor" fillOpacity="0.3" />
                      </motion.div>
                      <span className="text-sm text-gray-400 ml-2 font-medium">{stat.title}</span>
                    </div>
                    <ActionMenu actions={getActions(stat.title)} />
                  </div>
                  <div className="flex items-center mt-1">
                    <CountUp
                      from={0}
                      to={stat.numericValue}
                      format={stat.title.includes("Students") ? "1.5K" : stat.value}
                    />
                    {stat.change && (
                      <motion.span className="ml-2" variants={changeChipVariants} initial="initial" animate="animate">
                        <ChangeChip change={stat.change} />
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

function CountUp({ from, to, format }: { from: number; to: number; format: string }) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / 1500, 1)
      const currentCount = Math.floor(from + (to - from) * progress)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [from, to])

  if (format === "1.5K") {
    return <span className="text-2xl font-bold">1.5K</span>
  }

  if (format.includes("%")) {
    return <span className="text-2xl font-bold">{count}%</span>
  }

  return <span className="text-2xl font-bold">{count}</span>
}