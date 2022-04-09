export const CreateABI = [
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "salt",
          "type": "bytes32"
        },
        {
          "internalType": "address[]",
          "name": "_owner",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "_limit",
          "type": "uint256"
        }
      ],
      "name": "createMultiSignerSalted",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deployedAddr",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_salt",
          "type": "bytes32"
        },
        {
          "internalType": "address[]",
          "name": "_owner",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "_limit",
          "type": "uint256"
        }
      ],
      "name": "getAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_salt",
          "type": "uint256"
        }
      ],
      "name": "getBytes",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ]