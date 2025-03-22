import { useEffect, useState } from "react";
import CoverImage from "../assets/coffee_shop_cover.png";
import ItemCoverImage from "../assets/item_cover.jpg";
// import Logo from "../assets/coffe_shop_logo.png";
// import HomeIcon from "../assets/home .png";
// import CartIcon from "../assets/cart.png";
// import ProfileIcon from "../assets/profile.png";
import Item from './Item'
import { Card,Form } from "react-bootstrap";
// import {Link} from "react-router-dom";

interface Props {
  Items: any[];
  selectedItem: (row: any) => void;
}

export default function ItemForm({ Items ,selectedItem }: Props) {
  const [searchCategory, setSearchCategory] = useState("All");
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [serchName, setSerchName] = useState("");

  const handleItemClick = (row: any) => {
    if(selectedItem){
      selectedItem(row)
    }
  };

  const handleChangeSearchCategory = (category: string) => {
    setSearchCategory(category);
  };

  const handleChangeSearchInput = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setSerchName(value);
  };
  
  useEffect(() => {
    setCategories(new Set(Items.map((item: any) => item.category)));
  }, [Items]);
 
  useEffect(() => {
    let filtered = Items.filter((row) =>
      row.name.toLowerCase().includes(serchName.toLowerCase())
    );

    if (serchName === '') {
      
      filtered = Items.filter((row) =>
        row.category.toLowerCase().includes(searchCategory.toLowerCase())
      );

      if (searchCategory === "All" && serchName === '') {
        filtered = Items ;
      }
    };
    setFilteredItems(filtered);
  }, [Items, serchName, searchCategory]);

  return (
    <div className="w-screen h-auto flex flex-col">
    
      <div>
        <img src={CoverImage} className="w-[1920px]" />
      </div>

      <Card className="w-[100%] min-h-[120px] flex flex-row justify-center items-center bg-white shadow-xl">
        <div className="w-[100%] h-[120px] flex flex-row items-center justify-center gap-4">
          <label className=" cursor-pointer text-[20px] font-serif" onClick={() => handleChangeSearchCategory("All")}>
            All
          </label>

          {[...categories].map((category, index) => (
            <label
              key={index}
              className=" text-[20px] font-serif cursor-pointer"
              onClick={() => handleChangeSearchCategory(category)}
            >
              {category}
            </label>
          ))}

        <Form.Control
          className=" max-w-[20%] h-[50px] bg-white rounded-lg"
          placeholder="Search Item Here"
          onChange={handleChangeSearchInput}
        />
        </div>
      </Card>

      <div
        className="relative bg-cover bg-center w-full h-auto flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${ItemCoverImage})` }}
      >
        <div className="min-w-[95%] max-h-[75%] flex justify-center items-center">
          <div className="w-[90%] h-full mt-10 mb-10 grid grid-cols-5 gap-4 ">
            {filteredItems?.map((item, index) => (
              <div key={index} onClick={() => handleItemClick(item)}className="p-5 rounded-lg shadow-md">
                <Item name={item.name} description={"coiownhcw cnhoiwnbd nbcnwoinh incid"} price={item.price} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <div className="flex justify-center mb-4">
            <a href="mailto:contact@company.com" className="text-blue-400 hover:text-blue-500 mx-4">
                Email Us
            </a>
            <a href="tel:+1234567890" className="text-blue-400 hover:text-blue-500 mx-4">
                Call Us
            </a>
            </div>
            <p className="text-sm">&copy; 2025 Your Company Name. All rights reserved.</p>
        </div>
        </footer>
    </div>
  );
}
