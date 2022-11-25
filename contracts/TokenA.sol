//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./TokenBase.sol";

contract TokenA is TokenBase {
    constructor() TokenBase('TokenA', 'TkA') {}
}