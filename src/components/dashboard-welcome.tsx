"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface DashboardWelcomeProps {
  username?: string
}

export function DashboardWelcome({ username = "Christine" }: DashboardWelcomeProps) {
  const [customizeMode, setCustomizeMode] = useState(false)

  return (
    <div className="flex items-center justify-between py-2">
      <motion.h1
        className="text-2xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome, {username}!
      </motion.h1>

      <div className="flex items-center space-x-2">
        <Switch
          id="customize-mode"
          checked={customizeMode}
          onCheckedChange={setCustomizeMode}
          className="bg-white/15 cursor-pointer"
        />
        <Label htmlFor="customize-mode" className="text-sm text-gray-300">
          Customize Dashboard
        </Label>
      </div>
    </div>
  )
}