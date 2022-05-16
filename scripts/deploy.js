const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("gg");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("obaid", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain obaid.gg");

  txn = await domainContract.setRecord("obaid", "Good Game!");
  await txn.wait();
  console.log("Set record for obaid.gg");

  const address = await domainContract.getAddress("obaid");
  console.log("Owner of domain obaid:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

// Contract deployed to: 0xeb60355251CC0cB28a9B0eF496C7898696d45ee7
// https://testnets.opensea.io/assets?search[query]=0xeb60355251CC0cB28a9B0eF496C7898696d45ee7&search[resultModel]=ASSETS
