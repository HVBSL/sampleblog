import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";

const LogInPage = () =>{
    const [emailId,setEmailId]=useState('');
    const [password, setPassword]=useState('');
    const [error, setError]= useState('');
    const navigate = useNavigate()

    const login =async()=>{
        try{
            await signInWithEmailAndPassword(getAuth(),emailId,password);
            navigate('/articles')
        }
        catch(e){
            setError(e.message)
        }
            
    }

    

    return  (
        <>
            <h1>Login Page</h1>
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
            <button onClick={login}>Login</button>
            <Link to="/signup">Don't have a Account, Create a New One.</Link>
        </>
    )
}

export default LogInPage;