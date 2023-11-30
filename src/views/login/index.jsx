import { useState } from 'react';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulating a login request with a delay of 2000 milliseconds
        setTimeout(() => {
            console.log('logged in');
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className=" w-[30rem] flex flex-col justify-center items-center">
                <h1 className="text-[2.25rem] font-poppins font-bold">Login</h1>
                <p className="text-[1.125rem] font-poppins font-extralight">Enter your details to access your account</p>

                <form className="flex flex-col w-full mt-8" onSubmit={handleLogin}>
                    <label htmlFor="cnic" className="font-poppins">
                        CNIC
                    </label>
                    <input type="text" className="mt-1 rounded-lg w-full border border-[#BBB] h-12 p-2" />

                    <label htmlFor="password" className="mt-4 font-poppins">
                        Password
                    </label>
                    <input type="password" className="mt-1 rounded-lg w-full border border-[#BBB] h-12 p-2" />
                    {/* <button type="submit" className="p-4 mt-4 text-white bg-themePurple hover:opacity-90">Log in</button> */}
                    <button
                        type="submit"
                        class={`mt-10 w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 ${
                            isLoading ? 'cursor-not-allowed' : ''
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center text-lg">
                                <div className="mr-2 animate-spin">
                                    <svg class="w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.416a8.978 8.978 0 01-2-2.44M22 12h-4a8.978 8.978 0 01-2 2.44M20 6.584a8.978 8.978 0 01-2 2.44M2 12h4a8.978 8.978 0 012-2.44M4 19.416a8.978 8.978 0 012-2.44M20 17.416a8.978 8.978 0 012-2.44M20 6.584M2 17.416M2 6.584"
                                        ></path>
                                    </svg>
                                </div>
                                Logging in...
                            </div>
                        ) : (
                            <p className='text-lg font-poppins'>Log in</p>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
