export const MainDAOABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allDAO",
    "outputs": [
      {
        "internalType": "address",
        "name": "main",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "check",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
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
        "internalType": "string[]",
        "name": "_ownerName",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "_limit",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_safeName",
        "type": "string"
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
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_owners",
        "type": "address[]"
      },
      {
        "internalType": "string[]",
        "name": "_ownerName",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "_limit",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_safeName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_walletAddress",
        "type": "address"
      }
    ],
    "name": "createNewSubDAO",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_owners",
        "type": "address[]"
      },
      {
        "internalType": "string[]",
        "name": "_ownerName",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "_limit",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_safeName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_walletAddress",
        "type": "address"
      }
    ],
    "name": "createSubDAO",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_walletAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_subDAO",
        "type": "address"
      }
    ],
    "name": "deleteSubDAO",
    "outputs": [],
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
      },
      {
        "internalType": "string",
        "name": "_safeName",
        "type": "string"
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
        "internalType": "address",
        "name": "subDAO",
        "type": "address"
      }
    ],
    "name": "getBalanceSubDAO",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_walletAddress",
        "type": "address"
      }
    ],
    "name": "getData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "main",
            "type": "address"
          },
          {
            "internalType": "address[]",
            "name": "subDAO",
            "type": "address[]"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "internalType": "struct MainDAO.DAO",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "getId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]