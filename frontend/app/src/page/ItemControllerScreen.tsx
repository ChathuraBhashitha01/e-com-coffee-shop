import { useEffect, useState } from 'react';
import ItemTable from '../component/ItemTable';
import ItemCreateComponent from '../component/ItemCreateComponent';
import axios from "axios";

export default function ItemControllerScreen() {
    // const token = localStorage.getItem("token");
    const api = axios.create({ baseURL: `http://localhost:3000` });

    const [item , setItems] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const selectedSubmit = (data: any) => {
        setSelectedItem(data)
    };

    const handleGetItems=async ()=>{
        try {
            const res = await api.get(`/api/v1/coffeShop/item/`,);
            setItems(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleOnSave=async (formData:any)=>{
        try {
            await api.post('/api/v1/coffeShop/item/',{
                "code":formData.code,
                "name": formData.name,
                "description": formData.description,
                "category": formData.category,
                "quantity": formData.quantity,
                "price": formData.price,
                "picture": formData.picture
            
            }).then((res: {data: any}) => {
                const response = res.data;
                alert(response);
                handleGetItems()
            }).catch((error: any) => {
                console.error('Axios Error:', error);
            });
        }catch (error){
            console.error('Error:', error);
        }
    }

    const handleOnUpdate = async (formData:any)=>{
    
        try {
            await api.put('/api/v1/coffeShop/item/'+formData.code, {
                "code":formData.code,
                "name": formData.name,
                "description": formData.description,
                "category": formData.category,
                "quantity": formData.quantity,
                "price": formData.price,
                "picture": formData.picture
               }).then((res: { data: any }) => {
                const response = res.data;
                alert(response);
                handleGetItems()
            }).catch((error: any) => {
                console.error('Axios Error:', error);
            });
        } catch (error) {
            console.error('Error:', error);
        }
      
    }

    const handleOnDelete = async (code:string)=>{
        try {
            await api.delete(`/api/v1/coffeShop/item/${code}`);
            handleGetItems()
        }catch (error){
            console.error('Error:', error);
        }
    }

    useEffect (()=>{
        handleGetItems()
    },[])
    return (
        <div className='w-screen h-[90vh] flex flex-row justify-evenly items-center'>
            <ItemTable rows={item} selectedRow={selectedSubmit} deleteRow={handleOnDelete}/>
            <ItemCreateComponent itemDetails={selectedItem} saveDetails={handleOnSave} updateDetails={handleOnUpdate} />
        </div>
    )
}
