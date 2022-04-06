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

### Add Repair Shops
POST http://localhost:3000/api/addRepairShops
Body = {  
	"shop_id": 1,  
	"contact": "scared2compile@gmail.com",  
	"lat": 1.3476840889006585,   
	"long": 103.68160813919555,  
	"name": "Item exchange try get a bike part lol!"  
}  
Returns "Already in Database", "true", "false", and "Database Error".  
	
### Repair Shops
GET http://localhost:3000/api/repairShops  
Returns a json file with all the repair shops in the database.  
	
### Add Racks
POST http://localhost:3000/api/addRacks
Body = {  
	"rack_id": 1,  
	"user_email": "scared2compile@gmail.com",  
	"lat": 1.3476840889006585,   
	"long": 103.68160813919555,  
	"verified": "true"  
}  
Returns "Already in Database", "true", "false", and "Database Error".  
	
### Racks
GET http://localhost:3000/api/bikeRacks  
Returns a json file with all the bike racks in the database.  

## FrontEnd 
App is inside `/mybikesg`, change directory to `/mybikesg` then run `npm start` to start the app in your local host

Get Google Maps API key following https://developers.google.com/maps/documentation/javascript/get-api-key , then create a `.env.local` file locally **OUTSIDE OF `/src`** and enter

`REACT_APP_GOOGLE_MAPS_API_KEY = "{YOUR_API_KEY}" (without the curly braces)`

I think you need to set up a billing account because I don't think it's free to use google maps API XD but they give $300 as a 'sign up bonus' which should be enough to last till presentation week
