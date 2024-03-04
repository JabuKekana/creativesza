import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ShopDetails() {
    const { shop_id } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products for the selected shop using the shop_id
        fetch(`/api/shops/${shop_id}`)
            .then((response) => response.json())
            .then((data) => setProducts(data.products))
            .catch((error) => console.error('Error fetching products:', error));
    }, [shop_id]);

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.product_id}>{product.product_name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ShopDetails;












