// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MoodDairy {
    string mood;

    // Sets a new mood string to our contract.
    function setMode(string memory _moodString) public {
        mood = _moodString;
    }

    // Retrieve mood string from contract.
    function getMood() public view returns (string memory) {
        return mood;
    }
}