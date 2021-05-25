import React, { createContext, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import Contact from './components/Contact'
import Error from './components/Error'
import Logout from './components/Logout'
import './App.css'
import { reducer, initialState } from "./reducer/UseReducer"

// creating context

export const userContext = createContext();

const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>


        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/Logout">
          <Logout />
        </Route>


        <Route path="">
          <Error />
        </Route>
      </Switch>
    </>
  )

}


const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)


  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </userContext.Provider>


    </>



  )
}

export default App
