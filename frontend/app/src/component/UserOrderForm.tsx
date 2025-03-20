import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Logo from "../assets/coffe_shop_logo.png";

interface UserOrderFormProps {
  data: any[]; 
}

export default function UserOrderForm({ data }: UserOrderFormProps) {
  const [filteredRows, setFilteredRows] = useState<any[]>([]);

  useEffect(() => {
    
    setFilteredRows(data);
    
  }, [data]);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      {filteredRows.map((item: any, index: number) => (
        <Card key={index} className="w-[60%] min-h-[30%] h-auto mt-4 flex flex-row">
            <div className="w-[20%] h-full bg-[#452202] rounded-lg flex flex-col justify-center items-center">
                <img className=' w-[100%] ' src={Logo} />
            </div>
            <Card.Body className="w-[100%] min-h-[100%] flex flex-col justify-between">
                <div className="w-[100%] max-h-[50px] flex flex-row justify-between">
                    <div className=" w-auto max-w-[60%] max-h-[100%] flex flex-col">
                        <label className=" text-[20px] font-serif font-extrabold">Chathura Bhashitha</label>
                        <label className=" text-[15px] font-serif font-light">chathurabhashitha@gmail.com</label>
                    </div>

                    <div className=" w-auto max-w-[60%] max-h-[100%] flex flex-row">
                        <label className=" text-[20px] mr-3 font-serif font-extrabold">Payment No</label>
                        <label className=" text-[20px] font-serif font-light">{item.paymentID}</label>
                    </div>
                </div>

                <div className="min-w-[95%] max-h-[75%] overflow-hidden relative">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full h-full overflow-y-auto">
                        {item.itemsList.map((itemDetails: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4 flex flex-col items-center justify-center shadow-md">
                            <label className="text-[15px] font-serif font-light">{itemDetails.code}</label>
                            <label className="text-[20px] font-serif font-light">{itemDetails.name}</label>
                            <label className="text-[15px] font-serif font-light">Quantity: {itemDetails.itemCount}</label>
                            <label className="text-[20px] font-serif font-light">Price: {itemDetails.price}</label>
                        </div>
                        ))}
                    </div>
                </div>
                
                <div className="w-[100%] max-h-[50px] flex flex-row justify-between items-center">
                    <div className=" w-auto max-w-[60%] max-h-[100%] flex flex-row">
                        <label className=" text-[15px]  font-extrabold">Date : </label>
                        <label className=" text-[15px]  font-light">{item.date}</label>
                    </div>

                    <div className=" w-auto max-w-[60%] max-h-[100%] flex flex-row">
                        <label className=" text-[20px] mr-3 font-serif font-extrabold">Total : </label>
                        <label className=" text-[20px] font-serif font-light"> {item.total}</label>
                    </div>
                </div>
            </Card.Body>
        </Card>
        ))}
    </div>
  );
}