"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Music } from "lucide-react"

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasMusic, setHasMusic] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Check if music file exists before creating audio element
    const checkMusicFile = async () => {
      try {

        const response = await fetch("/music/EmCuaAnhDungCuaAi.mp3", { method: "HEAD" })

        if (response.ok) {
          setHasMusic(true)
          initializeAudio()
        } else {
          console.log("File nhạc không tồn tại - trang web sẽ hoạt động mà không có nhạc nền")
        }
      } catch (error) {
        console.log("Không thể kiểm tra file nhạc - trang web sẽ hoạt động mà không có nhạc nền")
      }
    }

    const initializeAudio = () => {
      const audio = new Audio("/music/background-music.mp3")
      audio.loop = true
      audioRef.current = audio

      audio.addEventListener("canplaythrough", () => {
        console.log("Nhạc đã sẵn sàng để phát")
      })

      audio.addEventListener("error", (e) => {
        console.log("Không thể tải nhạc - trang web sẽ hoạt động mà không có nhạc nền")
        setHasMusic(false)
      })

      audio.addEventListener("play", () => {
        setIsPlaying(true)
      })

      audio.addEventListener("pause", () => {
        setIsPlaying(false)
      })
    }

    checkMusicFile()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  const toggleMusic = () => {
    if (!hasMusic || !audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((error) => {
        console.log("Không thể phát nhạc:", error)
      })
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Auto-play when user first interacts with the page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (hasMusic && audioRef.current && !isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log("Tự động phát nhạc thất bại:", error)
        })
      }
      document.removeEventListener("click", handleFirstInteraction)
    }

    if (hasMusic) {
      document.addEventListener("click", handleFirstInteraction)
      return () => document.removeEventListener("click", handleFirstInteraction)
    }
  }, [hasMusic, isPlaying])

  // Don't render if no music file
  if (!hasMusic) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <button
        onClick={toggleMusic}
        className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-colors"
        aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
      >
        <Music size={20} />
      </button>

      {isPlaying && (
        <button
          onClick={toggleMute}
          className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded-full shadow-lg transition-colors"
          aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      )}
    </div>
  )
}
