import axios from 'axios';
import OrderDetails from '../component/OrderDetails';
import PaymentGateWay from '../component/PaymentGateWay';
import { useEffect, useState } from 'react';

export default function UserHomeScreen() {

    const token = localStorage.getItem('token');

    const api = axios.create({
        baseURL:`http://localhost:3000`
    })

    const [data,setData]=useState<any>({});

    const fetchData=async ()=>{
        try {
            // const res=await api.get(`/api/v1/coffeShop/cart/find/${}/`);
            // setData(res.data)
        } catch (error){

        }
    }

    useEffect(() => {
        fetchData();
    }, [])
   
    return (
        <div className='w-screen h-[90vh] flex flex-row gap-5 justify-center items-center'>
            <OrderDetails ItemRow={data.itemList} /> 
            <PaymentGateWay/>
        </div>
    )
}
