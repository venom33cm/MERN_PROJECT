import React, { useState } from 'react'
import registers from '../images/signup1.png'
import { NavLink, useHistory } from 'react-router-dom'
const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({ name: "", email: "", phone: "", profession: "", password: "", Cpassword: "" })
    let name, value;
    const handleinputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const PostData = async (e) => {
        try {
            e.preventDefault();
            const { name, email, phone, profession, password, Cpassword } = user;
            const res = await fetch("/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    name, email, phone, profession, password, Cpassword 
                })
            })
            const data = await res.json();
            console.log(data);
            if (data.error=== "user already exists"||data.error==="invalid entry"||!data) {
                window.alert("registration unsuccesfull or user already exists")
                console.log("invalid register")
            }
            else {
                window.alert("registration successfull")
                console.log(" registered!!")
                history.push("/login");
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content center ">
                        <div className="signup-form">
                            <h2 className="mb-4 mt-5 font-weight-bold">Sign-up</h2>
                            <form method="POST" >
                                <div className="form-group mt-2">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account"></i>
                                    </label>
                                    <input type="text" name="name" id="name" value={user.name} onChange={handleinputs} autoComplete='off' placeholder="Your name " />
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email"></i>
                                    </label>
                                    <input type="email" name="email" id="email" value={user.email} onChange={handleinputs} autoComplete='off' placeholder="Your email" />
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="phone">
                                        <i className="zmdi zmdi-phone-in-talk"></i>
                                    </label>
                                    <input type="number" name="phone" id="phone" value={user.phone} onChange={handleinputs} autoComplete='off' placeholder="Your phone-number " />
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="profession">
                                        <i className="zmdi zmdi-graduation-cap"></i>
                                    </label>
                                    <input type="text" name="profession" id="profession" value={user.profession} onChange={handleinputs} autoComplete='off' placeholder="your profession " />
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type="password" name="password" id="password" value={user.password} onChange={handleinputs} autoComplete='off' placeholder="Your password" />
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="Cpassword">
                                        <i className="zmdi zmdi-key"></i>
                                    </label>
                                    <input type="password" name="Cpassword" id="Cpassword" value={user.Cpassword} onChange={handleinputs} autoComplete='off' placeholder="confirm your password " />
                                </div>

                                <button type="submit" onClick={PostData} className="btn btn-info mt-3 mb-5">Submit</button>


                            </form>
                        </div>

                        <div className="signup-image">
                            <figure>
                                <img src={registers} alt="Sign-up" />
                            </figure>
                            <NavLink to="/login">Registered already</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup
