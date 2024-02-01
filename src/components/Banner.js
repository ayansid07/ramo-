import React from 'react';

import Image from '../assets/avatar.svg';

import { FaGithub, FaYoutube, FaDribbble } from 'react-icons/fa';

import { TypeAnimation } from 'react-type-animation';

import { motion } from 'framer-motion';

import { fadeIn } from '../variants';

const Banner = () => {
  return (
    <section className="section" id="home">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-x-12">
        <div className="text-center font-secondary lg:text-left lg:w-1/2" >
          <motion.h1 
          variants={fadeIn('up', 0.3)} 
          initial="hidden"
          whileInView={'show'}
          viewport={{once:false, amount:0.7}}
          className="text-5xl lg:text-7xl font-bold leading-tight">
            BEN <span>AIDEN</span>
          </motion.h1>
          <motion.div 
           variants={fadeIn('up', 0.4)} 
           initial="hidden"
           whileInView={'show'}
           viewport={{once:false, amount:0.7}}
           className="mb-6 text-2xl lg:text-4xl font-secondary font-semibold uppercase leading-tight">
            <span className="text-white mr-4">I am a</span>
            <TypeAnimation
              sequence={['Developer', 2000, 'Designer', 2000, 'Youtuber', 2000]}
              speed={50}
              className="text-accent"
              wrapper="span"
              repeat={Infinity}
            />
          </motion.div>
          <motion.p 
           variants={fadeIn('up', 0.5)} 
           initial="hidden"
           whileInView={'show'}
           viewport={{once:false, amount:0.7}}
          className="mb-8 max-w-lg mx-auto lg:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </motion.p>
          <motion.div 
           variants={fadeIn('up', 0.6)} 
           initial="hidden"
           whileInView={'show'}
           viewport={{once:false, amount:0.7}}
           className="flex max-w-max gap-x-6 items-center mb-12 mx-auto lg:mx-0">
            <button className="btn btn-lg">Contact me</button>
            <a href="#" className="text-gradient btn-link">
              My Portfolio
            </a>
          </motion.div>
          <motion.div 
           variants={fadeIn('up', 0.7)} 
           initial="hidden"
           whileInView={'show'}
           viewport={{once:false, amount:0.7}}
           className="flex text-lg gap-x-6 max-w-max mx-auto lg:mx-0">
            <a href="#">
              <FaYoutube />
            </a>
            <a href="#">
              <FaGithub />
            </a>
            <a href="#">
              <FaDribbble />
            </a>
          </motion.div>
        </div>
        <motion.div 
         variants={fadeIn('down', 0.5)} 
         initial="hidden"
         whileInView={'show'}
         className="w-full lg:w-1/4">
          <img src={Image} alt="" className="w-full h-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
