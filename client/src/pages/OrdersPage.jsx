import React, { useEffect, useState } from 'react';
import axiosInstance from '../components/axiosInstance';
import { API_URL } from './config';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await axiosInstance.get(`${API_URL}/api/order/my`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        const fetchedOrders = res.data.orders || [];

        // Fetch products for each order
        const ordersWithProducts = await Promise.all(fetchedOrders.map(async (order) => {
          const productPromises = order.items.map(async ({ productId, quantity }) => {
            const productRes = await axiosInstance.get(`${API_URL}/api/products/${productId}`);
            return { product: productRes.data, quantity };
          });

          const productsWithQuantity = await Promise.all(productPromises);
          return { ...order, products: productsWithQuantity };
        }));

        setOrders(ordersWithProducts);
      } catch (err) {
        setError('Failed to fetch your orders');
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) return <p className="p-4">Loading your orders...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-md p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Order ID:</span>
                <span className="text-sm text-gray-900">{order._id}</span>
              </div>

              <div className="mb-2">
                <span className="font-medium">Status: </span>
                <span className="capitalize text-blue-700">{order.status}</span>
              </div>

              <div className="text-sm mb-2">
                <p className="font-semibold">Items:</p>
                {order.products.map(({ product, quantity }, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <img
                      src={API_URL + product.image} // Ensure that the image URL is correct
                      alt={product.name}
                      className="w-12 h-12 object-contain rounded mr-4"
                    />
                    <div className="flex-1">
                      <p>{product.name} × {quantity}</p>
                      <p className="text-sm text-gray-500">Price: ₹{(product.price * quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-sm text-gray-700">
                <p className="font-semibold">Shipping Address:</p>
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.phone}</p>
                <p>
                  {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.state} -{' '}
                  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
