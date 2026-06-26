import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function TermsOfServicePage() {
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
        <h1 className="font-['Oswald'] text-[clamp(2rem,4vw,3rem)] font-bold text-[#0a0e1a] mb-4">Terms of Service</h1>
        <p className="text-slate-500 max-w-[500px] mx-auto text-[0.95rem]">Effective Date: June 4, 2026</p>
      </div>

      {/* Content */}
      <div className="container max-w-[800px] py-16" ref={contentRef}>
        <div className="prose prose-slate max-w-none">
          <p className="text-[1.05rem] text-slate-700 leading-[1.75] mb-8">
            Welcome to PRO-SPORT. By accessing or using our website, mobile application, or services (collectively, the "Services"), you agree to be bound by these Terms of Service.
          </p>

          <h2 className="font-['Oswald'] text-[1.4rem] font-bold text-[#0a0e1a] mt-10 mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-600 mb-8 leading-[1.7]">
            By creating an account, booking a court, or otherwise using the Services, you confirm that you have read, understood, and agreed to these Terms. If you do not agree to these Terms, you may not access or use the Services.
          </p>

          <h2 className="font-['Oswald'] text-[1.4rem] font-bold text-[#0a0e1a] mt-10 mb-4">2. Court Booking Rules</h2>
          <ul className="list-disc pl-5 mb-8 text-slate-600 space-y-2">
            <li>Bookings are confirmed only upon successful payment processing.</li>
            <li>Users must arrive on time; late arrivals will not extend the booking duration.</li>
            <li>Proper sports attire and non-marking shoes are required on all courts.</li>
            <li>Any damage to the facility or equipment will be charged to the booking account holder.</li>
          </ul>

          <h2 className="font-['Oswald'] text-[1.4rem] font-bold text-[#0a0e1a] mt-10 mb-4">3. Cancellation Policy</h2>
          <p className="text-slate-600 mb-8 leading-[1.7]">
            Cancellations made more than 24 hours prior to the booking time will receive a full refund. Cancellations made between 12 and 24 hours prior will incur a 50% cancellation fee. No refunds will be provided for cancellations made less than 12 hours before the booking time or for no-shows.
          </p>

          <h2 className="font-['Oswald'] text-[1.4rem] font-bold text-[#0a0e1a] mt-10 mb-4">4. User Conduct</h2>
          <p className="text-slate-600 mb-8 leading-[1.7]">
            You agree to use our Services in a respectful manner. Harassment, abuse, or inappropriate behavior towards our staff, partner venues, or other athletes (including within the MatchPro community) will result in immediate account termination.
          </p>

          <h2 className="font-['Oswald'] text-[1.4rem] font-bold text-[#0a0e1a] mt-10 mb-4">5. Contact Information</h2>
          <p className="text-slate-600 mb-8 leading-[1.7]">
            If you have any questions regarding these Terms, please contact us at: <a href="mailto:legal@pro-sport.com" className="text-[#00c8aa] hover:underline">legal@pro-sport.com</a>
          </p>
        </div>
      </div>

      <Footer variant="dark" />
    </div>
  )
}
