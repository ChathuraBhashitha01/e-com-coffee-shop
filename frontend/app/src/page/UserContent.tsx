import {Route, Routes} from "react-router-dom";
import UserHomeScreen from '../page/UserHomeScreen';
import UserCartScreen from '../page/UserCartScreen';
import UserOrderScreen from '../page/UserOrderScreen';

export default function MainContent() {

    return (
        <div className="overflow-hidden">
            <Routes>
                <Route path="/"  Component={UserHomeScreen}/>
                <Route path="/cart" Component={UserCartScreen}/>
                <Route path="/order" Component={UserOrderScreen}/>
            </Routes>
        </div>
    );
}