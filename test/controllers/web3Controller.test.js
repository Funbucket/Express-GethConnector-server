const web3Controller = require('../controllers/web3Controller');
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

// Jest Mocks
jest.mock('Web3');
jest.mock('fs');
jest.mock('solc');

describe('web3Controller', () => {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        Web3.mockClear();
        fs.readFileSync.mockClear();
        solc.compile.mockClear();
    });

    it('creates a web3 instance', () => {
        web3Controller.createWeb3Instance();
        expect(Web3).toHaveBeenCalledTimes(1);
    });

    it('gets contract instance', () => {
        const mockWeb3Instance = {};
        mockWeb3Instance.eth = { Contract: jest.fn() };

        fs.readFileSync.mockReturnValue('contract source');
        solc.compile.mockReturnValue({
            contracts: { 'ContractName': { interface: '{}' } }
        });

        web3Controller.getContractInstance(mockWeb3Instance, 'contractPath', 'ContractName');

        expect(fs.readFileSync).toHaveBeenCalledWith('contractPath', 'utf8');
        expect(solc.compile).toHaveBeenCalledWith('contract source', 1);
        expect(mockWeb3Instance.eth.Contract).toHaveBeenCalledWith(JSON.parse('{}'), constants.CONTRACT_ADDRESS);
    });

    // Here we would mock and test the sendTransaction, buyPhotoNFT, updatePhotoNFTPrice and deletePhotoNFT methods.
    // Note that these tests would be very similar to the getContractInstance test, as you would mock the contract's methods
    // and check that they were called with the correct arguments.
});
