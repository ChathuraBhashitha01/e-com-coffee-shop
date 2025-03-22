import React, { useEffect, useState } from 'react'
import {Table ,Button ,Card,Form  } from "react-bootstrap";
import RemoveIcon from "../assets/delete.png";

interface Props {
  rows: any[];
  selectedRow: (row: any) => void;
  deletedRow: (row: any) => void;
}

export default function OrderTable({rows,selectedRow,deletedRow}: Props) {

  const [page, setPage] = useState(0);
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [serchName, setSerchName] = useState("");

  const emptyRows = Math.max(
    0,
    8 - filteredRows.slice(page * 8, page * 8 + 8).length
  );
    
  const handleRowClick = (row: any) => {
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

  const handleChangeSearchInput = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setSerchName(value);
  };

  const handleDeleteItem =(item:any)=>{
    if(deletedRow){
        deletedRow(item.username)
      }
  }

    useEffect(() => {

        if(serchName === ""){
            setFilteredRows(rows);
        }

        let filtered = rows.filter((row) =>
            row.userName.toLowerCase().includes(serchName.toLowerCase())
        );
  
      setFilteredRows(filtered);

    }, [rows, serchName]);

  return (
    <Card className=" w-[45vw] min-h-[80vh] flex flex-col justify-center items-center bg-white shadow-xl rounded-lg">

        <div className='w-[50vw] h-[100px] flex flex-row justify-center items-center '>
            <label className="text-[20px] font-serif mr-7">Enter User For Search</label>
            <Form.Control
                className=" max-w-[40%] h-[50px] bg-white rounded-lg"
                placeholder="Search Item Here"
                onChange={handleChangeSearchInput}
            />
        </div>
      
        <div className=" w-[90%] h-[92%] shadow-xl">
            <Table hover borderless  responsive="sm" className="border-collapse">
            <thead className=" text-black 'h-[50px]">
                <tr>
                <th style={{ width: "40%" }} className="p-3 border border-gray-300">User Name</th>
                <th style={{ width: "40%" }} className="p-3 border border-gray-300">Name</th>
                <th style={{ width: "40%" }} className="p-3 border border-gray-300"></th>
                
                </tr>
            </thead>
            <tbody style={{ height: 250 }}>
                {(8 > 0 ? filteredRows.slice(page * 8, page * 8 + 8) : filteredRows ).map((row) => (
                <tr className="hover:bg-blue-100 transition" onClick={() => handleRowClick(row)}>
                    <td className="p-3">{row.userName}</td>
                    <td className="p-3  ">{row.name}</td>
                    <td className="p-3  flex flex-row justify-center items-center"><img onClick={() => handleDeleteItem(row)} className=' max-w-[30px] max-h-[30px] cursor-pointer rounded-full' src={RemoveIcon} /></td>
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
