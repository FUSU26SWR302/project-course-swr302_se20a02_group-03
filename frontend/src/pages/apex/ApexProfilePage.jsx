import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ApexLayout from '../../layouts/ApexLayout'
import './ApexProfilePage.css'

const badges = [
  { icon: '🏆', label: 'Pro Member', color: '#f59e0b' },
  { icon: '🏸', label: '50+ Matches', color: '#0fc8b5' },
  { icon: '⭐', label: 'Top Rated', color: '#6366f1' },
  { icon: '🔥', label: '10-Day Streak', color: '#ef4444' },
]

const recentActivity = [
  { id: 1, type: 'booking', icon: '📅', desc: 'Booked Sân Cầu lông A', time: 'Today, 10:30 AM' },
  { id: 2, type: 'match', icon: '🏸', desc: 'Won match vs David K. (21-15, 21-18)', time: '2 days ago' },
  { id: 3, type: 'payment', icon: '💳', desc: 'Paid 120,000đ for Sân 1', time: '3 days ago' },
  { id: 4, type: 'rental', icon: '🎿', desc: 'Rented Vợt Yonex Astrox 99 for 1 day', time: 'Last week' },
]

export default function ApexProfilePage() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: 'Alex Johnson', email: 'alex@prosport.com', phone: '+84 901 234 567', sport: 'Badminton', level: 'Intermediate', bio: 'Passionate badminton player. Looking for competitive doubles partners at the Intermediate–Advanced level.' })
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.profile-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' })
      gsap.from('.profile-section', { opacity: 0, y: 30, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 0.3 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const save = () => {
    setEditing(false)
    gsap.from('.profile-header__name', { scale: 1.04, duration: 0.3, ease: 'back.out(1.5)' })
  }

  return (
    <ApexLayout title="Profile">
      <div className="apex-profile" ref={pageRef}>
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-header__left">
            <div className="profile-avatar-wrap">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" alt="Alex" className="profile-avatar" />
              <span className="profile-avatar__badge">Elite</span>
            </div>
            <div>
              <h1 className="profile-header__name">{form.name}</h1>
              <p className="profile-header__sub">{form.sport} · {form.level}</p>
              <p className="profile-header__email">{form.email}</p>
            </div>
          </div>
          <button className={editing ? 'btn-primary' : 'btn-outline'} onClick={editing ? save : () => setEditing(true)}>
            {editing ? '✓ Save Profile' : '✏️ Edit Profile'}
          </button>
        </div>

        {/* Stats */}
        <div className="profile-stats profile-section">
          {[{ num: 47, label: 'Matches Played' }, { num: 31, label: 'Won' }, { num: 23, label: 'Courts Booked' }, { num: 4.8, label: 'Rating' }].map(s => (
            <div key={s.label} className="profile-stat">
              <span className="profile-stat__num">{s.num}</span>
              <span className="profile-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="profile-grid">
          {/* Edit Info */}
          <div className="profile-section profile-info">
            <h2 className="profile-section__title">Personal Info</h2>
            {editing ? (
              <div className="profile-form">
                {[
                  { label: 'Full Name', key: 'name', type: 'text', id: 'profile-name' },
                  { label: 'Email', key: 'email', type: 'email', id: 'profile-email' },
                  { label: 'Phone', key: 'phone', type: 'tel', id: 'profile-phone' },
                ].map(f => (
                  <div key={f.key} className="profile-field">
                    <label htmlFor={f.id}>{f.label}</label>
                    <input id={f.id} type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} className="profile-input" />
                  </div>
                ))}
                <div className="profile-field">
                  <label htmlFor="profile-sport">Primary Sport</label>
                  <select id="profile-sport" value={form.sport} onChange={e => setForm({ ...form, sport: e.target.value })} className="profile-input">
                    {['Badminton', 'Pickleball'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="profile-field">
                  <label htmlFor="profile-level">Skill Level</label>
                  <select id="profile-level" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} className="profile-input">
                    {['Beginner', 'Intermediate', 'Advanced', 'Pro'].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div className="profile-field">
                  <label htmlFor="profile-bio">Bio</label>
                  <textarea id="profile-bio" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="profile-input profile-textarea" rows={3} />
                </div>
              </div>
            ) : (
              <div className="profile-info-view">
                <div className="profile-info-row"><span>Phone</span><strong>{form.phone}</strong></div>
                <div className="profile-info-row"><span>Primary Sport</span><strong>{form.sport}</strong></div>
                <div className="profile-info-row"><span>Skill Level</span><strong>{form.level}</strong></div>
                <div className="profile-info-row profile-info-row--bio"><span>Bio</span><p>{form.bio}</p></div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div>
            {/* Badges */}
            <div className="profile-section profile-badges">
              <h2 className="profile-section__title">Achievements</h2>
              <div className="badges-grid">
                {badges.map(b => (
                  <div key={b.label} className="badge-item">
                    <div className="badge-item__icon" style={{ background: b.color + '1a', color: b.color }}>{b.icon}</div>
                    <span className="badge-item__label">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="profile-section profile-activity">
              <h2 className="profile-section__title">Recent Activity</h2>
              {recentActivity.map(a => (
                <div key={a.id} className="activity-item">
                  <span className="activity-item__icon">{a.icon}</span>
                  <div>
                    <p className="activity-item__desc">{a.desc}</p>
                    <p className="activity-item__time">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ApexLayout>
  )
}
