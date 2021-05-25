const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        Default: Date.now

    },
    messages: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }

    ],

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})

//hashing the password
userSchema.pre('save', async function (next) {
    console.log('hashing password')
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.Cpassword = await bcrypt.hash(this.Cpassword, 12)
        next();
    }
})

//adding tokens in schema
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token
    } catch (err) {
        console.log(err)
    }

}

//adding message section in schema

userSchema.methods.addMessage = async function(name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name: name, email: email, phone: phone, message: message })
        await this.save();
        return this.messages
    } catch (err) {
        console.log(err);
    }
}







const User = new mongoose.model("USER", userSchema);
module.exports = User;