import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const Signup = () => {
    const [formData,setFormData]= useState({});
    const [loading, setLoading]=useState(false);
    const navigate=useNavigate();

    const handleChange=(e: { target: { id: any; value: any; }; }) =>{
        setFormData({
            ...formData, //spread operator
            [e.target.id]:e.target.value,
        });
    }

    const handleAuth=async (e: { preventDefault: () => void; })=>{
        e.preventDefault();

    };

    return (
        <div className="w-[30vw] h-[60%] relative left-[25vw] inline-block border-black border-[1px] mt-28">
            <div className="w-[100%] mt-4 mb-4 pl-9 pr-9 absolute bottom-0 top-3 right-0 mx-auto ">
                <h1 className="text-3xl text-center font-semibold my-7">ADD USER</h1>
                <form onSubmit={handleAuth} className="flex flex-col gap-4">
                    <input type="text" placeholder="username" className="border p-3 rounded-lg" id='username'
                           onChange={handleChange}/>
                    <input type="email" placeholder="email" className="border p-3 rounded-lg" id='email'
                           onChange={handleChange}/>
                    <input type="password" placeholder="password" className="border p-3 rounded-lg"
                           id='password' onChange={handleChange}/>
                    <button disabled={loading}
                            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                        {loading ? 'loading...' : 'ADD USERS'}
                    </button>
                </form>
            </div>
        </div>
    );
};