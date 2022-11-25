//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract TokenBase is ERC20 {
    address public tokenAdmin;

    constructor(string memory name, string memory symbol)ERC20(name, symbol){
        tokenAdmin = msg.sender;
    }
    modifier onlyAdmin {
        require(msg.sender == tokenAdmin, "Only admin can call these functions");
        _;
        
    }

    function setAdmin(address newAdmin) external {
        require(msg.sender == tokenAdmin, "Only Admin can change Admin");
        tokenAdmin = newAdmin;
    }

    function mint(address to, uint amount) external onlyAdmin{
        require(msg.sender == tokenAdmin, "Only Admin can change Admin");
        _mint(to, amount);
    }

    function burn(address owner, uint amount) external onlyAdmin{
        require(msg.sender == tokenAdmin, "Only Admin can change Admin");
        _burn(owner, amount);
    }
}
