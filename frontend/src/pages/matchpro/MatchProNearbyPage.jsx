import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import MatchProLayout from '../../layouts/MatchProLayout'
import './MatchProNearbyPage.css'

const venues = [
  { id: 1, name: 'City Sports Hub', sport: 'Multi-Sport', distance: '0.4 km', courts: 8, hours: '6am-11pm', rating: 4.8, icon: '🏟️', active: 12 },
  { id: 2, name: 'Westside Tennis Club', sport: 'Tennis', distance: '1.2 km', courts: 4, hours: '7am-10pm', rating: 4.9, icon: '🎾', active: 6 },
  { id: 3, name: 'Downtown Basketball Court', sport: 'Basketball', distance: '1.8 km', courts: 2, hours: 'Open 24h', rating: 4.5, icon: '🏀', active: 8 },
  { id: 4, name: 'Padel Zone Pro', sport: 'Padel', distance: '2.3 km', courts: 6, hours: '7am-11pm', rating: 4.7, icon: '🏸', active: 4 },
  { id: 5, name: 'Champions Badminton Hall', sport: 'Badminton', distance: '3.1 km', courts: 12, hours: '6am-10pm', rating: 4.6, icon: '🏸', active: 9 },
  { id: 6, name: 'Grand Soccer Field', sport: 'Soccer', distance: '3.8 km', courts: 3, hours: '7am-9pm', rating: 4.4, icon: '⚽', active: 22 },
]

const nearbyPlayers = [
  { name: 'Marcus T.', sport: 'Tennis', dist: '0.5km', online: true, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80' },
  { name: 'Elena R.', sport: 'Padel', dist: '1.1km', online: true, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80' },
  { name: 'Jae K.', sport: 'Basketball', dist: '1.5km', online: false, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80' },
  { name: 'Mia S.', sport: 'Badminton', dist: '2km', online: true, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80' },
  { name: 'Chris N.', sport: 'Soccer', dist: '2.2km', online: false, img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&q=80' }
]

const sportFilters = ['All', 'Tennis', 'Basketball', 'Padel', 'Badminton', 'Soccer', 'Squash']
const distances = ['1km', '5km', '10km', '20km']

export default function MatchProNearbyPage() {
  const [distanceFilter, setDistanceFilter] = useState('5km')
  const [sportFilter, setSportFilter] = useState('All')
  const [selectedVenue, setSelectedVenue] = useState(null)
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mp-map-hero', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
      gsap.from('.mp-venue-card', { opacity: 0, y: 30, stagger: 0.1, duration: 0.5, ease: 'power2.out', delay: 0.2 })
    }, pageRef)
    return () => ctx.revert()
  }, [sportFilter, distanceFilter])

  const filteredVenues = venues.filter(v => sportFilter === 'All' || v.sport === sportFilter)

  return (
    <MatchProLayout>
      <div className="mp-page-with-sidebar" ref={pageRef}>
        {/* Same left sidebar for layout consistency if needed, but here we can just use the main content and right panel */}
        <div className="mp-content mp-nearby-content">
          
          <div className="mp-nearby-header">
            <h1 className="mp-nearby-title">📍 Nearby Sports</h1>
            <p className="mp-nearby-sub">Find venues and players around you.</p>
          </div>

          {/* Map Placeholder */}
          <div className="mp-map-hero">
            <div className="mp-map-overlay">
              <div className="mp-map-search">
                <input type="text" placeholder="Search locations, venues..." className="mp-map-input" />
                <select className="mp-map-select" value={distanceFilter} onChange={e => setDistanceFilter(e.target.value)}>
                  {distances.map(d => <option key={d} value={d}>Within {d}</option>)}
                </select>
                <button className="btn-primary mp-map-btn">Search</button>
              </div>
            </div>
            
            {/* Map Pins (Mock) */}
            <div className="mp-map-pin" style={{ top: '30%', left: '40%' }}>🏟️</div>
            <div className="mp-map-pin" style={{ top: '50%', left: '60%' }}>🎾</div>
            <div className="mp-map-pin" style={{ top: '70%', left: '25%' }}>🏀</div>
            <div className="mp-map-pin" style={{ top: '20%', left: '75%' }}>🏸</div>
            <div className="mp-map-pin mp-map-pin--user" style={{ top: '50%', left: '50%' }}>📍 You</div>
          </div>

          {/* Filters */}
          <div className="mp-sport-filters">
            {sportFilters.map(f => (
              <button 
                key={f} 
                className={`mp-sport-filter ${sportFilter === f ? 'mp-sport-filter--active' : ''}`}
                onClick={() => setSportFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <h2 className="mp-section-title">Venues Near You</h2>
          
          {/* Venues Grid */}
          <div className="mp-venues-grid">
            {filteredVenues.map(v => (
              <div key={v.id} className={`mp-venue-card ${selectedVenue === v.id ? 'active' : ''}`} onClick={() => setSelectedVenue(v.id)}>
                <div className="mp-venue-card__header">
                  <span className="mp-venue-icon">{v.icon}</span>
                  <div className="mp-venue-info">
                    <h3 className="mp-venue-name">{v.name}</h3>
                    <p className="mp-venue-sport">{v.sport} · {v.distance}</p>
                  </div>
                </div>
                <div className="mp-venue-card__meta">
                  <span>🎾 {v.courts} Courts</span>
                  <span>🕒 {v.hours}</span>
                  <span>⭐ {v.rating}</span>
                </div>
                <div className="mp-venue-card__footer">
                  <span className="mp-venue-active">🔥 {v.active} active players</span>
                  <button className="btn-outline mp-venue-btn">View Courts</button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredVenues.length === 0 && (
            <div className="mp-empty">
              <span>🗺️</span>
              <p>No venues found for {sportFilter} within {distanceFilter}.</p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="mp-right-panel">
          <div className="mp-panel-card">
            <div className="mp-panel-card__header">
              <h3>Active Players Nearby</h3>
            </div>
            {nearbyPlayers.map(p => (
              <div key={p.name} className="mp-nearby-player">
                <div className="mp-nearby-player__avatar-wrap">
                  <img src={p.img} alt={p.name} className="mp-nearby-player__avatar" />
                  {p.online && <span className="mp-online-dot" />}
                </div>
                <div className="mp-nearby-player__info">
                  <p className="mp-nearby-player__name">{p.name}</p>
                  <p className="mp-nearby-player__dist">{p.sport} · {p.dist}</p>
                </div>
                <button className="mp-add-btn" aria-label="Message">💬</button>
              </div>
            ))}
          </div>

          <div className="mp-panel-card" style={{ marginTop: '16px' }}>
            <div className="mp-panel-card__header">
              <h3>Pickup Games</h3>
            </div>
            <div className="mp-pickup-game">
              <span className="mp-pickup-icon">🏀</span>
              <div className="mp-pickup-info">
                <p className="mp-pickup-title">3v3 Half Court</p>
                <p className="mp-pickup-meta">City Hub · In 30 mins</p>
              </div>
              <button className="btn-primary mp-pickup-join">Join</button>
            </div>
            <div className="mp-pickup-game">
              <span className="mp-pickup-icon">🎾</span>
              <div className="mp-pickup-info">
                <p className="mp-pickup-title">Doubles Practice</p>
                <p className="mp-pickup-meta">Westside · 6:00 PM</p>
              </div>
              <button className="btn-primary mp-pickup-join">Join</button>
            </div>
            <div className="mp-pickup-game">
              <span className="mp-pickup-icon">⚽</span>
              <div className="mp-pickup-info">
                <p className="mp-pickup-title">Casual 5v5</p>
                <p className="mp-pickup-meta">Grand Field · 7:30 PM</p>
              </div>
              <button className="btn-primary mp-pickup-join">Join</button>
            </div>
          </div>
        </div>
      </div>
    </MatchProLayout>
  )
}
