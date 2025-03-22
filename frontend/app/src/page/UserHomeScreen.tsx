import ItemForm from '../component/ItemForm';
import ItemAddingForm from '../component/ItemAddingForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Next } from 'react-bootstrap/esm/PageItem';


export default function UserHomeScreen() {
  const token = localStorage.getItem('token');

  const api = axios.create({
      baseURL:`http://localhost:3000`
  })

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isVisibleSubmitAddingForm, setIsVisibleSubmitAddingForm] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(0);
  const [data,setData]=useState<any>([]);

  const fetchData=async ()=>{
      try {
        const res=await api.get(`/api/v1/coffeShop/item/`);
        setData(res.data)
      } catch (error){

      }
  }

  const selectedSubmit = async (formData: any) => {
    try {
      setSelectedItem(formData);
      setIsVisibleSubmitAddingForm(true);
      await api.post('/api/v1/coffeShop/cart/',{
        // userName: ;
        // itemList: Item[];
      
    
    })
    } catch (error) {
      
    }
  };

  const selectedAlertClick = (isClick: boolean) => {
    if(isClick === true){
        setIsVisibleSubmitAddingForm(isClick);
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

  useEffect(() => {
    fetchData()
  }, [selectedItem, quantity]);

  return (
    <div>
      <ItemForm
        Items={data}
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
