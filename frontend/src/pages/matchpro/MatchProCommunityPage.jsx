import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import MatchProLayout from '../../layouts/MatchProLayout'
import './MatchProCommunityPage.css'

const posts = [
  { id: 1, user: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80', time: '2 min ago', content: 'Vừa lập kỷ lục cá nhân mới tại Pro-Sport Badminton Center! 🏸 Ai muốn đánh đôi cuối tuần này không?', likes: 24, comments: 8, sport: 'Badminton' },
  { id: 2, user: 'Marcus T.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', time: '15 min ago', content: 'Buổi Pickleball hôm nay tuyệt vời quá! Đang tìm partner level advanced cho tối thứ 5. DM mình nhé!', likes: 18, comments: 5, sport: 'Pickleball' },
  { id: 3, user: 'Alex M.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80', time: '1 hr ago', content: 'Sân cầu lông mới ở Quận 7 quá xịn! Mặt sàn BWF, đèn LED 800 lux. Rất recommend!', likes: 42, comments: 14, sport: 'Badminton' },
]

const events = [
  { id: 1, name: 'Pro-Sport Badminton Open', date: 'Jun 15', sport: 'Badminton', participants: 48, maxParticipants: 64, prize: '5.000.000đ', img: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=400&q=80' },
  { id: 2, name: 'Summer Pickleball League', date: 'Jun 20', sport: 'Pickleball', participants: 32, maxParticipants: 32, prize: 'Trophy', img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&q=80' },
  { id: 3, name: 'Cầu lông Đôi Hè 2026', date: 'Jul 4', sport: 'Badminton', participants: 24, maxParticipants: 48, prize: '10.000.000đ', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80' },
]

const groups = [
  { id: 1, name: 'Cầu lông Trung cấp SG', members: 234, sport: 'Badminton', icon: '🏸', joined: false },
  { id: 2, name: 'Pickleball Warriors HCM', members: 189, sport: 'Pickleball', icon: '🏓', joined: true },
  { id: 3, name: 'Badminton Masters VN', members: 456, sport: 'Badminton', icon: '🏸', joined: false },
  { id: 4, name: 'Sài Gòn Pickleball Club', members: 312, sport: 'Pickleball', icon: '🏓', joined: false },
]

const challenges = [
  { id: 1, title: 'Đánh 10 trận trong tháng', sport: 'Any', progress: 7, total: 10, reward: '500 pts', icon: '🏆' },
  { id: 2, title: 'Thắng 5 trận liên tiếp', sport: 'Badminton', progress: 3, total: 5, reward: 'Badge', icon: '⚡' },
  { id: 3, title: 'Chơi cả 2 môn', sport: 'Multi', progress: 1, total: 2, reward: '300 pts', icon: '🌟' },
]

const sportColors = { Badminton: '#22c55e', Pickleball: '#6366f1', Multi: '#8b5cf6', Any: '#8b5cf6' }

export default function MatchProCommunityPage() {
  const [activeTab, setActiveTab] = useState('Feed')
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [joinedGroups, setJoinedGroups] = useState(new Set(groups.filter(g => g.joined).map(g => g.id)))
  const [newPostText, setNewPostText] = useState('')
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mp-comm-hero', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.out' })
      gsap.from('.mp-comm-tab-content > *', { 
        opacity: 0, 
        y: 20, 
        stagger: 0.1, 
        duration: 0.4, 
        ease: 'power2.out' 
      })
    }, pageRef)
    return () => ctx.revert()
  }, [activeTab])

  const toggleLike = (id) => {
    const newLikes = new Set(likedPosts)
    if (newLikes.has(id)) newLikes.delete(id)
    else newLikes.add(id)
    setLikedPosts(newLikes)
  }

  const toggleGroup = (id) => {
    const newJoined = new Set(joinedGroups)
    if (newJoined.has(id)) newJoined.delete(id)
    else newJoined.add(id)
    setJoinedGroups(newJoined)
  }

  const handlePost = () => {
    if (newPostText.trim()) {
      alert("Post created successfully!")
      setNewPostText('')
    }
  }

  return (
    <MatchProLayout>
      <div className="mp-page-with-sidebar mp-community-page" ref={pageRef}>
        <div className="mp-content">
          <div className="mp-comm-hero">
            <h1 className="mp-comm-title">👥 Community Hub</h1>
            <p className="mp-comm-sub">Connect, share, and compete with local players.</p>
          </div>

          <div className="mp-tabs">
            {['Feed', 'Events', 'Groups', 'Challenges'].map(tab => (
              <button 
                key={tab} 
                className={`mp-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mp-comm-tab-content">
            {activeTab === 'Feed' && (
              <>
                {/* Post Composer */}
                <div className="mp-composer">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" alt="You" className="mp-composer__avatar" />
                  <div className="mp-composer__body">
                    <textarea 
                      placeholder="Share your latest match or find partners..." 
                      className="mp-composer__input" 
                      rows="3"
                      value={newPostText}
                      onChange={e => setNewPostText(e.target.value)}
                    ></textarea>
                    <div className="mp-composer__actions">
                      <div className="mp-composer__tools">
                        <button className="mp-icon-btn">📷</button>
                        <button className="mp-icon-btn">📍</button>
                      </div>
                      <button className="btn-primary" onClick={handlePost} disabled={!newPostText.trim()}>Post</button>
                    </div>
                  </div>
                </div>

                {/* Feed Posts */}
                {posts.map(post => {
                  const isLiked = likedPosts.has(post.id)
                  const sportColor = sportColors[post.sport] || 'var(--mp-primary)'
                  return (
                    <div key={post.id} className="mp-post" style={{ borderLeftColor: sportColor }}>
                      <div className="mp-post__header">
                        <img src={post.avatar} alt={post.user} className="mp-post__avatar" />
                        <div>
                          <p className="mp-post__user">{post.user}</p>
                          <p className="mp-post__time">{post.time} · <span style={{ color: sportColor }}>{post.sport}</span></p>
                        </div>
                      </div>
                      <p className="mp-post__content">{post.content}</p>
                      <div className="mp-post__footer">
                        <button 
                          className={`mp-post__action ${isLiked ? 'liked' : ''}`}
                          onClick={() => toggleLike(post.id)}
                        >
                          {isLiked ? '❤️' : '🤍'} {post.likes + (isLiked ? 1 : 0)}
                        </button>
                        <button className="mp-post__action">💬 {post.comments}</button>
                        <button className="mp-post__action">↗️ Share</button>
                      </div>
                    </div>
                  )
                })}
              </>
            )}

            {activeTab === 'Events' && (
              <div className="mp-events-grid">
                {events.map(ev => (
                  <div key={ev.id} className="mp-event-card">
                    <img src={ev.img} alt={ev.name} className="mp-event-card__img" />
                    <div className="mp-event-card__body">
                      <span className="mp-event-card__sport" style={{ background: (sportColors[ev.sport] || 'var(--mp-primary)') + '22', color: sportColors[ev.sport] || 'var(--mp-primary)' }}>
                        {ev.sport}
                      </span>
                      <h3 className="mp-event-card__name">{ev.name}</h3>
                      <div className="mp-event-card__meta">
                        <span>📅 {ev.date}</span>
                        <span>👥 {ev.participants}/{ev.maxParticipants} players</span>
                        <span>🏆 {ev.prize}</span>
                      </div>
                      <button className="btn-primary mp-event-card__btn">Register Now</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Groups' && (
              <div className="mp-groups-list">
                {groups.map(group => {
                  const isJoined = joinedGroups.has(group.id)
                  return (
                    <div key={group.id} className="mp-group-card">
                      <div className="mp-group-card__icon">{group.icon}</div>
                      <div className="mp-group-card__info">
                        <h3 className="mp-group-card__name">{group.name}</h3>
                        <p className="mp-group-card__meta">{group.sport} · {group.members} members</p>
                      </div>
                      <button 
                        className={`btn-primary ${isJoined ? 'btn-outline' : ''}`}
                        onClick={() => toggleGroup(group.id)}
                      >
                        {isJoined ? 'Joined' : 'Join Group'}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {activeTab === 'Challenges' && (
              <div className="mp-challenges-list">
                {challenges.map(ch => {
                  const percent = Math.min(100, Math.round((ch.progress / ch.total) * 100))
                  const sportColor = sportColors[ch.sport] || 'var(--mp-primary)'
                  return (
                    <div key={ch.id} className="mp-challenge-card">
                      <div className="mp-challenge-card__icon">{ch.icon}</div>
                      <div className="mp-challenge-card__content">
                        <div className="mp-challenge-card__header">
                          <h3 className="mp-challenge-card__title">{ch.title}</h3>
                          <span className="mp-challenge-card__reward">{ch.reward}</span>
                        </div>
                        <p className="mp-challenge-card__meta">{ch.sport} Challenge</p>
                        <div className="mp-challenge-card__progress-container">
                          <div className="mp-challenge-card__progress-bar">
                            <div 
                              className="mp-challenge-card__progress-fill" 
                              style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${sportColor}88, ${sportColor})` }}
                            ></div>
                          </div>
                          <span className="mp-challenge-card__progress-text">{ch.progress} / {ch.total}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mp-right-panel">
          <div className="mp-panel-card">
            <div className="mp-panel-card__header">
              <h3>Trending Topics</h3>
            </div>
            <div className="mp-trending-topics">
              <div className="mp-topic">
                <p className="mp-topic__name">#BadmintonProSport</p>
                <p className="mp-topic__count">124 posts</p>
              </div>
              <div className="mp-topic">
                <p className="mp-topic__name">#PickleballSaiGon</p>
                <p className="mp-topic__count">89 posts</p>
              </div>
              <div className="mp-topic">
                <p className="mp-topic__name">#CourtAvailability</p>
                <p className="mp-topic__count">45 posts</p>
              </div>
            </div>
          </div>

          <div className="mp-panel-card" style={{ marginTop: '16px' }}>
            <div className="mp-panel-card__header">
              <h3>Suggested Friends</h3>
            </div>
            {/* Re-use nearby player style for suggested friends */}
            <div className="mp-nearby-player">
              <div className="mp-nearby-player__avatar-wrap">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80" alt="Jae" className="mp-nearby-player__avatar" />
              </div>
              <div className="mp-nearby-player__info">
                <p className="mp-nearby-player__name">Jae K.</p>
                <p className="mp-nearby-player__dist">Badminton</p>
              </div>
              <button className="mp-add-btn" aria-label="Add Friend">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              </button>
            </div>
            <div className="mp-nearby-player">
              <div className="mp-nearby-player__avatar-wrap">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80" alt="Mia" className="mp-nearby-player__avatar" />
              </div>
              <div className="mp-nearby-player__info">
                <p className="mp-nearby-player__name">Mia S.</p>
                <p className="mp-nearby-player__dist">Pickleball</p>
              </div>
              <button className="mp-add-btn" aria-label="Add Friend">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MatchProLayout>
  )
}
