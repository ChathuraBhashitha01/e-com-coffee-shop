import {Route, Routes} from "react-router-dom";
import ItemControllerScreen from '../page/ItemControllerScreen';
import OrderDetailsScreen from '../page/OrderDetailsScreen';
import UserManagementScreen from '../page/UserManagementScreen';

export default function MainContent() {
  

    return (
        <div className="overflow-hidden">
            <Routes>
                <Route path="/" Component={OrderDetailsScreen} />
                <Route path="/item" Component={ItemControllerScreen}/>
                <Route path="/user" Component={UserManagementScreen}/>
            </Routes>
        </div>
    );
}