"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChangeChip } from "./change-chip"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid } from "recharts"
import { ActionMenu } from "./action-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface VRStatsProps {
  title: string
  value: string
  change?: string
  timePeriod: string
  type: "line" | "bar"
}

// Define proper types for the tooltip components
interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
    name: string
  }>
  label?: string
}

// Export as default for lazy loading compatibility
export function VRStats({ title, value, change, timePeriod: initialTimePeriod, type }: VRStatsProps) {
  const [timePeriod, setTimePeriod] = useState(initialTimePeriod)

  const timePeriods = ["Last 7 days", "Last 30 days", "Last 90 days", "Last year", "All time"]

  // Sample data for the charts
  const lineData = [
    { name: "Jan 1", value: 10 },
    { name: "Jan 4", value: 90 },
    { name: "Jan 8", value: 60 },
    { name: "Jan 15", value: 150 },
    { name: "Jan 18", value: 250 },
    { name: "Jan 22", value: 380 },
    { name: "Jan 26", value: 150 },
    { name: "Jan 29", value: 250 },
    { name: "Feb 1", value: 180 },
  ]

  const barData = [
    { name: "Jan 1", value: 95 },
    { name: "Jan 8", value: 90 },
    { name: "Jan 15", value: 92 },
    { name: "Jan 22", value: 94 },
    { name: "Jan 29", value: 88 },
    { name: "Feb 5", value: 96 },
    { name: "Feb 12", value: 91 },
    { name: "Feb 19", value: 95 },
    { name: "Feb 26", value: 93 },
  ]

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  }

  const contentVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
      },
    },
  }

  const changeChipVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
      },
    },
  }

  const chartContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.7,
      },
    },
  }

  // Tooltip components with proper type definitions
  const BarTooltip = ({ active, payload, label }: ChartTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e2142] border border-[#3e4161] p-2 rounded-md shadow-lg">
          <p className="text-white text-xs font-medium">{label}</p>
          <p className="text-[#0FF] text-xs">value : {payload[0].value}</p>
        </div>
      )
    }
    return null
  }

  const LineTooltip = ({ active, payload, label }: ChartTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e2142] border border-[#3e4161] p-2 rounded-md shadow-lg">
          <p className="text-white text-xs font-medium">{label}</p>
          <p className="text-[#CB3CFF] text-xs">value : {payload[0].value}</p>
        </div>
      )
    }
    return null
  }

  // Action Menu
  const widgetActions = [
    {
      label: "Edit",
      onClick: () => console.log(`Edit ${title} Widget`),
    },
    {
      label: "View Details",
      onClick: () => console.log(`View details for ${title} Widget`),
    },
    {
      label: "Export Data",
      onClick: () => console.log(`Export data for ${title} Widget`),
    },
    {
      label: "Remove",
      onClick: () => console.log(`Remove ${title} Widget`),
      destructive: true,
    },
  ]

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      style={{ willChange: "opacity, transform" }}
    >
      <Card className="bg-[linear-gradient(135deg,#252a59_0%,#1e2142_50%,#171b36_100%)]">
        <CardHeader className="flex flex-row items-center justify-between -mb-3 pb-1">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <ActionMenu actions={widgetActions} />
        </CardHeader>
        <CardContent>
          <motion.div
            className="flex items-center justify-between"
            variants={contentVariants}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold">{value}</span>
              {change && (
                <motion.div variants={changeChipVariants} initial="initial" animate="animate">
                  <ChangeChip change={change} />
                </motion.div>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-[#2e3151] text-gray-400 bg-transparent hover:bg-[#2e3151] hover:text-white"
                >
                  {timePeriod}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#2d315a] border-[#2e3151] text-white z-50 w-auto min-w-[150px]"
              >
                {timePeriods.map((p) => (
                  <DropdownMenuItem
                    key={p}
                    className={`cursor-pointer hover:bg-white/5 px-3 py-2 text-sm ${
                      p === timePeriod ? "bg-white/10 font-medium" : ""
                    }`}
                    onClick={() => setTimePeriod(p)}
                  >
                    {p}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          <div className="mt-4 h-[150px] w-full">
            <motion.div variants={chartContainerVariants} initial="initial" animate="animate" className="h-full w-full">
              {type === "line" ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lineData} margin={{ top: 5, right: 5, left: -35, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#CB3CFF" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#CB3CFF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2e3151" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      axisLine={{ stroke: "#2e3151" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 500]}
                      ticks={[0, 75, 150, 225, 300, 375, 450, 500]}
                    />
                    <Tooltip
                      content={<LineTooltip />}
                      cursor={{ stroke: "#3e4161", strokeWidth: 1, fill: "rgba(46, 49, 81, 0.2)" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#CB3CFF"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      strokeWidth={2}
                      animationDuration={800}
                      animationEasing="ease-in-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 5, right: -10, left: -35, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2e3151" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      axisLine={{ stroke: "#2e3151" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                    />
                    <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(46, 49, 81, 0.4)" }} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0FF" stopOpacity={1} />
                        <stop offset="100%" stopColor="#0FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Bar
                      dataKey="value"
                      fill="url(#barGradient)"
                      radius={[4, 4, 0, 0]}
                      animationDuration={800}
                      animationEasing="ease-out"
                      maxBarSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default VRStats