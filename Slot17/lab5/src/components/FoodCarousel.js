import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

const FoodCarousel = () => {
  const { colors } = useTheme();
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const res = await fetch("http://localhost:3001/carousels"); // lấy từ db.json
        const data = await res.json();
        setCarouselData(data);
      } catch (err) {
        console.error("Error fetching carousel data:", err);
      }
    };
    fetchCarouselData();
  }, []);

  const carouselStyle = {
    maxHeight: '400px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    border: `3px solid ${colors.secondary}`
  };

  const imageStyle = {
    height: '400px',
    objectFit: 'cover',
    filter: 'brightness(0.8)'
  };

  const captionStyle = {
    backgroundColor: `${colors.primary}99`,
    color: colors.text,
    padding: '20px',
    borderRadius: '10px 10px 0 0',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  };

  return (
    <div className="mb-5">
      <Carousel style={carouselStyle} interval={3000} controls indicators fade>
        {carouselData.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={item.src}
              alt={item.alt}
              style={imageStyle}
            />
            <Carousel.Caption style={captionStyle}>
              <h3>{item.caption}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default FoodCarousel;
