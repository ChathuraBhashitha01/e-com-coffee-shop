import ItemForm from '../component/ItemForm';
import ItemAddingForm from '../component/ItemAddingForm';
import { useState } from 'react';

interface Props {
  selectedItemOfHome: (row: any) => void;
}

export default function UserHomeScreen({ selectedItemOfHome }: Props) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  // const [removedItem, setRemovedItem] = useState({});
  const [isVisibleSubmitAddingForm, setIsVisibleSubmitAddingForm] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(0);

  const selectedSubmit = (data: any) => {
    setSelectedItem(data);
    setIsVisibleSubmitAddingForm(true);
  };

  // const selectedRemove = (data: any) => {
  //   setRemovedItem(data);
  // };

  const selectedAlertClick = (isClick: boolean) => {
    if(isClick === true){
        setIsVisibleSubmitAddingForm(isClick);
        selectedItemOfHome({
            code: selectedItem?.code,
            name: selectedItem?.name,
            price: selectedItem?.price,
            quantity: quantity, 
            totalOfItem: selectedItem?.price * quantity,
          });
          setIsVisibleSubmitAddingForm(false)
    }else{
        console.log(isClick)
        setIsVisibleSubmitAddingForm(false)
    }
  
  };

  const selectedQuantity=(data:any)=>{
    setQuantity(data)
    setIsVisibleSubmitAddingForm(false)
  }

  // Using the `selectedItem` state and `quantity` when it changes.
//   useEffect(() => {
//     if (selectedItem) {
//       selectedItemOfHome({
//         code: selectedItem?.code,
//         name: selectedItem?.name,
//         price: selectedItem?.price,
//         quantity: quantity,  // Using `quantity` value after it's updated
//         totalOfItem: selectedItem?.price * quantity,
//       });
//     }
//   }, [selectedItem, quantity, selectedItemOfHome]); // Dependency array added to optimize the effect.

  return (
    <div>
      <ItemForm
        Items={[
          { code: '001', name: 'Black Coffee', category: 'Coffee', quantity: 10, price: 600 },
          { code: '002', name: 'Latte', category: 'Coffee', quantity: 8, price: 750 },
          { code: '003', name: 'Espresso', category: 'Black Coffee', quantity: 5, price: 550 },
          { code: '004', name: 'Black Coffee', category: 'Coffee', quantity: 10, price: 600 },
          { code: '005', name: 'Latte', category: 'Coffee', quantity: 8, price: 750 },
          { code: '006', name: 'Espresso', category: 'Coffee', quantity: 5, price: 550 },
          { code: '007', name: 'Black Coffee', category: 'Coffee', quantity: 10, price: 600 },
          { code: '008', name: 'Latte', category: 'Coffee', quantity: 8, price: 750 },
          { code: '009', name: 'Espresso', category: 'Coffee', quantity: 5, price: 550 },
          { code: '0010', name: 'Latte', category: 'Coffee', quantity: 8, price: 750 },
          { code: '0011', name: 'Espresso', category: 'Coffee', quantity: 5, price: 550 },
        ]}
        selectedItem={selectedSubmit}
      />

      {isVisibleSubmitAddingForm && (
        <div>
          <ItemAddingForm ItemRow={selectedItem} selectedCount={selectedQuantity} isClickAdd={selectedAlertClick}/>
        </div>
      )}
    </div>
  );
}
