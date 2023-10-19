import { TextInput } from '../../components/TextInput';
import useMediaQuery from '../../hooks/useMediaQuery';
import './styles.css';
import img2 from './images/img2.png';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width: 500px)');
    return (
        <div className="container max-w-full ">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className='flex flex-col justify-center h-screen mx-10 px-7 my-9"'>
                    <p className="text-[24px] font-bold">Login</p>
                    <p>Enter your details to login to the platform</p>
                    <div className="flex flex-col gap-4 mt-5">
                        {/* login fields */}
                        <TextInput label="email address" type="email" placeholder="Email Address" />
                        <TextInput label="password" type="password" placeholder="Password" />
                        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700">Login</button>
                        <div className="flex flex-row gap-2">
                            <p>Don't have an account?</p>{' '}
                            <a
                                onClick={() => {
                                    navigate('/signup');
                                }}
                            >
                                Register
                            </a>
                        </div>
                    </div>
                </div>
                {!isSmallScreen && (
                    <div className="h-screen p-5 pl-px">
                        <div className="flex items-center justify-center h-screen logobgcolor rounded-xl">
                            <img src={img2} alt="Voting" width="500" height="700" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
