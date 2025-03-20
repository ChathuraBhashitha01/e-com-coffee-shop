import React, { useEffect, useState } from 'react'
import {Table, Form ,Button ,Card  } from "react-bootstrap";

interface ItemRow {
  code: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

interface Props {
  rows: ItemRow[];
  searchName: string
  searchCategory: string
  rowsPerPage:number
  selectedRow: (row: any) => void;
}

export default function OrderTable({rows,searchName,searchCategory,rowsPerPage,selectedRow}: Props) {

  const [page, setPage] = React.useState(0);
//   const [itemData ,setItemData] = React.useState({
//   code: "",
//   name: "",
//   price: 0,
//   })

  const [filteredRows, setFilteredRows] = React.useState(rows);

  const emptyRows = Math.max(
    0,
    rowsPerPage - filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length
  );
    
  const handleRowClick = (row: any) => {
    // setItemData((prev) => ({
    //   ...prev, 
    //   code: row.code,
    //   name: row.name,
    //   price: row.price
    // }));

    if(selectedRow){
      selectedRow(row)
    }
  };

  const handleBackButtonClick = () => {
    setPage(page - 1);
  };

  const handleNextButtonClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {

    let filtered = rows.filter((row) =>
      row.name.toLowerCase().includes(searchName.toLowerCase())
    );

    if (searchName === '') {
      
      filtered = rows.filter((row) =>
        row.category.toLowerCase().includes(searchCategory.toLowerCase())
      );

      if (searchCategory === "All Category" && searchName === '') {
        filtered = rows ;
      }
    }
    
    setFilteredRows(filtered);
    setPage(0);
  }, [searchName,searchCategory,rows]);

  return (
    <div className=" w-[100%] min-h-[100%] flex flex-col bg-white shadow-xl rounded-lg">
      
      <div className=" w-[100%] h-[92%] bg-white shadow-xl rounded-lg">
        <Table hover borderless  responsive="sm" className="border-collapse">
          <thead className=" text-black 'h-[50px]">
            <tr>
              <th style={{ width: "15%" }} className="p-3 border border-gray-300">Code</th>
              <th style={{ width: "35%" }} className="p-3 border border-gray-300">Name</th>
              <th style={{ width: "30%" }} className="p-3 border border-gray-300">Category</th>
              <th style={{ width: "15%" }} className="p-3 border border-gray-300">Quantity</th>
              <th style={{ width: "15%" }} className="p-3 border border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody style={{ height: 250 }}>
            {(rowsPerPage > 0 ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredRows ).map((row) => (
              <tr className="hover:bg-blue-100 transition" onClick={() => handleRowClick(row)}>
                <td className="p-3 border border-gray-300">{row.code}</td>
                <td className="p-3 border border-gray-300">{row.name}</td>
                <td className="p-3 border border-gray-300">{row.category}</td>
                <td className="p-3 border border-gray-300">{row.quantity}</td>
                <td className="p-3 border border-gray-300">{row.price}</td>
              </tr>
            ))}
            {emptyRows > 0 && (
            <tr style={{ height: `${50 * emptyRows}px` }}></tr>
            )}
          </tbody>
        </Table>
      </div>

      <Card className='w-[100%] h-[50px] flex flex-row justify-center bg-white shadow-xl rounded-lg'>
        <div className='w-[30%] h-[50px] flex flex-row items-center '>
          <Button className='h-[45px]' variant="outline-primary" onClick={handleBackButtonClick} disabled={page === 0}>
            Back
          </Button>

          <div className='w-[45px] h-[45px] rounded-md ml-5 mr-5 border-2 font-bold border-[#D9D9D9] flex flex-col items-center justify-center'>
            {page+1}
          </div>

          <Button className='h-[45px]' variant="outline-primary" onClick={handleNextButtonClick} disabled={page >= Math.ceil(filteredRows.length / rowsPerPage) - 1}>
            Prev
          </Button>
        </div>
      </Card>
    </div>
  )
}
