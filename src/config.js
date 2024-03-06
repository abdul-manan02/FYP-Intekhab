export const STORAGE_ADDRESS = '0xa304295bB04Ae6FE1Db6A739352da52415199570';
export const STORAGE_ABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'newValue',
                type: 'uint256',
            },
        ],
        name: 'ValueUpdated',
        type: 'event',
    },
    {
        inputs: [],
        name: 'storedValue',
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
        name: 'storeHardcodedValue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getValue',
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
];
