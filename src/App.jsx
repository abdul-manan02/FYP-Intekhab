import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './features/register/register';
import { Login } from './features/login/login';

// * Once we have auth setup and integrated, we can protect our routes like this
// function PrivateRoute({ element, ...rest }) {
//     return isAuthenticated ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
// }

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
