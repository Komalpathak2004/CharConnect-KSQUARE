// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {
    // State variables
    address public owner; // Address of the contract owner
    uint256 public totalDonations; // Total amount of donations
    mapping(address => uint256) public donations; // Mapping to track donations by each donor
    address[] public donors; // Array of donor addresses

    // Events
    event DonationReceived(address indexed donor, uint256 amount);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this.");
        _;
    }

    // Constructor to set the owner of the contract
    constructor() {
        owner = msg.sender;
    }

    // Function to make a donation
    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0.");

        if (donations[msg.sender] == 0) {
            donors.push(msg.sender); // Add new donor to the list
        }

        donations[msg.sender] += msg.value; // Update donation amount
        totalDonations += msg.value; // Update total donations

        emit DonationReceived(msg.sender, msg.value); // Emit donation event
    }

    // Function for the owner to withdraw funds
    function withdrawFunds(uint256 amount) public onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance in the contract.");
        
        payable(owner).transfer(amount); // Transfer funds to the owner

        emit FundsWithdrawn(owner, amount); // Emit withdrawal event
    }

    // Function to get the contract's balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to get the total number of donors
    function getDonorCount() public view returns (uint256) {
        return donors.length;
    }

    // Function to retrieve all donors
    function getDonors() public view returns (address[] memory) {
        return donors;
    }
}
