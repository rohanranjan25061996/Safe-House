//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./SubDao.sol";

contract Create2{
     address public deployedAddr;
     // uint _salt, here we can pass any number we get our bytes32
     function getBytes(uint _salt) public pure returns(bytes32){
         return bytes32(_salt);
     }
     // as a first arguments we pass bytes32 _salt, which we will get from getBytes function, now the other arguments will be all those value,
     // which is expected from deployed contract constructor.
     // for example in this case, MultiSigner contract constructor expect array of owner address and limit. 
     function getAddress(bytes32 _salt, address[] memory _owner, uint _limit ) external view returns (address){
         address addr = address(uint160(uint(keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            _salt,
            keccak256(abi.encodePacked(type(MultiSigner).creationCode,_owner, _limit)))))));
            return addr;
     }

     // Now what ever address we will get from getAddres function by passing same salt with createMultiSignerSalted function both will match,
     // but createMultiSignerSalted function deployed our contract.

     function createMultiSignerSalted(bytes32 salt, address[] memory _owner, uint _limit) public returns(address) {
        MultiSigner mul = new MultiSigner{salt: salt}(_owner, _limit);
        deployedAddr = address(mul);
        return address(mul);
    }
 }