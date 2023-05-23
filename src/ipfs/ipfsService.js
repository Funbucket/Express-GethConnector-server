const IPFS = require('ipfs-core');

let ipfs;

const initIPFS = async () => {
    ipfs = await IPFS.create();
};

const addFile = async (file) => {
    const fileAdded = await ipfs.add(file);
    return fileAdded.cid.toString();
};

const getFile = async (cid) => {
    const fileBuffer = []
    for await (const chunk of ipfs.cat(cid)) {
        fileBuffer.push(chunk)
    }
    return Buffer.concat(fileBuffer);
};

module.exports = {
    initIPFS,
    addFile,
    getFile
};
