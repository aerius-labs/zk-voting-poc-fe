// import {
//   HttpChainClient,
//   roundAt,
//   timelockDecrypt,
//   timelockEncrypt,
// } from 'tlock-js';

import * as paillierBigint from 'paillier-bigint';

// async function encrypt(
//   client: HttpChainClient,
//   plaintext: string, // format: "lamba,mu"
//   decryptionTime: number
// ) {
//   const chainInfo = await client.chain().info();
//   const roundNumber = roundAt(decryptionTime, chainInfo);
//   const ciphertext = await timelockEncrypt(
//     roundNumber,
//     Buffer.from(plaintext),
//     client
//   );
//   return {
//     plaintext,
//     decryptionTime,
//     ciphertext,
//   };
// }

// async function decrypt(client: HttpChainClient, ciphertext: string) {
//   const plaintext = await timelockDecrypt(ciphertext, client);
//   return {
//     plaintext,
//     ciphertext,
//   };
// }

async function generateKeypair(): Promise<paillierBigint.KeyPair> {
  const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(32);
  return { publicKey, privateKey };
}

export { generateKeypair };

/**
 * n: 3959918153, for 5:30 AM today
 * 
  -----BEGIN AGE ENCRYPTED FILE-----
YWdlLWVuY3J5cHRpb24ub3JnL3YxCi0+IHRsb2NrIDEyODAxOTY4IDc2NzI3OTdm
NTQ4ZjNmNDc0OGFjNGJmMzM1MmZjNmM2YjY0NjhjOWFkNDBhZDQ1NmEzOTc1NDVj
NmUyZGY1YmYKalRORUhuNVRoQXVaWjQ4VkpMMUY2TEtHUmVTMzdzYTArSk8vSzVY
dnVuVkxPNFZxUDk0bVVOTktPbWN4NnRUQwpzMEVnR0l4dmhjZEtFaWZyYmpkeFZp
YllvNDFqcXp0K2pHTXF6RklyYlFVCi0tLSBSV1pOQmtKTDNiMjZHaXNnMkphQzlQ
TE40L0VmcUJJbG5neW43dHVqQ0ZzCmbLGHaWFkWhezjalovxttQDMepU/DmMl1aZ
rWC3vOCi2/4w13PcQR0wgg==
-----END AGE ENCRYPTED FILE-----
 */
