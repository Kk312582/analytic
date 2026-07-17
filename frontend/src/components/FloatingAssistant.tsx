import React, { useState } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'
import { useUIStore } from '../store/uiStore'

const FloatingAssistant: React.FC = () => {
  const { isAssistantOpen, toggleAssistant, setTheme, setLayoutType } = useUIStore()
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hi! I am your AI Forecast Coach. Upload data or ask me to change the dashboard.' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const newMsgs = [...messages, { role: 'user', text: input }]
    setMessages(newMsgs)
    setInput('')

    // Mock AI UI Control Logic for Hackathon
    setTimeout(() => {
      let aiResponse = "I've analyzed that."
      const lowerInput = input.toLowerCase()
      
      if (lowerInput.includes('dark')) {
        setTheme('dark')
        aiResponse = "I have switched the dashboard to Dark Mode for better readability."
      } else if (lowerInput.includes('light')) {
        setTheme('light')
        aiResponse = "Switched to Light Mode as requested."
      } else if (lowerInput.includes('grid')) {
        setLayoutType('grid')
        aiResponse = "Updated the layout to a grid format."
      } else if (lowerInput.includes('flex')) {
        setLayoutType('flex')
        aiResponse = "Updated the layout to a flex column format."
      }

      setMessages([...newMsgs, { role: 'ai', text: aiResponse } as any])
    }, 1000)
  }

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={toggleAssistant}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl transition-transform hover:scale-110 z-50 flex items-center justify-center"
      >
        {isAssistantOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isAssistantOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[500px] bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden transform transition-all duration-300">
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              AI Forecast Coach
            </h3>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white/10 text-white/90 rounded-bl-none border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/10 bg-white/5 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..." 
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingAssistant
