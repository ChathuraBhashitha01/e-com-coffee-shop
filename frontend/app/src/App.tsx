import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from './page/UserLayout';
import LoginPage from './page/LoginPage';

function App() {

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/user/*" Component={UserLayout}/>
              <Route path="/" Component={LoginPage}/>
              {/* <Route path="/signup" Component={Signup}/>
              <Route path="/user/*" Component={UserLayout}/>
              <Route path="/nav" Component={UserNavBar}/> */}
          </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
