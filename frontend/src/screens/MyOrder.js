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
        <div style={styles.page}>
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
                                                {new Date(arrayData.Order_date).toLocaleDateString()}
                                                <hr />
                                            </div>
                                        ) : (
                                            <div style={styles.card}>
                                                <div style={styles.cardBody}>
                                                    <h5 style={styles.cardTitle}>{arrayData.name}</h5>
                                                    <div style={styles.orderDetails}>
                                                        <span style={styles.badge}>{arrayData.qty} pcs</span>
                                                        <span style={styles.badge}>{arrayData.size}</span>
                                                        <span style={{ ...styles.badge, ...styles.dateBadge }}>{new Date(data).toLocaleDateString()}</span>
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
    page: {
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
    },
    container: {
        padding: '2rem 1rem',
        maxWidth: '1200px',
        margin: 'auto',
    },
    orderCard: {
        marginBottom: '2rem',
    },
    card: {
        borderRadius: '15px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },
    cardBody: {
        padding: '1.5rem',
    },
    cardTitle: {
        fontSize: '1.3rem',
        fontWeight: '600',
        color: '#343a40',
    },
    orderDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        flexWrap: 'wrap',
    },
    badge: {
        backgroundColor: '#6c757d',
        color: '#fff',
        borderRadius: '0.25rem',
        padding: '0.5rem 1rem',
        margin: '0.25rem 0',
        fontSize: '0.9rem',
    },
    dateBadge: {
        backgroundColor: '#007bff',
    },
    price: {
        marginTop: '1rem',
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#28a745',
        textAlign: 'right',
    },
    orderDate: {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#007bff',
        textAlign: 'center',
        margin: '1rem 0',
    },
};
