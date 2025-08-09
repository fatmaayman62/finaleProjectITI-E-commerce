import React from 'react';
import GetData from '../GetData/GetData';
 
function Products(){
  return (
    <>
    <div className="container"> 
      <GetData url="/api/v1/products" />
    </div>
    </>
  );
}

export default Products;
