import ItemForm from '../component/ItemForm';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function UserHomeScreen() {
  const token = sessionStorage.getItem('token');

  const api = axios.create({
      baseURL:`http://localhost:3000`
  })

  
  const [data,setData]=useState<any>([]);
  

  const fetchData=async ()=>{
      try {
        const res=await api.get(`/api/v1/coffeShop/item/`,{
          headers: {
              Authorization: `Bearer ${token}`,
          }
      });
        setData(res.data)
      } catch (error){

      }
  }

  const selectedSubmit = async (formData: any) => {
      await api.post('/api/v1/coffeShop/cart/',{
        "uerCartID": `Bhashitha${formData.code}`,
        "userName": "Bhashitha",
        "code": formData.code,
        "price": formData.price,
        "quantity": formData.quantity,
        "totalOfItem": formData.price*formData.quantity
      },{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
  };

  // const selectedAlertClick = (isClick: boolean) => {
  //   if(isClick === true){
  //       setIsVisibleSubmitAddingForm(isClick);
  //         setIsVisibleSubmitAddingForm(false)
  //   }else{
  //       console.log(isClick)
  //       setIsVisibleSubmitAddingForm(false)
  //   }
  
  // };

  // const selectedQuantity=async (data:any)=>{
  //   setQuantity(data)
  //   setIsVisibleSubmitAddingForm(false)

   
  // }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
      <ItemForm
        Items={data}
        selectedItem={selectedSubmit}
      />

      {/* {isVisibleSubmitAddingForm && (
        <div>
          <ItemAddingForm ItemRow={selectedItem} selectedCount={selectedQuantity} isClickAdd={selectedAlertClick}/>
        </div>
      )} */}
    </div>
  );
}
