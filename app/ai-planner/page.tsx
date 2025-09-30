"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

type Message = {
  sender: "ai" | "user"
  text: string
}

export default function AITripPlanner() {
  // Toggle this to `true` to show the Coming Soon screen by default.
  const [isComingSoon, setIsComingSoon] = useState(true)

  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "👋 Hello traveler! I’m your AI trip buddy. Where would you like to go?" },
  ])
  const [input, setInput] = useState("")
  const [itinerary, setItinerary] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    setMessages((prev) => [...prev, { sender: "user", text: input }])
    const userQuery = input
    setInput("")
    setIsTyping(true)

    // Fake AI response with itinerary
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: `✨ Awesome! Planning your trip to ${userQuery}...` },
      ])

      setItinerary([
        "Arrival & Old Town Walk",
        "Museums & Street Food",
        "Nature Day Trip",
        "Neighborhoods & Nightlife",
      ])
    }, 1500)
  }

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)]"
        aria-hidden
      />

      {/* Coming Soon overlay / hero */}
      {isComingSoon && (
        <div
          role="region"
          aria-labelledby="coming-soon-title"
          className="absolute inset-0 z-30 flex items-center justify-center p-6"
        >
          <div className="max-w-3xl w-full bg-black/60 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-5xl shadow-xl"
                  aria-hidden
                >
                  🤖
                </motion.div>
              </div>

              <div className="flex-1">
                <h1 id="coming-soon-title" className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Coming soon — AI Trip Planner
                </h1>
                <p className="mt-3 text-sm text-gray-300 max-w-xl">
                  We’re building a smarter trip planning experience: chat with an AI to get itineraries,
                  estimated costs, local tips, optimized routes, and exportable plans. While the full
                  feature set is rolling out, you can try a lightweight demo of the planner below.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                  <button
                    onClick={() => setIsComingSoon(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Try demo"
                  >
                    Try demo
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <a
                    href="#about-section"
                    className="text-sm text-gray-300 underline-offset-4 hover:underline"
                    onClick={(e) => {
                      // Allow in-page anchor
                    }}
                  >
                    Read about the page
                  </a>
                </div>
              </div>
            </div>

            <div id="about-section" className="mt-6 border-t border-gray-800 pt-4">
              <h2 className="font-semibold">About this page</h2>
              <p className="mt-2 text-sm text-gray-300">
                The AI Trip Planner will help you:
              </p>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                <li>• Generate multi-day itineraries tailored to your interests</li>
                <li>• Provide estimated daily budgets and season-aware costs</li>
                <li>• Suggest places, activities and best times to visit</li>
                <li>• Help with bookings, route planning and export (PDF / shareable links)</li>
              </ul>
              <p className="mt-4 text-xs text-gray-400">
                Status: Core chat & itinerary demo available. Upcoming: advanced cost calculations,
                multimodal images, bookings & local partner integrations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Left panel - AI Avatar */}
      <div className="hidden md:flex w-1/4 flex-col items-center justify-center border-r border-gray-800 bg-black/40 backdrop-blur-md relative z-10">
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🤖
        </motion.div>
        <p className="mt-4 text-gray-400 text-center text-sm">Your AI Travel Buddy</p>
      </div>

      {/* Middle panel - Chat */}
      <div className="flex-1 flex flex-col z-20 h-[90%] mx-4 md:mx-0 my-6 rounded-xl overflow-hidden">
        <header className="p-4 text-center border-b border-gray-700 bg-black/30">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Trip Planner
          </h1>
          <p className="text-gray-400 text-sm">Plan smarter journeys with AI assistance</p>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-black/20">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-sm px-4 py-2 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-700 flex items-center space-x-2 bg-black/40">
          <input
            type="text"
            placeholder="Ask me about your trip..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Message input"
          />
          <button
            onClick={handleSend}
            aria-label="Send message"
            className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right panel - Itinerary / page info */}
      <div className="hidden md:flex w-1/4 flex-col border-l border-gray-800 bg-black/40 backdrop-blur-md p-4 space-y-4 overflow-y-auto z-10">
        <h2 className="text-lg font-semibold">Your Itinerary</h2>

        {itinerary.length === 0 ? (
          <div className="text-sm text-gray-400">No itinerary yet — ask the planner to generate one.</div>
        ) : (
          itinerary.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 shadow-md hover:shadow-lg"
            >
              <span className="text-blue-400 font-semibold">Day {i + 1}:</span> {item}
            </motion.div>
          ))
        )}

        <div className="mt-auto text-xs text-gray-400">
          <h3 className="font-semibold text-sm">About & status</h3>
          <p className="mt-2">
            This demo shows the chat + itinerary flow. Planned additions:
          </p>
          <ul className="mt-2 list-disc list-inside text-gray-400">
            <li>Season-aware cost estimates</li>
            <li>Place suggestions & maps integration</li>
            <li>Export (PDF / share link) and booking links</li>
          </ul>
        </div>
      </div>

      {/* Respect reduced motion — hide framer motion animations if user prefers reduced motion */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
