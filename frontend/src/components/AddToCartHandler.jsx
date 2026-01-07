import { captureFrontBack } from '../utils/captureFrontBack';
import api from '../utils/api';

const AddToCartHandler = ({ userId, customization }) => {
  const handleAddToCart = async () => {
    try {
      const { imageFront, imageBack } = await captureFrontBack();

      const payload = {
        user_id: userId,
        customization: customization, // e.g. { color: 'red', size: 'M' }
        front_image: imageFront,
        back_image: imageBack,
      };

      const res = await api.post('/save-model', payload);

      console.log('✅ Model saved:', res.data);
      alert('Model saved successfully!');
    } catch (err) {
      console.error('❌ Failed to save model:', err);
      alert('Failed to save model');
    }
  };

  return (
    <button onClick={handleAddToCart} className="btn-primary">
      Add to Cart
    </button>
  );
};

export default AddToCartHandler;
