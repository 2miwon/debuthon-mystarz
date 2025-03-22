// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./AchievementSBT.sol";
import "./SBTRouter.sol";


contract Funding {
    mapping(address => uint256) public contribution;
    address payable public owner;
    uint256 public raisedAmount;
    string  public SBTtokenURI;
    uint256 public deadline;
    uint256 public goalAmount;
    bool public isFunded;
    SBTRouter public sbtRouterContract;
    address [] public contributors;

    event ContributionReceived(address indexed contributor, uint256 amount);
    event FundingFinalized(bool success, uint256 totalRaised);

    

    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor (address _sbtRouterContract, uint256 _goalAmount, uint256 _duration, string memory _tokenURI){
        owner = payable(msg.sender);
        sbtRouterContract = SBTRouter(_sbtRouterContract);
        goalAmount = _goalAmount;
        deadline = block.timestamp + _duration;
        isFunded = false;
        SBTtokenURI = _tokenURI;
    }

      function contribute() public payable {
        require(block.timestamp < deadline, "Funding period has ended");
        require(msg.value > 0, "Contribution must be greater than 0");

         raisedAmount += msg.value;
        contribution[msg.sender] += msg.value;

        if (contribution[msg.sender] == msg.value) {
            contributors.push(msg.sender);
        }
        emit ContributionReceived(msg.sender, msg.value);
    }

    //펀딩 완료
    function finalize() public onlyOwner{
        require(block.timestamp >= deadline, "Funding period is not over");
        require(!isFunded, "Funding already completed");

        if (raisedAmount >= goalAmount) {
            isFunded = true;
            emit FundingFinalized(true, raisedAmount);
            // 펀딩 성공 시 모든 기여자에게 SBT 발급
            for (uint256 i = 0; i < contributors.length; i++) {
                address contributor = contributors[i];
                sbtRouterContract.mintSBT(contributor, SBTtokenURI); // 기여자에게 SBT 발급
            }
        } else {
             emit FundingFinalized(false, raisedAmount);
            revert("Funding goal not reached");
        }
    }

}