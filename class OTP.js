class OTP
{
   constructor(email)
   {
       this.email=email;
       var digits='0123456789';
       let otp='';
       for (let i = 0; i < 4; i++ ) 
       {
        otp += digits[Math.floor(Math.random() * 10)];
       }
       this.otp=otp;
       console.log("OTP is :",this.otp);
       this.create_time=Date.now();
   }
   checkOTP(otp_passed)
   {
       const check_time=Date.now();
       const diff=(check_time-this.create_time)/60000;
       if(diff>15)
       {return false;}
       else if(this.otp!=otp_passed)
       {return false;}
       return true;
   }
   OTPvalid()
   {
    var check_time=Date.now();
    var diff=(check_time-this.create_time)/60000;
    if(diff>15)
    {return false;}
    return true;
   }
}
module.exports = OTP;