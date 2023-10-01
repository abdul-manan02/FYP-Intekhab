import { TextInput } from '../../components/TextInput';
import useMediaQuery from '../../hooks/useMediaQuery';
import './styles.css';
import img2 from './images/img2.png';

export const Login = () => {
    const isSmallScreen = useMediaQuery('(max-width: 500px)');
    return (
        <div className="container max-w-full ">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className='flex flex-col justify-center h-screen px-7 mx-10 my-9"'>
                    <p className="text-[24px] font-bold">Login</p>
                    <p>Enter your details to login to the platform</p>
                    <div className="flex flex-col gap-4 mt-5">
                        {/* login fields */}
                        <TextInput label="email address" type="email" placeholder="Email Address" />
                        <TextInput label="password" type="password" placeholder="Password" />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login</button>
                        <div className="flex flex-row gap-2">
                            <p>Don't have an account?</p> <a href="https://www.w3schools.com/">Register</a>
                        </div>
                    </div>
                </div>
                {!isSmallScreen && (
                    <div className="p-5 h-screen pl-px">
                        <div className="flex logobgcolor rounded-xl h-screen justify-center items-center">
                            <img src={img2} alt="Voting" width="500" height="700" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
