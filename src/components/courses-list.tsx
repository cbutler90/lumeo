"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ActionMenu } from "./action-menu"
import { motion } from "framer-motion"

export function CoursesList() {
  const courses = [
    {
      title: "VR Automotive Mastery: Engine Diagnostics and Assembly",
      image: "/courses/vr-automotive-mastery.svg?height=180&width=320",
      duration: "45 min",
      type: "Simulation",
      players: "1-2 Players",
    },
    {
      title: "Scuba Training: Managing Oxygen Levels and Buoyancy",
      image: "/courses/scuba-training.svg?height=180&width=320",
      duration: "30 min",
      type: "Safety Training",
      players: "1 Player",
    },
    {
      title: "Calibrating Avionics for Commercial Airliners",
      image: "/courses/calibrating-avionics.svg?height=180&width=320",
      duration: "1 hr 4 min",
      type: "Diagnostics",
      players: "1-3 Players",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.6 },
  }

  // Action Menu
  const widgetActions = [
    {
      label: "Edit",
      onClick: () => alert("Edit Widget"),
    },
    {
      label: "Add Course",
      onClick: () => alert("Add Course"),
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
    <motion.div initial="initial" animate="animate" variants={sectionVariants} className="w-full">
      <Card className="bg-[linear-gradient(135deg,#252a59_0%,#1e2142_50%,#171b36_100%)] py-3 sm:py-5">
        <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 sm:px-6">
          <CardTitle className="text-sm sm:text-base font-medium">Courses</CardTitle>
          <ActionMenu actions={widgetActions}/>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer bg-white/5 rounded-xl mx-1"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <motion.img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-32 sm:h-40 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />

                  <div className="mt-3 sm:mt-4 mx-3 sm:mx-4 mb-2 sm:mb-3 flex flex-wrap gap-1 sm:gap-2 justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-transparent text-gray-400 border-none p-0 text-xs sm:text-sm"
                    >
                      {course.duration}
                    </Badge>
                    <div className="flex gap-1 sm:gap-2 items-center flex-wrap justify-end">
                      <Badge
                        variant="secondary"
                        className="rounded-full text-xs sm:text-sm bg-white/10 text-white/80 border-none px-2 py-0.5"
                      >
                        {course.type}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="rounded-full text-xs sm:text-sm bg-white/10 text-white/80 border-none px-2 py-0.5"
                      >
                        {course.players}
                      </Badge>
                    </div>
                  </div>
                </div>
                <motion.h3
                  className="text-sm sm:text-base font-medium line-clamp-2 text-gray-300 mx-3 sm:mx-4 mb-3 sm:mb-4"
                  whileHover={{ color: "#fff" }}
                >
                  {course.title}
                </motion.h3>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}