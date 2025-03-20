import OrderDetails from '../component/OrderDetails';
import PaymentGateWay from '../component/PaymentGateWay';
import { useState } from 'react';

interface Item {
    code: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
}

interface Props {
    ItemRow: any;
    selectedRow: (row: any) => void; 
  }

export default function UserHomeScreen({ItemRow , selectedRow}:Props) {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [removedItem, setRemovedItem] = useState({});

    const selectedSubmit = (data: Item) => {
        setSelectedItem(data);
    };

    const selectedRemove = (data: Item) => {
        setRemovedItem(data);
    };
    return (
        <div className='w-screen h-screen flex flex-row gap-5 justify-center items-center'>
            <OrderDetails ItemRow={ItemRow} selectedRow={selectedRow} /> 
            <PaymentGateWay/>
        </div>
    )
}
