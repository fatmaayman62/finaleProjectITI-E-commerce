import main1 from '../assets/main1.jpeg'
import main2 from '../assets/main2.jpeg'
import main3 from '../assets/main3.jpeg'
import alert1 from '../assets/alert1.jpeg'
import alert2 from '../assets/alert2.jpeg'
import Slider from "react-slick";


function MainShow() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };
    return (
        <>
            <div className="mainSlider">
                <div className="main">

                    <Slider {...settings}>
                    <img src={main1} alt="" />
                        <img src={main2} alt="" />
                        <img src={main3} alt="" />

                    </Slider>
                </div>
                <div className="slide"> 
                    <img src={alert1} alt="" />
                    <img src={alert2} alt="" />
                </div>
            </div>
        </>
    )
}

export default MainShow;
