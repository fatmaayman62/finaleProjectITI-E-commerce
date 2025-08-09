import React from 'react';
import GetData from './../GetData/GetData';
import SliderCategories from '../SliderCategories/SliderCategories';
import MainShow from '../MainShow/MainShow';

function Home(){
  return (
    <> 
    <MainShow />
      <SliderCategories /> 
      <h2 className="heading">
        Products
      </h2>
       <div className="container"> 
      <GetData url="/api/v1/products" />
      </div>
    </>
  );
}

export default Home;
