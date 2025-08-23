import { Carousel } from "react-bootstrap";

const HeroCarousel = () => {
  const carouselItems = [
    {
      title: "Delicious Food",
      description: "Discover Amazing Flavors",
      image: "/img/image7.png",
    },
    {
      title: "Amazing Collection",
      description: "Add your favorite dishes to your personal collection",
      image: "/img/image8.png",
    },
    {
      title: "Taste the Best",
      description: "Good Food!",
      image: "/img/image9.png",
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
            <div style={{ height: "500px", position: "relative" }}>
              <img
                className="d-block w-100 h-100"
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(34, 139, 34, 0.9)",
                  color: "#d6f5d6",
                  padding: "20px 30px",
                  borderRadius: "10px",
                  maxWidth: "600px",
                  textAlign: "center",
                }}
              >
                <h3 className="mb-2">{item.title}</h3>
                <p className="mb-0">{item.description}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
