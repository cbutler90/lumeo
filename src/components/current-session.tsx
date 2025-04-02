"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { formatRuntime, incrementRuntime, type Runtime } from "@/utils/time-formats"

interface ActivityNotification {
  id: string
  user: {
    name: string
    avatar: string
  }
  message: string
  timestamp: Date
  type?: "activity" | "achievement" | "alert" | "join"
}

interface SessionThumbnail {
  id: number
  title: string
  image: string
  video?: string
  duration: string
}

// Fixed initial runtime values to prevent hydration errors
const INITIAL_RUNTIME: Runtime = { hours: 0, minutes: 11, seconds: 6 }
const INITIAL_THUMBNAIL_RUNTIMES: Runtime[] = [
  INITIAL_RUNTIME,
  { hours: 0, minutes: 25, seconds: 42 },
  { hours: 0, minutes: 47, seconds: 18 },
  { hours: 1, minutes: 12, seconds: 33 },
  { hours: 1, minutes: 35, seconds: 51 },
  { hours: 2, minutes: 8, seconds: 27 },
]

export function CurrentSession() {
  const [runtime, setRuntime] = useState<Runtime>(INITIAL_RUNTIME)
  const [thumbnailRuntimes, setThumbnailRuntimes] = useState<Runtime[]>(INITIAL_THUMBNAIL_RUNTIMES)
  const [notifications, setNotifications] = useState<ActivityNotification[]>([])
  const [hoveredThumbnail, setHoveredThumbnail] = useState<number | null>(null)
  const [activeSession, setActiveSession] = useState<number>(0)
  const [currentStreamer, setCurrentStreamer] = useState<string>("Jessica Adams")
  const [playerCount, setPlayerCount] = useState<number>(5)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isMobileView, setIsMobileView] = useState(false)
  const [videoPlayPromises, setVideoPlayPromises] = useState<{ [key: number]: Promise<void> | null }>({})

  const maxVisibleNotifications = 4

  const runtimeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const notificationRemovalTimeoutsRef = useRef<NodeJS.Timeout[]>([])

  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const thumbnailVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.matchMedia("(max-width: 768px)").matches)
    }

    checkMobile()

    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Format runtime as HH:MM:SS
  const formattedRuntime = formatRuntime(runtime)

  const sessionThumbnails: SessionThumbnail[] = [
    {
      id: 1,
      title: "Mastering Modern Sedans: VR Engine Diagnostics & Repair",
      image: "/videos/thumbnails/instructor-thumb.svg?height=112&width=200&text=Session 1",
      video: "/videos/instructor.mov",
      duration: formattedRuntime,
    },
    {
      id: 2,
      title: "Engine Diagnostics",
      image: "/videos/thumbnails/driving-thumb.svg?height=112&width=200&text=Session 1",
      video: "/videos/driving.mov",
      duration: formatRuntime(thumbnailRuntimes[1]),
    },
    {
      id: 3,
      title: "Transmission Repair",
      image: "/videos/thumbnails/carview-thumb.svg?height=112&width=200&text=Session 2",
      video: "/videos/carview.mov",
      duration: formatRuntime(thumbnailRuntimes[2]),
    },
    {
      id: 4,
      title: "Brake System Overview",
      image: "/videos/thumbnails/carscan-thumb.svg?height=112&width=200&text=Session 3",
      video: "/videos/carscan.mov",
      duration: formatRuntime(thumbnailRuntimes[3]),
    },
    // {
    //   id: 5,
    //   title: "Environmental Orientation: Spaceway 03",
    //   image: "/videos/thumbnails/tunnel-thumb.svg?height=112&width=200&text=Session 3",
    //   video: "/videos/tunnel.mov",
    //   duration: formatRuntime(thumbnailRuntimes[4]),
    // },
    {
      id: 6,
      title: "Field Readiness Exercise: Terrain Navigation",
      image: "/videos/thumbnails/walking-thumb.svg?height=112&width=200&text=Session 3",
      video: "/videos/walking.mov",
      duration: formatRuntime(thumbnailRuntimes[5]),
    },
  ]

  // Sample users for demo
  const users = [
    { name: "Liza Foster", avatar: "/avatars/liza.foster.svg?height=40&width=40&text=LF" },
    { name: "Jessica Adams", avatar: "/avatars/jessica.adams.svg?height=40&width=40&text=JA" },
    { name: "Aaron Fletcher", avatar: "/avatars/aaron.fletcher.svg?height=40&width=40&text=MC" },
    { name: "James Gardner", avatar: "/avatars/james.gardner.svg?height=40&width=40&text=AJ" },
    { name: "Linda Glass", avatar: "/avatars/linda.glass.svg?height=40&width=40&text=DK" },
    { name: "Steven Baker", avatar: "/avatars/steven.baker.svg?height=40&width=40&text=SW" },
  ]

  // Sample activities for demo
  const activities = [
    "successfully scanned the engine and identified 3 critical issues",
    "selected the correct tools for all tasks without any errors",
    "removed faulty spark plugs and belts in record time",
    "completed the diagnostic procedure with 98% accuracy",
    "identified the coolant leak source in under 2 minutes",
    "correctly assembled the timing belt components",
    "calibrated the fuel injection system perfectly",
    "detected a hidden electrical fault in the wiring harness",
    "replaced the damaged fuel injector in under 3 minutes",
    "diagnosed the transmission issue with 100% accuracy",
    "completed the oil change procedure flawlessly",
    "identified all worn brake components correctly",
  ]

  // Sample achievements
  const achievements = [
    "earned the 'Master Mechanic' badge",
    "unlocked the 'Precision Diagnostics' achievement",
    "reached Level 5 in Engine Repair",
    "completed 10 successful repairs in a row",
    "earned a perfect score on the diagnostics test",
    "set a new speed record for engine assembly",
  ]

  // Sample alerts
  const alerts = [
    "warning: excessive pressure detected in cooling system",
    "caution: battery voltage dropping below optimal levels",
    "alert: improper tool selection for current task",
    "notice: simulation difficulty increased to expert level",
    "warning: time remaining for task: 2 minutes",
  ]

  const clearNotificationTimeouts = () => {
    notificationRemovalTimeoutsRef.current.forEach((timeout) => {
      clearTimeout(timeout)
    })
    notificationRemovalTimeoutsRef.current = []
  }

  // Initialize runtime counter and video
  useEffect(() => {
    // Start
    runtimeIntervalRef.current = setInterval(() => {
      // Update
      setRuntime((prevRuntime) => incrementRuntime(prevRuntime))

      // Update all thumbnail runtimes
      setThumbnailRuntimes((prevRuntimes) =>
        prevRuntimes.map((runtime, index) => {
          // Skip the first one since it matches the main container runtime
          if (index === 0) return runtime
          return incrementRuntime(runtime)
        }),
      )
    }, 1000)

    // Start main video playback
    if (mainVideoRef.current) {
      mainVideoRef.current.play().catch((error) => {
        console.error("Video playback failed:", error)
      })
    }

    return () => {
      if (runtimeIntervalRef.current) {
        clearInterval(runtimeIntervalRef.current)
      }
      clearNotificationTimeouts()
    }
  }, [])

  // Check scroll position to update gradient overlays
  const checkScrollPosition = () => {
    if (thumbnailsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = thumbnailsContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }

  useEffect(() => {
    const container = thumbnailsContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollPosition)
      checkScrollPosition()
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition)
      }
    }
  }, [])

  // Ensure active thumbnail is visible when component mounts or screen size changes
  useEffect(() => {
    // If on mobile, scroll to the beginning
    if (isMobileView && thumbnailsContainerRef.current) {
      thumbnailsContainerRef.current.scrollLeft = 0
    } else if (thumbnailsContainerRef.current) {
      // On desktop, center the active thumbnail
      const container = thumbnailsContainerRef.current
      const thumbnailElements = container.querySelectorAll(".thumbnail-item")

      if (thumbnailElements[activeSession]) {
        const thumbnail = thumbnailElements[activeSession] as HTMLElement
        const containerWidth = container.clientWidth
        const thumbnailWidth = thumbnail.offsetWidth

        // Calculate the center position for the thumbnail
        const targetScrollPosition = thumbnail.offsetLeft - containerWidth / 2 + thumbnailWidth / 2

        // Scroll to the target position
        container.scrollLeft = targetScrollPosition
      }
    }

    // Check scroll position to update gradient overlays
    checkScrollPosition()
  }, [isMobileView, activeSession])

  const handleThumbnailHover = (index: number) => {
    if (isMobileView) return // Disable hover effects on mobile

    setHoveredThumbnail(index)

    // Play the video if it exists
    const videoElement = thumbnailVideoRefs.current[index]
    if (videoElement && sessionThumbnails[index].video) {
      // Only set the source if it's not already set
      if (!videoElement.src) {
        videoElement.src = sessionThumbnails[index].video || ""
        videoElement.load()
      }

      // Reset the video to the beginning for consistent preview
      videoElement.currentTime = 0

      // Only try to play if the element is visible
      if (videoElement.offsetParent !== null) {
        // Store the play promise to avoid interrupting it
        const playPromise = videoElement.play()

        // Track the promise for this video
        if (playPromise !== undefined) {
          setVideoPlayPromises((prev) => ({
            ...prev,
            [index]: playPromise,
          }))

          playPromise.catch((error) => {
            console.error(`Thumbnail video playback failed:`, error)
            // Clear the promise reference on error
            setVideoPlayPromises((prev) => ({
              ...prev,
              [index]: null,
            }))
          })
        }
      }
    }
  }

  const handleThumbnailLeave = (index: number) => {
    if (isMobileView) return // Disable hover effects on mobile

    setHoveredThumbnail(null)

    // Pause video
    const videoElement = thumbnailVideoRefs.current[index]
    if (videoElement) {
      // Check if we have a pending play promise
      const playPromise = videoPlayPromises[index]

      if (playPromise) {
        // If there's a pending play promise, wait for it to resolve before pausing
        playPromise
          .then(() => {
            if (videoElement && !videoElement.paused) {
              videoElement.pause()
            }
          })
          .catch(() => {
            // Promise was rejected, no need to pause
          })
          .finally(() => {
            // Clear the promise reference
            setVideoPlayPromises((prev) => {
              const newPromises = { ...prev }
              delete newPromises[index]
              return newPromises
            })
          })
      } else if (!videoElement.paused) {
        // No pending promise, pause
        videoElement.pause()
      }
    }
  }

  // Generate a set of random notifications
  const generateRandomNotifications = (count = 3) => {
    clearNotificationTimeouts()
    setNotifications([])

    // Generate new random notifications after a small delay to ensure state is updated
    setTimeout(() => {
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          addRandomNotification(false)
        }, i * 300) // Stagger the notifications
      }
    }, 50)
  }

  const getRandomUserDifferentFromCurrent = () => {
    // Filter out the current user
    const availableUsers = users.filter((user) => user.name !== currentStreamer)

    // If somehow all users are filtered out, return any random user
    if (availableUsers.length === 0) {
      return users[Math.floor(Math.random() * users.length)]
    }

    // Return a random user from the filtered list
    return availableUsers[Math.floor(Math.random() * availableUsers.length)]
  }

  const handleThumbnailClick = (index: number) => {
    // Don't do anything if clicking the already active session or if transitioning
    if (index === activeSession || isTransitioning) return

    setIsTransitioning(true)
    setActiveSession(index)

    // Scroll the thumbnail into view
    if (thumbnailsContainerRef.current) {
      const container = thumbnailsContainerRef.current
      const thumbnailElements = container.querySelectorAll(".thumbnail-item")

      if (thumbnailElements[index]) {
        const thumbnail = thumbnailElements[index] as HTMLElement
        const containerWidth = container.clientWidth
        const thumbnailWidth = thumbnail.offsetWidth

        // Calculate the center position for the thumbnail
        const targetScrollPosition = thumbnail.offsetLeft - containerWidth / 2 + thumbnailWidth / 2

        // Smooth scroll
        container.scrollTo({
          left: targetScrollPosition,
          behavior: "smooth",
        })
      }
    }

    // Update the runtime to match the selected thumbnail's runtime
    // For first index, we keep the current runtime
    if (index > 0) {
      setRuntime(thumbnailRuntimes[index])
    }

    // Update the main video source and play it
    if (mainVideoRef.current && sessionThumbnails[index].video) {
      // Pause the current video first
      mainVideoRef.current.pause()

      // Update the source
      mainVideoRef.current.src = sessionThumbnails[index].video || ""

      const playWhenReady = () => {
        mainVideoRef.current?.play().catch((error) => {
          console.error("Video playback failed:", error)
        })
        mainVideoRef.current?.removeEventListener("canplay", playWhenReady)
      }

      mainVideoRef.current.addEventListener("canplay", playWhenReady)

      // Load the new source
      mainVideoRef.current.load()
    }

    // Set a random streamer name with a slight delay for smoother transition
    setTimeout(() => {
      // Get a random user that is different from the current one
      const randomUser = getRandomUserDifferentFromCurrent()
      setCurrentStreamer(randomUser.name)

      // Set a random player count (3-6)
      setPlayerCount(Math.floor(Math.random() * 4) + 3)

      // Generate new random notifications
      generateRandomNotifications(Math.floor(Math.random() * 3) + 2) // 2-4 notifications
    }, 300)

    // End the transition after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 800)
  }

  // Schedule the next notification with random timing
  const scheduleNextNotification = () => {
    // Random time between 2-8 seconds
    const nextTime = 2000 + Math.random() * 6000

    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }

    notificationTimeoutRef.current = setTimeout(() => {
      addRandomNotification(true)
      scheduleNextNotification() // Schedule the next one
    }, nextTime)
  }

  // Start generating notifications with random timing
  useEffect(() => {
    // Add initial notification
    addRandomNotification(true)

    // Schedule the next one
    scheduleNextNotification()

    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current)
      }
      clearNotificationTimeouts()
    }
  }, [])

  // Function to add a random notification
  const addRandomNotification = (scheduleRemoval = true) => {
    // Randomly select notification type
    const notificationTypes: Array<"activity" | "achievement" | "alert" | "join"> = [
      "activity",
      "achievement",
      "alert",
      "join",
    ]
    const weights = [0.6, 0.15, 0.15, 0.1] // 60% activity, 15% achievement, 15% alert, 10% join

    let randomType: "activity" | "achievement" | "alert" | "join" = "activity"
    const rand = Math.random()
    let cumulativeWeight = 0

    for (let i = 0; i < weights.length; i++) {
      cumulativeWeight += weights[i]
      if (rand < cumulativeWeight) {
        randomType = notificationTypes[i]
        break
      }
    }

    // Select user
    const user = users[Math.floor(Math.random() * users.length)]

    // Select message based on type
    let message = ""
    switch (randomType) {
      case "activity":
        message = activities[Math.floor(Math.random() * activities.length)]
        break
      case "achievement":
        message = achievements[Math.floor(Math.random() * achievements.length)]
        break
      case "alert":
        message = alerts[Math.floor(Math.random() * alerts.length)]
        break
      case "join":
        message = "joined the session"
        break
    }

    const newNotification: ActivityNotification = {
      id: Date.now().toString(),
      user: {
        name: user.name,
        avatar: user.avatar,
      },
      message,
      timestamp: new Date(),
      type: randomType,
    }

    setNotifications((prev) => {
      // Add new notification to the end (will appear at the bottom)
      const updated = [...prev, newNotification]
      // Keep only the most recent notifications
      return updated.slice(-maxVisibleNotifications - 3)
    })

    // Remove oldest notification after it has animated out
    if (scheduleRemoval) {
      const timeoutId = setTimeout(() => {
        setNotifications((prev) => {
          if (prev.length > maxVisibleNotifications) {
            return prev.slice(1)
          }
          return prev
        })

        // Remove this timeout from the tracking array
        notificationRemovalTimeoutsRef.current = notificationRemovalTimeoutsRef.current.filter((id) => id !== timeoutId)
      }, 10000) // Remove after 10 seconds

      // Track this timeout
      notificationRemovalTimeoutsRef.current.push(timeoutId)
    }
  }

  const getBorderColor = (type?: string) => {
    switch (type) {
      case "achievement":
        return "border-[hsl(45_100%_51%/0.3)]" // warning with opacity
      case "alert":
        return "border-[hsl(340_100%_63%/0.3)]" // destructive with opacity
      case "join":
        return "border-[hsl(165_82%_51%/0.3)]" // success with opacity
      default:
        return "border-[hsl(190_100%_50%/0.2)]" // accent with opacity
    }
  }

  const getAvatarBorderColor = (type?: string) => {
    switch (type) {
      case "achievement":
        return "border-[hsl(45_100%_51%)]" // warning
      case "alert":
        return "border-[hsl(340_100%_63%)]" // destructive
      case "join":
        return "border-[hsl(165_82%_51%)]" // success
      default:
        return "border-[hsl(190_100%_50%/0.3)]" // accent with opacity
    }
  }

  // Card positioning constants
  const cardHeight = 80
  const cardGap = 5
  const bottomPosition = 200 // Starting position from the top

  return (
    <div className="relative w-full h-[626px] bg-[#070b1e] rounded-lg overflow-hidden">
      {/* Runtime counter */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-md text-white font-mono text-lg z-10">
        {formattedRuntime}
      </div>

      <div className="absolute top-4 right-8 w-[380px] h-[450px] z-20">
        <AnimatePresence>
          {notifications.slice(-maxVisibleNotifications).map((notification, index) => {
            // Calculate position based on index (0 is newest, higher indices are older)
            const position = notifications.slice(-maxVisibleNotifications).length - 1 - index

            // Calculate the target Y position with fixed card height and gap
            const targetY = bottomPosition - position * (cardHeight + cardGap)

            return (
              <motion.div
                key={notification.id}
                initial={{
                  opacity: 0,
                  x: 80, // Start from right side
                  y: bottomPosition, // Always start from the bottom position
                }}
                animate={{
                  opacity: 1 - position * 0.15, // Fade
                  y: targetY, // Position based on index
                  x: position * 20, // Horizontal offset
                  scale: 1 - position * 0.05, // Scaling
                }}
                exit={{
                  opacity: 0,
                  y: targetY - 80, // Exit upward from current position
                  x: position * 20 + 60, // Exit rightward from current position
                  transition: { duration: 0.5 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                className={`absolute w-full h-[70px] bg-black/50 backdrop-blur-md rounded-lg p-3 border ${getBorderColor(notification.type)} shadow-lg shadow-[hsl(190_100%_50%/0.1)]`}
              >
                <div className="flex items-center gap-3 h-full">
                  <Avatar className={`h-10 w-10 border-2 ${getAvatarBorderColor(notification.type)}`}>
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-1">
                      <span className="font-semibold text-white">{notification.user.name}</span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-2">{notification.message}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Main Video */}
      <div className="w-full h-full bg-gradient-to-b from-[#0c1339] to-[#070b1e]">
        <motion.div className="w-full h-full flex items-center justify-center relative">
          <video
            ref={mainVideoRef}
            className="w-full h-full object-cover"
            src={sessionThumbnails[activeSession].video || "/videos/instructor.mov"}
            muted
            loop
            playsInline
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        </motion.div>
      </div>

      {/* Session info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-6">
        <div className="flex flex-col lg:flex-row items-start md:items-end justify-between w-full">
          {/* Left side */}
          <div className="flex flex-col max-w-full lg:max-w-[50%] mb-3 md:mb-0 lg:mr-8 w-full">
            <motion.h1
              key={`title-${activeSession}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 line-clamp-2"
            >
              {sessionThumbnails[activeSession].title}
            </motion.h1>

            <div className="flex lg:flex-col justify-between items-center lg:items-start gap-2 md:gap-4 mb-2 md:mb-3 w-full">
              <motion.div
                key={`streamer-${currentStreamer}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-center w-max"
              >
                <Avatar className="h-8 w-8 md:h-12 md:w-12 border-2 border-[hsl(165_82%_51%)]">
                  <AvatarImage
                    src={
                      users.find((user) => user.name === currentStreamer)?.avatar ||
                      "/placeholder.svg?height=48&width=48"
                    }
                    alt={currentStreamer}
                  />
                  <AvatarFallback>{currentStreamer.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-2 md:ml-3">
                  <p className="text-white text-sm md:text-base font-medium">
                    <span className="hidden md:inline">{currentStreamer}'s Live Stream</span>
                    <span className="md:hidden">{currentStreamer}</span>
                  </p>
                  <div className="flex items-center text-gray-400">
                    <Users className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span className="text-xs md:text-sm">
                      {playerCount} {playerCount === 1 ? "Player" : "Players"}
                    </span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button className="bg-[hsl(217_67%_53%)] hover:bg-[hsl(217_67%_43%)] text-white text-xs md:text-sm px-2 md:px-4 py-1 md:py-2">
                  Join Session
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right side: Thumbnails */}
          <div className="relative w-full md:w-auto md:max-w-[520px]">
            {/* Left gradient overlay */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
                canScrollLeft ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Right gradient overlay */}
            <div
              className={`absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
                canScrollRight ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Scrollable container with custom scrollbar */}
            <div
              ref={thumbnailsContainerRef}
              className="overflow-x-auto pb-2 pt-1 md:pb-4 md:pt-2 px-2 flex-shrink-0 transition-all duration-300 touch-pan-x snap-x snap-mandatory w-full scrollbar-thin"
              onScroll={checkScrollPosition}
            >
              <div className="flex gap-2 md:gap-4">
                {sessionThumbnails.map((session, index) => (
                  <motion.div
                    key={session.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      opacity: isTransitioning ? 0.7 : 1,
                      scale: index === activeSession ? 1.02 : 1,
                      borderColor: index === activeSession ? "rgb(255, 255, 255)" : "rgb(55, 65, 81)",
                      boxShadow:
                        index === activeSession
                          ? "0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)"
                          : "none",
                    }}
                    transition={{ duration: 0.3 }}
                    className={`relative rounded-md overflow-visible flex-shrink-0 thumbnail-item snap-center
                      ${
                        index === activeSession
                          ? "border-2 border-white shadow-lg shadow-white/20"
                          : "border border-gray-700"
                      } group cursor-pointer w-[140px] h-[78px] md:w-[200px] md:h-[112px]`}
                    onMouseEnter={() => handleThumbnailHover(index)}
                    onMouseLeave={() => handleThumbnailLeave(index)}
                    onFocus={() => handleThumbnailHover(index)}
                    onBlur={() => handleThumbnailLeave(index)}
                    onClick={() => handleThumbnailClick(index)}
                    tabIndex={0}
                  >
                    <div className="w-full h-full relative overflow-hidden">
                      <img
                        src={session.image || "/placeholder.svg"}
                        alt={`Session ${session.id}: ${session.title}`}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-in-out ${
                          hoveredThumbnail === index ? "opacity-0" : "opacity-100"
                        }`}
                      />

                      <video
                        ref={(el) => {
                          thumbnailVideoRefs.current[index] = el
                        }}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-in-out ${
                          hoveredThumbnail === index ? "opacity-100" : "opacity-0"
                        } hidden md:block`}
                        muted
                        loop
                        playsInline
                      />
                    </div>

                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
                        hoveredThumbnail === index ? "opacity-0" : "opacity-100"
                      } pointer-events-none`}
                    >
                      <div className="bg-black/40 rounded-full p-1 md:p-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="md:w-6 md:h-6"
                        >
                          <path d="M8 5V19L19 12L8 5Z" fill="white" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-black/70 text-white text-[10px] md:text-xs px-1 py-0.5 md:px-2 md:py-1 rounded z-10">
                      {session.duration}
                    </div>

                    <div
                      className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-2 transform transition-transform duration-300 ease-in-out hidden md:block ${
                        hoveredThumbnail === index ? "translate-y-0" : "translate-y-[-100%]"
                      }`}
                    >
                      <p className="text-white text-xs font-medium truncate overflow-hidden">{session.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}