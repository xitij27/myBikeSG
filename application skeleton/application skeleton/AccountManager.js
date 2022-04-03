const ps = require('prompt-sync');
const input = ps();
const Account = require('./Account.js');
const OTP = require('./OTP.js');
const Verifier_Acc = require('./VerfierAcc.js');
/**
 * @class 
 * @classdesc Control class containing all methods related to managing accounts.
 */
class AccMgr 
{
    /**
     * accs hashmap stores the Account objects that are created.
     * @static
     * @private
     */
    static accs = new Map();
    /**
     * OTPs hashmap stores the OTP objects that are created.
     * @static
     * @private
     */
    static OTPs = new Map();
    constructor()
    {
    }
    /**
     * Checks whether login details are correct.
     * @param {string} email 
     * @param {string} password 
     * @static
     * @returns {number} 1 is password is correct, 2 if account is disabled, 0 if password is incorrect,-1 if account does not exist.
     */
    static Login(email, password) {
       
    }
    /**
     * Sends an OTP to user, checks whether OTP is valid, then update password. Returns false of OTP is incorrect.
     * @param {string} email 
     * @param {string} otp 
     * @param {string} password 
     * @static
     * @returns {boolean} 
     */
    static resetPassword(email, otp, password) {
        
    }
    /**
     * Sends an email containing the generated OTP to the user. Returns a promise.
     * @param {string} email 
     * @param {string} otp 
     * @static
     * @async
     * @returns {Promise} 
     */
    static async sendEmail(email,otp)
   {
      
   }
   /**
    * Generates a random 4 digit OTP. Makes an OTP object and stores it in OTPs hashmap. Returns the OTP.
    * @param {string} email 
    * @static
    * @returns {string}
    */
   static generateOTP(email){    
    
    }
    /**
     * Creates an account for a User.
     * @static
     * @param {string} email 
     * @param {string} password 
     * @param {string} DOB Date of Birth
     * @param {string} Name Account Username
     * @param {string} otp 
     */
    static signUp(email, password, DOB, Name, otp) {
        
        }
    
    /**
     * Creates a special account for a Verifier.
     * @static 
     * @param {string} email 
     * @param {string} password 
     * @param {string} DOB 
     * @param {string} Name 
     * @param {string} otp 
     */

    static signUp_V(email, password, DOB, Name, otp) {
        
        }
    }



