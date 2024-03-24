// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EVoting {
    address public admin;
    uint256 public startTime;
    uint256 public endTime;
    address[] public voters; // Array to store addresses of voters

    enum Party {PMLN, PTI, PPP, JUI}
    mapping(address => Party) public votes;
    mapping(Party => uint256) public voteCounts;
    mapping(address => string) public mongoIDs;

    event VoteCast(address indexed voter, Party party);
    event WinnerDeclared(string winner, uint256 votes);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyDuringVotingPeriod() {
        require(
            block.timestamp >= startTime && block.timestamp <= endTime,
            "Voting is not allowed at this time"
        );
        _;
    }

    modifier onlyOnce() {
        require(startTime == 0, "Election has already started");
        _;
    }

    struct VoteData {
        address voter;
        Party party;
        string mongoID;
    }

    constructor() {
        admin = msg.sender;
    }

    function startElection() external onlyAdmin onlyOnce {
        startTime = block.timestamp;
        endTime = startTime + 1 minutes;
    }

    function vote(Party _party, string memory _mongoID)
        external
        onlyDuringVotingPeriod
    {
        require(votes[msg.sender] == Party(0), "You have already voted");
        votes[msg.sender] = _party;
        voteCounts[_party]++;
        mongoIDs[msg.sender] = _mongoID;
        voters.push(msg.sender); // Add voter to the voters array
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
        for (uint8 i = 0; i < 4; i++) {
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
        for (uint8 i = 0; i < 4; i++) {
            if (voteCounts[Party(i)] > maxVotes) {
                maxVotes = voteCounts[Party(i)];
                winner = Party(i);
            }
        }
        return getPartyName(winner);
    }

    function getAllVotes() external view returns (VoteData[] memory) {
        VoteData[] memory voteDataArray = new VoteData[](voters.length);
        uint256 index = 0;

        for (uint256 i = 0; i < voters.length; i++) {
            address voter = voters[i];
            Party party = votes[voter];
            string memory mongoID = mongoIDs[voter];

            if (party != Party(0)) {
                voteDataArray[index] = VoteData(voter, party, mongoID);
                index++;
            }
        }

        // Create a new array with the correct length
        VoteData[] memory result = new VoteData[](index);
        for (uint256 j = 0; j < index; j++) {
            result[j] = voteDataArray[j];
        }

        return result;
    }
}