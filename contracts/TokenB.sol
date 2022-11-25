//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./TokenBase.sol";

contract TokenB is TokenBase {
    constructor() TokenBase('TokenB', 'TkB') {}
}