import { Card } from "react-bootstrap";
import Logo from "../assets/coffe_shop_logo.png";
import { useEffect, useState } from "react";
import { parseJwt } from "../utils/UserDetails";

interface ItemRow {
  code: string;
  name: string;
  price: number;
  quantity: number;
  totalOfItem: number;
  picture: string;
}

interface Props {
  cartItems: ItemRow[];
  selectedPayment: (data: any) => void;
}

export default function PaymentGateWay({ cartItems, selectedPayment }: Props) {

  const token:any = sessionStorage.getItem('token');
  const userDetails = parseJwt(token);
  const username = userDetails.userName
  const [totalOfAllGetItem, setTotalOfAllGetItem] = useState(0);
  const [itemsList, setItemsList] = useState<any[]>([]);
  const date = new Date();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault(); 

    selectedPayment({
      paymentID: `${username}${date.getDate()}${date.getTime()}`,
      userName: username,
      date: date,
      total: totalOfAllGetItem,
      itemsList: itemsList,
    });
  };

  useEffect(() => {
    let total = 0;
    let items: any[] = [];

    cartItems.forEach((item) => {
      total += item.totalOfItem;
      items.push({
        code: item.code,
        name: item.name, 
        price: item.price,
        itemCount: item.quantity, 
      });
    });

    setTotalOfAllGetItem(total);
    setItemsList(items);
  }, [cartItems]);

  return (
    <Card className="w-[700px] min-h-[800px] flex flex-col justify-between items-center bg-[#452202] shadow-xl rounded-lg">
      <div className="w-[90%] max-h-[10%] bg-[#452202] flex flex-col justify-center items-center">
        <img className="w-[25%] h-[100%]" src={Logo} alt="Logo" />
      </div>

      <div className="w-[100%] h-[30%] flex flex-col">
        <label className="text-[20px] text-center font-bold">
          Payment Number : {`${username}${date.getDate()}${date.getTime()}`}
        </label>
        <label className="text-[20px] text-center font-bold">User : {username}</label>
      </div>

      <div className="w-[100%] h-[30%] mt-4 mb-4 pl-9 pr-9">
        <label className="text-[20px] text-center font-semibold">
          Add Your Card Details
        </label>
        <form onSubmit={handlePayment} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Card Number"
            className="border p-3 rounded-lg"
            id="cardNumber"
          />
          <input
            type="password"
            name="password"
            placeholder="Pin Number"
            className="border p-3 rounded-lg"
            id="password"
          />
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Pay
          </button>
        </form>
      </div>
    </Card>
  );
}
