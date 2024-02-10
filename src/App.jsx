import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/party/dashboard" element={<PartyDashboard />} />
                <Route path="/voter-candidate/dashboard" element={<CandidateDashboard />} />
                <Route path="/admin/dashboard" element={<AdminProtected element={<AdminDashboard />} />} />
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/voter/login" element={<VoterCandidateLogin />} />
                <Route path="/party/login" element={<PartyLogin />} />
                <Route path="/party/register" element={<PartyRegister />} />
                <Route path="/voter/register" element={<VoterRegister />} />
            </Routes>
        </Router>
    );
}

export default App;
