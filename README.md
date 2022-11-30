# solidity-token-bridge

A Bridge allowa users to "send" tokens from one blockchain to another
In addition, production-ready bridges have to control any errors that could arise when sending tokens across in order to avoid losing them into the ether

We define a BridgeBase, to be deployed on every supported EVM chain
We also define a TokenBase, to be deployed on every supported EVM chain
A token interface with mint and burn functions

#Working theory
How will this bridge work

Refer to DeBridge for help
However, for the user journey Chain A to Chain Bridge B
Token A on Chain A into Token A on Chain B

<!-- The user interacts with the a contract that calls the bridge contract -->
The user gives the bridge approval to spend, transfer or burn the amount of tokens they specify

The bridge contract burns the amount of tokens the user specified
Emits an event including the destination address and the amount of tokens
THe Events listener sees the event and parses the parameters accordingly
It calls the Token contract on the destination chain with the admin Wallet, and mints the amount of tokens to the destination address and emits a Bridged event

(with cross-chain interoperability, the bridge contract can call the token contract, avoiding the need for an intermediate api)

# Requirements
Bridge Contract on chain A and B
Token contract on chain A and B
Events listener api with admin wallet


open a new terminal
```
ganache-cli -p 7545

```
open another terminal
```
ganache-cli -p 8545

```

now you have 2 evm chains ready for our Bridge


