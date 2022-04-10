//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "./Create.sol";

contract MainDAO is Create2{

    struct DAO{
        address main;
        address[] subDAO;
        uint id;
    }
    mapping(address => bool) public check;
    mapping(address => uint) public getId;
    uint private mainId;
    DAO[] public allDAO;

    // main is wallet address of the user,
    // at the time when user first time come to our system, that time user does'nt have any subDAO,
    // user will create subDAO and we pass our start fuctiion in parameters,
    // 1. _walletAddress of the user
    // 2. _subDAO address of the user

    modifier nullCheckAddress(address _addr){
        require(_addr != address(0), "invalid address");
        _;
    }

    modifier subDAOAddressCheck(address[] memory _addr){
        require(_addr.length != 0, "invalid subDAO address");
        require(_addr[0] != address(0), "invalid address");
        _;
    }

    modifier checkAlreadyPersentOrNot(address _addr){
        require(!check[_addr], "user already exits in our system");
        _;
    }

    modifier dataOrNot(){
        require(allDAO.length != 0, "there is not any DAO");
        _;
    }

    modifier userPersentOrNot(address _walletAddress){
        require(check[_walletAddress], "user not exit");
        _;
    }

    function getRandom() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    }

    function start(address _walletAddress, address[] memory _subDAOAddress) nullCheckAddress(_walletAddress) subDAOAddressCheck(_subDAOAddress) checkAlreadyPersentOrNot(_walletAddress)
     private {
         check[_walletAddress] = true;
         allDAO.push(DAO(_walletAddress, _subDAOAddress, mainId));
         getId[_walletAddress] = mainId;
         mainId += 1;
    }

    function createSubDAO(address[] memory _owners, string[] memory _ownerName, uint _limit, string memory _safeName, address _walletAddress) public{
        uint rand1 = getRandom();
        bytes32 _salt = getBytes(rand1);
        address sub1 = createMultiSignerSalted(_salt, _owners, _ownerName, _limit, _safeName);
        address[] memory ok = new address[](1);
        ok[0] = sub1;
        start(_walletAddress, ok);
    }

    function getData(address _walletAddress) dataOrNot nullCheckAddress(_walletAddress) public view returns(DAO memory){
        uint _id = getId[_walletAddress];
        return allDAO[_id];
    }

    function addSubDAO(address _walletAddress, address _subDAO) private{
        uint _id = getId[_walletAddress];
        DAO storage temp = allDAO[_id];
        temp.subDAO.push(_subDAO);
    }

    function createNewSubDAO(address[] memory _owners, string[] memory _ownerName, uint _limit, string memory _safeName, address _walletAddress) dataOrNot nullCheckAddress(_walletAddress) userPersentOrNot(_walletAddress)
     public{
          uint rand1 = getRandom();
          bytes32 _salt = getBytes(rand1);
          address sub1 = createMultiSignerSalted(_salt, _owners, _ownerName, _limit, _safeName);
          addSubDAO(_walletAddress, sub1);
    }

     function replaceAlgo(uint _index, uint _id) private{
        DAO storage temp = allDAO[_id];
        require(_index < temp.subDAO.length, "index out of bound");
        for(uint i = _index; i < temp.subDAO.length - 1; i++){
            temp.subDAO[i] = temp.subDAO[i+1];
        }
        temp.subDAO.pop();
    }

    function getBalanceSubDAO(address subDAO) public view returns(uint){
        return address(subDAO).balance;
    }

    function deleteSubDAO(address _walletAddress, address _subDAO)dataOrNot nullCheckAddress(_walletAddress) nullCheckAddress(_subDAO) 
    userPersentOrNot(_walletAddress) public {
        uint _id = getId[_walletAddress];
        bool flag = false;
        DAO storage temp = allDAO[_id];
        for(uint i = 0; i < temp.subDAO.length; i++){
            if(_subDAO == temp.subDAO[i]){
                replaceAlgo(i, _id);
                flag = true;
            }
        }
        require(flag, "invalid sub DAO address");
        uint amount = getBalanceSubDAO(_subDAO);
        if(amount > 0){
            address payable payBack = payable(_walletAddress);
            payBack.transfer(amount);
        }
    }
}