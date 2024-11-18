const { ethers } = require("hardhat")

async function main(){
    const fundMeFactory = await ethers.getContractFactory("FundMe")
    console.log("contract deploying")
    const fundMe = await fundMeFactory.deploy(10)
    await fundMe.waitForDeployment()
    console.log(`contract has been deployed successfully, contract address is ${fundMe.target}`)

    
    await fundMe.deploymentTransaction().wait(5) 
    console.log("Waiting for 5 confirmations")
    verifyFundMe(fundMe.target,[10])
}
async function verifyFundMe(fundMeAddr, args) {

    await hre.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args,
      });
}
main().then().catch((error) => {
    console.error(error)
    process.exit(0)//正常退出0，异常退出1
})