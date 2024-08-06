import React,{ useState }from 'react';
import {useNavigate} from'react-router-dom';
import axios from 'axios';


function Register(){
    const [formData, setFormData] = useState(new FormData());
    const navigate= useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await axios.post('http://localhost:5000/api/register', formData,{
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });

            console.log(response.data);
            navigate('/login'); //after register  go to login

        }catch(err){
            console.error("There was an Error", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type = "username" name ="username" placeholder = "User name" onChange={(e)=> setFormData({...formData,username:e.target.value})}></input>
            <input type = "email" name ="email" placeholder = "Email" onChange={(e)=> setFormData({...formData,email:e.target.value})}></input>
            <input type = "password" name ="password" placeholder = "Password" onChange={(e)=> setFormData({...formData,password:e.target.value})}></input>
            <input type = "file" name ="image" placeholder = "Password" onChange={(e)=> setFormData({...formData,image:e.target.files[0]})}></input>

            <button type="submit"> Register </button>
        </form>
    )
}

export default Register;
