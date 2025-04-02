"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { format, addMonths, subMonths, isSameDay, getMonth, getYear } from "date-fns"
import { ActionMenu } from "./action-menu"

interface CalendarEvent {
  id: string
  date: Date
  title: string
  time: string
  participants: number
  color: "cyan" | "pink" | "yellow"
}

// Animation variants
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
}

export function CalendarWidget() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [selectedDay, setSelectedDay] = useState<Date>(new Date())
  const visibleWeeks = 5
  const [events, setEvents] = useState<CalendarEvent[]>([])

  // Initialize events with current date
  useEffect(() => {
    const currentYear = getYear(today)
    const currentMonth = getMonth(today)

    // @TODO: need to randomize events and have no more than 3 display on a given day for now
    setEvents([
      {
        id: "1",
        date: new Date(currentYear, currentMonth, 21),
        title: "Training Workshop",
        time: "12:00 PM - 1:00 PM",
        participants: 13,
        color: "cyan",
      },
      {
        id: "2",
        date: new Date(currentYear, currentMonth, 9),
        title: "Module Session 1A",
        time: "3:00 PM - 4:00 PM",
        participants: 8,
        color: "pink",
      },
      {
        id: "3",
        date: new Date(currentYear, currentMonth, 16),
        title: "Module Session 1A",
        time: "3:00 PM - 4:00 PM",
        participants: 8,
        color: "pink",
      },
      {
        id: "4",
        date: new Date(currentYear, currentMonth, 18),
        title: "Certification Exam",
        time: "2:00 PM - 3:30 PM",
        participants: 12,
        color: "yellow",
      },
      {
        id: "5",
        date: today,
        title: "VR Training Workshop",
        time: "10:00 AM - 11:30 AM",
        participants: 15,
        color: "cyan",
      },
      {
        id: "6",
        date: today,
        title: "Team Collaboration Session",
        time: "1:00 PM - 2:30 PM",
        participants: 8,
        color: "pink",
      },
      {
        id: "7",
        date: today,
        title: "Project Review Meeting",
        time: "3:30 PM - 4:30 PM",
        participants: 6,
        color: "yellow",
      },
      {
        id: "8",
        date: new Date(currentYear, currentMonth, 23),
        title: "Module Session 1A",
        time: "3:00 PM - 4:00 PM",
        participants: 8,
        color: "pink",
      },
      {
        id: "9",
        date: new Date(currentYear, currentMonth, 24),
        title: "Certification Exam",
        time: "2:00 PM - 3:30 PM",
        participants: 12,
        color: "yellow",
      },
      {
        id: "10",
        date: new Date(currentYear, currentMonth, 30),
        title: "Module Session 1A",
        time: "3:00 PM - 4:00 PM",
        participants: 8,
        color: "pink",
      },
    ])
  }, [])

  // Navigation handlers
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const getEventsForDay = (day: Date) => events.filter((event) => isSameDay(event.date, day))
  const getFirstEventColorForDay = (day: Date) => {
    const dayEvents = getEventsForDay(day)
    return dayEvents.length > 0 ? dayEvents[0].color : undefined
  }

  const selectedDayEvents = getEventsForDay(selectedDay)

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const firstDayOfWeek = firstDay.getDay()
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDayOfWeek)

    const days = []
    const totalDays = visibleWeeks * 7

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)

      const isToday = isSameDay(currentDate, today)

      days.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
        isSelected: isSameDay(currentDate, selectedDay),
        isToday,
        eventColor: getFirstEventColorForDay(currentDate),
        eventCount: getEventsForDay(currentDate).length,
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const handleDayClick = (date: Date) => setSelectedDay(date)

  const widgetActions = [
    {
      label: "Edit",
      onClick: () => console.log("Edit Widget"),
    },
    {
      label: "Remove",
      onClick: () => console.log("Remove Widget"),
      destructive: true,
    },
  ]

  return (
    <motion.div variants={cardVariants} initial="initial" animate="animate">
      <Card className="bg-[linear-gradient(135deg,#252a59_0%,#1e2142_50%,#171b36_100%)] mb-6 overflow-hidden p-4 gap-2">
        <div className="flex flex-row items-center justify-between border-b border-[#2e3151] pb-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white/98 hover:bg-white/10"
            onClick={goToPreviousMonth}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <CardTitle className="text-base font-medium">{format(currentMonth, "MMMM yyyy")}</CardTitle>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white/98 hover:bg-white/10"
            onClick={goToNextMonth}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <CardContent className="p-0">
          <div className="grid grid-cols-7 text-center text-xs">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="py-2 text-gray-400 font-semibold">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 border-b border-[#2e3151] pb-5 mb-1">
            {calendarDays.map((day, index) => (
              <motion.div
                key={index}
                className={cn(
                  "h-10 flex flex-col items-center justify-center relative cursor-pointer",
                  day.isSelected && "text-white/98 bg-white/5 rounded-md",
                  day.isToday && "text-white/98 font-semibold",
                  !day.isCurrentMonth && "text-gray-600",
                  day.isCurrentMonth && !day.isSelected && !day.isToday && "text-white/55",
                )}
                onClick={() => handleDayClick(day.date)}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "0.375rem" }}
              >
                <span className={cn("text-sm", day.isSelected && "font-semibold")}>{day.date.getDate()}</span>

                {day.eventColor && (
                  <div className="absolute -bottom-1 flex justify-center">
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        day.eventColor === "cyan" && "bg-[#00FFFF]",
                        day.eventColor === "pink" && "bg-[#FF4081]",
                        day.eventColor === "yellow" && "bg-[#FFC107]",
                      )}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Always show the events section, with a message when no events */}
          <div className="pt-4 pb-1 pl-2 pr-1">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map((event) => (
                <div key={event.id} className="flex items-start justify-between mb-4 last:mb-0">
                  <div className="flex">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full mt-1.5 mr-3",
                        event.color === "cyan" && "bg-[#00FFFF]",
                        event.color === "pink" && "bg-[#FF4081]",
                        event.color === "yellow" && "bg-[#FFC107]",
                      )}
                    />
                    <div>
                      <h3 className="text-sm font-medium">{event.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">TODAY | {event.time}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{event.participants} participants</p>
                    </div>
                  </div>
                  <ActionMenu actions={widgetActions} />
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-6 text-gray-400 text-sm">No Events Scheduled</div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}