module.exports = {
    // Solidity 컴파일러 설정
    compilers: {
        solc: {
            version: "0.8.4", // Solidity 버전을 지정합니다.
        },
    },
    // 네트워크 설정
    networks: {
        node1: { // Node1 설정
            host: "168.188.129.232",
            port: 80,
            network_id: "*",
        },
        node2: { // Node2 설정
            host: "168.188.129.231",
            port: 80,
            network_id: "*",
        },
        node3: { // Node3 설정
            host: "168.188.129.206",
            port: 80,
            network_id: "*",
        },
        // 더 많은 네트워크를 추가할 수 있습니다.
    },
};
