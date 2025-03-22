import {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/login_cover.jpg";

interface loginState{
    username:string,
    password:string
}

export default function Login() {

    const navigate = useNavigate();

    const api=axios.create({
        baseURL:`http://localhost:3000`
    })

    const [formData,setFormData]=useState<loginState>({
        username:'',
        password:''
    });

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page reload
    
        try {
          const response = await api.get(`/api/v1/coffeShop/user/login/${formData.username}/${formData.password}`);
        
          if (response.data.role === "ADMIN") {
            localStorage.setItem("token", response.data.token);
            navigate("/admin");
          } else if (response.data.role === "USER") {
            localStorage.setItem("token", response.data.token);
            navigate("/user");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

    const handleSignUp=(()=>{
        navigate("/signup")
    })

    const handleInputOnChange=(event: { target: { name: any; value: any; }; })=>{
        const {name,value}=event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center  bg-opacity-50 z-50" style={{ backgroundImage: `url(${Logo})` }}>
            <div className="w-[30%] min-h-[50%] ml-10 flex flex-col justify-evenly items-center rounded-2xl shadow-lg" >
                    <h2 className="text-white text-center font-serif font-bold">Sign In</h2>
                    <form className="w-[90%] min-h-[70%] flex flex-col gap-3">

                        <input type="text" value={formData.username} onChange={handleInputOnChange} name='username'  placeholder="username" className=" w-[90%] h-[40px] text-white border-1 border-white rounded-xs" id='username'/>
                        <input type="password" value={formData.password} onChange={handleInputOnChange} name='password' placeholder="password" className=" w-[90%] h-[40px] border-1 border-white  text-white rounded-xs"
                                id='password'/>

                        <button onClick={handleLogin} className="bg-slate-700  mt-10  w-[90%] h-[40px] text-white font-serif shadow-lg rounded-lg">SIGN IN</button>
                        <button onClick={handleSignUp} className="bg-slate-700  w-[90%] h-[40px] text-white font-serif shadow-lg rounded-lg">SIGN UP</button>
                    </form>
            </div>
        </div>
    );

}