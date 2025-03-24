import axios from 'axios';
import OrderDetails from '../component/OrderDetails';
import PaymentGateWay from '../component/PaymentGateWay';
import { useEffect, useState } from 'react'
import { parseJwt } from "../utils/UserDetails";

export default function UserHomeScreen() {

    const token:any = sessionStorage.getItem('token');
    const userDetails = parseJwt(token);
    const username = userDetails.userName

    // const decoded: { username?: string } = jwtDecode(token);
    // const username = decoded.username;

    const api = axios.create({
        baseURL:`http://localhost:3000`
    })

    const [data,setData]=useState<any>([]);

    const fetchData=async ()=>{
        try {
            const res=await api.get(`/api/v1/coffeShop/cart/find/${username}/`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setData(res.data)
        } catch (error){

        }
    }

    const handleOnDelete = async (code:string)=>{
        try {
            await api.delete(`/api/v1/coffeShop/cart/${code}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            fetchData();
        }catch (error){
            console.error('Error:', error);
        }
    }

    const handleMakePayment = async (details:any)=>{
        try {
            await api.post('/api/v1/coffeShop/payment/',
            {
                "paymentID": details.paymentID,
                "userName": username,
                "date": details.date,
                "total": details.total,
                "itemsList": details.itemsList,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        }catch (error){
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
   
    return (
        <div className='w-screen h-[90vh] flex flex-row gap-5 justify-center items-center'>
            <OrderDetails ItemRow={data} deleteRow={handleOnDelete} /> 
            <PaymentGateWay cartItems={data} selectedPayment={handleMakePayment}/>
        </div>
    )
}
