class Verifier_Acc extends Account
{
    constructor(racksVerified = [])
    {
        this.racksVerified = racksVerified;
        super(emailId,DOB,Name);
    }
    
    addRack(rackNo) 
    {
        this.racksVerified.push(rackNo);
    }

    removeRack(rackNo) 
    {
        const index = racksVerified.indexOf(5);
        if (index > -1) {
            racksVerified.splice(index, 1);
          }
    }

    displayRacks()
    {
        racksVerified.forEach(function(entry) {
            console.log(entry);
          });
    }
}