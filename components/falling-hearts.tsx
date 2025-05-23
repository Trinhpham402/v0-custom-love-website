"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Heart = {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  opacity: number
}

export default function FallingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position (%)
      size: Math.random() * 20 + 10, // random size between 10-30px
      delay: Math.random() * 5, // random delay for animation start
      duration: Math.random() * 10 + 10, // random duration between 10-20s
      opacity: Math.random() * 0.5 + 0.3, // random opacity between 0.3-0.8
    }))

    setHearts(initialHearts)

    // Regenerate hearts periodically
    const interval = setInterval(() => {
      setHearts((prevHearts) => {
        // Replace a few hearts to create continuous effect
        const newHearts = [...prevHearts]
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * prevHearts.length)
          newHearts[randomIndex] = {
            ...newHearts[randomIndex],
            id: prevHearts.length + i,
            x: Math.random() * 100,
            delay: 0,
          }
        }
        return newHearts
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute top-0"
          style={{
            left: `${heart.x}%`,
            opacity: heart.opacity,
          }}
          initial={{ y: -100 }}
          animate={{
            y: "100vh",
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div style={{ width: heart.size, height: heart.size }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-pink-500 w-full h-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
