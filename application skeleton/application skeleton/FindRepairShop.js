const Request = require('./Request.js');
class FindRepairShop extends Request
{
    /**
     * Create a request to find repair shops.
     * @constructor
     * @extends Request
     * @param {string} user 
     * @param {number} requestID 
     * @param {*} initialLocation 
     */
    constructor(user, requestID, initialLocation)
    {
        super(user, initialLocation, requestID);
    }
    /**
     * Fulfill the request to find repair shop near some location.
     */
    serviceRequest()
    {
        console.log("Servicing request to FindRepairShop for ReqId = ", this.requestID);
        // TODO fill this with code
    }
}
module.exports = FindRepairShop;