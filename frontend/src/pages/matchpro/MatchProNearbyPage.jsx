import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MatchProLayout from '../../layouts/MatchProLayout'

// Custom DivIcons
const badmintonIcon = L.divIcon({
  html: '<div class="bg-white p-2 rounded-xl shadow-lg text-xl border-2 border-[#00c8aa] flex items-center justify-center transition-transform hover:scale-110"><span class="relative z-10">🏸</span><div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#00c8aa]"></div></div>',
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 48],
  popupAnchor: [0, -48]
})

const pickleballIcon = L.divIcon({
  html: '<div class="bg-white p-2 rounded-xl shadow-lg text-xl border-2 border-[#00c8aa] flex items-center justify-center transition-transform hover:scale-110"><span class="relative z-10">🏓</span><div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#00c8aa]"></div></div>',
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 48],
  popupAnchor: [0, -48]
})

const userIcon = L.divIcon({
  html: '<div class="bg-[#0d2d3a] text-white text-xs font-bold px-4 py-2 rounded-full border-[3px] border-white shadow-[0_4px_20px_rgba(13,45,58,0.4)] whitespace-nowrap">📍 Vị trí của bạn</div>',
  className: '',
  iconSize: [120, 36],
  iconAnchor: [60, 18]
})

const USER_POSITION = [16.0669, 108.2235] // Da Nang Center

const venues = [
  { id: 1, name: 'Cung Thể thao Tiên Sơn', sport: 'Badminton', distance: '3.5 km', courts: 10, hours: '5am - 10pm', rating: 4.9, icon: '🏸', active: 24, position: [16.035, 108.232], price: '80K', img: 'https://images.unsplash.com/photo-1572991054320-f56b54133e5c?w=600&q=80' },
  { id: 2, name: 'My Khe Pickleball Resort', sport: 'Pickleball', distance: '1.2 km', courts: 5, hours: '6am - 11pm', rating: 4.8, icon: '🏓', active: 12, position: [16.060, 108.245], price: '120K', img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&q=80' },
  { id: 3, name: 'Hải Châu Sports Arena', sport: 'Badminton', distance: '2.1 km', courts: 8, hours: '5am - 11pm', rating: 4.7, icon: '🏸', active: 15, position: [16.050, 108.220], price: '70K', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80' },
  { id: 4, name: 'Sơn Trà Pickleball Club', sport: 'Pickleball', distance: '4.5 km', courts: 4, hours: '7am - 10pm', rating: 4.6, icon: '🏓', active: 8, position: [16.085, 108.240], price: '100K', img: 'https://images.unsplash.com/photo-1622618991746-fe6004db3a47?w=600&q=80' },
  { id: 5, name: 'Hòa Xuân Complex', sport: 'Badminton', distance: '7.2 km', courts: 12, hours: '5am - 10pm', rating: 4.5, icon: '🏸', active: 18, position: [16.002, 108.225], price: '60K', img: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=600&q=80' },
]

const nearbyPlayers = [
  { name: 'Marcus T.', sport: 'Badminton', dist: '0.5km', online: true, img: 'https://ui-avatars.com/api/?name=Marcus+T&background=00c8aa&color=fff' },
  { name: 'Elena R.', sport: 'Pickleball', dist: '1.1km', online: true, img: 'https://ui-avatars.com/api/?name=Elena+R&background=0d2d3a&color=fff' },
  { name: 'Jae K.', sport: 'Badminton', dist: '1.5km', online: false, img: 'https://ui-avatars.com/api/?name=Jae+K' },
  { name: 'Mia S.', sport: 'Badminton', dist: '2km', online: true, img: 'https://ui-avatars.com/api/?name=Mia+S&background=f0f7f6&color=00c8aa' },
  { name: 'Chris N.', sport: 'Pickleball', dist: '2.2km', online: false, img: 'https://ui-avatars.com/api/?name=Chris+N' },
  { name: 'Linh P.', sport: 'Badminton', dist: '3km', online: true, img: 'https://ui-avatars.com/api/?name=Linh+P&background=ffb020&color=fff' }
]

const sportFilters = ['All Sports', 'Badminton', 'Pickleball']

function MapFlyTo({ selectedPosition }) {
  const map = useMap()
  useEffect(() => {
    if (selectedPosition) {
      map.flyTo(selectedPosition, 16, { duration: 1.2 })
    } else {
      map.flyTo(USER_POSITION, 13, { duration: 1.2 })
    }
  }, [selectedPosition, map])
  return null
}

export default function MatchProNearbyPage() {
  const [sportFilter, setSportFilter] = useState('All Sports')
  const [selectedVenue, setSelectedVenue] = useState(null)
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fade-up', { opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power3.out' })
    }, pageRef)
    return () => ctx.revert()
  }, [sportFilter])

  const filteredVenues = venues.filter(v => sportFilter === 'All Sports' || v.sport === sportFilter)
  const activeVenueInfo = venues.find(v => v.id === selectedVenue)

  return (
    <MatchProLayout>
      <div className="grid grid-cols-[1fr_45%] max-xl:grid-cols-1 gap-8 items-start h-full" ref={pageRef}>
        
        {/* Left Content - Scrollable */}
        <div className="flex flex-col min-w-0 pb-12 pt-2">
          
          <div className="mb-6 fade-up">
            <h1 className="font-['Oswald'] text-3xl font-bold text-[#0d2d3a] mb-2">Đà Nẵng Sports Map</h1>
            <p className="text-base text-slate-500">Khám phá các sân tập cao cấp và người chơi đang online quanh khu vực Đà Nẵng.</p>
          </div>

          {/* Player Carousel (Horizontal) */}
          <div className="mb-8 fade-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0d2d3a]">Live Players Nearby</h3>
              <button className="text-sm font-semibold text-[#00c8aa] hover:underline">Xem tất cả</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {nearbyPlayers.map(p => (
                <div key={p.name} className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm min-w-[110px] snap-start hover:-translate-y-1 transition-transform cursor-pointer group">
                  <div className="relative">
                    <img src={p.img} alt={p.name} className="w-14 h-14 rounded-full object-cover shadow-md group-hover:ring-4 ring-[#00c8aa]/20 transition-all" />
                    {p.online && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-[#0d2d3a] truncate w-20">{p.name}</p>
                    <p className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider">{p.dist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Filters */}
          <div className="sticky top-0 z-10 bg-[#f8fafc]/90 backdrop-blur-md py-4 mb-4 border-b border-slate-200/50 fade-up">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {sportFilters.map(f => (
                <button 
                  key={f} 
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${sportFilter === f ? 'bg-[#0d2d3a] text-white shadow-lg shadow-[#0d2d3a]/20' : 'bg-white text-slate-500 border border-slate-200 hover:border-[#00c8aa] hover:text-[#00c8aa]'}`}
                  onClick={() => setSportFilter(f)}
                >
                  {f === 'All Sports' ? 'Tất cả các môn' : f}
                </button>
              ))}
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#0d2d3a] mb-5 fade-up">Hơn {filteredVenues.length} địa điểm phù hợp</h2>
          
          {/* Airbnb style Venue Grid */}
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 mb-8">
            {filteredVenues.map(v => (
              <div 
                key={v.id} 
                className={`fade-up bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 group ${selectedVenue === v.id ? 'ring-4 ring-[#00c8aa]/30 shadow-xl scale-[1.02]' : 'border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5'}`} 
                onClick={() => setSelectedVenue(v.id)}
              >
                {/* Image Header */}
                <div className="relative w-full h-48 overflow-hidden">
                  <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur text-[#0d2d3a] text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm">
                    ⭐ {v.rating}
                  </div>
                  <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur text-white text-xs font-bold px-2.5 py-1.5 rounded-lg border border-white/20">
                    {v.distance}
                  </div>
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-[#0d2d3a] text-lg leading-tight group-hover:text-[#00c8aa] transition-colors">{v.name}</h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">{v.sport} • {v.courts} Sân • {v.hours}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-lg font-black text-[#0d2d3a]">{v.price}</span>
                      <span className="text-xs font-medium text-slate-500">/giờ</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      <span className="text-xs font-bold text-red-500">{v.active} Đang chơi</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Sticky Map (Airbnb style) */}
        <div className="sticky top-[20px] h-[calc(100vh-40px)] max-xl:h-[500px] max-xl:relative max-xl:top-0 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white fade-up z-0">
          
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-slate-100 flex items-center gap-3">
             <span className="text-xl">📍</span>
             <span className="font-bold text-[#0d2d3a] text-sm whitespace-nowrap">Khu vực: Đà Nẵng</span>
          </div>

          <MapContainer center={USER_POSITION} zoom={13} scrollWheelZoom={true} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <MapFlyTo selectedPosition={activeVenueInfo?.position} />
            <Marker position={USER_POSITION} icon={userIcon} zIndexOffset={1000} />

            {filteredVenues.map(v => (
              <Marker 
                key={v.id} 
                position={v.position} 
                icon={v.sport === 'Badminton' ? badmintonIcon : pickleballIcon}
                eventHandlers={{
                  click: () => setSelectedVenue(v.id)
                }}
              >
                <Popup className="rounded-2xl font-sans overflow-hidden p-0 m-0 custom-airbnb-popup">
                  <div className="w-[220px] flex flex-col p-0">
                    <img src={v.img} alt={v.name} className="w-full h-[120px] object-cover rounded-t-xl" />
                    <div className="p-3 bg-white rounded-b-xl">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-[#0d2d3a] text-sm leading-tight">{v.name}</h3>
                        <span className="text-xs font-bold text-[#00c8aa] bg-[#00c8aa]/10 px-1.5 py-0.5 rounded">⭐ {v.rating}</span>
                      </div>
                      <p className="text-[0.7rem] text-slate-500 mb-2">{v.distance} • {v.price}/giờ</p>
                      <button className="w-full bg-[#0d2d3a] text-white font-bold text-xs py-2 rounded-lg hover:bg-[#00c8aa] transition-colors">Đặt sân ngay</button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

      </div>
      
      {/* Add global styles for the popup override since Tailwind doesn't reach inside Leaflet easily */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-popup-content-wrapper { padding: 0 !important; border-radius: 12px !important; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important; }
        .leaflet-popup-content { margin: 0 !important; width: auto !important; }
        .leaflet-popup-close-button { color: white !important; text-shadow: 0 1px 3px rgba(0,0,0,0.8); right: 8px !important; top: 8px !important; font-size: 16px !important; z-index: 10; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </MatchProLayout>
  )
}
