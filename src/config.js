export const EVOTING_ADDRESS = '0x957e76713ec7107354a0bCa69ecE3AaB26568222';
export const EVOTING_ABI = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'voter',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'enum EVoting.Party',
                name: 'party',
                type: 'uint8',
            },
        ],
        name: 'VoteCast',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'winner',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'votes',
                type: 'uint256',
            },
        ],
        name: 'WinnerDeclared',
        type: 'event',
    },
    {
        inputs: [],
        name: 'admin',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
    },
    {
        inputs: [],
        name: 'endTime',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
    },
    {
        inputs: [],
        name: 'startTime',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
    },
    {
        inputs: [
            {
                internalType: 'enum EVoting.Party',
                name: '',
                type: 'uint8',
            },
        ],
        name: 'voteCounts',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'votes',
        outputs: [
            {
                internalType: 'enum EVoting.Party',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
    },
    {
        inputs: [],
        name: 'startElection',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'enum EVoting.Party',
                name: '_party',
                type: 'uint8',
            },
        ],
        name: 'vote',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'finalizeWinner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getWinnerParty',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
    },
];
