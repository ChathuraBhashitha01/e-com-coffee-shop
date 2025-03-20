import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from './page/UserLayout';

function App() {

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/*" Component={UserLayout}/>
              {/* <Route path="/login" Component={Login}/>
              <Route path="/signup" Component={Signup}/>
              <Route path="/user/*" Component={UserLayout}/>
              <Route path="/nav" Component={UserNavBar}/> */}
          </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
