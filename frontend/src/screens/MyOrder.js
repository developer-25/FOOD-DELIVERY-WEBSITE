import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/myOrderData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json();
            setOrderData(response);
        });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div style={styles.container}>
                <div className="row">
                    {orderData && Array(orderData).map(data => (
                        data.orderData ? 
                            data.orderData.order_data.slice(0).reverse().map((item) => (
                                item.map((arrayData) => (
                                    <div className="col-12 col-md-6 col-lg-4" style={styles.orderCard} key={arrayData.id}>
                                        {arrayData.Order_date ? (
                                            <div style={styles.orderDate}>
                                                {data = arrayData.Order_date}
                                                <hr />
                                            </div>
                                        ) : (
                                            <div style={styles.card}>
                                                <div style={styles.cardBody}>
                                                    <h5 style={styles.cardTitle}>{arrayData.name}</h5>
                                                    <div style={styles.orderDetails}>
                                                        <span style={styles.badge}>{arrayData.qty}</span>
                                                        <span style={styles.badge}>{arrayData.size}</span>
                                                        <span style={{ ...styles.badge, ...styles.dateBadge }}>{data}</span>
                                                    </div>
                                                    <div style={styles.price}>
                                                        ₹{arrayData.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )) 
                        : null
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}

const styles = {
    container: {
        padding: '2rem 0',
    },
    orderCard: {
        marginBottom: '2rem',
    },
    card: {
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.3s, boxShadow 0.3s',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    cardBody: {
        padding: '1.5rem',
    },
    cardTitle: {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#007bff',
    },
    orderDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
    },
    badge: {
        backgroundColor: '#6c757d',
        color: '#fff',
        borderRadius: '0.25rem',
        padding: '0.25rem 0.5rem',
        margin: '0.5rem 0.25rem',
    },
    dateBadge: {
        backgroundColor: '#17a2b8',
    },
    price: {
        marginTop: '1rem',
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#28a745',
    },
    orderDate: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        margin: '1rem 0',
    },
};
