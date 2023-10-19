import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PartyDashboard } from './views/party/PartyDashboard';
import { Landing } from './views/landing/Landing';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/partydashboard" element={<PartyDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
