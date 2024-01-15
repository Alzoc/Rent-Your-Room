const HotelsContract = artifacts.require("RentYourRoom.sol");

module.exports = function (deployer) {
  deployer.deploy(RentYourRoom);
};
