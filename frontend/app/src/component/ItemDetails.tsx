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

interface Props {
    Item:any
}

export default function BookAddingForm ({Item}:Props) {
    // const token = localStorage.getItem("token");
    // const api = axios.create({ baseURL: `http://localhost:3000` });
    
    const [formData, setFormData] = useState<Item>(Item);

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
        {formData.preview && <img src={formData.preview} alt="Preview" className="w-40 h-auto" />}
        <div className="mt-5 space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Delete</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
            <button onClick={handleOnClearAll} className="px-4 py-2 bg-blue-500 text-white rounded">Clear</button>
        </div>
    </div>
    );
};
