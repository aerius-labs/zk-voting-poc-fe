import {
  HttpChainClient,
  roundAt,
  timelockDecrypt,
  timelockEncrypt,
} from 'tlock-js';
import { testnet } from './clientUtils';

export async function encryptedOrDecryptedFormData(
  form: unknown
): Promise<boolean> {
  const partialWebForm = await textEncryptionSchema.validate(form);
  const client: HttpChainClient = testnet();

  if (partialWebForm.plaintext) {
    return encrypt(
      client,
      partialWebForm.plaintext,
      partialWebForm.decryptionTime
    );
  } else if (partialWebForm.ciphertext) {
    return decrypt(
      client,
      partialWebForm.ciphertext,
      partialWebForm.decryptionTime
    );
  }

  return Promise.reject(false);
}

async function encrypt(
  client: HttpChainClient,
  plaintext: string,
  decryptionTime: number
): Promise<CompletedWebForm> {
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

async function decrypt(
  client: HttpChainClient,
  ciphertext: string,
  decryptionTime: number
): Promise<CompletedWebForm> {
  const plaintext = await timelockDecrypt(ciphertext, client);
  return {
    plaintext,
    decryptionTime,
    ciphertext,
  };
}
