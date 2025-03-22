import { useEffect, useState } from "react";
import PlaseOrderDetails from "../component/PlaceOrderDetails" 
import UserOrder from '../component/UserOrderForm';
import { data } from "react-router-dom";
import axios from "axios";

export default function OrderDetailsScreen() {
  const token = localStorage.getItem('token');

  const api = axios.create({
      baseURL:`http://localhost:3000`
  })

  const [selectedData,setSelectedData] = useState([])
  const [data,setData]=useState([]);

  const handleSelectedData =(data:any)=>{
    setSelectedData(data)
  }

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
    <div className="w-screen h-[90vh] flex flex-row justify-evenly items-center">
      <PlaseOrderDetails rows={data} selectedRow={handleSelectedData}/>
      <UserOrder data={selectedData}/>
    </div>
  )
}
