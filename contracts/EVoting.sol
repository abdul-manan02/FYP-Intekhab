// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract EVoting {
    address public admin;
    uint256 public startTime;
    uint256 public endTime;

    enum Party {PMLN, PTI, PPP, JUI}
    mapping(address => Party) public votes;
    mapping(Party => uint256) public voteCounts;

    event VoteCast(address indexed voter, Party party);
    event WinnerDeclared(string winner, uint256 votes);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyDuringVotingPeriod() {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Voting is not allowed at this time");
        _;
    }

    modifier onlyOnce() {
        require(startTime == 0, "Election has already started");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function startElection() external onlyAdmin onlyOnce {
        startTime = block.timestamp;
        endTime = startTime + 1 minutes;
    }

    function vote(Party _party) external onlyDuringVotingPeriod {
        require(votes[msg.sender] == Party(0), "You have already voted");

        votes[msg.sender] = _party;
        voteCounts[_party]++;

        emit VoteCast(msg.sender, _party);
    }

    function getPartyName(Party _party) internal pure returns (string memory) {
        if (_party == Party.PMLN) return "PMLN";
        else if (_party == Party.PTI) return "PTI";
        else if (_party == Party.PPP) return "PPP";
        else if (_party == Party.JUI) return "JUI";
        else return "Unknown";
    }

    function finalizeWinner() external {
        require(block.timestamp > endTime, "Voting is still ongoing");

        Party winner = Party(0);
        uint256 maxVotes = 0;

        for (uint8 i = 1; i <= 3; i++) {
            if (voteCounts[Party(i)] > maxVotes) {
                maxVotes = voteCounts[Party(i)];
                winner = Party(i);
            }
        }

        string memory winnerName = getPartyName(winner);
        emit WinnerDeclared(winnerName, maxVotes);
    }

    function getWinnerParty() external view returns (string memory) {
        require(block.timestamp > endTime, "Voting is still ongoing");

        Party winner = Party(0);
        uint256 maxVotes = 0;

        for (uint8 i = 1; i <= 3; i++) {
            if (voteCounts[Party(i)] > maxVotes) {
                maxVotes = voteCounts[Party(i)];
                winner = Party(i);
            }
        }

        return getPartyName(winner);
    }
}
