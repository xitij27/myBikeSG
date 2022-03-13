class FindRoute extends Request
{
    constructor(user, requestID, initialLocation, destination)
    {
        super(user, initialLocation, requestID);
        this.destination = destination;
    }
    serviceRequest()
    {
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