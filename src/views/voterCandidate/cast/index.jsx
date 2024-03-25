import NA from './NA';
import PP from './PP';
import { useEffect, useState } from 'react';
import MyTime from './components/Timer';
import { useSDK } from '@metamask/sdk-react';
import { getElectionForVoter } from '../../../services/voterCandidate/electionService';
import toast from 'react-hot-toast';
import Web3 from 'web3';
import { EVOTING_ADDRESS, EVOTING_ABI } from '../../../../config';

const CastVote = () => {
    const voter = JSON.parse(localStorage.getItem('voter-candidate'));
    const [choice, setChoice] = useState('NA');

    const handleChoice = (value) => {
        setChoice(value);
    };

    const [general, setGeneral] = useState(null);

    const [account, setAccount] = useState();
    const { sdk, connected, connecting, provider, chainId } = useSDK();

    const connect = async () => {
        try {
            const accounts = await sdk?.connect();
            setAccount(accounts?.[0]);
            console.log('got', accounts);
        } catch (err) {
            console.warn('failed to connect..', err);
        }
    };

    // const handleTest = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await window.ethereum.request({ method: 'eth_requestAccounts' });
    //         const web3 = new Web3(window.ethereum);
    //         const accounts = await web3.eth.getAccounts();
    //         console.log('Selected account:', accounts[0]);
    //         const votingContract = new web3.eth.Contract(EVOTING_ABI, EVOTING_ADDRESS);
    //         console.log('voting', votingContract.methods);
    //         // await simpleStorage.methods.storeHardcodedValue().send({ from: accounts[0] });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const fetchElections = async () => {
        try {
            const res = await getElectionForVoter(voter.account._id, voter.token);
            console.log('elect', res);
        } catch (error) {
            toast.error('Failed to fetch election information');
        }
    };

    useEffect(() => {
        if (voter.account) {
            fetchElections();
        }
    }, []);

    // 0x504c5722897DF68B10F44ac6d90A7196B5ddCc30

    return (
        // <>
        //     <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Cast Vote</h1>
        //     <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        //         Connect
        //     </button>
        //     {connected && (
        //         <div>
        //             <>
        //                 {chainId && `Connected chain: ${chainId}`}
        //                 <p></p>
        //                 {account && `Connected account: ${account}`}
        //             </>
        //         </div>
        //     )}
        //     <button onClick={handleTest}>test</button>
        // </>

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
