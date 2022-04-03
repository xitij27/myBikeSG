const Account = require('./Account.js');
class Verifier_Acc extends Account
{
    /**
     * Entity class for a special verifier account.
     * @constructor
     * @extends Account
     * @param {string} emailId 
     * @param {Date} DOB 
     * @param {string} Name 
     * @param {Array}} racksVerified 
     */
    constructor(emailId, DOB, Name, racksVerified = [])
    {
        super(emailId,DOB,Name);
        this.racksVerified = racksVerified;
    }
    /**
     * Adds the rack to the list of verified racks.
     * @param {number} rackNo 
     */
    addRack(rackNo) 
    {
        
    }
    /**
     * Removes the rack from list.
     * @param {number} rackNo 
     */
    removeRack(rackNo) 
    {
        
    }
    /**
     * Display the list of verified racks.
     */

    displayRacks()
    {
        
    }
}
module.exports = Verifier_Acc;