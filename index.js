const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
const ContractAddress = "0x7C4b80165bB447E736CA2f1e3Af8A4922A5D3CcD";
const ContractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_moodString",
                "type": "string"
            }
        ],
        "name": "setMode",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMood",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
let MoodContract;
let signer;


// Request access to the user's wallet and connect the signer to your metamask account 
// (we use [0] as the default), and define the contract object using your contract address, ABI, and signer.
provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(
            ContractAddress,
            ContractABI,
            signer
        );
    });
});

async function setMood() {
    // Selecting input box.
    let inputBox = document.getElementById("mood");
    // Waiting for setting current mood to blockchain
    // by selecting a func from our smart contract.
    const setMoodPromise = MoodContract.setMode(inputBox.value);
    // small typo in smart contract, setMood -> setMode
    await setMoodPromise;
    // After, resetting the input box.
    inputBox.value = "";
    document.getElementById("current-mood-label").hidden = true;
    document.getElementById("current-mood").hidden = true;
}
async function getMood() {
    // Selecting a function from our contract.
    const getMoodPromise = MoodContract.getMood();
    // Waiting to get the mood value from blockchain.
    const parsedMood = await getMoodPromise;
    // Setting up the parsed mood value.
    document.getElementById("current-mood-label").hidden = false;
    document.getElementById("current-mood").hidden = false;
    document.getElementById("current-mood").value = parsedMood;
}