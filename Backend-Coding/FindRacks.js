const Request = require('./Request.js');
class FindRacks extends Request
{
    constructor(user, requestID, initialLocation)
    {
        super(user, initialLocation, requestID);
    }
    serviceRequest()
    {
        console.log("Servicing request to FindRacks for ReqId = ", this.requestID);
        // TODO fill this with code
    }
}
module.exports = FindRacks;