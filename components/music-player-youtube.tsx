"use client"

import { useState } from "react"
import { Volume2, VolumeX, Music } from "lucide-react"

export default function YouTubeMusicPlayer() {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Thay thế bằng YouTube video ID của bài hát bạn muốn
  const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ" // Ví dụ: Rick Astley - Never Gonna Give You Up

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // Gửi message đến YouTube iframe để mute/unmute
    const iframe = document.getElementById("youtube-player") as HTMLIFrameElement
    if (iframe) {
      iframe.contentWindow?.postMessage(`{"event":"command","func":"${isMuted ? "unMute" : "mute"}","args":""}`, "*")
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    const iframe = document.getElementById("youtube-player") as HTMLIFrameElement
    if (iframe) {
      iframe.contentWindow?.postMessage(
        `{"event":"command","func":"${isPlaying ? "pauseVideo" : "playVideo"}","args":""}`,
        "*",
      )
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* YouTube Player ẩn */}
      <iframe
        id="youtube-player"
        width="0"
        height="0"
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0`}
        style={{ display: "none" }}
        allow="autoplay"
      />

      {/* Nút điều khiển */}
      <div className="flex flex-col gap-2">
        <button
          onClick={togglePlay}
          className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-colors"
          aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
        >
          <Music size={20} />
        </button>

        <button
          onClick={toggleMute}
          className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded-full shadow-lg transition-colors"
          aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  )
}
