const Account = require('./Account.js');
class Verifier_Acc extends Account
{
    constructor(emailId, DOB, Name, racksVerified = [])
    {
        super(emailId,DOB,Name);
        this.racksVerified = racksVerified;
    }
    
    addRack(rackNo) 
    {
        this.racksVerified.push(rackNo);
    }

    removeRack(rackNo) 
    {
        const index = racksVerified.indexOf(5);
        if (index > -1) {
            racksVerified.splice(index, 1);
          }
    }

    displayRacks()
    {
        racksVerified.forEach(function(entry) {
            console.log(entry);
          });
    }
}
module.exports = Verifier_Acc;