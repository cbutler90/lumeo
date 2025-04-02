"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ActionMenu } from "./action-menu"

export function StudentRoster() {
  const students = [
    {
      name: "Jessica Adams",
      avatar: "/avatars/jessica.adams.svg?height=40&width=40",
      initials: "JA",
      status: "In Session",
      active: true,
      details: "USAF | Bldg A, CR 101",
    },
    {
      name: "Steven Baker",
      avatar: "/avatars/steven.baker.svg?height=40&width=40",
      initials: "SB",
      status: "Offline",
      active: false,
      details: "USAF | Bldg A, CR 101",
    },
    {
      name: "Alfredo Fernandez",
      avatar: "/avatars/alfredo.fernandez.svg?height=40&width=40",
      initials: "AF",
      status: "In Session",
      active: true,
      details: "USAF | Bldg A, CR 101",
    },
    {
      name: "Aaron Fletcher",
      avatar: "/avatars/aaron.fletcher.svg?height=40&width=40",
      initials: "AF",
      status: "Online",
      active: true,
      details: "USAF | Bldg A, CR 101",
    },
    {
      name: "Liza Foster",
      avatar: "/avatars/liza.foster.svg?height=40&width=40",
      initials: "LF",
      status: "Online",
      active: true,
      details: "USAF | Bldg A, CR 101",
    },
    {
      name: "James Gardner",
      avatar: "/avatars/james.gardner.svg?height=40&width=40",
      initials: "JG",
      status: "In Session",
      active: true,
      details: "USAF | Bldg A, CR 101",
    },
    {
      name: "Linda Glass",
      avatar: "/avatars/linda.glass.svg?height=40&width=40",
      initials: "LG",
      status: "Offline",
      active: false,
      details: "USAF | Bldg A, CR 101",
    },
  ]

  // For animations
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.3,
      },
    },
  }

  const studentVariants = {
    hidden: { opacity: 0, y: 10, x: -10 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      scale: 1.02,
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  }

  const avatarVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.3,
      },
    },
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 2,
      },
    },
    static: {
      scale: 1,
    },
  }

  // Action Menu
  const widgetActions = [
    {
      label: "Edit",
      onClick: () => alert("Edit Widget"),
    },
    {
      label: "Add Student",
      onClick: () => alert("Add Student"),
    },
    {
      label: "Export List",
      onClick: () => alert("Export List"),
    },
    {
      label: "Settings",
      onClick: () => alert("Settings"),
    },
    {
      label: "Remove",
      onClick: () => alert("Remove Widget"),
      destructive: true,
    },
  ]

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" className="student-roster">
      <Card className="bg-[linear-gradient(135deg,#252a59_0%,#1e2142_50%,#171b36_100%)] py-5">
        <CardHeader className="flex flex-row items-center justify-between w-full">
          <motion.div variants={headerVariants}>
            <CardTitle className="text-base font-medium">Student Roster</CardTitle>
          </motion.div>
          <ActionMenu actions={widgetActions}/>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-6" variants={containerVariants}>
            {students.map((student, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between cursor-pointer"
                variants={studentVariants}
                whileHover="hover"
                whileTap="tap"
                custom={index}
              >
                <div className="flex items-center gap-3">
                  <motion.div variants={avatarVariants} whileHover="hover">
                    <Avatar>
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.initials}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-gray-400">{student.details}</p>
                  </div>
                </div>
                <motion.div variants={badgeVariants}>
                  <Badge
                    variant="default"
                    className={`bg-white/10 rounded-full ${student.active
                        ? "text-white/87"
                        : "text-gray-400"
                      }`}
                  >
                    <motion.span
                      className={`mr-1 h-2 w-2 rounded-full ${student.active ? "bg-[var(--success)]" : "bg-gray-400"}`}
                      variants={pulseVariants}
                      animate={student.active ? "pulse" : "static"}
                    ></motion.span>
                    {student.status}
                  </Badge>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}