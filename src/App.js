// import React from 'react';
// import Banner from './components/Banner';
// import Nav from './components/Nav';
// import About from './components/About';
// import Services from './components/Services';
// import Work from './components/Work';
// import Contact from './components/Contact';

// const App = () => {
//     return (
//         <div className='bg-site bg-no-repeat bg-cover overflow-hidden'>
//           <Header className='mb-20' />
//           {/* <Banner className='mb-20' /> */}
//           <Nav className='mb-20' />
//           {/* <About className='mb-200' />  */}
//     {/* <Services className='mb-200' />  */}
//           {/* <Work className='mb-200' />  */}
//           <Contact />
//           {/* <div className='h-[4000px]'></div> */}
//         </div>
//       );
//     };
    
// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Home from './components/Home';
import Plans from './components/Plans';
import Menu from './components/Menu';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Services from './components/Services';

const App = () => {
  return (
    <div className='bg-site bg-no-repeat bg-cover overflow-hidden'>
      <Router>
        <Header />
        <Nav /> {/* Place Nav component inside Router */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/plans' element={<Plans />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
