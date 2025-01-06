import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse('1234567890123456');
const iv = CryptoJS.enc.Utf8.parse('1234567890123456');

export function encryptMessage(message) {
    const encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}

export function decryptMessage(encryptedMessage) {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

