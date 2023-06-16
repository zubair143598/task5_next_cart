import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DynamicProductPage = () => {
  const router = useRouter();
  const { selectedProductId } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://dummyjson.com/products/${selectedProductId}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (selectedProductId) {
      fetchProduct();
    }
  }, [selectedProductId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, price, images } = product;

  return (
    <div>
      <h1>{title}</h1>
      <p>Price: {price}</p>
      <img src={images[0]} alt={title} />
    </div>
  );
};

export default DynamicProductPage;
