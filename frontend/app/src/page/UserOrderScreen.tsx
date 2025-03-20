import UserOrder from '../component/UserOrderForm';

export default function UserHomeScreen() {
    // const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    // const [removedItem, setRemovedItem] = useState({});

    // const selectedSubmit = (data: Item) => {
    //     console.log(data)
    //     setSelectedItem(data);
    // };

    // const selectedRemove = (data: Item) => {
    //     setRemovedItem(data);
    // };
    return (
        <div>
            <UserOrder data={[
                { paymentID: "001", date: "12/03/2025", total: 1600.00,  itemsList: [
                    {
                        code: "001",
                        name: "Black Coffee",
                        price: 1200,
                        itemCount: 2
                    },
                    {
                        code: "002",
                        name: "Black Coffee",
                        price: 1200,
                        itemCount: 2
                    },
                    {
                        code: "002",
                        name: "Black Coffee",
                        price: 1200,
                        itemCount: 2
                    },
                    
                    ]},
                    { paymentID: "001", date: "12/03/2025", total: 1600.00,  itemsList: [
                    {
                        code: "001",
                        name: "Black Coffee",
                        price: 1200,
                        itemCount: 2
                    },
                    {
                        code: "002",
                        name: "Black Coffee",
                        price: 1200,
                        itemCount: 2
                    }
                ]},
                { paymentID: "001", date: "12/03/2025", total: 1600.00,  itemsList: [
                    {
                        code: "001",
                        name: "Black Coffee",
                        price: 1200,
                        itemCount: 2
                    }
                ]},
            ]}/>
        </div>
    )
}
