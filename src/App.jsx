import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PartyDashboard from './views/party';
import CandidateDashboard from './views/candidate';
import { Landing } from './views/landing/Landing';
import Login from './views/login';
import AdminDashboard from './views/admin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/party/dashboard" element={<PartyDashboard />} />
                <Route path="/voter-candidate/dashboard" element={<CandidateDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
