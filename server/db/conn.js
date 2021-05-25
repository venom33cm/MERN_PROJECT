const mongoose=require('mongoose')    //we are importing mongoose package here through mongoose 
const DB=process.env.DATABASE  //here we are assigning DB with my database URL to make it safe i have used ".env" to store the URL by name DATABASE
mongoose.connect(DB,{      //mongoose method connect is used to establish connection with my database it returns promise
    useCreateIndex:true,
    useNewUrlParser:true,     //these are some  statements needed to be written to handle deprecated warnings  
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connection with database successfull") // if accepts promise logs connection succesfull
}).catch((err)=>{
    console.log("there is an err: "+err) // if rejects due to error ,the error is consoled 
})