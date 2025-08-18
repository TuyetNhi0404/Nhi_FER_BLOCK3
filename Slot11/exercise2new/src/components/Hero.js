"use client"
import { Carousel } from "react-bootstrap"

const HeroCarousel = () => {
  return (
    <Carousel className="mb-5">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/image11.png"
          alt="Students in classroom"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Welcome to Student Management System</h3>
          <p>Manage your students efficiently and effectively</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/image22.png"
          alt="Diverse students"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Track Student Progress</h3>
          <p>Monitor academic performance and achievements</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default HeroCarousel
