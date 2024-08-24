import React, { useState } from 'react';

export default function Carousel() {
  const [search, setSearch] = useState('');

  return (
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
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-success text-white bg-success"
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
  );
}

// Embedded CSS

const carouselStyles = `
.custom-carousel {
  position: relative;
  width: 100%;
  height: 80vh; /* Adjust this height as needed */
  overflow: hidden;
}

.carousel-inner {
  height: 100%;
}

.carousel-item {
  height: 100%;
}

.carousel-image {
  object-fit: cover; /* Ensures the image covers the container */
  width: 100%;
  height: 100%;
  filter: brightness(30%);
}

.carousel-caption {
  z-index: 10;
  bottom: 20%;
  text-align: center;
  font-size: 2rem;
  padding: 1rem;
}

.search-bar {
  max-width: 900px;
  width: 100%;
  margin-top: 1rem;
}

.search-input {
  flex: 1;
  padding: 1rem;
  border-radius: 2; /* Removes rounded corners */
  border: 1px solid #ced4da;
  font-size: 1.2rem;
}

.search-button {
  padding: 0.6rem 1.2rem;
  border-radius: 2; /* Matches button with input field */
  font-size: 1.2rem;
  border: 1px solid #28a745;
}

.carousel-control-prev,
.carousel-control-next {
  width: 5%;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(100%);
  opacity: 1;
}

.carousel-control-prev:hover .carousel-control-prev-icon,
.carousel-control-next:hover .carousel-control-next-icon {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .carousel-caption {
    font-size: 1.5rem;
    bottom: 15%;
  }

  .search-input {
    font-size: 1rem;
    padding: 0.8rem;
  }

  .search-button {
    font-size: 1rem;
    padding: 0.8rem;
  }
}

@media (max-width: 576px) {
  .carousel-caption {
    font-size: 1.2rem;
    bottom: 10%;
  }

  .search-input {
    font-size: 0.9rem;
    padding: 0.6rem;
  }

  .search-button {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${carouselStyles}</style>`);
