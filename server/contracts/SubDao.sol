// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract MultiSigner {

    struct Transaction {
        address payable to;
        uint value;
        bool executed;
        uint limit;
        uint id;
        mapping(address => bool) isConiformed;
    }

    struct Temp {
        address to;
        uint value;
        bool executed;
        uint limit;
        uint id;
    }

    struct OwnerDeatils{
        address owner;
        string name;
    }
    Temp[] temp;
    Transaction[] public transactions;
    OwnerDeatils[] owners;
    uint public approversLimit;
    string public safeName;
    mapping(address => bool) isOwner;

    // this multisigwallet function we can put in constructor, but now i don't know how to deploy contract from frontend, that why i create function
    // and also not putting validation for others functions.

    // recived ether
    receive() external payable{}

    constructor(address[] memory _owner, string[] memory _ownerName, uint _limit, string memory _safeName) {
        require(_owner.length > 0, "Owners Required !");
        require(_limit > 0 && _limit <= _owner.length, "Invalid number of required approver's !");
        require(_owner.length == _ownerName.length, "mismatch data of owner address and owner name");
        bytes memory tempEmptyStringTest = bytes(_safeName);
        require(tempEmptyStringTest.length != 0, "invalid safe name");
        for(uint i = 0; i < _owner.length; i++){
            address owner = _owner[i];
            require(owner != address(0), "Invalid Owner !");
            require(!isOwner[owner], "Owner not unique");
            bytes memory temp1 = bytes(_ownerName[i]);
            require(temp1.length != 0, "invalid owner name");
            isOwner[owner] = true;
            owners.push(OwnerDeatils(owner, _ownerName[i]));
        }
        approversLimit = _limit;
        safeName = _safeName;
    }

    modifier onlyOwner(){
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExits(uint _txId){
        require(_txId < transactions.length, "transaction does not exit");
        _;
    }

    modifier notExecuted(uint _txId){
        require(!transactions[_txId].executed, "transaction already executed");
        _;
    }

    modifier notConiform(uint _txId){
        require(!transactions[_txId].isConiformed[msg.sender], "transaction already coniformed");
        _;
    }

    modifier checkValidOrNot(address _owner){
        require(owners.length > 1, "atleast one owner is required");
        _;
    }

    modifier nullCheck(address addr){
        require(addr != address(0), "invalid owner address");
        _;
    }

    modifier checkCurrentOwnerList(address _owner){
        require(isOwner[_owner], "not in owner list");
        _;
    }

    modifier ownerExits(address newOwner){
        require(!isOwner[newOwner], "already is owner list, not unique");
        _;
    }

    modifier checkEmptyString(string memory _str){
        bytes memory tempEmptyStringTest = bytes(_str);
        require(tempEmptyStringTest.length != 0, "invalid owner name");
        _;
    }

    function addOwner(address _add, uint _required, string memory _ownerName) public nullCheck(_add) onlyOwner ownerExits(_add) checkEmptyString(_ownerName) {
        require(_required <= owners.length, "invalid required value");
        isOwner[_add] = true;
        owners.push(OwnerDeatils(_add, _ownerName));
        approversLimit +=  _required;
    }

    function getAllOwnersList() public view returns(OwnerDeatils[] memory){
        return owners;
    }

    function getTransactionDetails() public view returns(Temp[] memory){
        return temp;
    }

    function submitTransaction(address payable _to, uint _value) public onlyOwner {
        uint nextId = transactions.length;
        Transaction storage txd = transactions.push();
        txd.to = _to;
        txd.value = _value;
        txd.id = nextId;
        txd.executed = false;
        txd.limit = 0;

        Temp memory t1 = Temp(_to, _value, false, 0, nextId);
        temp.push(t1);
    }

    function coniformTransaction(uint _txId) public onlyOwner txExits(_txId) notExecuted(_txId) notConiform(_txId) {
        Transaction storage txd = transactions[_txId];
        txd.isConiformed[msg.sender] = true;
        txd.limit += 1;
        Temp storage tm = temp[_txId];
        tm.limit += 1;
    }

    function executeTransaction(uint _txId) public onlyOwner txExits(_txId) notExecuted(_txId) payable{
        Transaction storage txd = transactions[_txId];
        require(txd.limit >= approversLimit, "connot execute, some approver's not approve transaction !");
        uint amount = txd.value;
        address payable to = txd.to;
        (bool sent, ) = to.call{value: amount}("");
        require(sent, "transfer failed");
        Temp storage tm = temp[_txId];
        txd.executed = true;
        tm.executed = true;
        // to.transfer(amount);
    }

    function replaceAlgo(uint _index) private{
        require(_index < owners.length, "index out of bound");
        for(uint i = _index; i < owners.length - 1; i++){
            owners[i] = owners[i+1];
        }
        owners.pop();
    }

    function removeOwner(address _owner) public nullCheck(_owner) checkValidOrNot(_owner) checkCurrentOwnerList(_owner)  {
        isOwner[_owner] = false;
        for(uint i = 0; i < owners.length; i++){
            if(owners[i].owner == _owner){
                replaceAlgo(i);
                break;
            }
        }
        approversLimit -= 1;
    }
}