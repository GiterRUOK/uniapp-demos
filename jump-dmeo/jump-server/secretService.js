const crypto = require('crypto');

const DEFAULT_CHARSET = 'utf-8';

function getSecret() {
	// 当前时间戳
	const nowTime = Date.now();
	// 享你住提供的 accessKeyId（非正式）
	const accessKeyId = 'm8jk6fmkqxua2wj3';
	// 享你住提供的公钥(非正式)
	const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq186O6f0iFCvztDBFx+8
85a4+W6EcsJjqrLmg/xWAP2FbsOsf32g6NXFsrH6jLrJUcMx1xpqKc3XeNzJE1HJ
XdIAXIZbcBxqjSzO7WE/knMvykf6niFEvBB99o/Y9y1v51wCCiTXdYXDKbiA96ZO
43S0C0H/6wCsKgYj4fRQZW/ajk/l4RYtplFHyCnO2ztG0b4P7YDNNnX0VQsLCfxg
JJoBSf3LR6Dv9BEIR79QT7gecWPmwg8RCRQv93nt4BHIm0TP1qGB6Nqq83HhMXHy
dKW02uNczNiQN74Iq0vyA+L7FGG4CMdo4i8dTdUR19uTJsvSOV024MnaFF19dpbq
5QIDAQAB
-----END PUBLIC KEY-----`;

	// 加密处理
	const data = `${accessKeyId}#${nowTime}`;
	// const data = accessKeyId + "#" + "1713323603777";
	console.log('加密前的字符串是：', data);
	// 加密后的字符串，通过接口的 secret 参数传给享你住
	const secret = publicEncrypt(data, publicKey);
	console.log('加密后的字符串是：', secret);
	return secret;
}

function publicEncrypt(data, publicKey) {
	try {
		const bufferData = Buffer.from(data, DEFAULT_CHARSET);
		const encryptedData = crypto.publicEncrypt({
				key: publicKey,
				padding: crypto.constants.RSA_PKCS1_PADDING
			},
			bufferData
		);
		return encryptedData.toString('base64');
	} catch (error) {
		throw new Error('RSA公钥加密时遇到异常');
	}
}

module.exports = { getSecret }