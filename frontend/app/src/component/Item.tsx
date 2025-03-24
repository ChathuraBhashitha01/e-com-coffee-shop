import Card from 'react-bootstrap/Card';
import Logo from "../assets/coffe_shop_logo.png";
import { useState } from 'react';
import CartImg from "../assets/add-cart.png";

interface ItemProps {
 data:any;
  selectedItem: (row: any) => void;
}

export default function Item({ data, selectedItem }: ItemProps) {
  const[quantity,setQuantity] = useState(0)

    const hndleQuantity = (quantity:number) =>{
        if(quantity >= 0){
            setQuantity(quantity)
        }
    }

  const handleQuantity=(()=>{
    if(selectedItem){
      selectedItem({
        "code": data.code,
        "price": data.price,
        "quantity":quantity,
      })
    }
  })

  return (
    <Card className='min-w-[250px] max-w-[280px] h-[385px] shadow-xl'>
      <div className=' w-[100%] h-[50px] flex flex-row items-center justify-center'>
        <img className='h-[50px]' src={Logo} alt="Logo" />
      </div>
      
      <Card.Img variant="top" className=' w-[100%] h-[160px]' src={data.picture} alt="Item Image" />
      
      <Card.Body>
        <Card.Title className=' text-[20px] italic ml-5'>{data.name}</Card.Title>
        <Card.Text className=' text-[16px]'>
          {data.description}
        </Card.Text>
        <Card.Text className=' text-[20px] text-[#DD3638]'>Rs.{data.price}</Card.Text>
        <div className=" w-[250px] h-[50px] mt-[10px] flex flex-row justify-center items-center">
            <button onClick={()=>hndleQuantity(quantity-1)} className=" w-[40px] h-[40px] bg-green-700 rounded-full ">-</button>
            <div className=" min-w-[40px] h-[40px] text-black font-bold flex flex-col justify-center items-center">{quantity}</div>
            <button onClick={()=>hndleQuantity(quantity+1)}  className=" w-[40px] h-[40px] bg-green-700 rounded-full ">+</button>

            <div onClick={handleQuantity} className=" w-[70px] h-[40px] ml-2 cursor-pointer rounded-l-full rounded-r-full bg-[#633204] text-white font-bold flex flex-row justify-center items-center"><img className='h-[50px] ' src={CartImg} /></div>
        </div>
      </Card.Body>
    </Card>
  );
}