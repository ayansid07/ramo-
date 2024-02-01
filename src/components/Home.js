import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeroSlider from './Home/HeroSlider';
import ChooseUs from './Home/ChooseUs';

const foodImages = [
  'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/qtpsoowwuhuxpqrw6lme',
  'https://th.bing.com/th/id/OIP.bNAsKRSjSenKv6zK0Y2QMQHaEK?rs=1&pid=ImgDetMain',
  'https://lh3.googleusercontent.com/JNWn6G0VL8R5U1J7jS8Hl8MbDd8Y6spv-X7BfSQTiO2orgAdCab9SVY3c26WMDhmJXss8DTmY5v8Z_9zwfTQl4Qo22mv=w1000',
];

const Home = () => {

  return (
    <div>
     <HeroSlider/>
      <ChooseUs/>
      


    </div>
  );
};

export default Home;
