module.exports = {
    // Solidity 컴파일러 설정
    compilers: {
        solc: {
            version: "0.8.4", // Solidity 버전을 지정합니다.
        },
    },
    // 네트워크 설정
    networks: {
        development: { // 개발 네트워크 설정
            host: "127.0.0.1", // Ganache가 로컬 머신에서 실행되는 경우
            port: 7545, // Ganache 기본 포트
            network_id: "*", // 네트워크 ID
        },
        // 다른 네트워크 설정 (테스트 넷 또는 메인 넷)도 추가할 수 있습니다.
    },
};
