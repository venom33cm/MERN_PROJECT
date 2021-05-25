const jwt = require("jsonwebtoken")
const User = require("../db/modals/userSchema")


const Authenticate = async (req, res, next) => {

    try {
        const token = req.cookies.jwtoken;
        const verification = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await User.findOne({ _id: verification._id , "tokens.token": token })
        if (!rootUser) {
            throw new Error("user not found ");
        }
        req.rootUser = rootUser;
        req.token = token;
        req.id = rootUser._id;

        next();
    } catch (err) {
        res.status(401).send("NOT AUTHENTICATED")
        console.log(err);
    }
}

module.exports = Authenticate;