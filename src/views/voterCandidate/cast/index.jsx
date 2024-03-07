import NA from './NA';
import PP from './PP';
import { useState } from 'react';
import MyTime from './components/Timer';

const CastVote = () => {
    const [choice, setChoice] = useState('NA');

    const handleChoice = (value) => {
        setChoice(value);
    };

    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Cast Vote</h1>
            <MyTime />
            <div className="flex items-center w-2/5 mx-auto mt-8 bg-themePurple rounded-xl">
                <button
                    onClick={() => handleChoice('NA')}
                    className={`w-1/2 py-3  transition delay-75 hover:bg-white hover:text-themePurple rounded-tl-xl rounded-bl-xl ${
                        choice === 'NA' ? 'bg-white text-themePurple' : 'text-white'
                    }`}
                >
                    NA
                </button>
                <button
                    onClick={() => handleChoice('PP')}
                    className={`w-1/2 py-3  transition delay-75 hover:bg-white hover:text-themePurple ${
                        choice === 'PP' ? 'bg-white text-themePurple' : 'text-white'
                    }`}
                >
                    PP
                </button>
            </div>

            {choice === 'NA' ? <NA /> : <PP />}
        </div>
    );
};

export default CastVote;
