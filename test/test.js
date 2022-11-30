const { expect } = require("chai");
const url = "http://127.0.0.1:8545/";
const url2 = "http://127.0.0.1:7545/";

const chainProvider = new ethers.providers.JsonRpcProvider(url);
const chainProvider2 = new ethers.providers.JsonRpcProvider(url2);

describe("Token Bridge", async function () {
  //manually input address from deploy script
  let bridge1address = "0xCBb933d716C5c82e83B6aAd9f4B9D51d426CcF5f";
  let bridge2address = "0xcC7cE2Cfd1B3808905C1469Ca890dD377aD99212";
  let token1address = "0xCBb933d716C5c82e83B6aAd9f4B9D51d426CcF5f";
  let token2address = "0xcC7cE2Cfd1B3808905C1469Ca890dD377aD99212";
  //define bufferlike variables
  let tokenReceiver;
  let tokenAmount;
  let tokenAddress;
  //contract enums
  const burn = 0;
  const mint = 1;

  it("Should bridge tokens", async function () {
    //list our accounts from ganache
    const [owner, user1] = await chainProvider.listAccounts();
    const [owner2, user11] = await chainProvider2.listAccounts();

    // get signers on chain 1 from provider
    const ownerSigner = chainProvider.getSigner(owner);
    const user1Signer = chainProvider.getSigner(user1);

    // get signers on chain 2 from provider2
    const owner2Signer = chainProvider2.getSigner(owner2);
    const user11Signer = chainProvider2.getSigner(user11);

    //get the contract instance on the different chains
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

    //user calls bridge to burn tokens
    //assuming owner is user and already has tokens
    console.log(
      "Now we call the bridge on chain 1 to burn the amount of tokens"
    );
    /*
        * call burn from owner with destination address, amount
            tokenaddress on bridge 1 and tokenaddress on bridge 2
    */
    let tx1 = await bridge1Contract
      .connect(ownerSigner)
      .burn(user11Signer._address, 1, token1address, token2address);
    console.log("we wait 1 block");

    //get transaction receipt
    let tx1Receipt = await tx1.wait(1);
    //pass event arguments into buffers
    tokenReceiver = tx1Receipt.events[1].args.receiver;
    tokenAmount = tx1Receipt.events[1].args.amount;
    tokenAddress = tx1Receipt.events[1].args.destinationToken;
    // check correct event emitted
    expect(tx1Receipt.events[0].args.action).to.equal(burn);

    //owner/admin calls bridge to mint tokens
    console.log(
      "Now we call the bridge on chain 2 to mint the amount of tokens"
    );

    /*
         call mint from owner/bridge admin with destination address, amount
            tokenaddress on bridge 2
    */
    let tx2 = await bridge2Contract
      .connect(owner2Signer)
      .mint(tokenReceiver, tokenAmount, tokenAddress);
    console.log("we wait 1 block");
    let tx2Receipt = await tx2.wait(1);

    // check correct event emitted
    expect(tx2Receipt.events[0].args.action).to.equal(mint);
  });
});
