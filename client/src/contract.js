import { ethers } from "ethers";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const ABI = [
    {
        "inputs": [
            {"internalType": "string","name": "description","type": "string"},
            {"internalType": "string","name": "name","type": "string"}
        ],
        "name": "donate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256","name": "amount","type": "uint256"},
            {"internalType": "string","name": "description","type": "string"},
            {"internalType": "string","name": "name","type": "string"}
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDonationHistory",
        "outputs": [
            {
                "components": [
                    {"internalType": "address","name": "sender","type": "address"},
                    {"internalType": "uint256","name": "amount","type": "uint256"},
                    {"internalType": "uint256","name": "timestamp","type": "uint256"},
                    {"internalType": "string","name": "description","type": "string"},
                    {"internalType": "string","name": "name","type": "string"}
                ],
                "internalType": "struct DonationTracker.Transaction[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getWithdrawalHistory",
        "outputs": [
            {
                "components": [
                    {"internalType": "address","name": "sender","type": "address"},
                    {"internalType": "uint256","name": "amount","type": "uint256"},
                    {"internalType": "uint256","name": "timestamp","type": "uint256"},
                    {"internalType": "string","name": "description","type": "string"},
                    {"internalType": "string","name": "name","type": "string"}
                ],
                "internalType": "struct DonationTracker.Transaction[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {"internalType": "uint256","name": "","type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const getContract = () => {
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};

export { provider };
