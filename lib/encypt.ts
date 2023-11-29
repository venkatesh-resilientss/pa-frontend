/**
 * Library Used - jsencrypt
 * Used dynamic imports 
*/


export const encrypt = async (data : object) => {
  const plainText = JSON.stringify(data);
  const JSEncrypt = (await import("jsencrypt")).default;
  // Start our encryptor.
  let encrypt = new JSEncrypt();

  // Assign our encryptor to utilize the public key.
  encrypt.setPublicKey(process.env.NEXT_PUBLIC_PUBLIC_KEY);

  // Perform our encryption based on our public key - only private key can read it!
  let encrypted = encrypt.encrypt(plainText) || "";
  // console.log({plainText,encrypted});
  return encrypted;
};


export const decrypt = async (encrypted : string) => {
  const JSEncrypt = (await import("jsencrypt")).default;
  let decrypt = new JSEncrypt();
  // Assign decryptor to use private key
  decrypt.setPrivateKey(process.env.NEXT_PUBLIC_PRIVATE_KEY);
  // Perform decryption based on private key - must be encrypted by the matching public key
  let uncrypted = decrypt.decrypt(encrypted);
  return uncrypted;
};
