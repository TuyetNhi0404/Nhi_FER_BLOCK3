import { Carousel, Container } from "react-bootstrap"

const HeroCarousel = () => {
  const carouselItems = [
    {
      title: "Welcome to Movie Explorer",
      description: "Discover amazing movies from around the world",
      image: "/img/image1.png",
    },
    {
      title: "Build Your Collection",
      description: "Add your favorite movies to your personal collection",
      image: "/img/image2.png",
    },
    {
      title: "Request New Movies",
      description: "Can't find what you're looking for? Request it!",
      image: "/img/image3.png",
    },
  ]

  return (
    <>
     <div className="mb-5">
        <Container>
        </Container>
        <Carousel controls={true} indicators={true} interval={5000} pause="hover" className="mb-0">
          {carouselItems.slice(0, 3).map((item, index) => (
            <Carousel.Item key={index}>
              <div style={{ height: "400px", position: "relative" }}>
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
      </>
  )
}

export default HeroCarousel
