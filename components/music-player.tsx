"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Music, Play, Pause, AlertCircle } from "lucide-react"

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasMusic, setHasMusic] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const checkAndLoadMusic = async () => {
      try {
        // Kiểm tra file có tồn tại không bằng fetch
        console.log("🔍 Đang kiểm tra file nhạc...")
        const response = await fetch("/music/background-music.mp3", {
          method: "HEAD",
          cache: "no-cache",
        })

        if (!response.ok) {
          throw new Error(`File không tồn tại (${response.status})`)
        }

        console.log("✅ File nhạc tồn tại, đang tải...")

        // Tạo audio element
        const audio = new Audio()
        audio.preload = "auto"
        audio.loop = true
        audio.volume = 0.3
        audio.crossOrigin = "anonymous"
        audioRef.current = audio

        // Promise để theo dõi việc tải
        const loadPromise = new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Timeout - File tải quá lâu"))
          }, 10000) // 10 giây timeout

          audio.addEventListener("canplaythrough", () => {
            clearTimeout(timeout)
            console.log("✅ Nhạc đã tải thành công!")
            setHasMusic(true)
            setError(null)
            resolve()
          })

          audio.addEventListener("error", (e) => {
            clearTimeout(timeout)
            console.error("❌ Lỗi audio element:", e)
            reject(new Error("Không thể tải file nhạc"))
          })
        })

        // Đặt src và bắt đầu tải
        audio.src = "/music/background-music.mp3?" + Date.now() // Cache busting
        audio.load()

        await loadPromise

        // Thêm event listeners
        audio.addEventListener("play", () => setIsPlaying(true))
        audio.addEventListener("pause", () => setIsPlaying(false))
        audio.addEventListener("ended", () => setIsPlaying(false))
      } catch (err) {
        console.error("❌ Lỗi:", err)
        setError(err instanceof Error ? err.message : "Lỗi không xác định")
        setHasMusic(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAndLoadMusic()

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

  const toggleMusic = async () => {
    if (!hasMusic || !audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        await audioRef.current.play()
      }
    } catch (error) {
      console.error("Lỗi phát nhạc:", error)
      setError("Không thể phát nhạc")
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const retryLoadMusic = () => {
    setIsLoading(true)
    setError(null)
    window.location.reload() // Reload trang để thử lại
  }

  // Auto-play khi user tương tác lần đầu
  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (hasMusic && audioRef.current && !isPlaying) {
        try {
          await audioRef.current.play()
          console.log("🎵 Tự động phát nhạc thành công")
        } catch (error) {
          console.log("Tự động phát nhạc thất bại, cần nhấn nút play")
        }
      }
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }

    if (hasMusic) {
      document.addEventListener("click", handleFirstInteraction)
      document.addEventListener("touchstart", handleFirstInteraction)
      return () => {
        document.removeEventListener("click", handleFirstInteraction)
        document.removeEventListener("touchstart", handleFirstInteraction)
      }
    }
  }, [hasMusic, isPlaying])

  // Hiển thị trạng thái loading
  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-pink-500 text-white p-3 rounded-full shadow-lg">
          <Music size={20} className="animate-pulse" />
        </div>
        <div className="absolute bottom-full right-0 mb-2 bg-black text-white text-xs p-2 rounded whitespace-nowrap">
          Đang tải nhạc...
        </div>
      </div>
    )
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-red-500 text-white p-3 rounded-full shadow-lg">
          <AlertCircle size={20} />
        </div>
        <div className="absolute bottom-full right-0 mb-2 bg-red-600 text-white text-xs p-3 rounded max-w-xs">
          <div className="font-bold mb-1">Lỗi nhạc:</div>
          <div className="mb-2">{error}</div>
          <div className="text-xs opacity-75 mb-2">Kiểm tra: public/music/background-music.mp3</div>
          <button
            onClick={retryLoadMusic}
            className="bg-white text-red-600 px-2 py-1 rounded text-xs hover:bg-gray-100"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  // Không có nhạc
  if (!hasMusic) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {/* Nút Play/Pause */}
      <button
        onClick={toggleMusic}
        className={`${
          isPlaying ? "bg-green-500 hover:bg-green-600" : "bg-pink-500 hover:bg-pink-600"
        } text-white p-3 rounded-full shadow-lg transition-colors`}
        aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Nút Mute/Unmute */}
      <button
        onClick={toggleMute}
        className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded-full shadow-lg transition-colors"
        aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Hiển thị trạng thái */}
      {isPlaying && <div className="text-xs text-green-600 text-center font-medium">🎵 Đang phát</div>}
    </div>
  )
}
