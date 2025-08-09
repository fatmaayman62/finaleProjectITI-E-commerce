import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";

function ProductDetails() {
    let [CounterProductDetails, setCounterProductDetails] = useState(null);
    let [CategoryProducts, setCategoryProducts] = useState([]);
    let { id ,category } = useParams();
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

    console.log(id);

    function getProductDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
              console.log(data?.data);
                setCounterProductDetails(data?.data);

            })
            .catch(() => {  
            });

    }
    function getAllproductsRelated(category) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let relatedProducts=(data.data).filter((item)=> item.category.name == category);
                setCategoryProducts(relatedProducts);

            })
            .catch(() => { 
            });

    }

    useEffect(() => {
        getProductDetails(id);
        getAllproductsRelated(category);
    }, [id , category]);

    return (
        <>
        {  (CounterProductDetails && CategoryProducts)?<><div className="wrapperDetails">
            <div className="img">
 
              <Slider {...settings}> 
                {(CounterProductDetails?.images).map(src =><img src={src} alt="" />)}

             </Slider>
            </div>
            
            <div className="product_info">
                <h2>{CounterProductDetails.title}</h2>
                <article>{CounterProductDetails.description}</article>

                <div className="data_of_product">
                    <span>{CounterProductDetails.price} EGP</span>
                    <span>{CounterProductDetails.ratingsAverage} <i className='fas fa-star'></i></span>
                </div>
                <div className="btn">
                    <button>add to card</button>
                </div>
            </div>
        </div> 
      <div className="container">
        <div> 
          {CategoryProducts.map((item) => <div key={item.id} className='box'>
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
        )}
        </div>
      </div>
        </>:<div className="spinerLoding"><span className="loader"></span></div>}

        </>
    )
}

export default ProductDetails;
