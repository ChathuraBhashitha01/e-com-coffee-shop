import { useEffect, useState } from "react";
import CoverImage from "../assets/coffee_shop_cover.png";
import ItemCoverImage from "../assets/item_cover.jpg";
import Logo from "../assets/coffe_shop_logo.png";
import Item from './Item'
import { Card } from "react-bootstrap";

export default function ItemForm({ Items }: { Items: any[] }) {
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [searchCategory, setSearchCategory] = useState("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const handleChangeSearchCategory = (category: string) => {
    setSearchCategory(category);
  };

  useEffect(() => {
    setCategories(new Set(Items.map((item: any) => item.category)));
  }, [Items]);

  useEffect(() => {
    setFilteredItems(Items);
  }, [Items]);

  return (
    <div className="w-screen min-h-[1690px] h-auto flex flex-col">
      <Card className="w-[100%] max-w-[100%] min-h-[85px] flex flex-row justify-center bg-white shadow-xl">
        <img src={Logo} className="h-[65px]" />
        <div className="w-[10%] flex flex-row items-center justify-between gap-4">
          <label className="text-[20px] font-semibold">HOME</label>
          <label className="text-[20px] font-semibold">LOGIN</label>
        </div>
      </Card>
      <div>
        <img src={CoverImage} className="w-[1920px]" />
      </div>
      <Card className="w-[100%] min-h-[120px] flex flex-row justify-center bg-white shadow-xl">
        <div className="w-[100%] h-[120px] flex flex-row items-center justify-center gap-4">
          {Array.from(categories).map((category, index) => {
            return (
              <label className="text-[20px]" key={index} onClick={() => handleChangeSearchCategory(category)}>
                {category}
              </label>
            );
          })}
        </div>
      </Card>
      <div className="relative bg-cover bg-center w-full h-[570px] flex flex-col justify-center items-center" style={{ backgroundImage: `url(${ItemCoverImage})` }}>
        <div className="max-w-[95%] max-h-[75%] overflow-hidden relative">
          <div className="flex flex-row gap-4 w-max h-full overflow-x-auto">
            <Item />
            <Item />
            <Item />
            <Item />
            
          </div>
        </div>
      </div>
    </div>
  );
}
