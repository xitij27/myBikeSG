class AddRacks extends Request
{
    /**
     * Create a request for adding racks to the LTA dataset.
     * @constructor
     * @extends Request
     * @param {string} user 
     * @param {number} requestID 
     * @param {*} initialLocation 
     * @param {*} photos 
     */
    constructor(user, requestID, initialLocation, photos)
    {
        super(user, initialLocation, requestID);
        this.photos = [...photos];
        // Source: https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
        this.verified = false;
        this.verifiedBy = null;
        this.verifyImage = null;
    }
    /**
     * Fulfill the addracks request.
     */
    serviceRequest()
    {
        // TODO fill this with code
    }
    /**
     * Sets the verifier information for the newly added rack.
     * @param {string} verifier 
     * @param {*} photos 
     * @returns {boolean}
     */
    verifyRack(verifier, photos)
    {
        
    }
}