import type { Metadata } from "next"
import Envelope from "@/components/envelope"
import FallingHearts from "@/components/falling-hearts"
import MusicPlayer from "@/components/music-player"

export const metadata: Metadata = {
  title: "Kỷ Niệm Hạnh Phúc",
  description: "Một thông điệp đặc biệt cho kỷ niệm một tháng yêu nhau",
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-pink-100 flex flex-col items-center justify-center overflow-hidden p-4">
      <div className="absolute inset-0 z-0">
        <FallingHearts />
      </div>

      <div className="z-10 max-w-md w-full mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">Kỷ Niệm Một Tháng Yêu Nhau</h1>

        <Envelope />

        <p className="mt-8 text-pink-700 text-sm">Làm với tất cả tình yêu dành cho em ❤️</p>

        <div className="mt-4 p-3 bg-pink-50 rounded-lg border border-pink-200">
          <div className="text-xs text-pink-600 mb-2">
            <strong>Hướng dẫn thêm nhạc:</strong>
          </div>
          <div className="text-xs text-pink-500 space-y-1">
            <div>
              1. Tạo thư mục: <code className="bg-pink-100 px-1 rounded">public/music/</code>
            </div>
            <div>
              2. Thêm file: <code className="bg-pink-100 px-1 rounded">background-music.mp3</code>
            </div>
            <div>
              3. Khởi động lại server: <code className="bg-pink-100 px-1 rounded">npm run dev</code>
            </div>
          </div>
        </div>
      </div>

      <MusicPlayer />
    </main>
  )
}
