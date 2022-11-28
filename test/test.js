const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

var url = "http://127.0.0.1:8545/";
var url2 = "http://127.0.0.1:7545/";
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
var customHttpProvider2 = new ethers.providers.JsonRpcProvider(url2);

var bridge1address = "";
var bridge2address = "";
var token1address = "";
var token1address = "";

// customHttpProvider.getBlockNumber().then((result) => {
//   console.log("Current block number: " + result);
// });
// customHttpProvider2.getBlockNumber().then((result) => {
//   console.log("Current block number 2: " + result);
// });

async function main() {
  let signers1 = [];
  let signers2 = [];

  for (let i = 0; i < 5; i++) {
    signers1.push(customHttpProvider.getSigner(i));
    signers2.push(customHttpProvider2.getSigner(i));
  }

  [owner, user1, user2, _] = signers1;
  [owner2, user11, user22, _] = signers2;

  const bridge1Contract = await ethers.getContractAt(
    "BridgeA2B",
    bridge1address,
    owner
  );
  const bridge2Contract = await ethers.getContractAt(
    "BridgeB2A",
    bridge2address,
    owner2
  );

  async function bridgeA2B() {
    //user calls bridge 
    //assuming user already has tokens
    //burn tokens for
    await bridge1Contract
      .connect(owner)
      .burn(user1.address, 1 * 10 ** 18, token1address);

    //listen for event, get arguments
/** 
 * // api calls bridge2, mints amount of tokens to destination from event variables
 * 
    await bridge2Contract.mint( address from event, amount from event, token from event)
    */
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
