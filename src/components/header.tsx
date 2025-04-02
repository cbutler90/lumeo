"use client"

import { useState, useRef } from "react"
import { Bell, MessageSquare, Search, Menu } from 'lucide-react'
import { motion } from "framer-motion"
import { useSidebar } from "@/components/sidebar-provider"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  username?: string
  avatarSrc?: string
  avatarFallback?: string
  hasNotifications?: boolean
  hasMessages?: boolean
}

export function Header({
  username = "Christine",
  avatarSrc = "/christine.butler-full.svg?height=32&width=32",
  avatarFallback = "CB",
  hasNotifications = true,
  hasMessages = true,
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState("")
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const { toggle } = useSidebar()
  const inputRef = useRef<HTMLInputElement>(null)

  // Function to handle search toggle
  const showSearch = () => {
    setIsSearchVisible(true);
    // Focus the input after a short delay to ensure it's visible
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  // Function to handle input blur
  const handleBlur = () => {
    // Only hide on mobile
    if (window.innerWidth < 768) {
      setIsSearchVisible(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 pt-6 md:pt-10 px-4 md:px-6">
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            console.log("Menu button clicked");
            toggle();
          }}
          className="text-gray-400 hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Search - Collapsible on mobile */}
      {isSearchVisible ? (
        <div className="relative flex flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={handleBlur}
            className="w-full pl-8 bg-primary border-[#2e3151] text-white rounded-2xl"
          />
        </div>
      ) : (
        <>
          {/* Desktop search always visible */}
          <div className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-[240px] pl-8 bg-primary border-[#2e3151] text-white rounded-2xl"
            />
          </div>
          
          {/* Mobile search icon */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={showSearch}
              className="text-gray-400 hover:text-white"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}

      <div className="flex items-center ml-auto gap-2 md:gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
            <MessageSquare className="h-5 w-5" />
            {hasMessages && (
              <motion.span
                className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
            <Bell className="h-5 w-5" />
            {hasNotifications && (
              <motion.span
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Button>
        </motion.div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer">
              <Avatar className="h-8 w-8 md:h-9 md:w-9 border-2 border-transparent hover:border-[#3a7bd5] transition-all duration-200">
                <AvatarImage src={avatarSrc} alt={username} />
                <AvatarFallback className="bg-[#1e2142] text-white">{avatarFallback}</AvatarFallback>
              </Avatar>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#1e2142] border-[#2e3151] text-white">
            <DropdownMenuItem className="hover:bg-[#2e3151] cursor-pointer">
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#2e3151] cursor-pointer">
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#2e3151] cursor-pointer">
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2e3151]" />
            <DropdownMenuItem className="hover:bg-[#2e3151] cursor-pointer text-red-400 hover:text-red-300">
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}