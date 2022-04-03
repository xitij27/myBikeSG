class Request  // Abstract Class
{
    // Source: https://stackoverflow.com/questions/597769/how-do-i-create-an-abstract-base-class-in-javascript
    /**
     * Request is an abstract class that is implemented by specific request classes.
     * @abstract
     * @param {string} user 
     * @param {string} initialLocation 
     * @param {string} requestID 
     */
    constructor(user, initialLocation, requestID) 
    {
        if (this.constructor == Request) 
        {
            throw new Error("Abstract classes can't be instantiated.");
        }
        else
        {
            this.user = user
            this.initialLocation = initialLocation
            this.requestID = requestID
            var today = new Date()
            this.timeMade = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            // Source: https://tecadmin.net/get-current-date-time-javascript
        }
    }
    /**
     * This method is implemented in subclasses.
     * @abstract
     */
    serviceRequest() 
    {
        throw new Error("Method 'serviceRequest()' must be implemented in subclass");
    }
    /**
     * Returns the starting location specified by the user.
     * @returns {*}
     */
    getInitialLocation()
    {
        
    }
    /**
     * Sets the starting location specified by the user.
     * @param {*} initialLocation 
     */
    setInitialLocation(initialLocation)
    {
        
    }
}
module.exports = Request;