import { useEffect, useState } from 'react';
import UserDetailsForm from '../component/UserDetailsForm';
import UserTable from '../component/UserTable';
import axios from 'axios';

export default function UserManagementScreen() {
    const token = sessionStorage.getItem('token');

    const api = axios.create({
        baseURL:`http://localhost:3000`
    })

    const [data,setData]=useState<any[]>([]);
    const [userOrder,setUserOrder]=useState<any[]>([]);
    

    const selectedOrders =async (data:any)=>{
        try {
            const res = await api.get(`/api/v1/coffeShop/payment/${data.userName}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUserOrder(res.data)
        } catch (error){

        }
    }

    const fetchData=async ()=>{
        try {
            const res = await api.get(`/api/v1/coffeShop/user/`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setData(res.data)
        } catch (error){

        }
    }

    const handleOnDelete = async (username:string)=>{
        try {
            await api.delete(`/api/v1/coffeShop/user/${username}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            fetchData()
        }catch (error){
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

  return (
    <div className='w-screen h-[90vh] flex flex-row justify-evenly items-center'>
    <UserTable rows={data}
        selectedRow={selectedOrders}
        deletedRow={handleOnDelete}/>
      <UserDetailsForm data={userOrder}/>
    </div>
  )
}
