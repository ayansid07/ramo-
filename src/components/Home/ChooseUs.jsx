import React from 'react';
import { Fade } from 'react-awesome-reveal';

function ChooseUs() {

  return (
  
    <div className="mx-auto py-5 mb-16">
      <h1 className="text-gray-800 font-mono text-center text-xl sm:text-3xl font-bold">WHY CHOOSE US?</h1>
      <div className="card grid grid-cols-1 my-5 mx-4 sm:grid-cols-1 sm:grid lg:grid lg:grid-cols-2 gap-6 md:px-8 px-2">
        <Fade triggerOnce direction='left'>
          <div className='border-2 border-gray-600 rounded-3xl overflow-hidden grid sm:grid-cols-2'>
            <img src="https://eathomie-com.s3.amazonaws.com/images/home-made-food-1224.jpg" alt="image1" className='w-auto order-1 h-full rounded-3xl object-cover' />
            <h1 className="text-gray-800 text-center text-2xl py-5 order-2 sm:flex sm:justify-center sm:items-center">Made With 🖤 By Home🏠 <br /> Chef🧑‍🍳 Only</h1>
          </div>
        </Fade>
        <Fade triggerOnce direction='right'>
          <div className='border-2 border-gray-600 rounded-3xl overflow-hidden grid sm:grid-cols-2'>
            <img src="https://eathomie-com.s3.amazonaws.com/images/small-batch-1224.jpg" alt="image1" className='w-auto sm:order-2 lg:order-1 h-full rounded-3xl object-cover' />
            <h1 className="text-gray-800 text-center text-2xl py-5 px-1 sm:order-1 lg:order-2 sm:flex sm:justify-center sm:items-center">All Meals Are Prepared Fresh That Day, NO Frozen Foods, NO Preservatives.</h1>
          </div>
        </Fade>
        <Fade triggerOnce direction='left'>
          <div className='border-2 border-gray-600 rounded-3xl overflow-hidden grid sm:grid-cols-2'>
            <img src="https://eathomie-com.s3.amazonaws.com/images/fresh-food-1224.jpg" alt="image1" className='w-auto md:order-1 lg:order-2 h-full rounded-3xl object-cover' />
            <h1 className="text-gray-800 text-center text-2xl py-5 sm:order-2 lg:order-1 px-1 sm:flex sm:justify-center sm:items-center">Authentic - Sindhi, Maharashtrian, Gujarati, Bengali, Punjabi & So Much More!</h1>
          </div>
        </Fade>
        <Fade triggerOnce direction='right'>
          <div className='border-2 border-gray-600 rounded-3xl overflow-hidden grid sm:grid-cols-2'>
            <img src="https://eathomie-com.s3.amazonaws.com/images/disposable-packaging.jpg" alt="image1" className='w-full sm:order-2 lg:order-2 rounded-3xl object-cover'  />
            <h1 className="text-gray-800 text-center text-2xl py-5 sm:order-1 lg:order-1 px-1 sm:flex sm:justify-center sm:items-center">The Most Convenient Way to Order from Home Chefs Around You.</h1>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default ChooseUs;
