import React from "react";
import Sidebar from "../Components/Sidebar";
import SignupForm from "../Components/SignupForm";


const Signup = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar/>
            <SignupForm/>
        </div>
    )
}

export default Signup;