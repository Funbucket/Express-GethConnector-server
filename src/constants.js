const constants = {
  // 이더리움 네트워크 설정들입니다.
  networks: {
    development: {
      // 개발용 네트워크 설정입니다.
      host: 'localhost', // 로컬에서 실행되는 Ethereum 노드의 주소입니다.
      port: 8545, // 로컬 Ethereum 노드의 포트입니다.
      networkId: '*', // 이 설정을 사용하는 네트워크의 ID입니다. "*"는 모든 네트워크를 의미합니다.
      gasPrice: 10000000000, // 개발용 네트워크에서 트랜잭션 수행시 사용할 가스 가격입니다.
    },
    // 이더리움 메인넷 설정입니다.
    mainnet: {
      url: process.env.INFURA_URI || 'https://mainnet.infura.io', // INFURA의 메인넷 Ethereum 노드 주소입니다.
      networkId: 1, // 메인넷의 네트워크 ID입니다.
      gasPrice: 50000000000, // 메인넷에서 트랜잭션 수행시 사용할 가스 가격입니다.
    },
    // 이더리움 테스트넷 설정들입니다.
    ropsten: {
      url: process.env.INFURA_URI || 'https://ropsten.infura.io', // INFURA의 Ropsten 테스트넷 Ethereum 노드 주소입니다.
      networkId: 3, // Ropsten의 네트워크 ID입니다.
      gasPrice: 50000000000, // Ropsten에서 트랜잭션 수행시 사용할 가스 가격입니다.
    },
    rinkeby: {
      url: process.env.INFURA_URI || 'https://rinkeby.infura.io', // INFURA의 Rinkeby 테스트넷 Ethereum 노드 주소입니다.
      networkId: 4, // Rinkeby의 네트워크 ID입니다.
      gasPrice: 50000000000, // Rinkeby에서 트랜잭션 수행시 사용할 가스 가격입니다.
    },
    goerli: {
      url: process.env.INFURA_URI || 'https://goerli.infura.io', // INFURA의 Goerli 테스트넷 Ethereum 노드 주소입니다.
      networkId: 5, // Goerli의 네트워크 ID입니다.
      gasPrice: 50000000000, // Goerli에서 트랜잭션 수행시 사용할 가스 가격입니다.
    },
    kovan: {
      url: process.env.INFURA_URI || 'https://kovan.infura.io', // INFURA의 Kovan 테스트넷 Ethereum 노드 주소입니다.
      networkId: 42, // Kovan의 네트워크 ID입니다.
      gasPrice: 50000000000, // Kovan에서 트랜잭션 수행시 사용할 가스 가격입니다.
    },
  },
  // MongoDB 설정입니다.
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject', // 사용할 MongoDB의 주소입니다. 기본적으로 로컬 MongoDB 인스턴스를 사용합니다.
  },
  // 계정 생성을 위한 지갑 니모닉입니다. 보안을 위해 환경 변수에 설정되어야 합니다.
  mnemonic:
    process.env.MNEMONIC ||
    'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
};

export default constants;
