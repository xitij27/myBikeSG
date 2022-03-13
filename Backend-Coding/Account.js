// Constains the values of all numbers we hash our passwords against
const HASHVALS = [[100207, 100799], [101021, 101749], [103787, 102149]];

class Account 
{
    constructor(emaildID, DOB, Name)
    {
        this.emaildID = emaildID;
        this.DOB = DOB;
        this.Name = Name;
        this.isDisabled = true;
        this.password = [[0, 0], [0, 0], [0, 0]];
    }
    getEmailID()
    {
        return this.emaildID;
    }
    getDOB()
    {
        return this.DOB;
    } 
    setDOB(DOB)
    {
        this.DOB = DOB;
    }
    getName()
    {
        return this.Name;
    }
    setName(Name)
    {
        this.Name = Name;
    }
    disableAcc()
    {
        this.isDisabled = true;
    }
    updatePassword(password)
    {
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 2; j++)
            {
                this.password[i][j] = this.hash(password, HASHVALS[i][j]);
            }
        }
        this.isDisabled = false; // Password must be changed to un-disable account 
    }
    hash(password, divisor)
    {
        var number = password.charCodeAt(0) % divisor;
        for (var i = 1; i < password.length; i++) 
        {
            number = (256*number) + password.charCodeAt(i);
            number %= divisor;
        }
        return number;
    }
    checkPassword(password)
    {
        /**
         * Returns 1 is password is correct
         * Returns 2 if account is disabled
         * Returns 0 if password is incorrect
         * @param: {String} password The password to check
         */
        if(this.isDisabled)
        {
            return 2;
        }
        let no = Math.floor(3*Math.random());
        for (var j = 0; j < 2; j++)
        {
            if(this.hash(password, HASHVALS[no][j]) != this.password[no][j])
            {
                return 0;
            }
        }
        return 1;
    }
}
module.exports = Account;