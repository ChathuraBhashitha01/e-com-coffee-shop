import axios from 'axios';
import UserOrder from '../component/UserOrderForm';
import { useEffect, useState } from 'react';
import { parseJwt } from "../utils/UserDetails";

export default function UserHomeScreen() {
   
    const token:any = sessionStorage.getItem('token');
    const userDetails = parseJwt(token);
    const username = userDetails.userName
    console.log(username)

    const api = axios.create({
        baseURL:`http://localhost:3000`
    })

    const [data,setData]=useState([]);

    const fetchData=async ()=>{
        try {
            const res=await api.get(`/api/v1/coffeShop/payment/${username}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setData(res.data)
        } catch (error){

        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='w-screen h-[90vh] flex flex-col justify-center items-center'>
            <UserOrder data={data}/>
        </div>
    )
}
