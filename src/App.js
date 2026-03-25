import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AddProduct from './components/AddProduct';
import MpesaPayment from './components/MpesaPayment';
import NavBar from './components/NavBar';
import GetProduct from './components/GetProduct';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from './components/Carousel';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src="/img/banner2.png" style={{
          width: '100%',
          height: '20Vh',
          objectFit: 'cover'
        }} />
        </header>
        <NavBar /> {/* We create navigation to the routes */}

        {/* Map your single routes */}
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/mpesapayment' element={<MpesaPayment />} />
          {/* This is the default component */}
          <Route path='/' element={<GetProduct />} />
        </Routes>

      </div>
      <div>
     
      </div>
      

    </BrowserRouter >

  );
}

export default App;
