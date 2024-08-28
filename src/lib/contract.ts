import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x9c2c092bdf42d24c0a0e12d7ce52a34b4f36ffcd';
const ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "documentId",
				"type": "string"
			}
		],
		"name": "DocumentSentToBlockchain",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "documentId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "diplomaHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "gradeReportHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "universityName",
				"type": "string"
			}
		],
		"name": "DocumentUploaded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "documentId",
				"type": "string"
			}
		],
		"name": "DocumentValidatedByTeacher",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "documentId",
				"type": "string"
			}
		],
		"name": "DocumentValidatedByUniversity",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "teacher",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "TeacherRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "universityName",
				"type": "string"
			}
		],
		"name": "UniversityInvited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "university",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "city",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "UniversityRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "documentId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "enum BaseContract.DocumentType",
				"name": "documentType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "registerTeacher",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_city",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "registerUniversity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "enum BaseContract.DocumentType",
				"name": "_documentType",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_documentId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_diplomaHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_gradeReportHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_universityName",
				"type": "string"
			}
		],
		"name": "uploadDocuments",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_studentDocumentId",
				"type": "string"
			}
		],
		"name": "validateByTeacher",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_studentDocumentId",
				"type": "string"
			}
		],
		"name": "validateByUniversity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_documentContent",
				"type": "string"
			}
		],
		"name": "computeSingleHash",
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
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "documents",
		"outputs": [
			{
				"internalType": "string",
				"name": "diplomaHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gradeReportHash",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "documentHash",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "isValidatedByTeacher",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isValidatedByUniversity",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isSentToBlockchain",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "ownerAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "universityName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "universityAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "uploadTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "validationTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "blockchainTimestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_studentDocumentId",
				"type": "string"
			}
		],
		"name": "getDocumentHashes",
		"outputs": [
			{
				"internalType": "string",
				"name": "diplomaHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gradeReportHash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_studentDocumentId",
				"type": "string"
			}
		],
		"name": "getDocumentStatus",
		"outputs": [
			{
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "universityName",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isValidatedByTeacher",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isValidatedByUniversity",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isSentToBlockchain",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "uploadTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "validationTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "blockchainTimestamp",
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
		"name": "teachers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "teacherAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
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
		"name": "universities",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "city",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "universityAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "universityInvitations",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "documentId",
				"type": "string"
			},
			{
				"internalType": "enum BaseContract.DocumentType",
				"name": "documentType",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_studentDocumentId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_diplomaHash",
				"type": "string"
			}
		],
		"name": "verifyDocument",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
// Función para obtener una instancia del contrato
export const getContract = async (provider: ethers.BrowserProvider) => {
    const signer = await provider.getSigner(); // Se usa await aquí
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};

// Función para obtener una instancia del proveedor
export const getProvider = (): ethers.BrowserProvider => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        return provider;
    } else {
        throw new Error("MetaMask no está instalado o no se puede acceder al objeto window.");
    }
};