const {ethers} = require("hardhat");

async function main() {

    //deploy the bridge
  const BridgeGanache2 = await ethers.getContractFactory("BridgeB2A");
  const deployed_BridgeGanache2 = await BridgeGanache2.deploy();

  await deployed_BridgeGanache2.deployed();

  console.log("Bridge2Ganache has been deployed to", deployed_BridgeGanache2.address)
//   console.log("Bridge2Ganache has been deployed by", deployed_BridgeGanache2.from)


  //deploy the token contract
  const TokenB = await ethers.getContractFactory("TokenB");
  const deployed_TokenB = await TokenB.deploy(deployed_BridgeGanache2.address);

  await deployed_TokenB.deployed();

  console.log("TokenB has been deployed to", deployed_BridgeGanache2.address)

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

//   bridge= 0xa090fab8ad2377826144fbdf1836617224aa1b6f
//   token= 0x2c7429fc0cbb1cbedfd31a5e3a0a5b76b681e5d0