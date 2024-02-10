import { adminLogout } from '../services/admin/authService';
import { useNavigate } from 'react-router-dom';

export const DashNav = ({ role }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (role === 'admin') {
            adminLogout();
            navigate('/login');
        }
    };
    return (
        <div className="flex justify-end p-[2rem] bg-themeGray">
            <button
                onClick={handleLogout}
                className=" bg-themePurple text-white font-semibold hover:bg-white hover:text-themePurple transition delay-75 px-[2.25rem] py-[0.5rem] border border-themePurple rounded-[0.4375rem]"
            >
                Log out
            </button>
        </div>
    );
};
