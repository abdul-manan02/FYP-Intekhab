import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PartyDashboard from './views/party';
import CandidateDashboard from './views/voterCandidate';
import { Landing } from './views/landing/Landing';
import AdminLogin from './views/auth/admin';
import AdminDashboard from './views/admin';
import AdminProtected from './routes/AdminProtected';
import VoterCandidateLogin from './views/auth/voter-candidate/login';
import PartyLogin from './views/auth/party/login';
import PartyRegister from './views/auth/party/register';
import VoterRegister from './views/auth/voter-candidate/register';
import OTP from './views/auth/voter-candidate/otp';
import FaceVerification from './views/auth/voter-candidate/face';
import { Toaster } from 'react-hot-toast';
import PdfDoc from './views/admin/party/detail/pdf';

function App() {
    const admin = localStorage.getItem('admin');
    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/party/dashboard" element={<PartyDashboard />} />
                <Route path="/voter-candidate/dashboard" element={<CandidateDashboard />} />
                <Route path="/admin/dashboard" element={<AdminProtected element={<AdminDashboard />} />} />
                <Route path="/login" element={admin ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
                <Route path="/voter/login" element={<VoterCandidateLogin />} />
                <Route path="/party/login" element={<PartyLogin />} />
                <Route path="/party/register" element={<PartyRegister />} />
                <Route path="/voter/register" element={<VoterRegister />} />
                <Route path="/otp" element={<OTP />} />
                <Route path="/face-verification" element={<FaceVerification />} />

                <Route path="/admin/dashboard/pdf" element={<PdfDoc />} />
            </Routes>
        </Router>
    );
}

export default App;
