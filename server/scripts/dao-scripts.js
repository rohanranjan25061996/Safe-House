const main = async () => {

    // contract address 0xd8B2185B52E9212d97Db1d058F83ed0C615B3399
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