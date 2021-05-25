import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <div className="errorpage">
                <div className="container">
                    <div className="error-content center mt-5">
                        <img src="https://findicons.com/files/icons/1609/ose_png/256/error.png" className="mt-4" alt="wrong page" />
                        <div className="content-in-error">
                            <h1 className="text-capitalize p-2">oops you are in the wrong page !!!</h1>
                            <h2 className="text-capitalize mb-4 text-align-center">404 page not found click below to return to home page</h2>
                        </div>
                        <NavLink to="/" className="p-2 text-capitalize btn1 mb-5 font-weight-bold">back to home</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error
