import {Route, Routes} from "react-router-dom";
import UserHomeScreen from '../page/UserHomeScreen';
import UserCartScreen from '../page/UserCartScreen';
import UserOrderScreen from '../page/UserOrderScreen';
import { useState } from "react";

export default function MainContent() {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [removedItem, setRemovedItem] = useState({});

    const selectedSubmit = (data: any) => {
        console.log(data)
        setSelectedItem(data);
    };

    const selectedRemove = (data: any) => {
        setRemovedItem(data);
    };
    return (
        <div className="overflow-hidden">
            <Routes>
                <Route path="/"  element={<UserHomeScreen selectedItemOfHome={selectedSubmit} />}/>
                <Route path="/cart" element={<UserCartScreen ItemRow={selectedItem} selectedRow={selectedRemove} /> }/>
                <Route path="/order" Component={UserOrderScreen}/>
            </Routes>
        </div>
    );
}