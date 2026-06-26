import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
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
      const token = response.data?.accessToken || response.accessToken || response.data?.token || response.token
      if (token) {
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
    <div className="auth-layout">
      {/* ── Visual Panel (Left) ── */}
      <div className="auth-visual">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }} />

        {/* Radial glow accent */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start max-w-[480px] px-14 auth-animate-in">
          {/* Logo */}
          <Link to="/" className="font-heading text-3xl font-bold tracking-tight mb-16 flex items-center gap-0.5">
            <span className="text-white">PRO</span>
            <span className="text-accent">-</span>
            <span className="text-white">SPORT</span>
          </Link>

          {/* Tagline */}
          <h2 className="font-heading text-[clamp(2.2rem,3.5vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.01em] text-white mb-6">
            FLUID<br />PERFORMANCE.<br />
            <span className="text-accent">ELITE CONTROL.</span>
          </h2>

          <p className="text-brand-400 text-[0.95rem] leading-relaxed max-w-[380px] mb-12">
            The premier management platform for athletes and facilities.
            Book courts, schedule matches, and connect with players.
          </p>

          {/* Floating stat cards */}
          <div className="flex gap-4 w-full">
            <div className="flex-1 border border-brand-700/50 rounded-2xl p-5 bg-brand-800/30 backdrop-blur-sm" style={{ animation: 'authFloat 6s ease-in-out infinite' }}>
              <p className="font-heading text-2xl font-bold text-white tracking-tight">42+</p>
              <p className="text-brand-500 text-xs font-medium mt-1 tracking-wide uppercase">Facilities</p>
            </div>
            <div className="flex-1 border border-brand-700/50 rounded-2xl p-5 bg-brand-800/30 backdrop-blur-sm" style={{ animation: 'authFloat 6s ease-in-out 1s infinite' }}>
              <p className="font-heading text-2xl font-bold text-white tracking-tight">2.4K</p>
              <p className="text-brand-500 text-xs font-medium mt-1 tracking-wide uppercase">Active Players</p>
            </div>
            <div className="flex-1 border border-brand-700/50 rounded-2xl p-5 bg-brand-800/30 backdrop-blur-sm" style={{ animation: 'authFloat 6s ease-in-out 2s infinite' }}>
              <p className="font-heading text-2xl font-bold text-white tracking-tight">98%</p>
              <p className="text-brand-500 text-xs font-medium mt-1 tracking-wide uppercase">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Bottom attribution */}
        <p className="absolute bottom-8 left-14 text-brand-600 text-xs font-medium tracking-wider">
          © 2024 PRO-SPORT COMPLEX
        </p>
      </div>

      {/* ── Form Panel (Right) ── */}
      <section className="auth-form">
        {/* Mobile logo — visible only on small screens */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link to="/" className="font-heading text-xl font-bold tracking-tight flex items-center gap-0.5">
            <span className="text-brand-900">PRO</span>
            <span className="text-accent">-</span>
            <span className="text-brand-900">SPORT</span>
          </Link>
        </div>

        <div className="auth-form-inner auth-animate-in-delayed">
          {/* Header */}
          <header className="mb-10">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3">Welcome back</p>
            <h1 className="font-heading text-[2rem] font-bold text-brand-900 tracking-tight leading-tight">
              Sign in to your<br />account
            </h1>
            <p className="text-sm text-brand-500 mt-3 leading-relaxed">
              Enter your credentials to access your Pro-Sport dashboard.
            </p>
          </header>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-4 rounded-xl border border-red-200 mb-6 flex flex-col items-center text-center auth-animate-fade">
              <span className="font-semibold">{error}</span>
              {failedAttempts >= 3 && (
                <div className="mt-3 pt-3 border-t border-red-200 w-full">
                  <span className="text-red-600">Seems like you forgot your password?</span>
                  <Link to="/reset-password" className="ml-1 text-red-800 font-bold hover:underline">
                    Reset it now
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleLogin} noValidate>
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="login-email" className="text-sm font-semibold text-brand-900">Email Address</label>
              <div className="relative group">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 pointer-events-none group-focus-within:text-accent transition-colors duration-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="auth-input pl-11"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="login-password" className="text-sm font-semibold text-brand-900">Password</label>
              <div className="relative group">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 pointer-events-none group-focus-within:text-accent transition-colors duration-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="auth-input pl-11 pr-20"
                />
                {capsLockOn && (
                  <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none text-amber-500" title="Caps Lock is ON">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      <path d="m9 22-3-3 3-3" />
                      <path d="m15 2 3 3-3 3" />
                    </svg>
                  </div>
                )}
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 hover:text-accent transition-colors duration-300" onClick={() => setShowPass(!showPass)} aria-label="Toggle password visibility">
                  {showPass
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer text-sm text-brand-600 select-none group" htmlFor="remember-me">
                <input type="checkbox" id="remember-me" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="sr-only" />
                <span className={`w-[18px] h-[18px] border-[1.5px] rounded flex items-center justify-center transition-all duration-200 shrink-0 ${remember ? 'bg-accent border-accent' : 'border-brand-300 group-hover:border-accent'}`}>
                  {remember && <span className="w-2 h-1.5 border-l-2 border-b-2 border-white -rotate-45 -translate-y-px" />}
                </span>
                <span className="font-medium">Remember me</span>
              </label>
              <Link to="/reset-password" className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors duration-200">Forgot?</Link>
            </div>

            {/* Submit */}
            <button disabled={loading} type="submit" className="auth-btn mt-1">
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign In'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-1">
              <div className="flex-1 h-px bg-brand-200" />
              <span className="text-xs font-medium text-brand-400 tracking-wider uppercase">or continue with</span>
              <div className="flex-1 h-px bg-brand-200" />
            </div>

            {/* Google */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google Login Failed')}
                theme="outline"
                size="large"
                shape="rectangular"
                width="384"
                text="continue_with"
              />
            </div>
          </form>

          {/* Register link */}
          <p className="mt-10 text-sm text-brand-500 text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent font-semibold hover:text-accent-hover transition-colors duration-200">
              Create account
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
