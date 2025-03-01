import {createContext, useState} from 'react'


export const CartContext = createContext();

function CartContextProvider({children}) {
    const [cart, setCart] = useState([]);
    const value = {cart,setCart}
  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider