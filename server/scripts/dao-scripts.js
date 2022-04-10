const main = async () => {

    // contract address 0xbA4374Eb23494fEA7E3d973Ed8E3D6fcb7B0A669
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