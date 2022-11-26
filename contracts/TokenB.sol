//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./TokenBase.sol";

contract TokenB is TokenBase {
    constructor(address bridgeB2A) TokenBase('TokenB', 'TkB', bridgeB2A) {}
}