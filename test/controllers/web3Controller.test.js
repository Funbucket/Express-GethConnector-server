const web3Controller = require('../controllers/web3Controller'); // 'web3Controller'를 가져옵니다.
const Web3 = require('web3'); // 'Web3' 라이브러리를 가져옵니다.
const fs = require('fs'); // Node.js의 파일시스템(fs) 모듈을 가져옵니다.
const solc = require('solc'); // Solidity 컴파일러(solc)를 가져옵니다.

// Jest를 이용해 'Web3', 'fs', 'solc'를 모킹합니다.
jest.mock('Web3');
jest.mock('fs');
jest.mock('solc');

// 'web3Controller'에 대한 테스트 스위트를 정의합니다.
describe('web3Controller', () => {

    beforeEach(() => {
        // 모든 인스턴스를 초기화하고 생성자와 모든 메소드에 대한 호출을 지웁니다:
        Web3.mockClear();
        fs.readFileSync.mockClear();
        solc.compile.mockClear();
    });

    // 'web3' 인스턴스를 생성하는 테스트를 정의합니다.
    it('creates a web3 instance', () => {
        web3Controller.createWeb3Instance();
        // 'Web3'가 한 번 호출되었는지 확인합니다.
        expect(Web3).toHaveBeenCalledTimes(1);
    });

    // 컨트랙트 인스턴스를 가져오는 테스트를 정의합니다.
    it('gets contract instance', () => {
        const mockWeb3Instance = {}; // 가짜 'web3' 인스턴스를 생성합니다.
        mockWeb3Instance.eth = { Contract: jest.fn() }; // 가짜 'web3' 인스턴스에 'Contract' 메소드를 추가합니다.

        // 'fs.readFileSync'가 'contract source'를 반환하도록 설정합니다.
        fs.readFileSync.mockReturnValue('contract source');
        // 'solc.compile'이 컴파일된 컨트랙트를 반환하도록 설정합니다.
        solc.compile.mockReturnValue({
            contracts: { 'ContractName': { interface: '{}' } }
        });

        // 'web3Controller.getContractInstance'를 호출합니다.
        web3Controller.getContractInstance(mockWeb3Instance, 'contractPath', 'ContractName');

        // 'fs.readFileSync'가 올바른 인자들과 함께 호출되었는지 확인합니다.
        expect(fs.readFileSync).toHaveBeenCalledWith('contractPath', 'utf8');
        // 'solc.compile'이 올바른 인자들과 함께 호출되었는지 확인합니다.
        expect(solc.compile).toHaveBeenCalledWith('contract source', 1);
        // 'mockWeb3Instance.eth.Contract'가 올바른 인자들과 함께 호출되었는지 확인합니다.
        expect(mockWeb3Instance.eth.Contract).toHaveBeenCalledWith(JSON.parse('{}'), constants.CONTRACT_ADDRESS);
    });

    // 이 위치에서 'sendTransaction', 'buyPhotoNFT', 'updatePhotoNFTPrice', 'deletePhotoNFT' 메소드에 대한 테스트를 작성하면 됩니다.
    // 이 테스트는 'getContractInstance' 테스트와 매우 비슷할 것입니다. 왜냐하면 컨트랙트의 메소드를 모킹하고 올바른 인자들과 함께 호출되었는지 확인하기 때문입니다.
});
