import { useEffect, useState } from 'react';
import UserOrder from '../component/UserOrderForm';
import {Form } from "react-bootstrap";

interface Props {
  data: any[]; 
}
export default function UserDetailsForm({data}:Props) {
  const [serchName, setSerchName] = useState("");
  const [filteredItems, setFilteredItems] = useState<any[]>(data);

  const handleChangeSearchInput = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setSerchName(value);
  };

   useEffect(() => {
    
    if(serchName === ""){
      setFilteredItems(data);
    }

      let filtered = data.filter((row) =>
        row.userName.toLowerCase().includes(serchName.toLowerCase())
      );
  
      setFilteredItems(filtered);
    }, [data, serchName]);
  
  return (
    <div >
       <UserOrder data={filteredItems}/>
    </div>
  )
}
