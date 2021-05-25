import {React,useState,useEffect} from 'react'

const Home = () => {

    const [username, setusername] = useState("")
    const [show, setshow] = useState(false)

    const callHomepage= async()=>{
        
        try {

            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }

            })

            const data = await res.json();
            console.log(data)
            setusername(data.name);
            setshow(true)

            if (!data.response === 200) {
                throw new Error(res.error)
            }


        } catch (err) {
            console.log(err);



        }

    }





    useEffect(() => {
        callHomepage()
    }, [])


    return (
        <>
            <div className="homepage">
               
                        <h4 className="homeh4 text-capitalize font-weight-bold p-1 mb-1">welcome</h4>
                        <h1 className="username text-capitalize">{username}</h1>
                        <h2 className="parahome text-capitalize "> {show?"welcome back again":"web developer enthusiasts"}</h2>
                    </div>

               
               
        </>
    )
}

export default Home
