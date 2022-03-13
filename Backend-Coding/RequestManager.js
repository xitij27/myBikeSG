const ps = require('prompt-sync');
const input = ps();
const Request = require('./Request.js');
const AddRacks = require('./AddRacks.js');
const FindRacks = require('./FindRacks.js');
const FindRoute = require('./FindRoute.js');
const FindRepairShop = require('./FindRepairShop.js');
class ReqMgr
{
    static currReqs = new Array();
    static reqIDCounter = 1;

    constructor()
    {
    }

    static createFindRacks(user_email, initialLocation)
    {
        ReqMgr.currReqs.push(new FindRacks(user_email,ReqMgr.reqIDCounter,initialLocation));
        ReqMgr.reqIDCounter += 1;
    }
    static createFindRepairShop(user_email, initialLocation)
    {
        ReqMgr.currReqs.push(new FindRepairShop(user_email,ReqMgr.reqIDCounter,initialLocation));
        ReqMgr.reqIDCounter += 1;
    }
    static createFindRoute(user_email, initialLocation, destination)
    {
        ReqMgr.currReqs.push(new FindRoute(user_email,ReqMgr.reqIDCounter,initialLocation, destination));
        ReqMgr.reqIDCounter += 1;
    }
    static createAddRacks(user_email, initialLocation, photos)
    {
        ReqMgr.currReqs.push(new AddRacks(user_email, ReqMgr.reqIDCounter, initialLocation, photos));
        ReqMgr.reqIDCounter += 1;
    }
    static serviceRequest()
    {
        while(ReqMgr.currReqs.length > 0)
        {
            let req = ReqMgr.currReqs.shift()
            req.serviceRequest();
        }
    }
}

ReqMgr.createFindRacks("H","NTU");
ReqMgr.createFindRepairShop("H","NTU");
ReqMgr.createFindRoute("H", "NTU", "NUS");
ReqMgr.createAddRacks("H","NTU","NUS");
ReqMgr.serviceRequest();