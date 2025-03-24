import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Logo from "../assets/login_cover.jpg";

export default function Signup() {
    const [formData,setFormData]= useState({
        username:'',
        name:'',
        password:''
    });
    const [loading, setLoading]=useState(false);
    const navigate=useNavigate();

    const api=axios.create({
        baseURL:`http://localhost:3000`
    })

    const handleChange=(e: { target: { id: any; value: any; }; }) =>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value,
        });
    }

    const handleBackButton =(()=>{
        navigate("/")
    })

    const handleSignUp=async()=>{
        try {
            const response = await api.post('/api/v1/coffeShop/auth/signin',{
                "userName" :formData.username,
                "name": formData.name,
                "role": "USER",
                "password": formData.password
            })

            if (response.data.role === "USER") {
                sessionStorage.setItem("token", response.data.accessToken);
                navigate("/user");
            }
        }catch (error){
            console.error('Error:', error);
        }

    }   

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center  bg-opacity-50 z-50" style={{ backgroundImage: `url(${Logo})` }}>
        <div className="w-[30%] min-h-[50%] ml-10 flex flex-col justify-evenly items-center rounded-2xl shadow-lg" >
                <h2 className="text-white text-center font-serif font-bold">Sign In</h2>
                <form className="w-[90%] min-h-[70%] flex flex-col gap-3">

                    <input type="text" placeholder="username" className="w-[90%] h-[40px] text-white border-1 border-white rounded-xs" id='username'
                           onChange={handleChange}/>
                    <input type="name" placeholder="name" className="w-[90%] h-[40px] text-white border-1 border-white rounded-xs" id='name'
                           onChange={handleChange}/>
                    <input type="password" placeholder="password" className="w-[90%] h-[40px] text-white border-1 border-white rounded-xs"
                           id='password' onChange={handleChange}/>
                    <button onClick={handleSignUp} disabled={loading}
                            className="bg-slate-700  mt-10  w-[90%] h-[40px] text-white font-serif shadow-lg rounded-lg">
                        {loading ? 'loading...' : 'SIGN UP'}
                    </button>
                    <button onClick={handleBackButton} className="bg-slate-700  mt-10  w-[90%] h-[40px] text-white font-serif shadow-lg rounded-lg">SIGN IN</button>
                </form>
            </div>
        </div>
    );
};