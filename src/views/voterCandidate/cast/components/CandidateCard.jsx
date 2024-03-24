function CandidateCard({ data, func, setOpened }) {
    const party = JSON.parse(localStorage.getItem('partyToken'));
    return (
        <div className="relative flex flex-col overflow-hidden text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div className="relative w-auto h-40 mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                <img src={data.CitizenData.images[0].url} alt="Candiate Image" className="object-cover w-full h-full" />
            </div>
            <div className="px-6 py-3">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {data.CitizenData.name}
                </h5>
                <p className="block font-sans text-base antialiased font-semibold leading-relaxed text-inherit">{party.party.name}</p>
            </div>
            <div className="flex items-end justify-end p-6 pt-0">
                <button
                    onClick={() => {
                        func(data);
                        setOpened(true);
                    }}
                    className="px-4 py-2 text-white transition delay-75 bg-purple-500 rounded-md hover:bg-purple-400"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

export default CandidateCard;
