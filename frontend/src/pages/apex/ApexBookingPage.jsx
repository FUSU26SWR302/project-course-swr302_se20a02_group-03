import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ApexLayout from '../../layouts/ApexLayout'
import './ApexBookingPage.css'

const courts = [
  { id: 1, name: 'Indoor Tennis Court A', type: 'Tennis', price: 45, status: 'available', icon: '🎾', capacity: 4, features: ['Air Conditioned', 'Pro Lighting', 'Locker Room'] },
  { id: 2, name: 'Main Basketball Arena', type: 'Basketball', price: 60, status: 'available', icon: '🏀', capacity: 10, features: ['Full Court', 'Scoreboard', 'Bleachers'] },
  { id: 3, name: 'Padel Court 1', type: 'Padel', price: 35, status: 'available', icon: '🏸', capacity: 4, features: ['Glass Walls', 'Pro Net', 'LED Lighting'] },
  { id: 4, name: 'Outdoor Hard Court B', type: 'Tennis', price: 30, status: 'available', icon: '🎾', capacity: 4, features: ['UV Resistant', 'Wind Barrier'] },
  { id: 5, name: 'Squash Court 3', type: 'Squash', price: 28, status: 'booked', icon: '🟡', capacity: 2, features: ['Glass Back Wall', 'Pro Court'] },
  { id: 6, name: 'Badminton Hall C', type: 'Badminton', price: 22, status: 'available', icon: '🏸', capacity: 4, features: ['Feather Court', 'High Ceiling'] },
]

const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00',
]

const bookedSlots = { 1: ['09:00', '10:00'], 2: ['14:00'], 5: ['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'] }

const sportTypes = ['All', 'Tennis', 'Basketball', 'Padel', 'Squash', 'Badminton']

export default function ApexBookingPage() {
  const [filter, setFilter] = useState('All')
  const [selectedCourt, setSelectedCourt] = useState(null)
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [selectedSlots, setSelectedSlots] = useState([])
  const [step, setStep] = useState(1) // 1=select court, 2=pick time, 3=confirm
  const [booked, setBooked] = useState(false)
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.booking-hero', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' })
      gsap.from('.court-card', { opacity: 0, y: 40, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.2 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const filtered = courts.filter(c => filter === 'All' || c.type === filter)

  const toggleSlot = (slot) => {
    if (bookedSlots[selectedCourt?.id]?.includes(slot)) return
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    )
  }

  const totalPrice = selectedCourt ? selectedSlots.length * selectedCourt.price : 0

  const handleConfirm = () => {
    gsap.to('.booking-summary', { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 })
    setBooked(true)
  }

  if (booked) {
    return (
      <ApexLayout title="Booking">
        <div className="booking-success" ref={pageRef}>
          <div className="booking-success__card">
            <div className="booking-success__icon">✅</div>
            <h2>Booking Confirmed!</h2>
            <p>{selectedCourt?.name}</p>
            <p className="booking-success__detail">{selectedDate} · {selectedSlots.join(', ')}</p>
            <p className="booking-success__price">${totalPrice}.00 paid</p>
            <button className="btn-primary" onClick={() => { setBooked(false); setStep(1); setSelectedCourt(null); setSelectedSlots([]) }}>Book Another Court</button>
          </div>
        </div>
      </ApexLayout>
    )
  }

  return (
    <ApexLayout title="Booking">
      <div className="apex-booking" ref={pageRef}>
        {/* Hero */}
        <div className="booking-hero">
          <div>
            <h1 className="booking-hero__title">Book a Court</h1>
            <p className="booking-hero__sub">Choose your sport, pick your time, play your game.</p>
          </div>
          {/* Steps indicator */}
          <div className="booking-steps">
            {['Select Court', 'Pick Time', 'Confirm'].map((s, i) => (
              <div key={s} className={`booking-step ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
                <span className="booking-step__num">{step > i + 1 ? '✓' : i + 1}</span>
                <span className="booking-step__label">{s}</span>
                {i < 2 && <div className="booking-step__line" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select Court */}
        {step === 1 && (
          <div className="booking-step1">
            {/* Filters */}
            <div className="booking-filters">
              {sportTypes.map(t => (
                <button key={t} className={`booking-filter-btn ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
              ))}
            </div>

            <div className="courts-grid">
              {filtered.map(court => (
                <div
                  key={court.id}
                  className={`court-card ${court.status === 'booked' ? 'court-card--booked' : ''} ${selectedCourt?.id === court.id ? 'court-card--selected' : ''}`}
                  onClick={() => court.status !== 'booked' && setSelectedCourt(court)}
                >
                  <div className="court-card__top">
                    <span className="court-card__icon">{court.icon}</span>
                    <span className={`court-card__badge ${court.status === 'booked' ? 'badge--booked' : 'badge--available'}`}>
                      {court.status === 'booked' ? 'Fully Booked' : 'Available'}
                    </span>
                  </div>
                  <h3 className="court-card__name">{court.name}</h3>
                  <p className="court-card__type">{court.type} · Up to {court.capacity} players</p>
                  <div className="court-card__features">
                    {court.features.map(f => <span key={f} className="court-feature">{f}</span>)}
                  </div>
                  <div className="court-card__footer">
                    <span className="court-card__price"><strong>${court.price}</strong>/hr</span>
                    {court.status !== 'booked' && (
                      <button className={`btn-primary court-card__btn ${selectedCourt?.id === court.id ? 'selected' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedCourt(court); setStep(2) }}>
                        {selectedCourt?.id === court.id ? '✓ Selected' : 'Select'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {selectedCourt && (
              <div className="booking-bottom-bar">
                <span>Selected: <strong>{selectedCourt.name}</strong> — ${selectedCourt.price}/hr</span>
                <button className="btn-primary" onClick={() => setStep(2)}>Pick a Time →</button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Pick Time */}
        {step === 2 && (
          <div className="booking-step2">
            <div className="booking-step2__inner">
              <div className="timepicker">
                <div className="timepicker__header">
                  <h2 className="timepicker__title">Select Time Slots</h2>
                  <div className="timepicker__date-row">
                    <label>Date</label>
                    <input type="date" value={selectedDate} min={new Date().toISOString().slice(0,10)}
                      onChange={e => setSelectedDate(e.target.value)} className="timepicker__date-input" id="booking-date" />
                  </div>
                </div>

                <div className="timepicker__legend">
                  <span className="legend-dot legend-dot--avail" /> Available
                  <span className="legend-dot legend-dot--sel" /> Selected
                  <span className="legend-dot legend-dot--book" /> Booked
                </div>

                <div className="timepicker__slots">
                  {timeSlots.map(slot => {
                    const isBooked = bookedSlots[selectedCourt.id]?.includes(slot)
                    const isSelected = selectedSlots.includes(slot)
                    return (
                      <button
                        key={slot}
                        className={`time-slot ${isBooked ? 'time-slot--booked' : ''} ${isSelected ? 'time-slot--selected' : ''}`}
                        onClick={() => toggleSlot(slot)}
                        disabled={isBooked}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Summary panel */}
              <div className="booking-summary">
                <h3 className="booking-summary__title">Booking Summary</h3>
                <div className="booking-summary__court">
                  <span className="booking-summary__icon">{selectedCourt.icon}</span>
                  <div>
                    <p className="booking-summary__name">{selectedCourt.name}</p>
                    <p className="booking-summary__type">{selectedCourt.type}</p>
                  </div>
                </div>
                <div className="booking-summary__row"><span>Date</span><strong>{selectedDate}</strong></div>
                <div className="booking-summary__row">
                  <span>Time Slots</span>
                  <strong>{selectedSlots.length > 0 ? selectedSlots.join(', ') : '—'}</strong>
                </div>
                <div className="booking-summary__row"><span>Duration</span><strong>{selectedSlots.length}h</strong></div>
                <div className="booking-summary__divider" />
                <div className="booking-summary__total"><span>Total</span><strong>${totalPrice}.00</strong></div>
                <button className="btn-primary booking-summary__btn" disabled={selectedSlots.length === 0} onClick={() => setStep(3)}>
                  Continue →
                </button>
                <button className="btn-outline booking-summary__back" onClick={() => { setStep(1); setSelectedSlots([]) }}>← Back</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="booking-step3">
            <div className="booking-confirm">
              <h2 className="booking-confirm__title">Confirm Your Booking</h2>
              <div className="booking-confirm__card">
                <div className="booking-confirm__row"><span>Court</span><strong>{selectedCourt.icon} {selectedCourt.name}</strong></div>
                <div className="booking-confirm__row"><span>Date</span><strong>{selectedDate}</strong></div>
                <div className="booking-confirm__row"><span>Time</span><strong>{selectedSlots.join(' – ')}</strong></div>
                <div className="booking-confirm__row"><span>Duration</span><strong>{selectedSlots.length} hour{selectedSlots.length > 1 ? 's' : ''}</strong></div>
                <div className="booking-confirm__row"><span>Rate</span><strong>${selectedCourt.price}/hr</strong></div>
                <div className="booking-confirm__divider" />
                <div className="booking-confirm__total"><span>Total Due</span><strong>${totalPrice}.00</strong></div>
              </div>

              <div className="booking-payment">
                <h3>Payment Method</h3>
                <div className="booking-payment__options">
                  <label className="payment-option payment-option--active">
                    <input type="radio" name="payment" defaultChecked /> 💳 Credit Card ending in 4242
                  </label>
                  <label className="payment-option">
                    <input type="radio" name="payment" /> 🏦 PRO-SPORT Wallet ($120.00)
                  </label>
                </div>
              </div>

              <div className="booking-confirm__actions">
                <button className="btn-outline" onClick={() => setStep(2)}>← Edit</button>
                <button className="btn-primary booking-confirm__pay" onClick={handleConfirm}>
                  Pay ${totalPrice}.00 & Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ApexLayout>
  )
}
