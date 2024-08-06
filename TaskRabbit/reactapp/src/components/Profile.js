import React,{ useState,useEffect }from 'react';
import {Link} from'react-router-dom';
import axios from 'axios';

function Profile(){
const [profile,setProfile] = useState(null);

useEffect(()=>{
    const fetchProfile=async() => {
        try{
            const response =await axios.get('http://localhost:5000/api/profile',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}` //using the token for auth
                },
            });
            setProfile(response.data);
        }
        catch(error){
            console.error("Error fetching profile",error);
        }
    };


    fetchProfile()
},[]);

return (
    <div>
        <h1> Profile Page </h1>
        {
            profile ? (
                <div>
                    <h2>{profile.username}</h2>
                    <p>{profile.email}</p>
                    {profile.imageURL ? (<img src={profile.imageURL} alt ="Profile Pic" style={{width:'150px','height':'150px', borderRadius:'50%'}}></img>
                    ):(<p>No profile Pic found</p>)}
                    <br />
                    <Link to="/TaslManager">
                    <button>Goto  Task Manager</button></Link>
                </div>
            ):(
                <p>Loading...</p>
            )
        }
    </div>
);
}

export default Profile;