import React, { useEffect, useState } from 'react'
import { Form ,Card ,Table ,Button } from "react-bootstrap";
import RemoveIcon from "../assets/delete.png";

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
  deleteRow: (row: any) => void;
}

export default function OrderTable({rows,selectedRow,deleteRow}: Props) {

  const rowsPerPage = 8
  const [page, setPage] = useState(0);
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [serchName, setSerchName] = React.useState("");
  const [serchCategory, setSerchCategory] = React.useState("");

  const emptyRows = Math.max(
    0,
    rowsPerPage - filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length
  );

  const handleRowClick = (row: any) => {
    if(selectedRow){
      selectedRow(row)
    }
  };

  const handleDeleteItem = (row: any) => {
    if(deleteRow){
      deleteRow( row.code)
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

  const handleBackButtonClick = () => {
    setPage(page - 1);
  };

  const handleNextButtonClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {

    rows.map((row)=>{
      setCategories((prevItems) => new Set(prevItems).add(row.category));

      let filtered = rows.filter((row) =>
        row.name.toLowerCase().includes(serchName.toLowerCase())
      );
  
      if (serchName === '') {
        
        filtered = rows.filter((row) =>
          row.category.toLowerCase().includes(serchCategory.toLowerCase())
        );
  
        if (serchCategory === "All Category" && serchName === '') {
          filtered = rows ;
        }
      }
      
      setFilteredRows(filtered);
      setPage(0);
    })
  }, [serchName,serchCategory,rows]);

  return (
    <Card className=" w-[45vw] min-h-[80vh] flex flex-col justify-center items-center bg-white shadow-xl rounded-lg">
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

      <div className=" w-[90%] h-[92%] shadow-xl">
        <Table hover borderless  responsive="sm" className="border-collapse">
          <thead className=" text-black 'h-[50px]">
            <tr>
              <th style={{ width: "10%" }} className="p-3 border border-gray-300">Code</th>
              <th style={{ width: "30%" }} className="p-3 border border-gray-300">Name</th>
              <th style={{ width: "30%" }} className="p-3 border border-gray-300">Category</th>
              <th style={{ width: "10%" }} className="p-3 border border-gray-300">Quantity</th>
              <th style={{ width: "20%" }} className="p-3 border border-gray-300">Price</th>
              <th style={{ width: "10%" }} className="p-3 border border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody style={{ height: 250 }}>
            {(rowsPerPage > 0 ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredRows ).map((row) => (
              <tr className="hover:bg-blue-100 transition" onClick={() => handleRowClick(row)}>
                <td className="p-3 ">{row.code}</td>
                <td className="p-3 ">{row.name}</td>
                <td className="p-3">{row.category}</td>
                <td className="p-3 ">{row.quantity}</td>
                <td className="p-3 ">{row.price}</td>
                <td className="p-3  flex flex-row justify-center items-center"><img onClick={() => handleDeleteItem(row)}  className=' max-w-[30px] max-h-[30px] cursor-pointer rounded-full' src={RemoveIcon} /></td>
              </tr>
            ))}
            {emptyRows > 0 && (
            <tr style={{ height: `${50 * emptyRows}px` }}></tr>
            )}
          </tbody>
        </Table>
      </div>

      <Card className='w-[90%] h-[50px] flex flex-row justify-center bg-white shadow-xl rounded-lg'>
        <div className='w-[30%] h-[50px] flex flex-row items-center '>
          <Button className='h-[45px]' variant="outline-primary" onClick={handleBackButtonClick} disabled={page === 0}>
            Back
          </Button>

          <div className='w-[45px] h-[45px] rounded-md ml-5 mr-5 border-2 font-bold border-[#D9D9D9] flex flex-col items-center justify-center'>
            {page+1}
          </div>

          <Button className='h-[45px]' variant="outline-primary" onClick={handleNextButtonClick} disabled={page >= Math.ceil(filteredRows.length / 8) - 1}>
            Prev
          </Button>
        </div>
      </Card>
    </Card>
  )
}
