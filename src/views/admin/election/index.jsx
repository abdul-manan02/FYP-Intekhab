import { useState } from 'react';
import PastElections from './past';
import CreateElection from './create';
import CurrentElections from './current';

const ManageElection = () => {
    const [choice, setChoice] = useState('past');

    const handleChoice = (value) => {
        setChoice(value);
    };

    return (
        <>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">
                Manage Elections
            </h1>
            <div className="flex items-center justify-between w-2/5 mx-auto mt-8 bg-themePurple rounded-xl">
                <button
                    onClick={() => handleChoice('past')}
                    className={`w-1/3 py-3  transition delay-75 hover:bg-white hover:text-themePurple rounded-tl-xl rounded-bl-xl ${
                        choice === 'past' ? 'bg-white text-themePurple' : 'text-white'
                    }`}
                >
                    Past
                </button>
                <button
                    onClick={() => handleChoice('current')}
                    className={`w-1/3 py-3  transition delay-75 hover:bg-white hover:text-themePurple ${
                        choice === 'current' ? 'bg-white text-themePurple' : 'text-white'
                    }`}
                >
                    Current
                </button>
                <button
                    onClick={() => handleChoice('create')}
                    className={`w-1/3 py-3  transition delay-75 hover:bg-white hover:text-themePurple rounded-tr-xl rounded-br-xl ${
                        choice === 'create' ? 'bg-white text-themePurple' : 'text-white'
                    }`}
                >
                    Create
                </button>
            </div>

            {choice === 'past' ? <PastElections /> : null}
            {choice === 'create' ? <CreateElection /> : null}
            {choice === 'current' ? <CurrentElections /> : null}
        </>
    );
};

export default ManageElection;
