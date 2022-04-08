const Account = require('./Account.js');
const OTP = require('./OTP.js');
const Verifier_Acc = require('./VerfierAcc.js');
const myModule = require('./AccountManager.js');
const main2 = myModule.thing2;
const AccMgr = myModule.thing1;
/*const myModule = require('./myModule.js');
const method = myModule.method;
const otherMethod = myModule.otherMethod*/
// Date base Part
const mongoose = require('mongoose');
const accountDB2 = require('./models/accountsDB2');
const bikeracksDB2 = require('./models/bikeracksDB2');
const repairshopsDB2 = require('./models/repairshopsDB2');

// Connect to mongoDB (use a promise with a catch block for errors)
const dbURI = 'mongodb+srv://scared2compile:CZ2006@mybikesg-db.hfkb3.mongodb.net/Accounts?retryWrites=true&w=majority';
mongoose.connect(dbURI).then((result) => console.log('Connected to db Accounts'))
    .catch((err) => console.log(err));
/*const dbURI2 = 'mongodb+srv://scared2compile:CZ2006@mybikesg-db.hfkb3.mongodb.net/BikeRacks?retryWrites=true&w=majority';
const conn = mongoose.createConnection(dbURI2);*/

// Loading Express
const express = require('express');
var cors = require('cors')
const res = require('express/lib/response');
const app = express();
app.use(express.json());
app.use(cors())

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

app.post('/api/signUp/', (req, res) => {
    // Take account info from req
    password = req.body.password;
    email = req.body.email;
    otp1 = String(req.body.otp);
    console.log(otp1, typeof (otp1));
    dob = req.body.dob;
    name1 = req.body.name;
    // Call database and check if account already exists or not
    accountDB2.find({
        email: email
    })
        .then((result) => {
            console.log('Found: ', result);
            if (result.length >= 1) {
                console.log("Email " + email + " found in MongoDB");
                res.send("Email already in use");
            }
            else {
                console.log("Email " + email + " not found in MongoDB");
                val = AccMgr.signUp(email, password, dob, name1, otp1);
                if (val) {
                    const accDB2 = new accountDB2({
                        email: email,
                        name: name1,
                        isDisabled: false,
                        password: password
                    });
                    accDB2.save()
                        .then((result) => {
                            res.send(val);
                        })
                        .catch((err) => {
                            res.send(500, "Database Error");
                        });
                }
                else
                    res.send(val);
            }
            // res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        }
        );
});
/* Hosting environment for port
Typically in production we dont get a specific port so we use environment variables
*/

app.post('/api/login/', (req, res) => {
    // Take account info from req
    password1 = req.body.password;
    email = req.body.email;

    // Find account from MongoDB
    accountDB2.find({
        email: email
    })
        .then((result) => {
            if (result.length < 1)
                res.send(404, "Account does not exist.");
            if (result[0].password == password1)
                res.send("true");
            else
                res.send("false");
        })
        .catch((err) => {
            console.log(err);
            res.send(500, "Database Error");
        });

});

app.post('/api/resetPassword/', (req, res) => {
    // Take account info from req
    password = req.body.password;
    email = req.body.email;
    otp1 = String(req.body.otp);
    // Call database and get account
    accountDB2.find({
        email: email
    })
        .then((result) => {
            console.log('Found: ', result);
            if (result.length >= 1 && AccMgr.resetPassword(email, otp1, password)) {
                // Update password in database
                accountDB2.findByIdAndUpdate(result[0].id, {
                    password: password
                })
                    .then((result2) => {
                        res.send('true');
                    })
                    .catch((err) => {
                        console.log(err);
                        res.send(500, 'Database Error');
                    })
            }
            else if (result.length < 1)
                res.send(404, 'Account does not exist');
            else
                res.send('false');
        })
        .catch((err) => {
            console.log(err);
            res.send(500, "Database Error");
        });
});

app.get('/api/bikeRacks', (req, res) => {
    bikeracksDB2.find()
        .then((result) => {
            // console.log('Found: ', result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.send(500, "Database Error");
        });
});

app.post('/api/addRacks', (req, res) => {
    // Take account info from req
    rackid = req.body.rack_id;
    email = req.body.user_email;
    lat = Math.round(req.body.lat * 10000) / 10000;
    long = Math.round(req.body.long * 10000) / 10000;
    verified = Boolean(req.body.verified);
    // Check if aleady in database or not
    bikeracksDB2.find({
        lat: lat,
        long: long
    })
        .then((result) => {
            if (result.length >= 1)
                res.send('Already in Database');
            else {
                // Actually save to DB
                const bikerackDB2 = new bikeracksDB2({
                    user_email: email,
                    rack_id: rackid,
                    verified: verified,
                    lat: lat,
                    long: long
                });
                bikerackDB2.save()
                    .then((result) => {
                        res.send("true");
                    })
                    .catch((err) => {
                        res.send(500, "Database Error");
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            res.send(500, "Database Error");
        });
});

app.get('/api/repairShops', (req, res) => {
    repairshopsDB2.find()
        .then((result) => {
            // console.log('Found: ', result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.send(500, "Database Error");
        });
});

app.post('/api/addRepairShops', (req, res) => {
    // Take account info from req
    shopid = req.body.shop_id;
    email = req.body.contact;
    lat = Math.round(req.body.lat * 100000) / 100000;
    long = Math.round(req.body.long * 100000) / 100000;
    name1 = req.body.name;
    // Check if aleady in database or not
    repairshopsDB2.find({
        lat: lat,
        long: long
    })
        .then((result) => {
            if (result.length >= 1)
                res.send('Already in Database');
            else {
                // Actually save to DB
                const repairshopDB2 = new repairshopsDB2({
                    contact: email,
                    shop_id: shopid,
                    name: name1,
                    lat: lat,
                    long: long
                });
                repairshopDB2.save()
                    .then((result) => {
                        res.send("true");
                    })
                    .catch((err) => {
                        res.send(500, "Database Error");
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            res.send(500, "Database Error");
        });
});

// PORT
const port = process.env.PORT || 9000; // process.env shows environment variables

app.listen(port, () => console.log("Listening on port " + port)) // 9000 => Port No