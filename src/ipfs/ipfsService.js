import { create } from 'ipfs-http-client';

const ipfs = create('http://localhost:5001');

export const addFile = async ({ path, content }) => {
  const file = { path: path, content: Buffer.from(content) };
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
