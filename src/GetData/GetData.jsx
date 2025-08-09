import React, { useEffect, useState } from 'react';
import axios  from 'axios';
import { Link } from 'react-router-dom';
function GetData(x){
  let [container,setConrainer]=useState([]);
  async function  loadedDat(){
    let {data}=await axios.get(`https://ecommerce.routemisr.com${x.url}`);
    setConrainer(data.data); 
  }
  useEffect(()=>{
    loadedDat();
  },[])
  return (
    <>
    <div >

      {(container.length === 0)?<div className="spinerLoding"><span className="loader"></span></div>:container.map((item) => <div key={item.id} className='box'>
        <Link className='Navlink' to={`/productDetails/${item.id}/${item.category.name}`}> 
          <img src={item.imageCover} />
          <div className="info">
          <h3>{item.category.name}</h3>
          <h4>{item.title.split(' ').slice(0,2).join(' ')}</h4>
          <div className="data_of_product">
            <span>{item.price} EGP</span>
            <span>{item.ratingsAverage} <i className='fas fa-star'></i></span>
          </div>
          <div className="btn">
            <button>add to card</button>
          </div>
          </div>
        </Link>
          </div>
        )
        }
    </div>
      
    </>
  );
}

export default GetData;
