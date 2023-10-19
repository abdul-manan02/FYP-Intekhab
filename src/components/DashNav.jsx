import logo from '../assets/icons/logo.png';
export const DashNav = () => {
    return (
        <div className="flex justify-between p-[2rem]">
            <p className=" text-themePurple text-[2.25rem] font-[500] flex gap-2">
                <img src={logo} alt="" /> Entekhaab
            </p>
            <button className=" bg-themePurple text-white font-semibold px-[2.25rem] border border-themePurple rounded-[0.4375rem]">Log out</button>
        </div>
    );
};
