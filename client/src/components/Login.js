import { React, useState,useContext } from 'react'
import loginpic from '../images/Login.png'
import { NavLink, useHistory } from 'react-router-dom'
import {userContext} from "../App"
const Login = () => {
     
    const {state,dispatch}=useContext(userContext);

    const history = useHistory();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const logmein = async (e) => {
        try {
            e.preventDefault();
            const res = await fetch("/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const data = await res.json();
            console.log(data);
            if (data.message === "user is present" ) {
                window.alert("registration successfull")
                history.push("/")
                dispatch({type:"USER",payload:true})
               
            }
            else {
                window.alert("invalid credential")
            }

        } catch (err) {
            console.log(err)
        }
    }
 
  




    return (
        <>
            <section className="login">
                <div className="container mt-5">
                    <div className="login-content center ">
                        <div className="login-img">
                            <figure>
                                <img src={loginpic} alt="login" />
                            </figure>
                            <NavLink to='/signup' className="text-capitalize mt-3 mb-5">create an account </NavLink>

                        </div>
                        <div className="login-form">
                            <h2 className="mb-4 mt-5 font-weight-bold">Login</h2>
                            <form method="POST" >


                                <div className="form-group mt-2">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email"></i>
                                    </label>
                                    <input type="email" name="email" id="email" value={email} onChange={(e) => { setemail(e.target.value) }} autoComplete='off' placeholder="Your email" />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type="password" name="password" id="password" value={password} onChange={(e) => { setpassword(e.target.value) }} autoComplete='off' placeholder="Your password" />
                                </div>
                                <button type="submit" onClick={logmein} className="btn btn-info mt-3 mb-4">Login</button>


                            </form>
                        </div>



                    </div>
                </div>
            </section>




        </>

    )
}

export default Login
