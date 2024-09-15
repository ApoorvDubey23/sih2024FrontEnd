import './App.css';
import Home from './components/home.js';
import Login from './components/login.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/signup.js';
import { HistoryProvider } from './Contexts/HistoryContext.js';
import { UserProvider } from './Contexts/UserContext.js';
function App() {
  return (
      <HistoryProvider>
        <UserProvider>
      <BrowserRouter>

      
      <Routes>
<Route path='/' element={<Login/>}/>
<Route path='/signup' element={<SignUp/>}/>
<Route path='/home' element={<Home/>}/>


      
      </Routes>
      </BrowserRouter>
      </UserProvider>
      </HistoryProvider>

  );
}

export default App;
