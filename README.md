# myBikeSG

## API Calls (How to access backend from frontend)
### Login
POST http://localhost:3000/api/login (For now)  
Body = {  
	"email": "<email>",  
	"password" : "<password>"  
}  
Returns true if password is correct and false if incorrect. Can also return Database Error.  
  
### SignUp  
POST http://localhost:3000/api/signUp (For now)  
Body = {  
	"email": ,    
	"password" : ,  
	"otp": ,  
	"dob": ,  
	"name":   
}  
Returns "Email already in use", "true", "false", and "Database Error".  
Note: Call sendEmail before signUp to send OTP else we get an error 500  
### resetPassword  
POST http://localhost:3000/api/resetPassword (For now)  
Body = {    
	"email": ,      
	"password" : ,    
	"otp":     
}    
Returns "Account does not exist", "true", "false", and "Database Error".  
Note: Call sendOTP before resetPassword to send OTP else we get an error 500  
  
### sendOTP
GET http://localhost:3000/api/sendOTP/:email  
Returns SENT:   


App is inside `/mybikesg`, change directory to `/mybikesg` then run `npm start` to start the app in your local host

Get Google Maps API key following https://developers.google.com/maps/documentation/javascript/get-api-key , then create a `.env.local` file locally **OUTSIDE OF `/src`** and enter

`REACT_APP_GOOGLE_MAPS_API_KEY = "{YOUR_API_KEY}" (without the curly braces)`

I think you need to set up a billing account because I don't think it's free to use google maps API XD but they give $300 as a 'sign up bonus' which should be enough to last till presentation week
