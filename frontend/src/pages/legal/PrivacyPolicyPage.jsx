import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function PrivacyPolicyPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar theme="light" />
      
      {/* Header */}
      <div className="pt-[140px] pb-[60px] bg-gradient-to-br from-[#f0f7f6] via-[#e8f4f8] to-[#dceef8] text-center px-6">
        <h1 className="font-['Oswald'] text-[clamp(2rem,4vw,3rem)] font-bold text-[#0a0e1a] mb-4">Privacy Policy</h1>
        <p className="text-slate-500 max-w-[500px] mx-auto text-[0.95rem]">Last updated: June 4, 2026</p>
      </div>

      {/* Content */}
      <div className="container max-w-[800px] py-16" ref={contentRef}>
        <div className="prose prose-slate max-w-none">
          <p className="text-[1.05rem] text-slate-700 leading-[1.75] mb-8">
            At PRO-SPORT, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our application.
          </p>

          <h2 className="font-['Oswald'] text-[1.4rem] font-bold text-[#0a0e1a] mt-10 mb-4">1. Information We Collect</h2>
          <p className="text-slate-600 mb-4 leading-[1.7]">
            We collect information that you provide directly to us when you:
          </p>
          <ul className="list-disc pl-5 mb-8 text-slate-600 space-y-2">
            <li>Register for an account (name, email, phone number)</li>
            <li>Book a court or join a match</li>
            <li>Complete your athlete profile (skill level, sports preferences)</li>
            <li>Contact our customer support</li>
          </ul>

          <h2 className="font-['Oswald'] text-[1.4rem] font-bold text-[#0a0e1a] mt-10 mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-600 mb-4 leading-[1.7]">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 mb-8 text-slate-600 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process your bookings and payments</li>
            <li>Match you with players of similar skill levels (MatchPro feature)</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
          </ul>

          <h2 className="font-['Oswald'] text-[1.4rem] font-bold text-[#0a0e1a] mt-10 mb-4">3. Data Security</h2>
          <p className="text-slate-600 mb-8 leading-[1.7]">
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>

          <h2 className="font-['Oswald'] text-[1.4rem] font-bold text-[#0a0e1a] mt-10 mb-4">4. Contact Us</h2>
          <p className="text-slate-600 mb-8 leading-[1.7]">
            If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@pro-sport.com" className="text-[#00c8aa] hover:underline">privacy@pro-sport.com</a>
          </p>
        </div>
      </div>

      <Footer variant="dark" />
    </div>
  )
}
