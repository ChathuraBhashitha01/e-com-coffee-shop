import React, {  useState } from "react";
import axios from "axios";
import { Form ,Card ,Table ,Button } from "react-bootstrap";

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

interface Props{
    saveDetails: (row: any) => void;
    updateDetails: (row: any) => void;
}

export default function ItemCreateForm ({saveDetails,updateDetails}:Props) {
    // const token = localStorage.getItem("token");
    const api = axios.create({ baseURL: `http://localhost:3000` });
    
    const [formData, setFormData] = useState<Item>({
        code: "",
        name: "",
        description: "",
        category: "",
        quantity: '',
        price: '',
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
   
    const handleSaveItem =()=>{
        saveDetails(formData)
    }

    const handleUpdateItem =()=>{
        updateDetails(formData)
    }

    return (
      <Card className="w-[45vw] min-h-[80vh] flex flex-col justify-center items-center bg-white shadow-xl rounded-lg">
        <div className="w-[70%] h-[95%]">
            <label className="text-[20px] font-serif font-semibold mb-4">Item Details</label>
            
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
            <div className="max-w-[100%] max-h-[20%]">
                {formData.preview && <img src={formData.preview} alt="Preview" className=" w-auto h-[100%]" />}
            </div>

            <div className=" w-[100%] h-[20%] flex flex-row justify-center items-center">
                <button onClick={handleSaveItem} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                <button onClick={handleUpdateItem} className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
                <button onClick={handleOnClearAll} className="px-4 py-2 bg-blue-500 text-white rounded">Clear</button>
            </div>
        </div>
    </Card>
    );
};
