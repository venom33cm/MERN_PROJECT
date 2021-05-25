const express = require('express')
const router = express.Router()        //router gets all the rights to use methods inside express.ROuter()
const bcrypt = require("bcryptjs")        //bcrypt generally used for hashing password important package
const jwt = require('jsonwebtoken')              //jwt is used for getting tokens after login by user 
const User = require("../db/modals/userSchema")     //here we are getting the user modals for saving it in database 
const Authenticate = require("../middleware/authenticate")
//and also many other middleware including many function such as generateauth() and pre() function which will see further

// router.get("/", (req, res) => {
//     res.send("hello mothafucka surprise ") //same as app.get nothing different
// })

let token;       //declaring  token ,"let" is used because the token changes after every login of user


//*********************HERE WE USE HELP OF POSTMAN REFER MY POSTMAN FOR REQUEST SENT AND RESPONSE**********************/

router.post("/register", async (req, res) => {   //here we are sending post req to the router /register it is async fn so need to surround in try-catch block
    try {
        console.log(req.body)   //we always get data from body part so we use req.body and consoling it 

        const { name, email, phone, profession, password, Cpassword } = req.body
        //in the above statement  we are doing object destructuring .we have 6 fields from req.body which is 
        //assigned to all the six field i.e name, email etc. **see postman**

        if (!name || !email || !phone || !profession || !password || !Cpassword) { //checking all fields are filled .if not 
            return res.status(422).json({ error: "invalid entry" }) //returned with error response from fn
        }
        else if (password != Cpassword) {  //checking if password and cpassword are same if not returned with custom error msg
            return res.status(422).json({ error: "invalid entry" })
        }
        else {              //if everything is fine we proceed further 


            const userexist = await User.findOne({ email: email }) //we check in the database if the email already present or not
            if (userexist) {    //if it exist we return from function after displaying the below json error msg 
                return res.status(422).json({ error: "user already exists" })
            }
            //*************** MAIN PART FOR SAVING IN DATABASE*****************

            //if no email existed before we create a new document named  user and whatever the data we got in "line 20" 
            const user = new User({ name, email, phone, profession, password, Cpassword })//we write it inside the USER modal which was imported in "line 5"
            const register = await user.save() //finally we are saving the document user in the database which returns promise so we use await
            if (register) {  //if we get positive response in register responding with the  below json msg with status code 201
                res.status(201).json({ message: "registered successfully " })
            }
            else {        //if not displaying error json method 
                res.status(422).json({ error: "invalid entry" })
            }

        }
    } catch (err) {  //in catch if there is error in above fn which cant be handled is displayed 
        console.log(err)
    }
})

router.post("/login", async (req, res) => { //here there is a call back async function and we are giving a post req to /login route 
    try {
        console.log(req.body)  //as we have seen above we get the resp inform of req.body 
        const { email, password } = req.body  //same as above object destructering 
        if (!email || !password) {
            res.status(422).json({ error: "invalid register " }) //eerror msg if pass or email not filled 
        }
        const userLogin = await User.findOne({ email: email }) //finding the email/document of the email typed  in the database using USer model
        if (userLogin) {                  //if the email is found then we proceed 

            const verify = await bcrypt.compare(password, userLogin.password);  //bcrypt.compare and its response is stored in verify

            token = await userLogin.generateAuthToken() //here we are basically getting the token for every login .the generateAuthToken is defined in userSchema.js chckout to see how token is generated
            res.cookie("jwtoken", token, {    //we create a cookie by name jwtoken which holds the uniquely generated token  inside it
                expires: new Date(Date.now() + 2000000), //expiry of the cookie is passed as object using new date constructor 
                httpOnly: true   //the cookie is generated only when the request is not secured for now (testing purpose)
            })
            console.log(token)  //consoling the generated token to see (testing )

            //below we are comparing the password which is entered with that of database hashed password using 

            if (verify) {  //if there is positive verification the below respone in json type is given as response 

                token = await userLogin.generateAuthToken() //here we are basically getting the token for every login .the generateAuthToken is defined in userSchema.js chckout to see how token is generated
                res.cookie("jwtoken", token, {    //we create a cookie by name jwtoken which holds the uniquely generated token  inside it
                    expires: new Date(Date.now() + 200000), //expiry of the cookie is passed as object using new date constructor 
                    httpOnly: true   //the cookie is generated only when the request is not secured for now (testing purpose)
                })
                console.log(token)  //consoling the generated token to see (testing )

                res.status(201).json({ message: "user is present" })
            } else {      //else we put invalid credential as response 
                res.status(400).json({ error: "invalid credentials" })
            }
        }
        else {   //if email itself not found we put user not found ,but remember here aklso you need to put invalid 
            res.status(400).json({ error: "user not prsesent" })//credential as error response for preventing hacking 
        }
    } catch (err) {
        console.log(err) //in catch if there is error in above fn which cant be handled is displayed 
    }
})

router.get("/about", Authenticate, (req, res) => {
    console.log("hello i m about surprised!!")
    res.send(req.rootUser)
})

router.get("/getdata", Authenticate, (req, res) => {
    console.log("hello i m about surprised!!")
    res.send(req.rootUser)
})

router.post("/contact", Authenticate, async (req, res) => {

    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message)
        return res.json({ error: "message not filled or sent" })

    const userdata = await User.findOne({ _id: req.id })
    if (userdata) {
        const usermessage = await userdata.addMessage(name, email, phone, message)
        await userdata.save();
        res.status(201).json({ message: "message successfully sent" })
    }

})

router.get("/logout", (req, res) => {
    console.log("you have loged out")
    res.clearCookie("jwtoken")
    res.status(200).send("you logged out successfully")
})


module.exports = router //finally exporting this router to be used as middleware in app.js 