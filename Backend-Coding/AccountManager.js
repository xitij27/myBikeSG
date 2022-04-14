const ps = require('prompt-sync');
const input = ps();
const Account = require('./Account.js');
const OTP = require('./OTP.js');
const Verifier_Acc = require('./VerfierAcc.js');

class AccMgr 
{
    static accs = new Map();
    static OTPs = new Map();
    constructor()
    {
    }

    static Login(email, password) {
        /**
         * Returns 1 is password is correct
         * Returns 2 if account is disabled
         * Returns 0 if password is incorrect
         * Returns -1 if account does not exist
         * @param: {String} password The password to check
         */
        if (AccMgr.accs.has(email))
            return  AccMgr.accs.get(email).checkPassword(password);
        else
            return -1;
    }

    static resetPassword(email, otp, password) {
    
        if (!(AccMgr.OTPs.get(email).checkOTP(otp))) {
            return false;
        } else {
            // AccMgr.accs.get(email).updatePassword(password);
            AccMgr.OTPs.delete(email);
            return true;
        }
        
    }
    static async sendEmail(email,otp)
    {
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
        user: 'scared2compile@gmail.com',
        pass: 'CZ2006@2022'
        }
        });

        var mailOptions = {
        from: 'scared2compile@gmail.com',
        to: email,
        subject: 'Your One-Time-Password for login to MyBikeSG ',
        text: 'Your OTP is '+otp+'. This OTP is valid for 15 minutes. Please do not share with anyone. If you have logged in again, then do not use this OTP.'
        };
        return new Promise(function (resolve, reject){
            transporter.sendMail(mailOptions, (err, info) => {
             if (err) {
                console.log("error: ", err);
                reject(err);
            } else {
                 console.log(`Mail sent successfully!`);
                resolve(info);
             }
            });
        });
   }


   static generateOTP(email){    
    var digits='0123456789';
    let otp='';
    for (let i = 0; i < 4; i++ ) 
    {
     otp += digits[Math.floor(Math.random() * 10)];
    }
    AccMgr.OTPs.set(email, new OTP(email,otp));
    return otp;
    }
    
    /*static async accInMongoDB(email)
    {
        return new Promise((resolve, reject) => {
            accountDB2.find({
                email: email
                })
                .then((result) => {
                    console.log('Found: ', result);
                    if(result.length >= 1){
                        console.log("Email "+ email + " found in MongoDB");    
                        resolve(true);
                    }
                    else{
                        console.log("Email "+ email + " not found in MongoDB");
                        resolve(false);
                    }
                    // res.send(result);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }*/

    static signUp(email, password, DOB, Name, otp) {
        // Just checks if OTP is correct and ends
        let otp1 = AccMgr.OTPs.get(email);
        let chk = otp1.checkOTP(otp);    
        if (chk == true) {
            AccMgr.accs.set(email, new Account(email, DOB, Name));
            AccMgr.accs.get(email).updatePassword(password);
            return true;
        }
        return false;          
    }

    static signUp_V(email, password, DOB, Name, otp) {
        let otp1 = AccMgr.OTPs.get(email);
        let chk = otp1.checkOTP(otp);
        if (chk == true) {
            AccMgr.accs.set(email, new Verifier_Acc(email, DOB, Name));
            AccMgr.accs.get(email).updatePassword(password);
            return true;
        }
        return false;
    }
}


/*async function main()
{
    let email = input("Enter your email : "); 
    await AccMgr.sendEmail(email,AccMgr.generateOTP(email));
    let password = input("Enter your password : ");
    let dob = input("Enter your Date Of Birth : ");
    let name = input("Enter your name : ");
    let otp_user = input("Enter your otp : ");
    AccMgr.signUp_V(email,password,dob,name,otp_user);
    console.log("result is " + AccMgr.Login(email,password));
}*/
async function main2(email)
{
    console.log("Hi main 2 here");
    await AccMgr.sendEmail(email, AccMgr.generateOTP(email));
}
// module.exports = AccMgr;
// module.exports = main2;
module.exports = {
    thing1: AccMgr,
    thing2: main2,
};
