const main = async () => {

    // contract address 0xBaE4bc0dc425ce175546beFE67c1786e127EfE5E
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