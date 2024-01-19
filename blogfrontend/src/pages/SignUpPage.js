import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const SignUpPage = () =>{
    const [emailId,setEmailId]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const [error, setError]= useState('');
    const navigate = useNavigate()

    const signUp =async()=>{
        try {
            if (password !== confirmPassword) {
                setError('Password and confirm password do not match');
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), emailId, password);
            navigate('/articles');
        } 
        catch (e) {
            setError(e.message)
        }
            
    }

    

    return  (
        <>
            <h1>Sign Up Page</h1>
                {error&&<p className="error">{error}</p>}
                <input 
                    placeholder="Enter your EmailID"
                    type="text"
                    value={emailId}
                    onChange={e=>setEmailId(e.target.value)} />
                <input 
                    placeholder="Enter Password"
                    type="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)} />
                <input 
                    placeholder="Enter Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={e=>setConfirmPassword(e.target.value)} />
            <button onClick={signUp}>Login</button>
            <Link to="/login">Already have a Account, Login.</Link>
        </>
    )
}

export default SignUpPage;