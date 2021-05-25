const express = require("express"); //requiring express for routing
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv"); //requiring dotenv for secret urls and keys to make it hidden
dotenv.config({ path: "./config.env" }); //setting the path of dotenv file
const app = express(); //declaring app as an object of express() to use routing and other feature in express

//we use app.use method to generally adda middleware or to accept any responses (tip)

require("./db/conn"); //its a middleware for database connection so we require it through the file specified

app.use(express.json()); //this is generally to accept all json type  response from server

app.use(cookieparser());
// const User=require("./db/modals/userSchema")
app.use(require("./router/auth")); //this is another important middleware we setup a router for post request mainly

const middleware = (req, res, next) => {
  console.log("i m middleman you need to check me before going"); //this is basically general example
  next(); //of how middleware is used so we defined middleware function here
};
const PORT = process.env.PORT || 5000; //keeping the port number secret and assigning to port by using .env file

/*app.get("/",(req,res)=>{
    res.send("hello my friends ")       //testing for get request if everything is fine or not
})

app.get("/about",middleware,(req,res)=>{
    // res.cookie("testing","thapa sir")         //getting about us page and adding middleware function like basically
    console.log("i finally passed middleware");    //calling it if middleware is approved or done the below msg is consoled
    res.send("i m about page")                    //this occurs only when we visit about us page
})

******************for production step 3 in heroku****************************
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}*/

app.listen(PORT, () => {
  //another important method "app.listen" it generally makes connection with
  console.log(`connected to port:${PORT}`); //our local host ports
});

// "proxy": "http://localhost:5000/",

/* *********WRITE THE BELOW ONE IN PACKAGE.JSON INSIDE SCRIPTS*************
"start":"node app.js",
 "heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"*/
