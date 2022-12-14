require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      // forking: {
      //   url: QUICKNODE_RPC_URL,
      // },
    },
    ganache1: {
      url: "http://127.0.0.1:8545/",
    },
    ganache2: {
      url: "http://127.0.0.1:7545/",
    },
  },
};
