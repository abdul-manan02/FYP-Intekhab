import MyTextField from '../../../components/MyTextField';

const Profile = () => {
    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl mx-[0.3rem] my-[0.3rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">
                Profile
            </h1>
            <div className="bg-white m-[0.3rem] rounded-3xl h-[500px]">
                <div className="p-[5rem]">
                    <div className="flex w-full gap-6">
                        <div className="w-full">
                            <label htmlFor="">Party name</label>
                            <MyTextField />
                        </div>

                        <div className="w-full">
                            <label htmlFor="">Chairman</label>
                            <MyTextField />
                        </div>
                    </div>
                    <div className="w-[50%] pr-3 mt-6">
                        <MyTextField isDisabled={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
