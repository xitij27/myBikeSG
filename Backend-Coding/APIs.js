const Account = require('./Account.js');
const OTP = require('./OTP.js');
const Verifier_Acc = require('./VerfierAcc.js');
const AccMgr  = require('./AccountManager.js');
const main2 = require('./AccountManager.js');

// Loading Express
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    // Look at express documentation for full list of properties
    res.send('Welcome to MyBikeSG API Requests!!!');
});

app.get('/api/sendOTP', (req, res) => {
    res.send("Please add your email to URL");
});

app.get('/api/sendOTP/:email', (req, res) => {
    main2(req.params.email);
    res.send("Sent: ");
    // Use req.params.id to read the params passed on the request
});

/* Hosting environment for port
Typically in production we dont get a specific port so we use environment variables
*/

// PORT
const port = process.env.PORT || 3000; // process.env shows environment variables

app.listen(port, () => console.log("Listening on port " + port)) // 3000 => Port No