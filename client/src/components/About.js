import { React, useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom'
function About() {
    const [user, setuser] = useState({ name: "", email: "", phone: "", profession: "" })
      
    const history = useHistory()
    const callaboutpage = async () => {
        try {

            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            setuser({ ...user, name: data.name, email: data.email, phone: data.phone ,profession:data.profession});

            if (!data.response === 200) {
                throw new Error(res.error)
            }


        } catch (err) {
            history.push("/login")
            console.log(err);


        }

    }

    useEffect(() => {
        callaboutpage()
    }, [])

    return (
        <>
            <div className="about">
                <div className="container mt-5">
                    <div className="about-content center mb-4">
                        <div className="img m-auto p-2">
                            <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="profile" />
                        </div>
                        <div className="profile m-auto">
                            <form >

                            <div className="form-group mt-2">
                                    <label htmlFor="name">NAME:
                                    </label>
                                    <input type="text" name="name" id="name" className="text-capitalize font-weight-bold" value={user.name}  />
                            </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="email">EMAIL:
                                    </label>
                                    <input type="email" name="email" className="font-weight-bold" id="email"  value={user.email}  />
                               </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="phone">PHONE:
                                    </label>
                                    <input type="number" name="phone" className="font-weight-bold" id="phone"  value={user.phone}  />
                              </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="profession">PROFESSION:
                                    </label>
                                    <input type="text" name="profession" className="text-capitalize font-weight-bold" id="profession"  value={user.profession}    />
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default About