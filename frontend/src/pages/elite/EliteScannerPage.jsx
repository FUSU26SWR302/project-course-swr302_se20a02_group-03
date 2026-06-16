import { useState, useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import EliteLayout from '../../layouts/EliteLayout'
import { bookingApi } from '../../api/bookingApi'
import { gsap } from 'gsap'
import './EliteScannerPage.css' // Optionally add some custom CSS

export default function EliteScannerPage() {
  const [scanResult, setScanResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initialize Scanner
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    }, false)

    scanner.render(async (text) => {
      // Pause scanner when found
      scanner.pause()
      setLoading(true)
      setError(null)
      
      try {
        const res = await bookingApi.checkInBooking(text)
        setScanResult(res.data)
        
        // Success Animation
        gsap.fromTo('.scanner-success', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' })
      } catch (err) {
        setError(err.response?.data?.message || 'Check-in failed! Invalid QR code.')
        // Resume scanning after 3 seconds on error
        setTimeout(() => {
            setError(null)
            scanner.resume()
        }, 3000)
      } finally {
        setLoading(false)
      }
    }, (err) => {
        // Ignore scan failures (happens every frame when no QR is detected)
    })

    return () => {
      scanner.clear()
    }
  }, [])

  const resetScanner = () => {
      setScanResult(null)
      setError(null)
      // We would ideally resume the scanner here but Html5QrcodeScanner is destroyed on unmount.
      // So a full reload or recreating the scanner is needed. For simplicity, we just reload window.
      window.location.reload()
  }

  return (
    <EliteLayout title="QR Scanner">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">QR Check-in</h1>
          <p className="text-gray-500">Scan customer's booking QR code to process check-in instantly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Scanner */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div id="reader" className="w-full overflow-hidden rounded-lg"></div>
                {loading && <p className="text-center mt-4 text-blue-600 font-semibold animate-pulse">Processing...</p>}
                {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-center font-medium">{error}</div>}
            </div>

            {/* Right: Result */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center min-h-[300px]">
                {!scanResult && !loading && !error && (
                    <div className="text-center text-gray-400">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                        <p>Awaiting QR Code Scan...</p>
                    </div>
                )}

                {scanResult && (
                    <div className="scanner-success w-full">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-green-700 mb-2">Check-in Successful!</h2>
                            <div className="text-left bg-white p-4 rounded-lg mt-4 shadow-sm">
                                <p className="mb-2"><span className="text-gray-500">Booking ID:</span> <span className="font-semibold">#{scanResult.data?.bookingId}</span></p>
                                <p className="mb-2"><span className="text-gray-500">Total Paid:</span> <span className="font-semibold">{scanResult.data?.totalAmount?.toLocaleString()} VND</span></p>
                                <p className="mb-2"><span className="text-gray-500">Status:</span> <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-bold">CHECKED IN</span></p>
                                <hr className="my-3"/>
                                <h3 className="font-bold text-gray-700 mb-2">Courts</h3>
                                <ul className="list-disc pl-5 text-sm text-gray-600">
                                    {scanResult.data?.details?.map((d, i) => (
                                        <li key={i}>{d.courtName} ({d.startTime.slice(0,5)} - {d.endTime.slice(0,5)})</li>
                                    ))}
                                </ul>
                            </div>
                            <button 
                                onClick={resetScanner}
                                className="mt-6 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors">
                                Scan Next Customer
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </EliteLayout>
  )
}
