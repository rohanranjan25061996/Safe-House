const main = async () => {

    // contract address 0x433E7F9883C4EC915fe45d4c0dc6Ff7E4d72aA4f
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