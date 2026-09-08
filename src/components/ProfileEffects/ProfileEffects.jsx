import React, { useEffect, useRef } from 'react'
import './ProfileEffects.css'

function ParticleField() {
  return (
    <div className="particles">
      {Array.from({ length: 32 }, (_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 61) % 100}%`,
            animationDelay: `-${(i % 9)}s`,
            animationDuration: `${12 + (i % 8)}s`
          }}
        />
      ))}
    </div>
  )
}

function CursorTrail({ enabled = true }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const trails = []
    const maxTrails = 15

    const handleMouseMove = (e) => {
      const trail = document.createElement('div')
      trail.className = 'cursor-trail'
      trail.style.left = e.clientX + 'px'
      trail.style.top = e.clientY + 'px'

      if (containerRef.current) {
        containerRef.current.appendChild(trail)
        trails.push(trail)

        if (trails.length > maxTrails) {
          const old = trails.shift()
          old.remove()
        }

        requestAnimationFrame(() => {
          trail.style.opacity = '0.3'
          trail.style.transform = 'scale(0.5)'
          setTimeout(() => trail.remove(), 400)
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enabled])

  return <div ref={containerRef} className="cursor-trail-container" />
}

function MouseGlow({ enabled = true }) {
  const glowRef = useRef(null)

  useEffect(() => {
    if (!enabled || !glowRef.current) return

    const handleMouseMove = (e) => {
      glowRef.current.style.left = e.clientX + 'px'
      glowRef.current.style.top = e.clientY + 'px'
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enabled])

  return <div ref={glowRef} className="mouse-glow" />
}

function Vignette({ enabled = true }) {
  if (!enabled) return null
  return <div className="vignette" />
}

function Grain({ enabled = true }) {
  if (!enabled) return null
  return <div className="grain" />
}

function Scanlines({ enabled = true }) {
  if (!enabled) return null
  return <div className="scanlines" />
}

export const ProfileEffects = {
  ParticleField,
  CursorTrail,
  MouseGlow,
  Vignette,
  Grain,
  Scanlines
}

export default ProfileEffects
