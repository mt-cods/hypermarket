import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './config';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState({}); // To store product names

  // Fetch orders data from the API
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('accessToken');  // Get the token from localStorage

      if (!token) {
        setError('No access token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/order`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Add the token to the Authorization header
          },
        });

        setOrders(res.data.orders || []);

        // After fetching orders, fetch the product details for each order
        const productIds = res.data.orders.reduce((acc, order) => {
          order.items.forEach(item => {
            if (!acc.includes(item.productId)) {
              acc.push(item.productId);
            }
          });
          return acc;
        }, []);

        // Fetch product details for each unique productId
        const productResponses = await Promise.all(
          productIds.map(productId =>
            axios.get(`${API_URL}/api/products/${productId}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          )
        );

        // Store product names in the state
        const productData = productResponses.reduce((acc, response) => {
          acc[response.data._id] = response.data.name; // Assuming product response has `name` and `_id`
          return acc;
        }, {});

        setProducts(productData);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle loading state
  if (loading) return <p className="p-4">Loading orders...</p>;

  // Handle error state
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem('accessToken');  // Get the token from localStorage

    if (!token) {
      setError('No access token found. Please log in.');
      return;
    }

    try {
      // Sending the request to update the order's status
      const res = await axios.patch(
        `${API_URL}/api/order/${orderId}/status`, // Endpoint to update the order status
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );

      if (res.status === 200) {
        // Successfully updated, you can also handle the updated order data here
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, status: newStatus }
              : order
          )
        );
      }
    } catch (err) {
      setError('Failed to update status');
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#0c6c6e]">All Orders</h1>

      {/* If no orders, show a message */}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-[#0c6c6e] text-white">
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Shipping Address</th>
                <th className="py-2 px-4 text-left">Items</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="odd:bg-gray-50 hover:bg-gray-100">
                  <td className="py-3 px-4">{order._id}</td>

                  <td className="py-3 px-4">
                    <p className="text-sm sm:text-base">{order.shippingAddress.fullName}</p>
                    <p className="text-sm sm:text-base">{order.shippingAddress.phone}</p>
                    <p className="text-sm sm:text-base">{order.shippingAddress.street}</p>
                    <p className="text-sm sm:text-base">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                    <p className="text-sm sm:text-base">{order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                  </td>

                  <td className="py-3 px-4">
                    <ul className="space-y-2">
                      {order.items.map((item) => (
                        <li key={item._id} className="border-b py-2 text-sm sm:text-base">
                          <span>Product ID: {item.productId} -</span>
                          {products[item.productId] ? ` ${products[item.productId]}` : ' Loading...'}
                          {' '} (Quantity: {item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="py-3 px-4">
                    {/* Dropdown for Status */}
                    <select
                      className="py-2 px-4 border border-gray-300 rounded-md"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      {['pending', 'preparing', 'out_for_delivery', 'delivered'].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
