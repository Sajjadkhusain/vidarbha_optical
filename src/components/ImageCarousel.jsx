import React from "react";
import Slider from "react-slick";
import "../style/ImageCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = () => {
  const images = [
    "/assets/img/offer1.jpg",
    "/assets/img/offer2.jpg",
    "/assets/img/offer3.jpg",
    "/assets/img/offer4.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="carousel-slide">
            <div className="carousel-card">
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="carousel-image"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
