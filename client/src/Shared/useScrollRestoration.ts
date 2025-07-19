import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export const useScrollRestoration = () => {
  const location = useLocation()
  const scrollPosition = useRef<number>(0)

  useEffect(() => {
    // Save scroll position before component unmounts
    const handleBeforeUnload = () => {
      scrollPosition.current = window.scrollY
      sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY.toString())
    }

    // Restore scroll position when component mounts
    const savedPosition = sessionStorage.getItem(`scroll-${location.pathname}`)
    if (savedPosition) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedPosition))
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // Save current scroll position when component unmounts
      sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY.toString())
    }
  }, [location.pathname])

  // Save scroll position on scroll events with throttling
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY.toString())
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location.pathname])

  // Clear scroll position when navigating away
  useEffect(() => {
    return () => {
      // Save current position before unmounting
      sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY.toString())
    }
  }, [location.pathname])
} 