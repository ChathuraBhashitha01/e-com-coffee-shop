import { useState } from "react";
import {Card} from "react-bootstrap";
import CartImg from "../assets/add-cart.png";
import CoffeeImg from "../assets/cup-with-hot-beverage-near-coffee-beans.jpg";
import Logo from "../assets/coffe_shop_logo.png";

export default function ItemAddingForm() {
    const[quantity,setQuantity] = useState(0)

    const hndleQuantity = (quantity:number) =>{
        if(quantity >= 0){
            setQuantity(quantity)
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Card className=' w-[600px] min-h-[400px] flex flex-row  shadow-xl rounded-lg"'>
                <div className="w-[40%] min-h-[400px] bg-[#452202] rounded-lg flex flex-col justify-center items-center">
                    <img className=' w-[100%] ' src={Logo} />
                    <img className=' w-[100%] min-h-[200px]' src={CoffeeImg} />
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div className=" w-[80%] flex flex-col justify-center items-center">
                        <label className=" text-[30px] italic font-serif font-extrabold">Black Coffee</label>
                        <label className=" w-full min-h-[] text-[20px] font-serif">Simply brewed coffee without milk or sugar</label>
                    </div>

                    <div className=" w-[350px] h-[50px] mt-[10px] flex flex-row justify-center items-center">
                        <button onClick={()=>hndleQuantity(quantity-1)} className=" w-[40px] h-[40px] bg-green-700 rounded-full ">-</button>
                        <div className=" min-w-[40px] h-[40px] text-black font-bold flex flex-col justify-center items-center">{quantity}</div>
                        <button onClick={()=>hndleQuantity(quantity+1)}  className=" w-[40px] h-[40px] bg-green-700 rounded-full ">+</button>

                        <div className=" w-[170px] h-[40px] ml-2 rounded-l-full rounded-r-full bg-[#633204] text-white font-bold flex flex-row justify-center items-center">Add to Cart <img className='h-[50px] ' src={CartImg} /></div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
