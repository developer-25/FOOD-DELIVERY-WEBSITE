import React from 'react'

export default function Carousel() {
  return (

    <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit:"contain !important" }}>
      <div className="carousel-inner" id='carousel'>
        <div className="carousel-caption" style={{ zIndex: "10" }}><form class="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
        </form></div>
        <div className="carousel-item active">
          <img src="https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?cs=srgb&dl=pexels-saveurssecretes-5560763.jpg&fm=jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://t3.ftcdn.net/jpg/06/16/85/60/360_F_616856040_zCvPMQkPFOWsVb3Hxo7mQUYzlzciFCZs.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://t3.ftcdn.net/jpg/05/60/70/82/240_F_560708240_pMZPOuSfvblWGRoaiZFLT4wiFTzQPwQe.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div></div>
  )
}
