import {useState} from "react";
import icon from "../assets/item_cover.jpg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface loginState{
    email:string,
    password:string
}

export default function Login() {

    const navigate = useNavigate();

    const api=axios.create({
        baseURL:`http://localhost:4000`
    })

    const [data,setData]=useState<loginState>({
        email:'',
        password:''
    });

    const handleLogin=async()=>{
        try {
            await api.get('/api/v1/user/login?email='+data.email+'&password='+data.password).then((res: {data: any}) => {
                const response = res.data;
               if(response.role){
                   localStorage.setItem('token', response.token);
                   navigate('/user');
               }
            });
        }catch (error){
            console.error('Error:', error);
        }

    }

    const handleInputOnChange=(event: { target: { name: any; value: any; }; })=>{
        const {name,value}=event.target;

        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="h-[100vh] w-[100vw] overflow-y-hidden overflow-x-hidden">
            <div className="h-[100vh] w-[130vw] transition-transform duration-1000 -translate-x-[30vw]">
                <div className="w-[100vw] h-[100%] inline-block">
                    <img src={icon} alt="" className="w-[100%] h-[100%]"/>
                </div>
                <div className="w-[30vw] h-[100%] relative inline-block border-black border-[1px]">
                    <div className="w-[100%] h-[30vh] mt-4 mb-4 pl-9 pr-9 absolute bottom-0 top-[25vh] right-0 mx-auto ">
                        <h2 className="text-3xl text-center font-semibold my-7">Sign In</h2>
                        <form className="flex flex-col gap-4">

                            <input type="email" value={data.email} onChange={handleInputOnChange} name='email'  placeholder="email" className="border p-3 rounded-lg" id='email'/>
                            <input type="password" value={data.password} onChange={handleInputOnChange} name='password' placeholder="password" className="border p-3 rounded-lg"
                                   id='password'/>

                            <button onClick={handleLogin} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign In</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}