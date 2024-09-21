// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Withdraw {
    // Mapping to store the balance of each depositor
    mapping(address => uint256) public balances;

    // Events
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);

    // Function to allow users to deposit Ether into the contract
    function deposit() public payable {
        require(msg.value > 0, "You must deposit some Ether.");

        // Update the user's balance
        balances[msg.sender] += msg.value;

        emit Deposit(msg.sender, msg.value); // Emit deposit event
    }

    // Function to allow users to withdraw their deposited funds
    function withdraw(uint256 _amount) public {
        uint256 userBalance = balances[msg.sender];
        require(_amount <= userBalance, "Insufficient balance to withdraw.");

        // Update the balance first to prevent re-entrancy attacks
        balances[msg.sender] -= _amount;

        // Transfer the requested amount to the user
        payable(msg.sender).transfer(_amount);

        emit Withdrawal(msg.sender, _amount); // Emit withdrawal event
    }

    // Function to check the balance of the contract
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to get the balance of the caller
    function getMyBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
