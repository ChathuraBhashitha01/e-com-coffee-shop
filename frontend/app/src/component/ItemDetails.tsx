import React from 'react'
import {InputGroup,Form ,Card,Col ,Image  } from "react-bootstrap";

export default function ItemDetails() {
  return (
    <Card className="w-[500px] min-h-[800px] flex flex-col justify-start items-center bg-white shadow-xl rounded-lg">
        <Col xs={6} md={4}>
          <Image src="holder.js/171x180" thumbnail />
        </Col>
        <InputGroup className=" h-[40px] mt-10 mb-4">
            <InputGroup.Text className=" h-[40px]">Code</InputGroup.Text>
            <Form.Control className=" h-[40px]" aria-label="Item Code" />
        </InputGroup>

        <InputGroup className=" h-[40px] mb-4">
            <InputGroup.Text className=" h-[40px]" >Name</InputGroup.Text>
            <Form.Control className=" h-[40px]"  aria-label="Item Code" />
        </InputGroup>

        <InputGroup className=" h-[40px] mb-4">
            <InputGroup.Text className=" h-[40px]" >Description</InputGroup.Text>
            <Form.Control className=" h-[40px]"  aria-label="Item Code" />
        </InputGroup>

        <InputGroup className=" h-[40px] mb-4">
            <InputGroup.Text className=" h-[40px]" >Category</InputGroup.Text>
            <Form.Control className=" h-[40px]"  aria-label="Item Code" />
        </InputGroup>

        <InputGroup className=" h-[40px] mb-4">
            <InputGroup.Text className=" h-[40px]" >Quantity</InputGroup.Text>
            <Form.Control className=" h-[40px]"  aria-label="Item Code" />
        </InputGroup>

        <InputGroup className=" h-[40px] mb-4">
            <InputGroup.Text className=" h-[40px]" >Price</InputGroup.Text>
            <Form.Control className=" h-[40px]"  aria-label="Item Code" />
        </InputGroup>
    </Card>
  )
}
