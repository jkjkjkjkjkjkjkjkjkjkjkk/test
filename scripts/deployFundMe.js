// import ethers.js
// create main function
// execute main function

const { ethers } = require("hardhat")

async function main() {
    // create factory 
    const fundMeFactory = await ethers.getContractFactory("FundMe")
    console.log("contract deploying")
    // deploy contract from factory
    const fundMe = await fundMeFactory.deploy(180)
    await fundMe.waitForDeployment()
    console.log(`contract has been deployed successfully, contract address is ${fundMe.target}`)
    /*    if (hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API) {
            console.log("waiting for 5 confirmation")
            await fundMe.deploymentTransaction().wait(2)
            await verifyFundMe(fundMe.target, [180])
        }
        else {
            console.log("verification failed")
        }*/
    const [firstAccount, secondAccount] = await ethers.getSigners()
    const fundTx = await fundMe.fund({ value: ethers.parseEther("0.001") })
    await fundTx.wait()
    const balanceOfContract = await ethers.provider.getBalance(fundMe.target)
    console.log(`balance of the contract is ${balanceOfContract}`)

    const fundTx2 = await fundMe.connect(secondAccount).fund({ value: ethers.parseEther("0.001") })
    await fundTx2.wait()
    const balanceOfContractAfter2 = await ethers.provider.getBalance(fundMe.target)
    console.log(`balance of the contract is ${balanceOfContractAfter2}`)

    const firstAccountbalance = await fundMe.fundersToAmount[firstAccount.address]
    const secondaccountbalance = await fundMe.fundersToAmount[secondAccount.address]
    console.log(`the first account balance ${firstAccount.address} is ${firstAccountbalance}`)
    console.log(`the second account balance ${secondAccount.address} is ${secondaccountbalance}`)

}

async function verifyFundMe(fundMeAddr, args) {


    await hre.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args,
    });
}

main().then().catch((error) => {
    console.error(error)
    process.exit(0)
})