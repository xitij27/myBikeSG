class AddRacks extends Request
{
    constructor(user, requestID, initialLocation, photos)
    {
        super(user, initialLocation, requestID);
        this.photos = [...photos];
        // Source: https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
        this.verified = false;
        this.verifiedBy = null;
        this.verifyImage = null;
    }
    serviceRequest()
    {
        // TODO fill this with code
    }
    verifyRack(verifier, photos)
    {
        if(length(photos) > 0)
        {
            this.verifyImage = [...photos];
            this.verifiedBy = verifier;
            this.verified = true;
            return true;
        }
        else
            return false;
    }
}