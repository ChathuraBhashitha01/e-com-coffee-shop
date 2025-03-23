import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

interface UserOrderFormProps {
  data: any[]; 
}

export default function UserOrderForm({ data }: UserOrderFormProps) {
  const [itemsList, setItemsList] = useState<any[]>([]);

  useEffect(() => {
    
    setItemsList(data);
    
  }, [data]);

  return (
    <Card className="w-[45vw] min-h-[80vh] flex flex-col items-center shadow-lg overflow-y-scroll">
        <div className="min-w-[95%] max-h-[70%] overflow-hidden relative">
            <div className="grid grid-cols-3 mt-4  gap-3 w-full h-full overflow-y-auto">
                {itemsList.map((itemDetails: any, index: number) => (
                <div key={index} className=" max-w-[300px] max-h-[250px] border rounded-lg p-4 flex flex-col items-center justify-center shadow-md">
                    <label className="text-[15px] font-serif font-light">{itemDetails.code}</label>
                    <label className="text-[20px] font-serif font-light">{itemDetails.name}</label>
                    <label className="text-[15px] font-serif font-light">Quantity: {itemDetails.itemCount}</label>
                    <label className="text-[20px] font-serif font-light">Price: {itemDetails.price}</label>
                </div>
                ))}
            </div>
        </div>
    </Card>
  );
}