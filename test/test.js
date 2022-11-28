const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

const url = "http://127.0.0.1:8545/";
const url2 = "http://127.0.0.1:7545/";
let chainProvider = new ethers.providers.JsonRpcProvider(url);
let chainProvider2 = new ethers.providers.JsonRpcProvider(url2);

// chainProvider.getBlockNumber().then((result) => {
//   console.log("Current block number: " + result);
// });
// chainProvider2.getBlockNumber().then((result) => {
//   console.log("Current block number 2: " + result);
// });

async function main() {
  const [owner, user1] = await chainProvider.listAccounts();
  const [owner2, user11] = await chainProvider2.listAccounts();

  const ownerSigner = chainProvider.getSigner(owner);
  const user1Signer = chainProvider.getSigner(user1);

  const owner2Signer = chainProvider2.getSigner(owner2);
  const user11Signer = chainProvider2.getSigner(user11);

  let bridge1address = "0x4aa8f14a7C2C1b9620926bC12eF6Cb7d5151CF51";
  let bridge2address = "0x859539522e03808e9ce34Dac5BaDBBDd7695C2F3";
  let token1address = "0x4aa8f14a7C2C1b9620926bC12eF6Cb7d5151CF51";
  let token2address = "0x859539522e03808e9ce34Dac5BaDBBDd7695C2F3";

  let tokenReceiver;
  let tokenAmount;
  let tokenAddress;

  console.log("bridgeParams before", tokenAmount, tokenAddress, tokenReceiver); //gives undefined

  const bridge1Contract = await ethers.getContractAt(
    "BridgeA2B",
    bridge1address,
    ownerSigner
  );
  const bridge2Contract = await ethers.getContractAt(
    "BridgeB2A",
    bridge2address,
    owner2Signer
  );
  try {
    //user calls bridge to burn tokens
    //assuming owner already has tokens

    console.log(
      "Now we call the bridge on chain 1 to burn the amount of tokens"
    );

    let tx1 = await bridge1Contract
      .connect(ownerSigner)
      .burn(user11Signer._address, 1, token1address);
    console.log("we wait 1 block");
    await tx1.wait(1);

    console.log(
      "Now we listen for the Burn events to get the parameters for the mint on destination bridge"
    );

    bridge1Contract.on("Burn", (from, to, amount, action, token, event) => {
      tokenReceiver = to;
      console.log("tokenReceivr", tokenReceiver);
      tokenAmount = amount;
      console.log("tokenAmount", tokenAmount);
      tokenAddress = token;
      console.log("tokenAddress", tokenAddress);

      //   expect(tokenReceiver).to.equal(user11Signer._address);
    });
  } catch (err) {
    console.log(err, "error");
  }

  /**
   * api calls bridge2, mints amount of tokens to destination from event variables
   */
  try {
    console.log(
      "Now we call the bridge on chain 2 to mint the amount of tokens to the receiver"
    );

    console.log("bridgeParams after", tokenAmount, tokenAddress, tokenReceiver); //gives undefined

    let tx2 = await bridge2Contract
      .connect(owner2Signer)
      .mint(tokenReceiver, tokenAmount, tokenAddress);
    await tx2.wait(1);
    console.log(
      "Now we listen for the Mint events to confirm the bridging success"
    );

    bridge2Contract.on("Mint", (from, to, amount, action, token, event) => {
      let info2 = {
        from: from,
        to: to,
        amount: ethers.utils.formatUnits(amount, 0),
        enum: action,
        token: token,
        //   data: event,
      };
      console.log("info2", JSON.stringify(info2, null, 4));
    });
  } catch (err) {
    console.log(err, "error");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
