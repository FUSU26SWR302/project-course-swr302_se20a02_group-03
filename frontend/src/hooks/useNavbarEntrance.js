import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * useNavbarEntrance – slide the navbar down from the top on mount.
 * Uses gsap.set + gsap.to instead of gsap.context to avoid
 * StrictMode revert issues that hide the navbar permanently.
 * @returns {React.RefObject} ref – attach to the <nav> element
 */
export function useNavbarEntrance() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    // Set initial state
    gsap.set(ref.current, { y: -80, opacity: 0 })

    // Animate in
    const tween = gsap.to(ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.1,
    })

    return () => {
      tween.kill()
      // Ensure navbar is always visible after cleanup
      if (ref.current) {
        gsap.set(ref.current, { y: 0, opacity: 1, clearProps: 'transform' })
      }
    }
  }, [])

  return ref
}
