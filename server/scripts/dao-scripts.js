const main = async () => {

    // contract address 0xc929082F0d1bB0cf41246bb5c515C0644bA1865D
    const MainDAO = await ethers.getContractFactory("MainDAO");
    const wallet = await MainDAO.deploy();

    await wallet.deployed()
    console.log("MainDAO wallet deployed !", wallet.address);
}

main().
then(() => process.exit(0))
.catch((error) => {
    console.log("Error in Main Function", error)
    process.exit(1);
})