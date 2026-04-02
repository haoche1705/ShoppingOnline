const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
 app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from server!' });
 });
 //apis
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/customer', require('./api/customer.js'));
app.use('/api/admin', require('./api/admin.js'));

//api login
// "success": true,
  //  "message": "Authentication successful",
    //"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzA3ODI1MjcsImV4cCI6MTc3MDc4NjEyN30.qq1DZF0cSfHYlzbkHfVQzVhdjCzPGnnSQL1j3mgRuIE"

//  "success": true,
//     "message": "Token is valid",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzA3NzgwNzMsImV4cCI6MTc3MDc4MTY3M30.VxYtTeSYwb72n2Ydr2jC3JcU9lNa-oZT3Sn_9Nx5rpI"
    