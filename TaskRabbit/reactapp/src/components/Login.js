import React,{ useState }from 'react';
import {useNavigate} from'react-router-dom';
import axios from 'axios';


function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event)=>  {
        event.preventDefault();

        try{
            const response = await axios.post('http://localhost:5000/api/login',{email,password});
            navigate('/profile');  // after login  directly the profile page will be opened
            }
            catch(err){
                console.error("Login Failed", err);
            }
    }

    return (
        <form onSubmit={handleLogin}>
            <input type = "email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder= "Email Required"></input>
            <input type = "password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder= "PassWord Required"></input>
            <button type ="submit">Login</button>
        </form>
    );
}
export default Login
