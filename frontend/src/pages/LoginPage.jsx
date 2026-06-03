import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useToast } from '../components/Toast'
import authApi from '../api/authApi'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const [capsLockOn, setCapsLockOn] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.getModifierState) {
        setCapsLockOn(e.getModifierState('CapsLock'))
      }
    }
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('keydown', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('keydown', handleKeyUp)
    }
  }, [])

  const toast = useToast()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    // BUG #4 FIX: Client-side validation before API call
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)

    try {
      const response = await authApi.login({ email, password })
      // Assuming response has data property and accessToken inside data
      const token = response.data?.accessToken || response.accessToken || response.data?.token || response.token
      if (token) {
        // BUG #7 FIX: Use sessionStorage when Remember Me is unchecked
        if (remember) {
          localStorage.setItem('token', token)
        } else {
          sessionStorage.setItem('token', token)
        }
        setFailedAttempts(0)
        if (response.data?.isProfileComplete === false) {
          navigate('/complete-profile')
        } else {
          navigate('/')
        }
      } else {
        setError('Login failed. Token not received.')
      }
    } catch (err) {
      // BUG #5 FIX: Increment failedAttempts so "Reset it now" link shows after 3 failures
      setFailedAttempts(prev => prev + 1)
      setError(typeof err === 'string' ? err : 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }


  const handleGoogleSuccess = async (credentialResponse) => {
    setError(null)
    setLoading(true)
    try {
      const response = await authApi.googleLogin({ googleIdToken: credentialResponse.credential })
      const token = response.data?.accessToken || response.accessToken || response.data?.token || response.token
      if (token) {
        localStorage.setItem('token', token)
        if (response.data?.isProfileComplete === false) {
          navigate('/complete-profile')
        } else {
          navigate('/')
        }
      } else {
        setError('Google Login failed. Token not received.')
      }
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Google Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar theme="light" />

      <div className="flex-1 px-6 pt-[68px] pb-[60px] flex items-center justify-center bg-gradient-to-br from-[#e8f2f8] via-[#daedf6] to-[#cee8f5] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&q=60')] bg-cover bg-center opacity-10" />

        <div className="bg-white rounded-[32px] px-6 sm:px-10 py-10 sm:py-12 w-full max-w-[440px] shadow-[0_8px_32px_rgba(0,0,0,0.14)] relative z-10 flex flex-col items-center animate-[fadeInUp_0.6s_ease_both] mt-10">
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-[#00c8aa] flex items-center justify-center shadow-[0_4px_16px_rgba(0,200,170,0.35)] border-4 border-[#e8f2f8]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>

          <h1 className="font-['Oswald'] text-[1.75rem] font-bold text-slate-900 mb-1.5 text-center">Welcome Back</h1>
          <p className="text-[0.875rem] text-slate-500 text-center mb-7 max-w-[340px]">Enter your email and password to access your Pro-Sport dashboard.</p>

          {error && (
            <div className="w-full bg-red-50 text-red-600 text-[0.85rem] p-3 rounded-lg border border-red-100 mb-2 flex flex-col items-center text-center animate-[fadeIn_0.3s_ease]">
              <span className="font-medium">{error}</span>
              {failedAttempts >= 3 && (
                <div className="mt-2.5 pt-2.5 border-t border-red-200/50 w-full">
                  <span className="text-slate-600">Seems like you forgot your password?</span>
                  <Link to="/reset-password" className="ml-1 text-red-600 font-bold hover:underline">
                    Reset it now
                  </Link>
                </div>
              )}
            </div>
          )}

          <form className="w-full max-w-[340px] mx-auto flex flex-col gap-4 mt-2" onSubmit={handleLogin} noValidate>
            <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="login-email" className="text-[0.825rem] font-semibold text-slate-900">Email Address</label>
                  <div className="relative flex items-center group">
                    <svg className="absolute left-3.5 text-slate-400 pointer-events-none group-focus-within:text-[#00c8aa] transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                      className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-slate-200 rounded-md font-['Inter'] text-[0.9rem] text-slate-900 bg-white transition-all outline-none focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)] placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 w-full animate-[fadeIn_0.3s_ease]">
                    <label htmlFor="login-password" className="text-[0.825rem] font-semibold text-slate-900">Password</label>
                    <div className="relative flex items-center group">
                      <svg className="absolute left-3.5 text-slate-400 pointer-events-none group-focus-within:text-[#00c8aa] transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <input
                        id="login-password"
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full py-2.5 pr-10 pl-10 border-[1.5px] border-slate-200 rounded-md font-['Inter'] text-[0.9rem] text-slate-900 bg-white transition-all outline-none focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)] placeholder:text-slate-400"
                      />
                      {capsLockOn && (
                        <div className="absolute right-10 flex items-center pr-1 pointer-events-none text-amber-500" title="Caps Lock is ON">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            <path d="m9 22-3-3 3-3" />
                            <path d="m15 2 3 3-3 3" />
                          </svg>
                        </div>
                      )}
                      <button type="button" className="absolute right-3 bg-transparent text-slate-400 transition-colors hover:text-[#00c8aa] flex" onClick={() => setShowPass(!showPass)} aria-label="Toggle password">
                        {showPass
                          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        }
                      </button>
                    </div>
                  </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-500 select-none group" htmlFor="remember-me">
                    <input type="checkbox" id="remember-me" checked={remember} onChange={() => setRemember(!remember)} className="hidden peer" />
                    <span className="w-[18px] h-[18px] border-[1.5px] border-slate-300 rounded flex items-center justify-center transition-all shrink-0 peer-checked:bg-[#00c8aa] peer-checked:border-[#00c8aa] group-hover:border-[#00c8aa]">
                      {remember && <span className="w-[9px] h-[6px] border-l-2 border-b-2 border-white -rotate-45 -translate-y-px" />}
                    </span>
                    <span>Remember Me</span>
                  </label>
                  <Link to="/reset-password" className="text-sm font-semibold text-[#00c8aa] hover:text-[#009e87] transition-colors">Forgot Password?</Link>
                </div>

                <button disabled={loading} type="submit" className="w-full flex items-center justify-center py-3 text-[0.95rem] font-semibold rounded-xl mt-1 bg-[#00c8aa] hover:bg-[#009e87] hover:shadow-[0_0_24px_rgba(0,200,170,0.25)] hover:-translate-y-[1px] text-white tracking-[0.03em] transition-all disabled:opacity-70 disabled:pointer-events-none">
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Login →'}
                </button>

                <div className="flex items-center gap-3 text-slate-400 text-[0.82rem] my-2 before:content-[''] before:flex-1 before:h-px before:bg-slate-200 after:content-[''] after:flex-1 after:h-px after:bg-slate-200">
                  <span>OR</span>
                </div>

                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError('Google Login Failed')}
                    theme="outline"
                    size="large"
                    shape="rectangular"
                    width="340"
                    text="continue_with"
                  />
                </div>
          </form>

          <p className="mt-[18px] text-[0.85rem] text-slate-500">
            Don't have an account? <Link to="/register" className="text-[#00c8aa] font-semibold hover:underline">Register</Link>
          </p>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  )
}
