# solidity-token-bridge

A Bridge allowa users to "send" tokens from one blockchain to another
In addition, production-ready bridges have to control any errors that could arise when sending tokens across in order to avoid losing them into the ether

We define a BridgeBase, to be deployed on every supported EVM chain
We also define a TokenBase, to be deployed on every supported EVM chain
A token interface with mint and burn functions
