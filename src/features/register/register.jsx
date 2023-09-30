import { TextInput } from '../../components/TextInput';
import useMediaQuery from '../../hooks/useMediaQuery';
import './styles.css';
import img1 from './images/v.png';

export const Register = () => {
    const isSmallScreen = useMediaQuery('(max-width: 500px)');

    return (
        <div className="container max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col justify-center h-screen px-7 mx-10 my-9">
                    <p className="text-[24px] font-bold">Register</p>
                    <p>Enter your details to register on the platform</p>
                    <div className="flex flex-col gap-4 mt-5">
                        {/* register fields */}
                        <TextInput label="email address" type="email" placeholder="Email Address" />
                        <div className="flex flex-col md:flex-row gap-9">
                            <TextInput label="first name" type="text" placeholder="First Name" />
                            <TextInput label="last name" type="text" placeholder="Last Name" />
                        </div>
                        <TextInput label="organization" type="text" placeholder="Organization" />
                        <TextInput label="password" type="password" placeholder="Password" />
                        <TextInput label="confirm password" type="password" placeholder="Confirm Password" />
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Register</button>
                        <div className="flex flex-row gap-2">
                            <p>Already have an account?</p> <a href="https://www.w3schools.com/">Login</a>
                        </div>
                    </div>
                </div>

                {!isSmallScreen && (
                    <div className="p-5 h-screen pl-px">
                        <div className="flex logobgcolor rounded-xl h-screen justify-center items-center">
                            <img src={img1} alt="Voting" width="500" height="700" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
