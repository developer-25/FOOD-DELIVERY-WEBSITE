import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

// const BASE_URL=process.env.BASE_URL;
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
      <div>
        <Navbar />
      </div>
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade custom-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-caption d-flex justify-content-center align-items-center flex-column">
            <div className="d-flex search-bar">
              <input
                className="form-control me-2 search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
              />
              <button
                className="btn search-button"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
              className="d-block w-100 carousel-image"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://t3.ftcdn.net/jpg/06/16/85/60/360_F_616856040_zCvPMQkPFOWsVb3Hxo7mQUYzlzciFCZs.jpg"
              className="d-block w-100 carousel-image"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://t3.ftcdn.net/jpg/05/60/70/82/240_F_560708240_pMZPOuSfvblWGRoaiZFLT4wiFTzQPwQe.jpg"
              className="d-block w-100 carousel-image"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
      {/* <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-16 col-md-8 col-lg-4"
                          >
                            
                            <Card foodItem={filterItems}
                              
                              options={filterItems.options[0]}
                            
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>"No Such Data Found"</div>
                  )}
                </div>
              );
            })
          : ""}
      </div> */}
      <div className="container">
  {foodCat.length > 0 ? (
    foodCat.map((data) => (
      <div key={data._id} className="mb-3">
        <h3 className="m-3">{data.CategoryName}</h3>
        <hr />
        {foodItem.length > 0 ? (
          foodItem
            .filter(
              (item) =>
                item.CategoryName === data.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((filterItems) => (
              <div key={filterItems._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <Card
                  foodItem={filterItems}
                  options={filterItems.options[0]}
                />
              </div>
            ))
        ) : (
          <div className="text-center">No Data Found</div>
        )}
      </div>
    ))
  ) : (
    <div className="text-center">Loading...</div>
  )}
</div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
