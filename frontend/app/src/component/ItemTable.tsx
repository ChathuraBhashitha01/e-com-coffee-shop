import React, { useEffect, useState } from 'react'
import { Form ,Card  } from "react-bootstrap";
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
}

export default function OrderTable({rows,selectedRow}: Props) {

  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [serchName, setSerchName] = React.useState("");
  const [serchCategory, setSerchCategory] = React.useState("");

  const handleRowClick = (row: any) => {
    if(selectedRow){
      selectedRow(row)
    }
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
  }, [serchName,serchCategory,rows]);

  return (
    <Card className=" w-[900px] max-h-[700px] flex flex-col items-center justify-start p-4 bg-white shadow-xl rounded-lg">
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

      <div className=" w-[900px] min-h-[700px] flex flex-col bg-white shadow-xl rounded-lg">
        <GenaricTable 
           rows={rows} 
           searchName={serchName} 
           searchCategory={serchCategory}
           rowsPerPage={10}
           selectedRow={handleRowClick}
        />
      </div>
    </Card>
  )
}
