const Request = require('./Request.js');
class FindRepairShop extends Request
{
    constructor(user, requestID, initialLocation)
    {
        super(user, initialLocation, requestID);
    }
    serviceRequest()
    {
        console.log("Servicing request to FindRepairShop for ReqId = ", this.requestID);
        // TODO fill this with code
    }
}
module.exports = FindRepairShop;