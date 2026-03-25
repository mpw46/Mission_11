import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";

function CartPage () {
    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    
    return (
        <>
        <div>
            <h2>Your Cart</h2>
            <div>
                {cart.length === 0 ?
                (<p>Your cart is empty</p>) :
                (<ul>
                    {cart.map((item: CartItem) => 
                    <li key={item.bookID}>
                        {item.quantity} x {item.title}: {(item.quantity * item.price).toFixed(2)}
                        <button onClick={() => removeFromCart(item.bookID)}>Remove</button>
                    </li>)}
                </ul>)}
            </div>
            <h3>Total: ${cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}</h3>
            <button>Checkout</button>
            <button onClick={() => navigate(-1)}>Continue Shopping</button>
        </div>
        </>
    )
}

export default CartPage;