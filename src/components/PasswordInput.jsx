export const PasswordInput = (props) => {
    const [type, setType] = useState();

    const inputClasses =
        'block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';

    const toggleEye = () => {};

    return (
        <div className="flex flex-col">
            <label className="capitalize">{props.label}</label>
            <input className={inputClasses} type={type} placeholder={props.placeholder} />
            <img src="eye.png" onClick={toggleEye} />
        </div>
    );
};
