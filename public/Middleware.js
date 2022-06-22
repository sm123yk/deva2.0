web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var account;
web3.eth.getAccounts().then((f) => {
	account = f[0];
});

abi = [
	{
		inputs: [
			{ internalType: "bytes32[]", name: "candidateNames", type: "bytes32[]" },
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		name: "candidateList",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes32", name: "candidate", type: "bytes32" }],
		name: "totalVotesFor",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes32", name: "candidate", type: "bytes32" }],
		name: "validCandidate",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes32", name: "candidate", type: "bytes32" }],
		name: "voteForCandidate",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		name: "votesReceived",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
];
contract = new web3.eth.Contract(abi);
// update contract address
contract.options.address = "0x99Be773e95546b4c2FC15AfD0E59db0836DCbeC8";

candidates = {
	Pavitra: "candidate-1",
	Gyaneshwari: "candidate-2",
	Shashwat: "candidate-3",
};

function voteForCandidate(candidate) {
	candidateName = $("#candidate").val();
	console.log(candidateName);

	contract.methods
		.voteForCandidate(web3.utils.asciiToHex(candidateName))
		.send({ from: account })
		.then((f) => {
			let div_id = candidates[candidateName];
			contract.methods
				.totalVotesFor(web3.utils.asciiToHex(candidateName))
				.call()
				.then((f) => {
					$("#" + div_id).html(f);
				});
		});
}

$(document).ready(function () {
	candidateNames = Object.keys(candidates);

	for (var i = 0; i < candidateNames.length; i++) {
		let name = candidateNames[i];

		contract.methods
			.totalVotesFor(web3.utils.asciiToHex(name))
			.call()
			.then((f) => {
				$("#" + candidates[name]).html(f);
			});
	}
});
