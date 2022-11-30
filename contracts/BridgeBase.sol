//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IToken.sol";

contract BridgeBase {
    address public bridgeAdmin;
    IToken public token;

    /**
     * @notice incorporate Nonce into the contract for security purposes
     */


    // * Enumerable options to identify actions taken on the bridge
    enum Action { Burn, Mint }
    
    
    // * Transfer event for monitoring party, to facilitate bridge actions
    event Burn( address from, uint amount, Action action, address token);
    event Bridge( address receiver, uint amount, address destinationToken);
    event Mint( address from, address to, uint amount, Action action, address token);



    /**
     * @dev constructor sets the address of the bridging token and 
     * the owner of the bridge as the deployer
     */
    constructor() {
        bridgeAdmin = msg.sender;
    }

    /**
     * @dev Burn function, called when Token is sent to the Bridge contract
     * emits a transfer event so the corresponsing amount of tokens will be minted 
     * on the destination bridge contract
     */
    
    function burn(address to, uint amount, address _token, address _dToken) external virtual{
        token = IToken(_token);
        token.burn(msg.sender, amount);
        emit Burn(msg.sender, amount, Action.Burn, _token);
        emit Bridge(to, amount, _dToken);
    }

    /**
     * @dev Mint function, called when Token is sent to the Bridge contract
     * emits a transfer event so the corresponsing amount of tokens will be burned
     *  on the destination bridge contract
     */
    function mint(address to, uint amount, address _token) external virtual {
        token = IToken(_token);
        token.mint(to, amount);
        emit Mint(msg.sender, to, amount, Action.Mint, _token);

    }

    //for receiving ether
    fallback() external payable {}
    receive() external payable {}

}   