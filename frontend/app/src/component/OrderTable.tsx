import React, { useEffect, useState } from 'react'
import { Form ,Button ,Card  } from "react-bootstrap";
import GenaricTable from './GenaricTable';

interface ItemRow {
  code: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

interface Props {
  rows: ItemRow[];
  selectedRow: (row: any) => void;
  removedRows: any;
}

export default function OrderTable({rows,removedRows,selectedRow}: Props) {

  const [quantity, setQuantity] = React.useState(0);
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [serchName, setSerchName] = React.useState("");
  const [serchCategory, setSerchCategory] = React.useState("");
  const [itemData ,setItemData] = React.useState({
  code: "",
  name: "",
  price: 0,
  })

  const [filteredRows, setFilteredRows] = React.useState(rows);
    
  const handleRowClick = (row: any) => {
    setItemData((prev) => ({
      ...prev, 
      code: row.code,
      name: row.name,
      price: row.price
    }));
  };

  const handleItemCartValue = () => {
    if(selectedRow){
      selectedRow({
        code: itemData.code,
        name: itemData.name,
        price: itemData.price,
        quantity:quantity,
        totalOfItem: itemData.price * quantity
      })
      
    }
  }

  const handleItemQuantity = (event: { target: { value: any } }) => {
    const qty = event.target.value;
    setQuantity(qty);
  };

  const handleChangeSearchInput = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setSerchName(value);
  };

  const handleChangeSearchCategory = (event: { target: { value: any } }) => {
    const category = event.target.value;
    setSerchCategory(category);
  };

  useEffect(() => {

    rows.map((row)=>{
      setCategories((prevItems) => new Set(prevItems).add(row.category));
    })
   
    let filteredValue: any[] = [...filteredRows]; 

    if (removedRows.code !== '') {
      filteredValue.forEach((row: any) => {
        if (row.code === removedRows.code) {
          row.quantity = row.quantity + Number(removedRows.quantity);
        }
      });
    }
    
    if (quantity !== 0) {
      filteredValue.forEach((row: any) => {
        if (row.code === itemData.code) {
          row.quantity = row.quantity - quantity;
        }
      });
      setQuantity(0);
    }
    
    setFilteredRows([...filteredValue]); 
  }, [rows]);

  return (
    <Card className=" w-[1000px] min-h-[800px] flex flex-col items-center justify-start p-4 bg-white shadow-xl rounded-lg">
      <div className="w-[95%] h-[50px] flex flex-row justify-between items-center mb-3 gap-4">
        <Form.Select
          aria-label="Default select example"
          className=" w-[400px] h-[50px] bg-white shadow-xl rounded-lg"
          onChange={handleChangeSearchCategory}
        >
          <option>All Category</option>
          {
            Array.from(categories).map((category, index) => {
              return <option key={index} value={category}>{category}</option>;
            })
          }
        </Form.Select>

        <Form.Control
          className=" w-[400px] h-[50px] bg-white shadow-xl rounded-lg"
          placeholder="Search Item Here"
          aria-label="Disabled input example"
          onChange={handleChangeSearchInput}
        />
      </div>

      <div className="w-[900px] min-h-[600px] flex flex-col bg-white  rounded-lg">
          <GenaricTable 
              rows={filteredRows} 
              searchName={serchName} 
              searchCategory={serchCategory}
              rowsPerPage={8}
              selectedRow={handleRowClick}
          />
      </div>
      <div className='w-[95%] flex flex-row justify-end mt-3 '>
        <div className='w-[35%]  flex flex-row justify-center gap-3'>
          <Form.Control
            className=" w-[200px] h-[50px] "
            value={itemData.code}
            disabled
          />
          <Form.Control
            className=" w-[200px] h-[50px] "
            placeholder="Item Count"
            aria-label="Disabled input example"
            onChange={handleItemQuantity}
          />
          <Button variant="outline-primary" onClick={handleItemCartValue}>Add</Button>
        </div>
      </div>
    </Card>
  )
}
