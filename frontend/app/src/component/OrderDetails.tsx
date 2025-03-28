import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import RemoveIcon from "../assets/delete.png";
import Logo from "../assets/coffe_shop_logo.png";

interface ItemRow {
  code: string;
  name: string;
  price: number;
  quantity: number;
  totalOfItem: number;
  picture: string;
}

interface Props {
  ItemRow: ItemRow[];
  deleteRow: (rowID: string) => void;
}

export default function OrderDetails({ ItemRow, deleteRow }: Props) {
  const [totalOfAllGetItem, setTotalOfAllGetItem] = useState(0);
  const [items, setItems] = useState<ItemRow[]>([]);

  const handleRowClick = (row: ItemRow) => {
    deleteRow(row.code);
    setTotalOfAllGetItem(prevTotal => prevTotal - row.totalOfItem);
  };

  useEffect(() => {
    let total = 0;
    ItemRow.forEach((item) => {
      total += item.totalOfItem;
    });
    setTotalOfAllGetItem(total);
    setItems(ItemRow);
  }, [ItemRow]); 

  return (
    <Card className="w-[700px] min-h-[800px] flex flex-col justify-between items-center bg-[#452202] shadow-xl rounded-lg">
      <div className="w-[90%] max-h-[10%]  bg-[#452202] flex flex-col justify-center items-center">
        <img className="w-[25%] h-[100%]" src={Logo} alt="Logo" />
      </div>

      <Card.Body className="w-[90%] max-h-[80%] flex flex-col overflow-y-auto">
        {items.length > 0 &&
          items.map((item) => (
            <div
              key={item.code}
              className="w-full min-h-[20px] mb-1 border-1 flex flex-row justify-between items-center cursor-pointer"
            >
              <div className="w-[15%] h-full flex justify-start">
                <img className="max-w-[60%] min-w-[60%] max-h-[100%]" src={item.picture} alt={item.name} />
              </div>
              <label className="w-[25%] text-[15px]">{item.name}</label>
              <label className="w-[20%]">{item.quantity}</label>
              <label className="w-[25%]">{item.totalOfItem}</label>
              <div className="w-[15%] h-full flex justify-center items-center">
                <img onClick={() => handleRowClick(item)} className="max-w-[30%] max-h-[90%] rounded-full" src={RemoveIcon} />
              </div>
            </div>
          ))}
      </Card.Body>

      <div className="w-[90%] min-h-[20%] bg-[#452202]  flex flex-row justify-center items-center">
        <div className="w-[50%] h-[100%]">
          <label className="w-[40%] h-[10%] text-[30px] text-white font-bold">Total  : </label>
          <label className="w-[60%] text-[30px] font-bold text-white">
            Rs.{totalOfAllGetItem}/=
          </label>
        </div>
      </div>
    </Card>
  );
}
