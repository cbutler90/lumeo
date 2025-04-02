"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutGrid,
  Diamond,
  MonitorPlay,
  Calendar,
  Users,
  ClipboardCheck,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react"
import { MobileSidebar } from "@/components/mobile-sidebar"

export function Sidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutGrid },
    { name: "Courses", href: "/courses", icon: Diamond },
    { name: "Sessions", href: "/sessions", icon: MonitorPlay },
    { name: "Schedule", href: "/schedule", icon: Calendar },
    { name: "Students", href: "/students", icon: Users },
    { name: "Grades", href: "/grades", icon: ClipboardCheck },
    { name: "Discussion", href: "/discussion", icon: MessageSquare },
    { name: "Files", href: "/files", icon: FileText },
    { name: "Reports", href: "/reports", icon: BarChart3 },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed top-0 left-0 w-[220px] bg-[#7E8FFF]/10 border-r border-[#64748B]/20 p-8 text-white h-screen overflow-y-auto z-10 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <img src="/lumeo-logo.svg" alt="Lumeo Logo" className="w-auto" />
          </div>

          <nav className="flex flex-col justify-between h-full">
            <div className="flex-1 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 p-4 text-base rounded-2xl transition-colors ${
                      isActive ? "bg-white/5 text-white/87" : "text-white/60 hover:text-white/87 hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="h-4 w-4" fill={isActive ? "currentColor" : "none"} strokeWidth={1.5} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
            <Link
              href="/settings"
              className={`flex items-center gap-3 p-4 text-base rounded-2xl transition-colors ${
                pathname === "/settings"
                  ? "bg-white/5 text-white/87"
                  : "text-white/60 hover:text-white/87 hover:bg-white/5"
              }`}
            >
              <Settings
                className="h-5 w-5"
                fill={pathname === "/settings" ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </div>

      <MobileSidebar />
    </>
  )
}