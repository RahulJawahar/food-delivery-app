import React, { useContext, useState, useEffect } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContent'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                url + "/api/order/userorders",
                {},
                { headers: { token } }
            )

            if (response.data.success) {
                setData(response.data.data || [])
            } else {
                setData([])
            }

        } catch (error) {
            console.log("FETCH ORDERS ERROR:", error)
            setData([])
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>

            <div className="container">

                {/* Empty state */}
                {data.length === 0 ? (
                    <p>No orders found</p>
                ) : (

                    data.map((order) => (
                        <div key={order._id} className="my-orders-order">

                            <img src={assets.parcel_icon} alt="" />

                            {/* Items display safely */}
                            <p>
                                {order.items && order.items.length > 0
                                    ? order.items.map((item, index) => (
                                        index === order.items.length - 1
                                            ? `${item.name} x ${item.quantity}`
                                            : `${item.name} x ${item.quantity}, `
                                    ))
                                    : "No items"}
                            </p>

                            <p>${order.amount}.00</p>

                            {/*  Safe item count */}
                            <p>Items: {order.items ? order.items.length : 0}</p>

                            <p>
                                <span>&#x25cf;</span>
                                <b> {order.status}</b>
                            </p>

                            <button>Track Order</button>

                        </div>
                    ))

                )}

            </div>
        </div>
    )
}

export default MyOrders