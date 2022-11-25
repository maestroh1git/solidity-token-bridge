//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IToken{
    function burn(address owner, uint amount) external;
    function mint(address to, uint amount) external;
}