import axios from 'axios';
import UserOrder from '../component/UserOrderForm';
import { useEffect, useState } from 'react';

export default function UserHomeScreen() {
   
    const token = localStorage.getItem('token');

    const api = axios.create({
        baseURL:`http://localhost:3000`
    })

    const [data,setData]=useState([]);

    const fetchData=async ()=>{
        try {
            const res=await api.get("/api/v1/coffeShop/payment/getPayment");
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
