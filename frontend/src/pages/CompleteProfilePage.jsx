import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useToast } from '../components/Toast'
import authApi from '../api/authApi'

export default function CompleteProfilePage() {
  const navigate = useNavigate()
  
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToast()

  // BUG #14 FIX: Check token on mount — redirect if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])
  
  // Real-time Field Errors
  const [fieldErrors, setFieldErrors] = useState({})

  const validateField = (value) => {
    let errMsg = ""
    if (!value.trim()) errMsg = "Required field."
    else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value.trim())) errMsg = "Invalid VN phone number."
    
    setFieldErrors({ phoneNumber: errMsg })
    return errMsg === ""
  }

  const handleBlur = (e) => {
    validateField(e.target.value)
  }

  const handleComplete = async (e) => {
    e.preventDefault()
    const isPhoneValid = validateField(phoneNumber)

    if (!isPhoneValid) {
      return
    }

    setError(null)
    setLoading(true)
    try {
      await authApi.completeProfile({
        phoneNumber
      })
      toast('Profile updated successfully!', 'success')
      navigate('/')
    } catch (err) {
      // BUG #14 FIX: Handle 401 specifically
      if (err === 'Unauthorized' || err?.includes?.('401')) {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        toast('Session expired. Please login again.', 'error')
        navigate('/login')
        return
      }
      setError(typeof err === 'string' ? err : 'Failed to update profile. Phone number might be in use.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar theme="light" />

      <div className="flex-1 px-6 pt-[68px] pb-[60px] flex items-center justify-center bg-gradient-to-br from-[#e8f2f8] via-[#daedf6] to-[#cee8f5] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554068865-24cecd4e34d8?w=1200&q=80')] bg-cover bg-center opacity-15" />

        <div className="bg-white rounded-[32px] px-5 sm:px-10 py-10 sm:py-12 w-full max-w-[440px] shadow-[0_8px_32px_rgba(0,0,0,0.14)] relative z-10 flex flex-col items-center animate-[fadeInUp_0.6s_ease_both] mt-10">
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-[#00c8aa] flex items-center justify-center shadow-[0_4px_16px_rgba(0,200,170,0.35)] border-4 border-[#e8f2f8]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          </div>

          <h1 className="font-['Oswald'] text-[1.8rem] font-bold text-slate-900 mb-1.5 text-center">Complete Profile</h1>
          <p className="text-[0.875rem] text-slate-500 text-center mb-7">
            Just one more step to finish setting up your account.
          </p>

          {error && (
            <div className="w-full bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-4 text-center">
              {error}
            </div>
          )}

          <form className="w-full max-w-[340px] mx-auto flex flex-col gap-4" onSubmit={handleComplete} noValidate>
            
            <div className="flex flex-col gap-1.5 w-full relative mb-4">
              <label htmlFor="reg-phone" className="text-[0.825rem] font-semibold text-slate-900">Phone Number</label>
              <div className="relative flex items-center group">
                <svg className={`absolute left-3.5 pointer-events-none transition-colors ${fieldErrors.phoneNumber ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#00c8aa]'}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 5 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"/></svg>
                <input id="reg-phone" name="phoneNumber" type="tel" value={phoneNumber} onBlur={handleBlur} onChange={e => { setPhoneNumber(e.target.value); if (fieldErrors.phoneNumber) validateField(e.target.value) }} placeholder="+84 0000 0000" className={`w-full py-2.5 pr-3.5 pl-10 border-[1.5px] rounded-md font-['Inter'] text-[0.9rem] text-slate-900 bg-white transition-all outline-none placeholder:text-slate-400 ${fieldErrors.phoneNumber ? 'border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]' : 'border-slate-200 focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]'}`} />
              </div>
              {fieldErrors.phoneNumber && <span className="text-[0.75rem] text-red-500 absolute -bottom-5 left-0">{fieldErrors.phoneNumber}</span>}
            </div>

            <button disabled={loading} type="submit" className="w-full flex justify-center items-center py-3 text-[0.95rem] font-semibold rounded-xl bg-[#00c8aa] hover:bg-[#009e87] hover:shadow-[0_0_24px_rgba(0,200,170,0.25)] hover:-translate-y-[1px] text-white tracking-[0.03em] transition-all disabled:opacity-70 disabled:pointer-events-none">
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Complete Setup →'}
            </button>
          </form>

        </div>
      </div>

      <Footer variant="light" />
    </div>
  )
}
