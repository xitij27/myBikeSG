
class OTP
{
    /**
     * Creates a new OTP object.
     * @constructor
     * @param {string} email 
     * @param {string} otp 
     */
   constructor(email,otp)
   {
       /**
        * @private
        */
       this.email=email;
       /**
        * @private
        */
       this.otp=otp;
       /**
        * @private
        */
       this.create_time=Date.now();
   }
   /**
    * Checks whether the OTP entered by the user is correct and valid and returns a boolean.
    * @param {string} otp_passed 
    * @returns {boolean}
    */
   checkOTP(otp_passed)
   {
       
   }
   /**
    * Checks whether OTP is still valid based on the time elapsed and returns a boolean.
    * @returns {boolean}
    */
   OTPvalid()
   {
    
   }
}
module.exports = OTP;
