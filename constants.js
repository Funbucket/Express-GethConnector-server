module.exports = {
    // Ethereum 네트워크 설정
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            networkId: "*",
            gasPrice: 10000000000, // Gas price for transactions in development
        },
        // Ethereum mainnet 설정
        mainnet: {
            url: process.env.INFURA_URI || "https://mainnet.infura.io",
            networkId: 1,
            gasPrice: 50000000000, // Gas price for transactions in mainnet
        },
        // Ethereum testnet 설정들
        ropsten: {
            url: process.env.INFURA_URI || "https://ropsten.infura.io",
            networkId: 3,
            gasPrice: 50000000000, // Gas price for transactions in ropsten
        },
        rinkeby: {
            url: process.env.INFURA_URI || "https://rinkeby.infura.io",
            networkId: 4,
            gasPrice: 50000000000, // Gas price for transactions in rinkeby
        },
        goerli: {
            url: process.env.INFURA_URI || "https://goerli.infura.io",
            networkId: 5,
            gasPrice: 50000000000, // Gas price for transactions in goerli
        },
        kovan: {
            url: process.env.INFURA_URI || "https://kovan.infura.io",
            networkId: 42,
            gasPrice: 50000000000, // Gas price for transactions in kovan
        },
    },
    // MongoDB 설정
    mongodb: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/myproject", // default to local MongoDB instance
    },
    // Wallet mnemonic for account generation - must be set in environment variable for security
    mnemonic: process.env.MNEMONIC || "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
};
