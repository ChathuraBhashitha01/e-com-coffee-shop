import { Card } from "react-bootstrap";
import Logo from "../assets/coffe_shop_logo.png";
import HomeIcon from "../assets/home .png";
import CartIcon from "../assets/cart.png";
import ProfileIcon from "../assets/profile.png";
import {Link} from "react-router-dom";

export default function UserNavBar() {

  return (
    <Card className="w-screen min-h-[85px] flex flex-row justify-between items-center bg-white shadow-xl">
    <img src={Logo} className="h-[65px]" />
    <div className="w-[10%] flex flex-row items-center justify-between gap-3">
      <div className="w-[100px] h-[20px] flex flex-row justify-center mr-4">
        <img src={HomeIcon} className="w-[20px] mr-1" />
        <label className="text-[15px] font-serif font-semibold flex flex-row cur"><Link to="/user/">HOME</Link></label>
      </div>

      <div className="w-[100px] h-[20px] flex flex-row justify-center mr-4">
        <img src={ProfileIcon} className="w-[20px] mr-1" />
        <label className="text-[15px] font-serif font-semibold flex flex-row cur"><Link to="/user/order">PROFILE</Link></label>
      </div>

      <div className="w-[100px] h-[20px] flex flex-row justify-center mr-4">
        <img src={CartIcon} className="w-[20px] mr-1" />
        <label className="text-[15px] font-serif font-semibold flex flex-row"><Link to="/user/cart">CART</Link></label>
      </div>
    </div>
    <div className="w-[100px] h-[20px] flex flex-row justify-center">
      <img src={ProfileIcon} className="w-[20px] mr-1" />
      <label className="text-[15px] font-serif font-semibold flex flex-row">LOGOUT</label>
    </div>
  </Card>
  )
}
