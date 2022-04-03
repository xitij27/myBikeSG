const Request = require('./Request.js');
class FindRacks extends Request
{
    /**
     * Create a request to find racks.
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
     * Fulfill the request to find racks.
     */
    serviceRequest()
    {
        console.log("Servicing request to FindRacks for ReqId = ", this.requestID);
        // TODO fill this with code
    }
}
module.exports = FindRacks;