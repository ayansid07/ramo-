import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Branches from './pages/Branches';
import Members  from "./pages/Members";
import Accounts  from "./pages/Accounts";
import Repayments  from "./pages/Repayments";
import Loans  from "./pages/Loans";
import Deposit  from "./pages/Deposit";
import Login from './pages/login';
import Register from './pages/register';
// import Withdraw  from "./pages/Withdraw";
// import Transaction  from "./pages/Transaction";
// import Expense  from "./pages/Expense";
// import User  from "./pages/User";
// import Report  from "./pages/Report";
// import System  from "./pages/System";
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a valid token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Verify the token on the server to check its validity
      axios.get('http://localhost:3001/verify-token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          // Token is valid, user is authenticated
          setAuthenticated(true);
        })
        .catch(() => {
          // Token is invalid, remove it from local storage
          localStorage.removeItem('token');
        });
    }
  }, []);

  return (
      <BrowserRouter>
      {authenticated ? (
            <AuthenticatedRoutes />
          ) : (
            <UnauthenticatedRoutes />
          )}
        </BrowserRouter>
        );
      };
      const AuthenticatedRoutes = () => {
        const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          setCurrentColor(currentThemeColor);
          setCurrentMode(currentThemeMode);
        }    

        return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                dashboard 
                <Route path="/" element={(<Ecommerce />)} />
                <Route path="/ecommerce" element={(<Ecommerce />)} />

                {/* pages  */}
   
                <Route path="/branches" element={<Branches />} />
                <Route path="/members" element={<Members />} />
                <Route path='/accounts' element={<Accounts/>}/>
                <Route path='/repayments' element={<Repayments/>}/>
                <Route path='/loans' element={<Loans/>}/>
                <Route path='/deposit' element={<Deposit/>}/>
                {/* <Route path='/transaction' element={<Transaction/>}/> */}
                {/* <Route path='/expense' element={<Expense/>}/> */}
                {/* <Route path='/user' element={<User/>}/> */}
                {/* <Route path='/report' element={<Report/>}/> */}
                {/* <Route path='/withdraw' element={<Withdraw/>}/> */}
                {/* <Route path='/system' element={<System/>}/> */}
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
        </div>
        );
      };

      // Unauthenticated routes component
      const UnauthenticatedRoutes = () => {
        return (
          <Routes>
            {/* Show the login page if not authenticated */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
           </Routes>
        );
      };

export default App;
