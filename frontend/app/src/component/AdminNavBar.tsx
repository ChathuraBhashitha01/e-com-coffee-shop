import { Card } from "react-bootstrap";
import Logo from "../assets/coffe_shop_logo.png";
import HomeIcon from "../assets/home .png";
import CartIcon from "../assets/cart.png";
import ProfileIcon from "../assets/profile.png";
import {Link} from "react-router-dom";

export default function UserNavBar() {

  return (
    <Card className="w-screen min-h-[85px] flex flex-row justify-between items-center bg-white shadow-xl">
      <img src={Logo} className="h-[65px] ml-10" />

      <div className="w-[20%] flex flex-row items-center justify-between ">
        <div className="w-[100px] h-[20px] flex flex-row justify-center mr-4">
          <img src={CartIcon} className="w-[20px] mr-1" />
          <label className="text-[15px] font-serif font-semibold flex flex-row cur"><Link to="/admin/">ORDERS</Link></label>
        </div>

        <div className="w-[100px] h-[20px] flex flex-row justify-center mr-4">
          <img src={HomeIcon} className="w-[20px] mr-1" />
          <label className="text-[15px] font-serif font-semibold flex flex-row cur"><Link to="/admin/item">ITEMS</Link></label>
        </div>

        <div className="w-[100px] h-[20px] flex flex-row justify-center mr-4">
          <img src={ProfileIcon} className="w-[20px] mr-1" />
          <label className="text-[15px] font-serif font-semibold flex flex-row"><Link to="/admin/user">USERS</Link></label>
        </div>
      </div>
      <div className="w-[100px] h-[20px] flex flex-row justify-center">
        <img src={ProfileIcon} className="w-[20px] mr-1" />
        <label className="text-[15px] font-serif font-semibold mr-32 flex flex-row"><Link to="/">LOGOUT</Link></label>
      </div>
  </Card>
  )
}
