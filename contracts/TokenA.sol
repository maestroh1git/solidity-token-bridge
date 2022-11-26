//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./TokenBase.sol";

contract TokenA is TokenBase {
    constructor(address bridgeA2B) TokenBase('TokenA', 'TkA', bridgeA2B) {}
}