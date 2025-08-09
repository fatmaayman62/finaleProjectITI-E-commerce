import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";



function SliderCategories() { 
    let [CategoryProducts, setCategoryProducts] = useState([]);
  

    let settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 6,
        slidesToScroll: 3,
        autoplay:true
    };
    function getProductDetails() {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then(({ data }) => {
                setCategoryProducts(data?.data);
                console.log(CategoryProducts); 
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
          {CategoryProducts.length > 0 ?  
               <div className="imgSlider">
              
                           <Slider {...settings}> 
                            
                                {(CategoryProducts).map(src => <img src={src.image} alt="" />
                                   )}
                           
                          </Slider>
                         </div>
        :null}
            
        </>
    )
}

export default SliderCategories;


 

   

 
           

 