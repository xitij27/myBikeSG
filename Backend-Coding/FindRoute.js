const Request = require('./Request.js');
class FindRoute extends Request
{
    constructor(user, requestID, initialLocation, destination)
    {
        super(user, initialLocation, requestID);
        this.destination = destination;
    }
    serviceRequest()
    {
        console.log("Servicing request to FindRoute for ReqId = ", this.requestID);
        // TODO fill this with code
    }
    getDestination()
    {
        return this.destination;
    }
    setDestination(destination)
    {
        this.destination = destination
    }
}
module.exports = FindRoute;