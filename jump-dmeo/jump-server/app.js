const express = require('express');
const bodyParser = require('body-parser');
const {
	getSecret
} = require('./secretService');

const app = express();
const port = 3000;

// 使用body-parser中间件来解析POST请求的body
app.use(bodyParser.json());
// 中间件设置响应头
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有来源访问
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // 允许的请求方法
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  next();
});

// GET请求
app.get('/', (req, res) => {
	console.log('get')
	res.send('Hello World!');
});

app.get('/getSecret', (req, res) => {
	try {
		const secret = getSecret();
		// res.setHeader('Content-Type', 'application/json'); // 设置Content-Type为纯文本
		res.send(secret);
	} catch (error) {
		console.log('Error: ', error);
		res.status(500).send('Internal Service Error');
	}
})

// POST请求
app.post('/', (req, res) => {
	console.log(req.body); // 输出POST请求的body内容
	res.send('POST request received');
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});