import { Carousel } from "react-bootstrap";

const HeroSlider = () => {
  const carouselItems = [
    {
      title: "Elegant Style",
      description: "Discover the latest trends",
      image: "/img/slide1.png",
    },
    {
      title: "Timeless Collection",
      description: "Define your fashion statement",
      image: "/img/slide2.png",
    },
    {
      title: "Luxury Fashion",
      description: "Style that inspires confidence",
      image: "/img/slide3.png",
    },
  ];

  return (
    <div className="mb-5" style={{ width: "100%" }}>
      <Carousel
        controls={true}
        indicators={true}
        interval={5000}
        pause="hover"
        className="mb-0"
      >
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <div style={{ height: "500px", position: "relative", backgroundColor: "#000" }}>
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                style={{
                  width: "80%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto",     
                  backgroundColor: "#000",
                  borderRadius: "8px", 
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(4, 8, 4, 0.8)",
                  color: "#f1f1f1",
                  padding: "30px 40px",
                  borderRadius: "12px",
                  width: "40%",
                  maxWidth: "800px",
                  textAlign: "center",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                }}
              >
                <h3
                  className="mb-3"
                  style={{ fontSize: "2rem", fontWeight: "600" }}
                >
                  {item.title}
                </h3>
                <p className="mb-0" style={{ fontSize: "1.2rem" }}>
                  {item.description}
                </p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
