"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleEnvelope = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative mx-auto w-full max-w-sm">
      {!isOpen ? (
        <motion.div
          className="bg-pink-200 rounded-lg shadow-lg p-6 cursor-pointer border-2 border-pink-300 hover:bg-pink-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleEnvelope}
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-pink-500 w-full h-full"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-pink-700">Click thử ii</h2>
            <p className="text-pink-600 mt-2">Một thông điệp đặc biệt đang chờ em...</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 border-2 border-pink-300"
        >
          <div className="flex justify-end mb-4">
            <button onClick={toggleEnvelope} className="text-pink-500 hover:text-pink-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <div className="prose prose-pink mx-auto">
            <h3 className="text-2xl font-bold text-pink-600 mb-4">Em Yêu Thương,</h3>

            <p className="text-gray-800 mb-3">
              Đã một tháng kể từ khi chúng ta bắt đầu hành trình này cùng nhau. Mỗi khoảnh khắc bên em đều là kỷ niệm
              quý giá mà anh luôn gìn giữ trong tim.
            </p>

            <p className="text-gray-800 mb-3">
              Nụ cười của em làm sáng lên những ngày u ám nhất của anh, và tiếng cười của em là giai điệu ngọt ngào
              nhất. Anh thấy mình ngày càng yêu em nhiều hơn mỗi ngày.
            </p>

            <p className="text-gray-800 mb-3">
              Cảm ơn em vì đã là chính em - vì sự dịu dàng, sự thấu hiểu, và vì tất cả những điều em làm khiến trái tim
              anh đập nhanh hơn.
            </p>

            <p className="text-gray-800 mb-3">
              Đây chỉ là khởi đầu của câu chuyện chúng ta, và anh không thể chờ đợi để tạo ra nhiều kỷ niệm đẹp hơn nữa
              cùng em.
            </p>

            <p className="text-pink-600 font-semibold mt-6">Với tất cả tình yêu,</p>

            <p className="text-pink-600 font-bold">hippi^{">"}^</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
