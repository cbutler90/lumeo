"use client"

import { MoreHorizontal } from 'lucide-react'
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface ActionItem {
  label: string
  onClick: () => void
  destructive?: boolean
}

interface ActionMenuProps {
  actions: ActionItem[]
  className?: string
}

export function ActionMenu({ actions, className }: ActionMenuProps) {
  // Animation variants
  const moreButtonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  }

  // Separate regular actions from destructive ones
  const regularActions = actions.filter(action => !action.destructive)
  const destructiveActions = actions.filter(action => action.destructive)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`focus:outline-none ${className || ''}`}>
        <motion.div whileHover="hover" whileTap="tap" variants={moreButtonVariants}>
          <MoreHorizontal className="h-5 w-5 text-gray-400 hover:text-gray-300 cursor-pointer" />
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#2d315a] border-[#2e3151] text-white z-50 w-auto">
        {/* Regular actions */}
        {regularActions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer hover:bg-white/5 px-3 py-2 text-sm"
            onClick={action.onClick}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
        
        {/* Separator if we have both types of actions */}
        {regularActions.length > 0 && destructiveActions.length > 0 && (
          <DropdownMenuSeparator className="bg-white/10" />
        )}
        
        {/* Destructive actions */}
        {destructiveActions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer text-[var(--destructive)] hover:bg-white/5 px-3 py-2 text-sm"
            onClick={action.onClick}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}