import { React, useContext,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom'
import { userContext } from "../App"
const Navbar = () => {
  let { state, dispatch } = useContext(userContext);


  const Nav = () => {

    useEffect(()=>{
      localStorage.setItem("state",JSON.stringify(state))
      state =JSON.parse(localStorage.getItem("state"));
    },[])
    
   



    


    if (state) {
      return (
        <>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">Contact-Us</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/Logout">Logout</NavLink>
          </li>
        </>
      )

    }
    else {
      return (
        <>

          <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">Contact-Us</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">Signup</NavLink>
          </li>

        </>
      )
    }
  }
  
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">CODE DEV</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <Nav />

          </ul>
        </div>
      </nav>

    </>
  )
}

export default Navbar
