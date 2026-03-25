import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import type { CartItem } from "../types/CartItem";

function AddToCartPage () {
    const navigate = useNavigate();
    const {title, bookID, price} = useParams();
    const {addToCart} = useCart();
    const [quantity, setQuantity] = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: title || "No book found",
            quantity,
            price: Number(price)
        }
            addToCart(newItem);
            navigate('/cart');
        }

    return (
        <>
        <h2>Add {title} to your cart</h2>

        <div>
            <input type="number" placeholder="Enter quantity" value={quantity} onChange={(x) => setQuantity(Number(x.target.value))}/>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>

        <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    )
}

export default AddToCartPage;