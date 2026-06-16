import { useState } from 'react'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Chào bạn! Mình là trợ lý ảo AI của Pro-Sport. Bạn cần tìm sân, tìm kèo hay có thắc mắc gì không?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMsgs = [...messages, { type: 'user', text: input }]
    setMessages(newMsgs)
    setInput('')

    // Fake AI Response
    setTimeout(() => {
      let reply = "Xin lỗi, hiện tại tôi chưa hiểu ý bạn."
      const lowerInput = input.toLowerCase()
      
      if (lowerInput.includes('sân') || lowerInput.includes('đặt')) {
        reply = "Hiện tại cơ sở The Apex Pavilion đang có sân trống vào lúc 18:00 hôm nay. Bạn có muốn đặt ngay không?"
      } else if (lowerInput.includes('kèo') || lowerInput.includes('giao lưu')) {
        reply = "Có một kèo Cầu lông trình độ Trung Bình Khá đang tuyển 2 người lúc 19:00 tối nay. Bạn có muốn xem chi tiết?"
      }
      
      setMessages([...newMsgs, { type: 'bot', text: reply }])
    }, 1000)
  }

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-900 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-50 group border border-white/10"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[340px] h-[480px] bg-white rounded-2xl shadow-xl border border-brand-200 flex flex-col overflow-hidden z-50 animate-[fadeInUp_0.2s_ease]">
          {/* Header */}
          <div className="bg-brand-900 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Pro-Sport AI</h3>
              <p className="text-brand-400 text-xs flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"/> Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.type === 'user' ? 'bg-brand-900 text-white rounded-tr-sm' : 'bg-white border border-brand-200 text-brand-800 rounded-tl-sm shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-brand-100 bg-white flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything..." 
              className="flex-1 bg-brand-50 border border-brand-200 rounded-full px-4 py-2 text-sm outline-none focus:border-brand-400 transition-colors"
            />
            <button type="submit" className="w-10 h-10 bg-brand-900 rounded-full flex items-center justify-center text-white shrink-0 hover:bg-brand-800 transition-colors active:scale-95">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
