import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollReveal – fade + slide elements into view on scroll.
 * @param {object} options
 * @param {string}  options.selector  – CSS selector relative to containerRef (default: '[data-reveal]')
 * @param {number}  options.y         – starting Y offset in px (default: 40)
 * @param {number}  options.duration  – tween duration in seconds (default: 0.8)
 * @param {number}  options.stagger   – stagger between children in seconds (default: 0.12)
 * @param {string}  options.start     – ScrollTrigger start position (default: 'top 88%')
 * @returns {React.RefObject} containerRef – attach to the wrapper element
 */
export function useScrollReveal({
  selector = '[data-reveal]',
  y = 40,
  duration = 0.8,
  stagger = 0.12,
  start = 'top 88%',
} = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector, containerRef.current)
      if (!targets.length) return

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: 'play none none none',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [selector, y, duration, stagger, start])

  return containerRef
}
