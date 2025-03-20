import React, { useEffect, useState } from "react";
import axios from "axios";

interface Item {
    code: string;
    name: string;
    description: string;
    category: string;
    quantity: any;
    price: any;
    picture: string;
    preview: string;
}

export default function ItemCreateForm () {
    // const token = localStorage.getItem("token");
    const api = axios.create({ baseURL: `http://localhost:3000` });
    
    const [formData, setFormData] = useState<Item>({
        code: "",
        name: "",
        description: "",
        category: "",
        quantity: 0,
        price: 0,
        picture: "",
        preview: "",
    });

    const handleInputOnChange = (event: { target: {name:any, value: any } }) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData((prevState) => ({
                    ...prevState,
                    picture: base64String
                }));
                setFormData((prevState) => ({
                    ...prevState,
                    preview: base64String
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOnClearAll= ()=>{


        setFormData(() => ({
            code: "",
            name: "",
            description: "",
            category: "",
            quantity: "",
            price: "",
            picture: "",
            preview: "",
        }));
    }
    const handleOnSave=async ()=>{
        try {
            api.post('/api/v1/coffeShop/item/',{
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
                console.log(response);
            }).catch((error: any) => {
                console.error('Axios Error:', error);
            });
        }catch (error){
            console.error('Error:', error);
        }
    }

    const handleOnSearch=async ()=>{
        try {
            api.get('/api/v1/coffeShop/item/find/'+formData.code).then((res:{data:any})=>{
                const jasonData=res.data;
                setFormData(jasonData);

                setFormData((prevState) => ({
                    ...prevState,
                    preview: jasonData.picture
                }));
            });

        }catch (error){
            console.error('Error:', error);
        }
        
    }

    const handleOnUpdate = async ()=>{
    
        try {
            api.put('/api/v1/coffeShop/item/'+formData.code, {
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
                console.log(response);
            }).catch((error: any) => {
                console.error('Axios Error:', error);
            });
        } catch (error) {
            console.error('Error:', error);
        }
      
    }

    const handleOnDelete = async ()=>{
        try {
            api.delete('/api/v1/coffeShop/item/'+formData.code).then((res)=>{});

        }catch (error){
            console.error('Error:', error);
        }
    }

    return (
      <div className="w-[600px] min-h-[700px] p-5 border rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Item Details</h2>
        <input type="text" placeholder="Code" name="code" value={formData.code} onChange={handleInputOnChange} className="w-full p-2 mb-3 border rounded" />
        <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputOnChange} className="w-full p-2 mb-3 border rounded" />
        <input type="number" placeholder="Price" name="price" value={formData.price} onChange={handleInputOnChange} className="w-full p-2 mb-3 border rounded" />
        <input type="number" placeholder="Quantity" name="quantity" value={formData.quantity} onChange={handleInputOnChange} className="w-full p-2 mb-3 border rounded" />
        <select name="category" value={formData.category} onChange={handleInputOnChange} className="w-full p-2 mb-3 border rounded">
            <option value="">Select Category</option>
            <option value="coffee">Coffee</option>
        </select>
        <textarea placeholder="Description" name="description" value={formData.description} onChange={handleInputOnChange} className="w-full p-2 mb-3 border rounded" rows={3}></textarea>
        <input type="file" onChange={handleFileChange} className="mb-3" />
        {formData.preview && <img src={formData.preview} alt="Preview" className="w-20 h-auto" />}
        <div className="mt-3 space-x-2">
            <button onClick={handleOnSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            <button onClick={handleOnUpdate} className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
            <button onClick={handleOnDelete} className="px-4 py-2 bg-blue-500 text-white rounded">Delete</button>
            <button onClick={handleOnSearch} className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
            <button onClick={handleOnClearAll} className="px-4 py-2 bg-blue-500 text-white rounded">Clear</button>
        </div>
    </div>
    );
};
