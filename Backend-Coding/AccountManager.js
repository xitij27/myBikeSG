const ps = require('prompt-sync');
const input = ps();
const Account = require('./Account.js');
const OTP = require('./class OTP.js');
class AccMgr {
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
        if (email in  AccMgr.accs)
            return  AccMgr.accs.get(email).checkPassword(password);
        else
            return -1;
    }

    static resetPassword(email, otp, password) {
        if (!(OTPs.get(email).checkOTP(otp))) {
            return false;
        } else {
            AccMgr.accs.get(email).updatePassword(password);
            delete AccMgr.OTPs.get(email)
            // Above code needs to do tested and may break
            return true;
        }
    }

    static generateOTP(email) {
        AccMgr.OTPs.set(email,new OTP(email));
        // TODO send email to user with otp.
    }

    static signUp(email, password, DOB, Name, otp) {
        let otp1 = AccMgr.OTPs.get(email);
        let chk = otp1.checkOTP(otp);
        if (chk == true) {
            AccMgr.accs.set(email, new Account(email, DOB, Name));
        }
    }

    static signUp_V(email, password, DOB, Name, otp) {
        let otp1 = AccMgr.OTPs.get(email);
        let chk = otp1.checkOTP(otp);
        if (chk == true) {
            AccMgr.accs.set(email, new Verifier_Acc(email, DOB, Name));
        }
    }
}



let email = input("Enter your email : ");
let password = input("Enter your password : ");
let dob = input("Enter your Date Of Birth : ");
let name = input("Enter your name : ");
let otp_user = input("Enter your otp : ");

AccMgr.generateOTP(email);
AccMgr.signUp(email,password,dob,name,otp_user);
console.log("result is " + AccMgr.Login(email,password));