// Constains the values of all numbers we hash our passwords against
const HASHVALS = [[100207, 100799], [101021, 101749], [103787, 102149]];

class Account 
{
    /**
     * Creates a new Account object.
     * @constructor 
     * @param {string} emaildID 
     * @param {string} DOB Date of birth
     * @param {string} Name 
     */
    constructor(emaildID, DOB, Name)
    {
        /**
         * The email ID of the Account.
         * @private
         */
        this.emaildID = emaildID;
        /**
         * Date of Birth.
         * @private
         */
        this.DOB = DOB;
        /**
         * User Name
         * @private
         */
        this.Name = Name;
        /**
         * Boolean indicating whether account is disabled.
         * @private
         */
        this.isDisabled = true;
        /**
         * Password of the account.
         * @private
         */
        this.password = [[0, 0], [0, 0], [0, 0]];
    }
    /**
     * Returns the emailID of the account.
     * @returns {string}
     */
    getEmailID()
    {
        
    }
    /**
     * Returns the date of birth.
     * @returns {string}
     */
    getDOB()
    {
        
    } 
    /**
     * Set the date of birth.
     * @param {string} DOB 
     */
    setDOB(DOB)
    {
       
    }
    /**
     * Returns the name of the user.
     * @returns {string}
     */
    getName()
    {
        
    }
    /**
     * Set the name of the user.
     * @param {string} Name 
     */
    setName(Name)
    {
        
    }
    /**
     * Set account status as disabled.
     */
    disableAcc()
    {
        
    }
    /**
     * Change password linked to the account.
     * @param {string} password 
     */
    updatePassword(password)
    {
         // Password must be changed to un-disable account 
    }
    hash(password, divisor)
    {
        
    }
    /**
     * Method to check if password entered by user is correct.
     * Returns 1 if password is correct.
     * Returns 2 if password is disabled.
     * Returns 0 if password is incorrect.
     * @param {string} password 
     * @returns {number}
     */
    checkPassword(password)
    {
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