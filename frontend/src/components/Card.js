import React, { useEffect, useState, useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

function Card(props) {
    let dispatch = useDispatchCart({});
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(" ");

    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
                return;
            } else if (food.size !== size) {
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: qty,
                    size: size,
                    img: props.ImgSrc,
                });
                return;
            }
            return;
        }
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
        });
    };

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div className="card-container">
            <div className="card">
                <img src={props.foodItem.img} className="card-img-top" alt={props.foodItem.name} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="card-options">
                        <select className="form-select" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <select className="form-select" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>
                                    {data}
                                </option>
                            ))}
                        </select>
                        <div className="price">
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className="btn-add-to-cart" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;

// Embedded CSS
const cardStyles = `
.card-container {
    margin: 1rem;
    display: flex;
    flex-wrap: wrap; /* Allows cards to wrap to new lines */
    justify-content: center; /* Center align the cards */
}

.card {
    width: 19rem;
    max-height: 400px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    background-color: #fff;
    cursor: pointer;
    margin: 0.5rem; /* Adds spacing between cards */
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.card-img-top {
    height: 170px;
    object-fit: cover;
    border-bottom: 2px solid #f1f1f1;
}

.card-body {
    padding: 1rem;
}

.card-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
    color: #333;
}

.card-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 15px;
}

.form-select {
    width: 45%;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    color: #333;
}

.price {
    font-size: 1.25rem;
    font-weight: bold;
    color: #27ae60;
}

.btn-add-to-cart {
    width: 100%;
    padding: 0.75rem;
    background-color: #27ae60;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.2s;
}

.btn-add-to-cart:hover {
    background-color: #219150;
}

hr {
    margin: 1rem 0;
    border-color: #f1f1f1;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
    .card {
        width: 15rem; /* Smaller cards for medium screens */
    }
}

@media (max-width: 992px) {
    .card {
        width: 13rem; /* Even smaller cards for smaller screens */
    }
}

@media (max-width: 768px) {
    .card {
        width: 100%; /* Full width cards on very small screens */
    }

    .card-options {
        flex-direction: column;
        align-items: stretch;
    }

    .form-select {
        width: 100%;
        margin-bottom: 0.5rem; /* Add spacing between selects */
    }
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${cardStyles}</style>`);
