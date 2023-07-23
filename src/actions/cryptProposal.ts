import {
  HttpChainClient,
  roundAt,
  timelockDecrypt,
  timelockEncrypt,
} from 'tlock-js';

import * as paillierBigint from 'paillier-bigint';

async function encrypt(
  client: HttpChainClient,
  plaintext: string, // format: "lamba,mu"
  decryptionTime: number
) {
  const chainInfo = await client.chain().info();
  const roundNumber = roundAt(decryptionTime, chainInfo);
  const ciphertext = await timelockEncrypt(
    roundNumber,
    Buffer.from(plaintext),
    client
  );
  return {
    plaintext,
    decryptionTime,
    ciphertext,
  };
}

async function decrypt(client: HttpChainClient, ciphertext: string) {
  const plaintext = await timelockDecrypt(ciphertext, client);
  return {
    plaintext,
    ciphertext,
  };
}

async function generateKeypair() {
  const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(60); // figure out max size that mina supports
}

export { generateKeypair };
