const Request = require('./Request.js');
class FindRoute extends Request
{
    /**
     * Create a request to find route.
     * @constructor
     * @extends Request
     * @param {string} user 
     * @param {number} requestID 
     * @param {*} initialLocation 
     * @param {*} destination 
     */
    constructor(user, requestID, initialLocation, destination)
    {
        super(user, initialLocation, requestID);
        this.destination = destination;
    }
    /**
     * Fulfill request to find route from intitial location to destination
     */
    serviceRequest()
    {
        console.log("Servicing request to FindRoute for ReqId = ", this.requestID);
        // TODO fill this with code
    }
    /**
     * Returns the destination.
     * @returns {*}
     */
    getDestination()
    {
        
    }
    /**
     * Sets the destination.
     * @param {*} destination 
     */
    setDestination(destination)
    {
        
    }
}
module.exports = FindRoute;