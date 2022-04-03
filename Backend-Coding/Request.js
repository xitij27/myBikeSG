class Request  // Abstract Class
{
    // Source: https://stackoverflow.com/questions/597769/how-do-i-create-an-abstract-base-class-in-javascript
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
    serviceRequest() 
    {
        throw new Error("Method 'serviceRequest()' must be implemented in subclass");
    }
    getInitialLocation()
    {
        return this.initialLocation
    }
    setInitialLocation(initialLocation)
    {
        this.initialLocation = initialLocation
    }
}
module.exports = Request;