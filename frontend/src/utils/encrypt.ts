import { ENCRYPT_ALGORITHM, ENCRYPT_SECRET } from "@app/constants";
import crypto from "crypto";

export const encrypt = (text: string): string => {
  const iv: Buffer = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ENCRYPT_ALGORITHM, Buffer.from(ENCRYPT_SECRET), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

export const decrypt = (encryptedText: string): string => {
  const [ivHex, encryptedData] = encryptedText.split(":");
  const iv: Buffer = Buffer.from(ivHex, "hex");
  const encryptedBuffer: Buffer = Buffer.from(encryptedData, "hex");
  const decipher = crypto.createDecipheriv(ENCRYPT_ALGORITHM, Buffer.from(ENCRYPT_SECRET), iv);
  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
