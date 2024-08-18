import React from 'react';
import { useCart } from '../components/ContextReducer';
import { useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className='cart-empty-message'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/OrderData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="cart-container">
      <div className='table-container'>
        <table className='cart-table'>
          <thead className='table-header'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Option</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="cart-item">
                <td>{index + 1}</td>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button 
                    type="button" 
                    className="delete-button" 
                    onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-price">
          Total Price: {totalPrice}/-
        </div>
        <div className="checkout-button-container">
          <button className='checkout-button' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

// Styling
const styles = `
  .cart-container {
    background: url('https://images.unsplash.com/photo-1516880711640-7fcead2d80cd') no-repeat center center;
    background-size: cover;
    padding: 20px;
    min-height: 100vh;
    color: white;
  }
  
  .cart-empty-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
  }

  .cart-empty-message {
    font-size: 2rem;
    color: white;
    text-align: center;
  }
  
  .table-container {
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 10px;
    max-width: 800px;
    margin: auto;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  }

  .cart-table {
    width: 100%;
    border-collapse: collapse;
  }

  .table-header {
    background-color: #28a745;
    color: white;
  }

  .table-header th {
    padding: 10px;
    font-size: 1.1rem;
  }

  .cart-item {
    border-bottom: 1px solid #ccc;
  }

  .cart-item td {
    padding: 12px;
    font-size: 1rem;
  }

  .delete-button {
    background-color: #dc3545;
    border: none;
    padding: 8px 12px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .delete-button:hover {
    background-color: #c82333;
  }

  .total-price {
    margin-top: 20px;
    font-size: 1.8rem;
    text-align: right;
  }

  .checkout-button-container {
    text-align: right;
    margin-top: 20px;
  }

  .checkout-button {
    background-color: #28a745;
    border: none;
    padding: 12px 24px;
    color: white;
    font-size: 1.2rem;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .checkout-button:hover {
    background-color: #218838;
  }
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
