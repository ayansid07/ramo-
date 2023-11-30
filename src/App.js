import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Branches from './pages/Branches';
import Members  from "./pages/Members";
import Accounts  from "./pages/Accounts";
import Repayments  from "./pages/Repayments";
import Loans  from "./pages/Loans";
import Deposit  from "./pages/Deposit";
import Dashboard from './pages/Dashboard'
import Withdraw  from "./pages/Withdraw";
import Transaction  from "./pages/Transaction";
import Expense  from "./pages/Expense";
import User  from "./pages/User";
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import './App.css';


import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
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
        
            <div>
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                
                {/* pages  */}
                <Route path='/' element={<Dashboard/>}/>
                <Route path="/branches" element={<Branches />} />
                <Route path="/members" element={<Members />} />
                <Route path='/accounts' element={<Accounts/>}/>
                <Route path='/repayments' element={<Repayments/>}/>
                <Route path='/loans' element={<Loans/>}/>
                <Route path='/deposit' element={<Deposit/>}/>
                <Route path='/withdraw' element={<Withdraw/>}/>
                <Route path='/transaction' element={<Transaction/>}/>
                <Route path='/expense' element={<Expense/>}/>
                <Route path='/user' element={<User/>}/>
            

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
