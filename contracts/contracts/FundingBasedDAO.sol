// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract FundingBasedDAO {
    struct Proposal {
        string description;
        uint256 votes;
        bool executed;
    }

    mapping(address => uint256) public fundingParticipation;
    Proposal[] public proposals;
    address public owner;
    IERC20 public token;  // ERC20 token reference

    event Funded(address indexed user, uint256 times);
    event ProposalCreated(uint256 indexed proposalId, string description);
    event Voted(address indexed voter, uint256 indexed proposalId, uint256 votes);
    event Executed(uint256 indexed proposalId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address tokenAddress) {
        owner = msg.sender;
        token = IERC20(tokenAddress); // Set the ERC20 token contract address
    }

    function recordFunding(address participant) external onlyOwner {
        uint256 participantTokens = token.balanceOf(participant);
        require(participantTokens > 0, "User has no tokens to fund");
        
        fundingParticipation[participant] = participantTokens;
        emit Funded(participant, participantTokens);
    }

    function createProposal(string memory description) external onlyOwner {
        proposals.push(Proposal({description: description, votes: 0, executed: false}));
        emit ProposalCreated(proposals.length - 1, description);
    }

    function vote(uint256 proposalId) external {
        require(proposalId < proposals.length, "Invalid proposal ID");
        require(fundingParticipation[msg.sender] > 0, "No voting rights");

        Proposal storage proposal = proposals[proposalId];
        uint256 votes = fundingParticipation[msg.sender];
        proposal.votes += votes;
        
        emit Voted(msg.sender, proposalId, votes);
    }

    function executeProposal(uint256 proposalId) external onlyOwner {
        require(proposalId < proposals.length, "Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Already executed");

        proposal.executed = true;
        emit Executed(proposalId);
    }
}
