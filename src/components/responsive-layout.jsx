"use client"

import { useEffect, useState } from "react"
import MobileLayout from "./mobile-layout"
import DesktopLayout from "./desktop-layout"

export default function ResponsiveLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>
  }

  return <DesktopLayout>{children}</DesktopLayout>
}
