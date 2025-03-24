import { useEffect, useState } from "react";
import PlaseOrderDetails from "../component/PlaceOrderDetails" 
import ItemsOfOrders from '../component/ItemsOfOrders';
import axios from "axios";
import { parseJwt } from "../utils/UserDetails";

export default function OrderDetailsScreen() {
  const token:any = sessionStorage.getItem('token');
  const userDetails = parseJwt(token);
  const username = userDetails.userName

  const api = axios.create({
      baseURL:`http://localhost:3000`
  })

  const [selectedData,setSelectedData] = useState([])
  const [data,setData]=useState([]);

  const handleSelectedData =(data:any)=>{
    setSelectedData(data.itemsList)
  }

  const fetchData=async ()=>{
    try {
        const res = await api.get(`/api/v1/coffeShop/payment/${username}`,{
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
    <div className="w-screen h-[90vh] flex flex-row justify-evenly items-center">
      <PlaseOrderDetails rows={data} selectedRow={handleSelectedData}/>
      <ItemsOfOrders data={selectedData}/>
    </div>
  )
}
