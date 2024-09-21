// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lock {
    // State variables
    address public owner; // Address of the contract owner
    uint256 public unlockTime; // Timestamp when funds can be unlocked
    uint256 public lockedAmount; // Amount of Ether locked

    // Events
    event FundsLocked(address indexed owner, uint256 amount, uint256 unlockTime);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this.");
        _;
    }

    // Modifier to check if the unlock time has passed
    modifier unlockable() {
        require(block.timestamp >= unlockTime, "Funds are still locked.");
        _;
    }

    // Constructor to initialize the contract with an owner and lock duration
    constructor(uint256 _lockDuration) payable {
        require(msg.value > 0, "You must send Ether to lock.");
        
        owner = msg.sender;
        unlockTime = block.timestamp + _lockDuration;
        lockedAmount = msg.value;

        emit FundsLocked(owner, msg.value, unlockTime); // Emit locking event
    }

    // Function to withdraw funds after the unlock time
    function withdraw() public onlyOwner unlockable {
        uint256 amount = lockedAmount;
        lockedAmount = 0; // Reset locked amount to prevent re-entrancy attacks

        payable(owner).transfer(amount); // Transfer funds to the owner

        emit FundsWithdrawn(owner, amount); // Emit withdrawal event
    }

    // Function to check if the funds are unlockable
    function isUnlockable() public view returns (bool) {
        return block.timestamp >= unlockTime;
    }

    // Function to get the contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
