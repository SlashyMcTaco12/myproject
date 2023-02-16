import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import SignForm from './components/SignForm';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/NotFound';
import AddCard from './components/AddCard';
import MyCards from './components/MyCards';
import AllCards from './components/AllCards';
import NoPerms from './components/NoPerms';
import Footer from './components/Footer';
import About from './components/About';


function App() {
  let [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem("isLoggedIn") == 'true' ? true : false);
  let [isBusiness, setIsBusiness] = useState<boolean>(localStorage.getItem("isBusiness") == 'true' ? true : false);
  useEffect(() => { }, [isLoggedIn])
  return (
    <>
      <div className='bg-dark' style={{ width: '100vw', height: '95vh', overflow: 'hidden' }}>
        <Router>
          <ToastContainer />
          <Navbar isLoggedIn={isLoggedIn}
            isBusiness={isBusiness}
            setIsLoggedIn={setIsLoggedIn}
            setIsBusiness={setIsBusiness}
          />
          {isLoggedIn ? (
            isBusiness ? (
              <Routes>
                <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>} />
                <Route path='/addcard' element={<AddCard />} />
                <Route path='/mycards' element={<MyCards />} />
                <Route path='/allcards' element={<AllCards />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
            ) : (
              <Routes>
                <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>} />
                <Route path='/allcards' element={<AllCards />} />
                <Route path='/addcard' element={<NoPerms />} />
                <Route path='/mycards' element={<NoPerms />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
            )
          ) : (
            <Routes>
              <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>} />
              <Route path='/about' element={<About />} />
              <Route
                path='/signform'
                element={
                  <SignForm setIsLoggedIn={setIsLoggedIn} setIsBusiness={setIsBusiness} />}
              />
              <Route path='/addcard' element={<NoPerms />} />
              <Route path='/mycards' element={<NoPerms />} />
              <Route path='/allcards' element={<NoPerms />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          )
          }
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
