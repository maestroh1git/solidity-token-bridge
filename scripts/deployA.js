const {ethers} = require("hardhat");


async function main() {

    //deploy the bridge
  const BridgeGanache1 = await ethers.getContractFactory("BridgeA2B");
  const deployed_BridgeGanache1 = await BridgeGanache1.deploy();

  await deployed_BridgeGanache1.deployed();
  console.log(deployed_BridgeGanache1)

  console.log("Bridge1Ganache has been deployed to", deployed_BridgeGanache1.address)
//   console.log("Bridge1Ganache has been deployed by", deployed_BridgeGanache1.deployer)


  //deploy the token contract
  const TokenA = await ethers.getContractFactory("TokenA");
  const deployed_TokenA = await TokenA.deploy(deployed_BridgeGanache1.address);

  await deployed_TokenA.deployed();

  console.log("TokenA has been deployed to", deployed_BridgeGanache1.address)

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });