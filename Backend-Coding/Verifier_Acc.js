class Verifier_Acc extends Account
{
    constructor(emailId, DOB, Name, racksVerified = [])
    {
        this.DOB = DOB;
        this.Name = Name;
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