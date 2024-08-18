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
                <h2 style={styles.header}>My Orders</h2>
                <div className="row">
                    {orderData && Array(orderData).map(data => (
                        data.orderData ?
                            data.orderData.order_data.slice(0).reverse().map((item) => (
                                item.map((arrayData) => (
                                    <div className="col-12 col-md-6 col-lg-4" style={styles.orderCard} key={arrayData.id}>
                                        {arrayData.Order_date ? (
                                            <div style={styles.orderDate}>
                                                {new Date(arrayData.Order_date).toLocaleDateString()}
                                            </div>
                                        ) : (
                                            <div style={styles.card}>
                                                <div style={styles.cardImage}></div>
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
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
        fontFamily: `'Poppins', sans-serif`,
    },
    container: {
        padding: '2rem 1rem',
        maxWidth: '1200px',
        margin: 'auto',
    },
    header: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#ff6347',
        textAlign: 'center',
        marginBottom: '2rem',
        textTransform: 'uppercase',
    },
    orderCard: {
        marginBottom: '2rem',
    },
    card: {
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: '#ffffff',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transform: 'scale(1)',
    },
    cardImage: {
        height: '150px',
        backgroundImage: 'url("https://via.placeholder.com/300")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    cardBody: {
        padding: '1.5rem',
        position: 'relative',
        background: 'linear-gradient(145deg, #ff6347, #ff4500)',
        color: '#ffffff',
    },
    cardTitle: {
        fontSize: '1.4rem',
        fontWeight: '700',
        marginBottom: '1rem',
    },
    orderDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        flexWrap: 'wrap',
    },
    badge: {
        backgroundColor: '#ff7f50',
        color: '#fff',
        borderRadius: '12px',
        padding: '0.5rem 1rem',
        margin: '0.25rem 0',
        fontSize: '0.85rem',
        fontWeight: '600',
    },
    dateBadge: {
        backgroundColor: '#ff4500',
    },
    price: {
        marginTop: '1rem',
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#fff',
        textAlign: 'right',
    },
    orderDate: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#ff6347',
        textAlign: 'center',
        margin: '1rem 0',
        textTransform: 'uppercase',
    },
};
