import * as IPFS from 'ipfs-core';

let ipfs;

export const initIPFS = async () => {
  ipfs = await IPFS.create();
};

export const addFile = async (file) => {
  const fileAdded = await ipfs.add(file);
  return fileAdded.cid.toString();
};

export const getFile = async (cid) => {
  const fileBuffer = [];
  for await (const chunk of ipfs.cat(cid)) {
    fileBuffer.push(chunk);
  }
  return Buffer.concat(fileBuffer);
};
