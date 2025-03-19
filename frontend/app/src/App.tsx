import 'bootstrap/dist/css/bootstrap.min.css';
import Order from './component/OrderTable';
// import OrderDetails from './component/OrderDetails';
import Book from './component/ItemTable';
import { useState } from 'react';
import OrderDetails from './component/OrderDetails';
import Home from './component/ItemForm';
import Item from './component/Item';
import ItemDetails from './component/ItemDetails';
import ItemAddingForm from './component/ItemAddingForm';
interface Item {
  code: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

function App() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [removedItem, setRemovedItem] = useState({});

  const selectedSubmit = (data: Item) => {
    console.log(data)
    setSelectedItem(data);
  };

  const selectedRemove = (data: Item) => {
    setRemovedItem(data);
  };

  return (
    <div className="w-screen flex flex-row">
      {/* <Order
        rows={[
          { code: "001", name: "Black Coffee", category: "Coffee", quantity: 10, price: 600 },
          { code: "002", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "003", name: "Espresso", category: "Black Coffee", quantity: 5, price: 550 },
          { code: "004", name: "Black Coffee", category: "Coffee", quantity: 10, price: 600 },
          { code: "005", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "006", name: "Espresso", category: "Coffee", quantity: 5, price: 550 },
          { code: "007", name: "Black Coffee", category: "Coffee", quantity: 10, price: 600 },
          { code: "008", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "009", name: "Espresso", category: "Coffee", quantity: 5, price: 550 },
          { code: "0010", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "0011", name: "Espresso", category: "Coffee", quantity: 5, price: 550 },
        ]}
        selectedRow={selectedSubmit}
         removedRows={removedItem}      />

      <OrderDetails ItemRow={selectedItem} selectedRow={selectedRemove} /> */}

      {/* <Book
        rows={[
          { code: "001", name: "Black Coffee", category: "Coffee", quantity: 10, price: 600 },
          { code: "002", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "003", name: "Espresso", category: "Black Coffee", quantity: 5, price: 550 },
          { code: "004", name: "Black Coffee", category: "Coffee", quantity: 10, price: 600 },
          { code: "005", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "006", name: "Espresso", category: "Coffee", quantity: 5, price: 550 },
          { code: "007", name: "Black Coffee", category: "Coffee", quantity: 10, price: 600 },
          { code: "008", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "009", name: "Espresso", category: "Coffee", quantity: 5, price: 550 },
          { code: "0010", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "0011", name: "Espresso", category: "Coffee", quantity: 5, price: 550 },
        ]}
        selectedRow={selectedSubmit} /> */}

        <Home Items={[
          { code: "001", name: "Black Coffee", category: "Coffee", quantity: 10, price: 600 },
          { code: "002", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "003", name: "Espresso", category: "Black Coffee", quantity: 5, price: 550 },
          { code: "004", name: "Black Coffee", category: "Coffee", quantity: 10, price: 600 },
          { code: "005", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "006", name: "Espresso", category: "Coffee", quantity: 5, price: 550 },
          { code: "007", name: "Black Coffee", category: "Coffee", quantity: 10, price: 600 },
          { code: "008", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "009", name: "Espresso", category: "Coffee", quantity: 5, price: 550 },
          { code: "0010", name: "Latte", category: "Coffee", quantity: 8, price: 750 },
          { code: "0011", name: "Espresso", category: "Coffee", quantity: 5, price: 550 },
        ]}/>

        {/* <Item/> */}

        {/* <ItemDetails/> */}

        {/* <ItemAddingForm/> */}
    </div>

  );
}

export default App;
