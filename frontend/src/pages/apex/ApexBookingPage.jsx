import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ApexLayout from '../../layouts/ApexLayout'
import { bookingApi } from '../../api/bookingApi'
import { paymentApi } from '../../api/paymentApi'
import { useToast } from '../../components/Toast'
import './ApexBookingPage.css'

const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00',
]

const sportTypes = ['All', 'Badminton', 'Pickleball']

export default function ApexBookingPage() {
  const [filter, setFilter] = useState('All')
  const [courts, setCourts] = useState([])
  const [selectedCourt, setSelectedCourt] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [minDate, setMinDate] = useState('')
  const [selectedSlots, setSelectedSlots] = useState([])
  const [bookedSlots, setBookedSlots] = useState([])
  const [step, setStep] = useState(1) // 1=select court, 2=pick time, 3=confirm
  const [booked, setBooked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('vnpay')
  const [escrowBalance, setEscrowBalance] = useState(0)
  
  const pageRef = useRef(null)
  const { addToast } = useToast()

  // Load Courts
  useEffect(() => {
    bookingApi.getCourts()
      .then(res => {
        if (res.data) {
          const mappedCourts = res.data.map(c => ({
            id: c.courtId,
            name: c.name,
            type: c.courtTypeName || 'Badminton',
            price: c.pricePerHour > 0 ? c.pricePerHour : 100000,
            status: c.status?.toLowerCase() === 'available' ? 'available' : 'booked',
            icon: c.courtTypeName?.toLowerCase().includes('pickleball') ? '🏓' : '🏸',
            capacity: 4,
            features: c.description ? c.description.split(',').map(s => s.trim()) : ['Tiêu chuẩn'],
            imageUrl: c.imageUrl
          }))
          setCourts(mappedCourts)
        }
      })
      .catch(err => addToast("Lỗi tải danh sách sân: " + err.message, "error"))
      
    // Load Wallet
    paymentApi.getEscrowWallet()
      .then(res => {
        if (res.data) setEscrowBalance(res.data.balance)
      })
      .catch(err => console.error("Lỗi ví", err))
  }, [])

  // Init Date & GSAP
  useEffect(() => {
    const todayStr = new Date().toISOString().slice(0, 10)
    if (!selectedDate) setSelectedDate(todayStr)
    setMinDate(todayStr)

    const ctx = gsap.context(() => {
      gsap.from('.booking-hero', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' })
      gsap.from('.court-card', { opacity: 0, y: 40, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.2 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  // Load booked slots when court or date changes
  useEffect(() => {
    if (selectedCourt && selectedDate) {
      bookingApi.getBookedSlots(selectedCourt.id, selectedDate)
        .then(res => {
          if (res.data) {
            setBookedSlots(res.data)
          } else {
            setBookedSlots([])
          }
        })
        .catch(err => console.error("Lỗi tải giờ bận", err))
    }
  }, [selectedCourt, selectedDate])

  const filtered = courts.filter(c => filter === 'All' || c.type === filter)

  const toggleSlot = (slot) => {
    if (bookedSlots.includes(slot)) return
    
    // Đảm bảo chọn giờ liên tiếp
    setSelectedSlots(prev => {
        if (prev.includes(slot)) return prev.filter(s => s !== slot)
        
        // Nếu đã có slot, kiểm tra xem slot mới có liền kề không
        if (prev.length > 0) {
            const slotHour = parseInt(slot.split(':')[0])
            const prevHours = prev.map(s => parseInt(s.split(':')[0]))
            const minHour = Math.min(...prevHours)
            const maxHour = Math.max(...prevHours)
            
            if (slotHour !== minHour - 1 && slotHour !== maxHour + 1) {
                addToast("Vui lòng chọn các khung giờ liên tiếp", "warning")
                return prev
            }
        }
        return [...prev, slot].sort()
    })
  }

  const totalPrice = selectedCourt ? selectedSlots.length * selectedCourt.price : 0

  const calculateEndTime = (lastSlot) => {
    const h = parseInt(lastSlot.split(':')[0])
    return `${String(h + 1).padStart(2, '0')}:00`
  }

  const handleConfirm = async () => {
    if (selectedSlots.length === 0) return
    
    if (paymentMethod === 'escrow' && escrowBalance < totalPrice) {
      addToast(`Số dư ví không đủ! (Cần thêm ${(totalPrice - escrowBalance).toLocaleString('vi-VN')} VNĐ). Vui lòng nạp tiền.`, "error");
      return;
    }

    setIsLoading(true)
    try {
      // Vì các slot là 1 giờ liên tiếp, ta lấy start của slot đầu và end của slot cuối
      const startTime = selectedSlots[0].length === 5 ? selectedSlots[0] + ':00' : selectedSlots[0]
      const lastSlot = selectedSlots[selectedSlots.length - 1]
      const endTimeStr = calculateEndTime(lastSlot)
      const endTime = endTimeStr.length === 5 ? endTimeStr + ':00' : endTimeStr

      const payload = {
        details: [
          {
            courtId: selectedCourt.id,
            bookingDate: selectedDate,
            startTime: startTime,
            endTime: endTime
          }
        ]
      }

      const res = await bookingApi.createBooking(payload)
      
      if (res.statusCode === 200 || res.statusCode === 201) {
        const bookingId = res.data?.bookingId
        
        if (!bookingId) {
            addToast("Không nhận được mã đặt sân từ server.", "error")
            setIsLoading(false)
            return
        }

        if (paymentMethod === 'vnpay') {
          const vnpayRes = await paymentApi.createVnPayUrl(0, 'Booking', bookingId)
          if (vnpayRes.statusCode === 200 && vnpayRes.data) {
             addToast('Bạn có 15 phút để hoàn tất thanh toán. Quá hạn sẽ tự động hủy đơn.', 'warning')
             window.location.href = vnpayRes.data
             return
          } else {
             addToast("Không thể tạo link thanh toán VNPay", "error")
          }
        } else if (paymentMethod === 'escrow') {
          const escrowRes = await paymentApi.payBookingByEscrow(bookingId)
          if (escrowRes.statusCode === 200) {
            gsap.to('.booking-summary', { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 })
            setBooked(true)
          } else {
            addToast("Lỗi thanh toán ví: " + escrowRes.message, "error")
          }
        }
      } else {
        addToast(res.message || "Lỗi đặt sân", "error")
      }
    } catch (error) {
      const errMsg = typeof error === 'string' ? error : (error?.response?.data?.message || error?.message || "Có lỗi xảy ra");
      addToast(errMsg, "error")
    } finally {
      setIsLoading(false)
    }
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
            <p className="booking-success__price">{totalPrice.toLocaleString('vi-VN')} VNĐ paid via {paymentMethod === 'vnpay' ? 'VNPay' : 'Wallet'}</p>
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
              {filtered.length === 0 && <p className="text-brand-500">Đang tải danh sách sân hoặc không có sân phù hợp...</p>}
              {filtered.map(court => (
                <div
                  key={court.id}
                  className={`court-card ${court.status === 'booked' ? 'court-card--booked' : ''} ${selectedCourt?.id === court.id ? 'court-card--selected' : ''}`}
                  onClick={() => court.status !== 'booked' && setSelectedCourt(court)}
                >
                  <div className="court-card__top">
                    <span className="court-card__icon">{court.icon}</span>
                    <span className={`court-card__badge ${court.status === 'booked' ? 'badge--booked' : 'badge--available'}`}>
                      {court.status === 'booked' ? 'Tạm ngưng' : 'Khả dụng'}
                    </span>
                  </div>
                  <h3 className="court-card__name">{court.name}</h3>
                  <p className="court-card__type">{court.type} · Up to {court.capacity} players</p>
                  <div className="court-card__features">
                    {court.features.slice(0, 3).map(f => <span key={f} className="court-feature">{f}</span>)}
                  </div>
                  <div className="court-card__footer">
                    <span className="court-card__price"><strong>Giá từ {court.price.toLocaleString('vi-VN')} đ</strong>/hr</span>
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
                <span>Selected: <strong>{selectedCourt.name}</strong> — {selectedCourt.price.toLocaleString('vi-VN')} đ/hr</span>
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
                    <input type="date" value={selectedDate} min={minDate}
                      onChange={e => { setSelectedDate(e.target.value); setSelectedSlots([]); }} className="timepicker__date-input" id="booking-date" />
                  </div>
                </div>

                <div className="timepicker__legend">
                  <span className="legend-dot legend-dot--avail" /> Available
                  <span className="legend-dot legend-dot--sel" /> Selected
                  <span className="legend-dot legend-dot--book" /> Booked
                </div>

                <div className="timepicker__slots">
                  {timeSlots.map(slot => {
                    const isBooked = bookedSlots.includes(slot)
                    const isSelected = selectedSlots.includes(slot)
                    // Không cho chọn giờ trong quá khứ nếu chọn ngày hôm nay
                    const isPast = selectedDate === minDate && slot < new Date().toTimeString().slice(0, 5)
                    const isDisabled = isBooked || isPast

                    return (
                      <button
                        key={slot}
                        className={`time-slot ${isDisabled ? 'time-slot--booked' : ''} ${isSelected ? 'time-slot--selected' : ''}`}
                        onClick={() => toggleSlot(slot)}
                        disabled={isDisabled}
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
                <div className="booking-summary__total"><span>Total</span><strong>{totalPrice.toLocaleString('vi-VN')} đ</strong></div>
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
                <div className="booking-confirm__row"><span>Time</span><strong>{selectedSlots[0]} – {calculateEndTime(selectedSlots[selectedSlots.length - 1])}</strong></div>
                <div className="booking-confirm__row"><span>Duration</span><strong>{selectedSlots.length} hour{selectedSlots.length > 1 ? 's' : ''}</strong></div>
                <div className="booking-confirm__row"><span>Rate</span><strong>{selectedCourt.price.toLocaleString('vi-VN')} đ/hr</strong></div>
                <div className="booking-confirm__divider" />
                <div className="booking-confirm__total"><span>Total Due</span><strong>{totalPrice.toLocaleString('vi-VN')} đ</strong></div>
              </div>

              <div className="booking-payment">
                <h3>Payment Method</h3>
                <div className="booking-payment__options">
                  <label className={`payment-option ${paymentMethod === 'vnpay' ? 'payment-option--active' : ''}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'vnpay'} onChange={() => setPaymentMethod('vnpay')} /> 💳 Thanh toán VNPay
                  </label>
                  <label className={`payment-option ${paymentMethod === 'escrow' ? 'payment-option--active' : ''}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'escrow'} onChange={() => setPaymentMethod('escrow')} /> 🏦 Ví Escrow PRO-SPORT ({escrowBalance.toLocaleString('vi-VN')} đ)
                  </label>
                </div>
              </div>

              <div className="booking-confirm__actions">
                <button className="btn-outline" disabled={isLoading} onClick={() => setStep(2)}>← Edit</button>
                <button className="btn-primary booking-confirm__pay" disabled={isLoading} onClick={handleConfirm}>
                  {isLoading ? 'Đang xử lý...' : `Pay ${totalPrice.toLocaleString('vi-VN')} đ & Confirm`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ApexLayout>
  )
}
