require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@chainlink/env-enc").config();
const sepolia_url = process.env.SEPOLIA_URL
const private_key = process.env.PRIVATE_KEY
const private_key_1 = process.env.PRIVATE_KEY_1
const etherscan_api = process.env.ETHERSCAN_API
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: sepolia_url,
      accounts: [private_key, private_key_1],
      chainId: 11155111

    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: etherscan_api
  }


};
