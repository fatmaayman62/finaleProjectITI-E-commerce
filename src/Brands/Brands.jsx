import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";

function Brands() {
  let [CategoryProducts, setCategoryProducts] = useState([]);
  function getProductDetails() {
 
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then(({ data }) => { 
        console.log(CategoryProducts);
        setCategoryProducts(data?.data);

      })
      .catch(() => {
      });

  }
  useEffect(() => {
    getProductDetails();
    console.log(CategoryProducts);
  }, [CategoryProducts]);
  return (
    <>
    <div className="container">
    <div>

      {CategoryProducts.length === 0 ?<div className="spinerLoding"><span className="loader"></span></div>:CategoryProducts.map((item) => <div key={item._id} className='box'>
         <img src={item.image} />
          <div className="info">
          <h3>{item.name}</h3> 
          </div> 
          </div>
        )
      }
    </div>
    </div>
    </>
  );
}

export default Brands;


