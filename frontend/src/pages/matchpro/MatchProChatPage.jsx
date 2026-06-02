import { useState } from 'react'
import MatchProLayout from '../../layouts/MatchProLayout'

const conversations = [
  {
    id: 1,
    name: 'Downtown 3v3 Pickup',
    icon: '🏀',
    iconBg: '#0d8a8a',
    lastMsg: 'Alex: See you guys at 5!',
    time: 'Now',
    online: true,
    unread: true,
  },
  {
    id: 2,
    name: 'Weekend Doubles',
    icon: '🎾',
    iconBg: '#f59e0b',
    lastMsg: 'System: Match confirmed for Sun...',
    time: '10:30 AM',
    online: false,
    unread: false,
  },
]

const messages = [
  { id: 1, type: 'system', text: 'Match location confirmed: Rucker Park Court 2' },
  {
    id: 2,
    type: 'other',
    sender: 'Marcus T.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    text: "I'm bringing the game ball. Anyone need a ride from downtown?",
    time: '10:42 AM',
    reaction: '🏀 2',
  },
  {
    id: 3,
    type: 'self',
    text: '@Marcus I could use a lift! Meet at the usual spot?',
    time: '10:45 AM',
  },
  { id: 4, type: 'system', text: 'Sarah J. joined the match', icon: '👤' },
]

export default function MatchProChatPage() {
  const [active, setActive] = useState(1)
  const [input, setInput] = useState('')

  const activeCon = conversations.find(c => c.id === active)

  return (
    <MatchProLayout>
      <div className="flex h-[calc(100vh-60px)] bg-[#f0f7fa]">
        {/* Left: conversation list */}
        <div className="w-[260px] shrink-0 bg-white border-r border-[#e0ecf0] py-5 flex flex-col gap-1 overflow-y-auto">
          <h2 className="font-['Oswald'] text-[1.2rem] font-bold text-[#0d2d3a] px-4 mb-3">Messages</h2>
          <div className="flex items-center gap-2 bg-[#f0f7fa] border-[1.5px] border-[#e0ecf0] rounded-full px-3.5 py-2 mx-4 mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search chats..." id="chat-search" className="border-none bg-transparent font-['Inter'] text-[0.85rem] text-[#0d2d3a] w-full outline-none placeholder:text-slate-400" />
          </div>
          {conversations.map(c => (
            <button
              key={c.id}
              className={`flex items-center gap-3 py-[11px] px-4 bg-transparent border-none cursor-pointer text-left transition-all font-['Inter'] hover:bg-[#f0f7fa] ${active === c.id ? 'bg-[rgba(13,138,138,0.08)]' : ''}`}
              onClick={() => setActive(c.id)}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[1.1rem] shrink-0 relative" style={{background: c.iconBg}}>
                {c.icon}
                {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#0d2d3a] whitespace-nowrap overflow-hidden text-ellipsis">{c.name}</p>
                <p className="text-[0.78rem] text-slate-400 whitespace-nowrap overflow-hidden text-ellipsis mt-0.5">{c.lastMsg}</p>
              </div>
              <span className="text-[0.72rem] text-slate-400 shrink-0">{c.time}</span>
            </button>
          ))}
        </div>

        {/* Right: chat window */}
        <div className="flex-1 flex flex-col bg-white border-l border-[#e0ecf0]">
          {/* Header */}
          <div className="flex items-center gap-3.5 px-6 py-4 border-b border-[#e0ecf0] bg-white">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-[1.2rem] shrink-0" style={{background: activeCon.iconBg}}>
              {activeCon.icon}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0d2d3a]">{activeCon.name}</h3>
              <p className="text-[0.78rem] text-slate-400 mt-0.5">📍 Rucker Park · 6/6 Players Joined</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-[0.68rem] font-bold tracking-[0.1em] text-slate-400 uppercase">STARTS IN</p>
              <p className="font-['Oswald'] text-[1.4rem] font-bold text-[#0d8a8a]">02:15:45</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {messages.map(m => {
              if (m.type === 'system') return (
                <div key={m.id} className="flex items-center gap-2 self-center bg-[#f0f7fa] rounded-full px-3.5 py-1.5 text-[0.8rem] text-slate-500">
                  {m.icon && <span>{m.icon}</span>}
                  <span>{m.text}</span>
                </div>
              )
              if (m.type === 'other') return (
                <div key={m.id} className="flex flex-col gap-1.5 max-w-[60%]">
                  <div className="flex gap-2 items-center">
                    <span className="text-[0.82rem] font-bold text-[#0d2d3a]">{m.sender}</span>
                    <span className="text-[0.72rem] text-slate-400">{m.time}</span>
                  </div>
                  <div className="bg-[#f0f7fa] rounded-[0_14px_14px_14px] px-4 py-3 text-sm text-[#0d2d3a] leading-6">{m.text}</div>
                  {m.reaction && (
                    <div className="flex items-center gap-1.5 text-[0.8rem] text-slate-500">
                      <img src={messages[1].avatar} alt="" className="w-[18px] h-[18px] rounded-full object-cover" />
                      <span>{m.reaction}</span>
                    </div>
                  )}
                </div>
              )
              if (m.type === 'self') return (
                <div key={m.id} className="flex flex-col items-end gap-1.5 max-w-[60%] self-end">
                  <div className="flex gap-2 items-center">
                    <span className="text-[0.72rem] text-slate-400">{m.time}</span>
                    <span className="text-[0.72rem] text-slate-400">You</span>
                  </div>
                  <div className="bg-[#0d8a8a] rounded-[14px_0_14px_14px] px-4 py-3 text-sm text-white leading-6">{m.text}</div>
                </div>
              )
              return null
            })}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2.5 px-6 py-3.5 border-t border-[#e0ecf0] bg-white">
            <button className="w-9 h-9 rounded-full bg-transparent border-none cursor-pointer flex items-center justify-center text-slate-400 transition-all shrink-0 hover:text-[#0d8a8a] hover:bg-[rgba(13,138,138,0.08)]" aria-label="Attach">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              id="chat-message-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 border-[1.5px] border-[#e0ecf0] rounded-full px-[18px] py-2.5 font-['Inter'] text-[0.9rem] text-[#0d2d3a] outline-none transition-all focus:border-[#0d8a8a] placeholder:text-slate-400"
            />
            <button className="w-9 h-9 rounded-full bg-transparent border-none cursor-pointer flex items-center justify-center text-slate-400 transition-all shrink-0 hover:text-[#0d8a8a] hover:bg-[rgba(13,138,138,0.08)]" aria-label="Emoji">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-[#0d8a8a] border-none cursor-pointer flex items-center justify-center transition-all shrink-0 hover:bg-[#0d2d3a]" aria-label="Send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </MatchProLayout>
  )
}
