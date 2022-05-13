require("dotenv").config();

const splitBonus = Number(process.env.QUOTER_DEFAULT_BONUS);
const privateKey = process.env.DEPLOYER_PRIVATE_KEY;

async function deployQuoterToken(deployments, safeToken) {
  const { deploy } = deployments;

  await deploy("QuoterToken", {
    from: privateKey,
    args: [safeToken],
    log: true,
  });
}

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { safeProtocol, safeToken } = await getNamedAccounts();

  await deploy("QuoterProtocol", {
    from: privateKey,
    args: [splitBonus, safeProtocol],
    log: true,
  });

  await deployQuoterToken(deployments, safeToken);
};
module.exports.tags = ["Quoter-Core-Multisig"];
