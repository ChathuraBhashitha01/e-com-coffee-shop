import { useEffect, useState } from 'react';
import ItemTable from '../component/ItemTable';
import ItemCreateComponent from '../component/ItemCreateComponent';
import ItemDetails from '../component/ItemCreateComponent';
import axios from "axios";

export default function ItemControllerScreen() {
    const token = localStorage.getItem("token");
    const api = axios.create({ baseURL: `http://localhost:3000` });

    const [item , setItems] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const selectedSubmit = (data: any) => {
        setSelectedItem(data)
    };

    const handleGetItems=async ()=>{
        try {
            const res = await api.get(`/api/v1/coffeShop/item/`);
            setItems(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect (()=>{
        handleGetItems()
    },[])
    return (
        <div className='w-screen h-screen flex flex-row justify-evenly items-center'>
            <ItemTable rows={item} selectedRow={selectedSubmit}/>
            <ItemCreateComponent />
        </div>
    )
}
