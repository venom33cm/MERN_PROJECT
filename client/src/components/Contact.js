import { React, useState, useEffect } from 'react'
import mobipic from '../images/img1.jpg'

import mobipic2 from '../images/img3.jpg'
const Contact = () => {

    const [user, setuser] = useState({ name: "", email: "", phone: "", message: "" })

    const callContactpage = async () => {
        try {

            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }

            })

            const data = await res.json();
            console.log(data)
            setuser({ ...user, name: data.name, email: data.email, phone: data.phone });

            if (!data.response === 200) {
                throw new Error(res.error)
            }


        } catch (err) {
            console.log(err);



        }

    }

    let name, value
    const HandleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setuser({ ...user, [name]: value })

    }

    const PostContact = async (e) => {
        try {
            e.preventDefault();
            const { name, email, phone, message } = user
            const res = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name:name, email:email, phone:phone, message:message
                })
            })
            const data = await res.json();
            if (!data) {
                throw new Error("message is not sent")
            }
            else{
                window.alert("message is sent successfully")
                setuser({...user,message:""})
            }

        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        callContactpage()
    }, [])


    return (
        <>
            <div className="contact-top">
                <div className="container-fluid mt-4">
                    <div className="row">
                        <div className="col-lg-10 offset-1 contact-top-content">

                            <div className="boxes d-flex ">
                                <img className="img1" src={mobipic} alt="phone" />
                                <div className="datas">
                                    <div className="data-name pt-1 font-weight-bold text-capitalize">phone</div>
                                    <div className="data-entry pb-1">+91879879997</div>
                                </div>
                            </div>
                            <div className="boxes d-flex ">
                                <img className="img1" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/email-2447003-2054210.png" alt="phone" />
                                <div className="datas">
                                    <div className="data-name pt-1 font-weight-bold text-capitalize">Email</div>
                                    <div className="data-entry pb-1">cmyash36@gmail.com</div>
                                </div>
                            </div>
                            <div className="boxes d-flex ">
                                <img className="img1" src={mobipic2} alt="phone" />
                                <div className="datas">
                                    <div className="data-name pt-1 font-weight-bold text-capitalize">name</div>
                                    <div className="data-entry pb-1">yashwant c m</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container">
                <div className="contact-content center mt-3">
                    <h2 className="font-weight-bold mt-4 pt-4 mb-1 ml-5 text-capitalize">get in touch</h2>
                    <form method="POST">

                        <div className="form d-flex">
                            <div className=" box   mb-3 ">
                                <input type="text" name="name" id="name" onChange={HandleInputs} autoComplete='off' value={user.name} placeholder="Your name " />

                            </div>
                            <div className=" box   mb-3 ">
                                <input type="email" name="email" id="email " onChange={HandleInputs} autoComplete='off' value={user.email} placeholder="Your email" />
                            </div>
                            <div className=" box   mb-3 ">
                                <input type="number" name="phone" id="phone " onChange={HandleInputs} autoComplete='off' value={user.phone} placeholder="Your phone_No. " />
                            </div>
                        </div>

                        <div className="txtbtn d-flex">

                            <textarea className=" center mb-2" name="message" id="message" onChange={HandleInputs} value={user.message} placeholder="message" cols="107" rows="7"></textarea>
                        </div>
                        <div className="btn d-flex">
                            <button type="submit" onClick={PostContact} className="btn ml-5 btn-info mt-1 mb-3 ">Send Message...</button>
                        </div>
                    </form>


                </div>
            </div>







        </>
    )
}

export default Contact
