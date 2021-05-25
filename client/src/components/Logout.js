import {React,useEffect,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {userContext} from "../App"

const Logout = () => {

    const {state,dispatch}=useContext(userContext);
    

    const history = useHistory()
    useEffect(() => {

        fetch("/Logout",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            Credential:"include"
        }).then((res)=>{
            dispatch({type:"USER",payload:false})
            if(res.status!==200){
                throw new Error("log out not successfull")
            }
            else{
                history.push("/login")

            }
        }).catch(err=>{
            console.log(err)
        })
        
    },[]);



    return (
        <>
            <h1>this is logout page</h1>
        </>
    )
}

export default Logout
