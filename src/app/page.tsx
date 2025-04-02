"use client"

import { DashboardWelcome } from "@/components/dashboard-welcome"
import { StatsCards } from "@/components/stats-cards"
import { CalendarWidget } from "@/components/calendar-widget"
import { CurrentSession } from "@/components/current-session"
import { VRStats } from "@/components/vr-stats"
import { ModuleStats } from "@/components/module-stats"
import { StudentRoster } from "@/components/student-roster"
import { CoursesList } from "@/components/courses-list"
import { PageTransition } from "@/components/page-transition"

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="px-6 md:px-10 pb-10 pt-6 md:pt-8 text-white/98">
        <DashboardWelcome />

        <div className="grid grid-cols-12 gap-6 mt-4">
          <div className="col-span-12 xl:col-span-9">
            <div className="grid grid-cols-4 gap-4">
              <StatsCards />
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <CurrentSession />
              </div>

              <div className="col-span-12 lg:col-span-6">
                <VRStats title="Hours Spent in VR" value="1.2K Hrs" change="+4.5%" timePeriod="Jan 2025" type="line" />
              </div>

              <div className="col-span-12 lg:col-span-6">
                <VRStats
                  title="Task Completion Rate in VR"
                  value="98%"
                  change="+6.3%"
                  timePeriod="Jan 2025 - Feb 2025"
                  type="bar"
                />
              </div>

              <div className="col-span-12">
                <CoursesList />
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-3">
            <CalendarWidget />
            <ModuleStats />
            <StudentRoster />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}