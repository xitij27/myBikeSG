// The attributes in UML Class Diagram
var accs = {};
// How to use a dictionary in js: https://pietschsoft.com/post/2015/09/05/javascript-basics-how-to-create-a-dictionary-with-keyvalue-pairs
var timeUsed = {};
var failedLogins = {};
var OTPs = {};
const ACCS_MAX_LEN = 100;

function Login(email, password)
{
     /**
         * Returns 1 is password is correct
         * Returns 2 if account is disabled
         * Returns 0 if password is incorrect
         * Returns -1 if account does not exist
         * @param: {String} password The password to check
         */
    if(email in accs)
        return accs[email].checkPassword(password);
    else
        return -1;
}

function resetPassword(email, otp, password)
{
    if(!(OTPs[email].checkOTP(otp)))
    {
        return false;
    }
    else
    {
        accs[email].updatePassword(password);
        delete OTPs[email]
        // Above code needs to do tested and may break
        return true;
    }
}

function generateOTP(email)
{
    OTPs[email] = new OTP(email);
    // TODO send email to user with otp.
}

function signUp(email,password,DOB,Name,otp) 
{ 
    accs[email] = new Account(email,DOB,Name); 
    OTPs[email] = new OTP(email); 
    OTPs[email].generateOTP(email); 
    chk = OTPs[email].checkOTP(otp); 
    if(chk == true) 
    { 
        accs.set(email, obj); 
    } 
}

function signUp_V(email,password,DOB,Name,otp) 
{ 
    accs[email] = new Verifier_Acc(email,DOB,Name); 
    OTPs[email] = new OTP(email); 
    OTPs[email].generateOTP(email); 
    chk = OTPs[email].checkOTP(otp); 
    if(chk == true) 
    { 
        accs.set(email, obj); 
    } 
}

