import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/foodData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade custom-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-caption d-flex justify-content-center align-items-center flex-column">
            <form className="d-flex search-bar">
              <input
                className="form-control search-input"
                type="search"
                placeholder="Search for delicious food..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-success search-button"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?cs=srgb&dl=pexels-saveurssecretes-5560763.jpg&fm=jpg"
              className="d-block w-100 carousel-image"
              alt="Delicious Food 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://t3.ftcdn.net/jpg/06/16/85/60/360_F_616856040_zCvPMQkPFOWsVb3Hxo7mQUYzlzciFCZs.jpg"
              className="d-block w-100 carousel-image"
              alt="Delicious Food 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://t3.ftcdn.net/jpg/05/60/70/82/240_F_560708240_pMZPOuSfvblWGRoaiZFLT4wiFTzQPwQe.jpg"
              className="d-block w-100 carousel-image"
              alt="Delicious Food 3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev custom-carousel-control"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next custom-carousel-control"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container my-4">
        {foodCat.length > 0 ? foodCat.map((data) => (
          <div key={data._id} className="mb-5">
            <h2 className="fs-3 mb-3 category-title">{data.CategoryName}</h2>
            <hr />
            <div className="row">
              {foodItem.length > 0 ? (
                foodItem
                  .filter((item) =>
                    item.CategoryName === data.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-4 mb-4"
                    >
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <div className="text-center">No Such Data Found</div>
              )}
            </div>
          </div>
        )) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// Embedded CSS

const homeStyles = `
.custom-carousel {
  position: relative;
  max-height: 500px;
  overflow: hidden;
}

.carousel-image {
  object-fit: cover;
  max-height: 500px;
  filter: brightness(40%);
}

.carousel-caption {
  bottom: 20%;
}

.search-bar {
  max-width: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50px;
}

.search-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 50px;
  border: none;
  outline: none;
  font-size: 1rem;
}

.search-button {
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-size: 1rem;
  border: none;
}

.custom-carousel-control {
  width: 5%;
}

.custom-carousel-control .carousel-control-prev-icon,
.custom-carousel-control .carousel-control-next-icon {
  filter: invert(100%);
  opacity: 0.8;
}

.custom-carousel-control:hover .carousel-control-prev-icon,
.custom-carousel-control:hover .carousel-control-next-icon {
  opacity: 1;
}

.category-title {
  font-size: 1.5rem;
  font-weight: bold;
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${homeStyles}</style>`);
