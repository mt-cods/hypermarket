import User from '../models/User.js';

// Add or update product in cart
export const updateCart = async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  if (!userId || !Array.isArray(items)) {
    return res.status(400).json({ message: 'userId and items array are required.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    items.forEach(({ productId, quantity }) => {
      if (!productId || typeof quantity !== 'number') {
        // skip invalid entries
        return;
      }
      if (quantity > 0) {
        user.cart.set(productId, quantity);
      } else {
        user.cart.delete(productId);
      }
    });

    await user.save();
    res.status(200).json({ message: 'Cart updated', cart: Object.fromEntries(user.cart) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ cart: Object.fromEntries(user.cart) });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};