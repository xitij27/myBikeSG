const ps = require('prompt-sync');
const input = ps();
const Request = require('./Request.js');
const AddRacks = require('./AddRacks.js');
const FindRacks = require('./FindRacks.js');
const FindRoute = require('./FindRoute.js');
const FindRepairShop = require('./FindRepairShop.js');
/**
 * @class
 * @classdesc Control class containing all methods related to managing requests.
 */
class ReqMgr
{
    /**
     * currReqs is a queue for all the requests.
     * @static
     * @private
     */
    static currReqs = new Array();
    /**
     * Keeps track of the request ID's.
     * @static
     * @private
     */
    static reqIDCounter = 1;

    constructor()
    {
    }
    /**
     * Calls the findracks constructor, adds the request to the queue.
     * @static
     * @param {string} user_email 
     * @param {*} initialLocation 
     */

    static createFindRacks(user_email, initialLocation)
    {
        
    }
    /**
     * Calls the findrepairshop constructor, add the request to the queue.
     * @static
     * @param {string} user_email 
     * @param {*} initialLocation 
     */
    static createFindRepairShop(user_email, initialLocation)
    {
        
    }
    /**
     * Calls the findroute constructor, adds the request to the queue.
     * @static
     * @param {string} user_email 
     * @param {*} initialLocation 
     * @param {*} destination 
     */
    static createFindRoute(user_email, initialLocation, destination)
    {
        
    }
    /**
     * Calls the addracks constructor, add the request to the queue.
     * @static
     * @param {string} user_email 
     * @param {*} initialLocation 
     * @param {*} photos 
     */
    static createAddRacks(user_email, initialLocation, photos)
    {
        
    }
    /**
     * Calls the servicerequest method and removes request from queue.
     * @static
     */
    static serviceRequest()
    {
       
    }
}

