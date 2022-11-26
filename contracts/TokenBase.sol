//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";



contract TokenBase is ERC20, ERC20Burnable {
    address public tokenAdmin;

    constructor(string memory name, string memory symbol, address bridge)ERC20(name, symbol){
        tokenAdmin = bridge;
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
        require(msg.sender == tokenAdmin, "Only Admin can mint tokens");
        _mint(to, amount);
    }

    function burn(address owner, uint amount) external onlyAdmin{
        require(msg.sender == tokenAdmin, "Only Admin can burn tokens");
        _burn(owner, amount);
    }
}
