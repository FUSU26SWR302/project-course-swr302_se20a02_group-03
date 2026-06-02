import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastProvider } from './components/Toast'

// PRO-SPORT Public Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CompleteProfilePage from './pages/CompleteProfilePage'
import RoleSelectionPage from './pages/RoleSelectionPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CourtDetailPage from './pages/courts/CourtDetailPage'
import BookingPage from './pages/courts/BookingPage'
import MatchDetailPage from './pages/matches/MatchDetailPage'
import CreateMatchPage from './pages/matches/CreateMatchPage'
import GearCatalogPage from './pages/gear/GearCatalogPage'
import BookingHistoryPage from './pages/customer/BookingHistoryPage'
import CustomerProfilePage from './pages/customer/CustomerProfilePage'
import ReportDisputePage from './pages/customer/ReportDisputePage'

import AIChatbot from './components/AIChatbot'

// PRO-SPORT Apex Portal (Courts & More)
import ApexHomePage from './pages/apex/ApexHomePage'
import ApexBookingPage from './pages/apex/ApexBookingPage'
import ApexMatchesPage from './pages/apex/ApexMatchesPage'
import ApexShopPage from './pages/apex/ApexShopPage'
import ApexProfilePage from './pages/apex/ApexProfilePage'
import ApexActivityPage from './pages/apex/ApexActivityPage'
import ApexSettingsPage from './pages/apex/ApexSettingsPage'
import ApexSupportPage from './pages/apex/ApexSupportPage'

// PRO-SPORT MatchPro
import MatchProFeedPage from './pages/matchpro/MatchProFeedPage'
import MatchProNearbyPage from './pages/matchpro/MatchProNearbyPage'
import MatchProCommunityPage from './pages/matchpro/MatchProCommunityPage'
import MatchProLeaderboardPage from './pages/matchpro/MatchProLeaderboardPage'

// PRO-SPORT Admin Portal
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminCourtsPage from './pages/admin/AdminCourtsPage'
import AdminKycPage from './pages/admin/AdminKycPage'
import AdminPricingPage from './pages/admin/AdminPricingPage'
import AdminInventoryPage from './pages/admin/AdminInventoryPage'
import AdminComplaintsPage from './pages/admin/AdminComplaintsPage'

// PRO-SPORT Elite Staff
import ElitePosWalkInPage from './pages/elite/ElitePosWalkInPage'
import EliteSchedulePage from './pages/elite/EliteSchedulePage'
import EliteEquipmentPage from './pages/elite/EliteEquipmentPage'
import EliteVouchersPage from './pages/elite/EliteVouchersPage'
import EliteDisputesPage from './pages/elite/EliteDisputesPage'

// PRO-SPORT Mobile App Pages
import MobileHomePage from './pages/mobile/MobileHomePage'
import MobileProfilePage from './pages/mobile/MobileProfilePage'
import MobileMatchesPage from './pages/mobile/MobileMatchesPage'
import MobileDashboardPage from './pages/mobile/MobileDashboardPage'
import MobileScannerPage from './pages/mobile/MobileScannerPage'
import MobileWalletPage from './pages/mobile/MobileWalletPage'
import MobileChatPage from './pages/mobile/MobileChatPage'
import MobileBookingPage from './pages/mobile/MobileBookingPage'

// Status / Error Pages
import NotFoundPage from './pages/status/NotFoundPage'
import RestrictedPage from './pages/status/RestrictedPage'
import MaintenancePage from './pages/status/MaintenancePage'

// BUG #13 FIX: Redirect guard — authenticated users can't access login/register
function GuestRoute({ children }) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) return <Navigate to="/" replace />
    return children
}

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || '451555739002-p36a1gvgpgb5pf5585modtkess26flmf.apps.googleusercontent.com'}>
        <ToastProvider>
            <Router basename="/swp391-su26-ai-audit-project-swp391_se20a02_group-03">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
                    <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
                    <Route path="/complete-profile" element={<CompleteProfilePage />} />
                    <Route path="/role-selection" element={<RoleSelectionPage />} />
                    <Route path="/reset-password" element={<GuestRoute><ResetPasswordPage /></GuestRoute>} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    {/* Courts */}
                    <Route path="/courts" element={<ApexHomePage />} />
                    <Route path="/courts/:id" element={<CourtDetailPage />} />
                    <Route path="/courts/:id/book" element={<BookingPage />} />

                    {/* Matches / MatchPro */}
                    <Route path="/matches" element={<MatchProFeedPage />} />
                    <Route path="/matches/:id" element={<MatchDetailPage />} />
                    <Route path="/matches/create" element={<CreateMatchPage />} />
                    <Route path="/matches/nearby" element={<MatchProNearbyPage />} />
                    <Route path="/matches/community" element={<MatchProCommunityPage />} />
                    <Route path="/matches/leaderboard" element={<MatchProLeaderboardPage />} />

                    {/* Customer */}
                    <Route path="/customer/profile" element={<CustomerProfilePage />} />
                    <Route path="/customer/bookings" element={<BookingHistoryPage />} />
                    <Route path="/customer/report" element={<ReportDisputePage />} />

                    {/* Gear */}
                    <Route path="/gear" element={<GearCatalogPage />} />

                    {/* Apex Portal Routes */}
                    <Route path="/apex" element={<ApexHomePage />} />
                    <Route path="/apex/booking" element={<ApexBookingPage />} />
                    <Route path="/apex/matches" element={<ApexMatchesPage />} />
                    <Route path="/apex/shop" element={<ApexShopPage />} />
                    <Route path="/apex/profile" element={<ApexProfilePage />} />
                    <Route path="/apex/activity" element={<ApexActivityPage />} />
                    <Route path="/apex/settings" element={<ApexSettingsPage />} />
                    <Route path="/apex/support" element={<ApexSupportPage />} />

                    {/* Admin Portal Routes */}
                    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                    <Route path="/admin/users" element={<AdminUsersPage />} />
                    <Route path="/admin/courts" element={<AdminCourtsPage />} />
                    <Route path="/admin/kyc" element={<AdminKycPage />} />
                    <Route path="/admin/pricing" element={<AdminPricingPage />} />
                    <Route path="/admin/inventory" element={<AdminInventoryPage />} />
                    <Route path="/admin/complaints" element={<AdminComplaintsPage />} />

                    {/* Elite Staff Portal Routes */}
                    <Route path="/elite" element={<Navigate to="/elite/pos" replace />} />
                    <Route path="/elite/pos" element={<ElitePosWalkInPage />} />
                    <Route path="/elite/schedule" element={<EliteSchedulePage />} />
                    <Route path="/elite/equipment" element={<EliteEquipmentPage />} />
                    <Route path="/elite/vouchers" element={<EliteVouchersPage />} />
                    <Route path="/elite/disputes" element={<EliteDisputesPage />} />

                    {/* Mobile App Routes */}
                    <Route path="/mobile" element={<Navigate to="/mobile/home" replace />} />
                    <Route path="/mobile/home" element={<MobileHomePage />} />
                    <Route path="/mobile/profile" element={<MobileProfilePage />} />
                    <Route path="/mobile/matches" element={<MobileMatchesPage />} />
                    <Route path="/mobile/dashboard" element={<MobileDashboardPage />} />
                    <Route path="/mobile/scanner" element={<MobileScannerPage />} />
                    <Route path="/mobile/wallet" element={<MobileWalletPage />} />
                    <Route path="/mobile/chat" element={<MobileChatPage />} />
                    <Route path="/mobile/booking" element={<MobileBookingPage />} />

                    {/* Status Pages */}
                    <Route path="/maintenance" element={<MaintenancePage />} />
                    <Route path="/403" element={<RestrictedPage />} />
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <AIChatbot />
            </Router>
        </ToastProvider>
        </GoogleOAuthProvider>
    )
}

export default App
