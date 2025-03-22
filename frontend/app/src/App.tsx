import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from './page/UserLayout';
import AdminLayout from './page/AdminLayout';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUp';

function App() {

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/user/*" Component={UserLayout}/>
              <Route path="/" Component={LoginPage}/>
              <Route path="/admin/*" Component={AdminLayout}/>
              <Route path="/signup" Component={SignUpPage}/>
          </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
