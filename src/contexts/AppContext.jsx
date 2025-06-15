import { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { allProducts, orders as initialOrders, transactions as initialTransactions } from '../assets/assets';
import toast from "react-hot-toast";
import { getUserProfile, setAuthToken, logout as apiLogout, updateUserProfile } from "../api/auth"; // <-- import
import { mapUser } from "../utils/mapUser";
import { fetchProductsFromApi } from "../api/products";
import { fetchCart, addToCart, updateCartItem, removeCartItem, fetchCartItems } from "../api/cart";
import { placeOrder as apiPlaceOrder, fetchOrders, deleteOrder as apiDeleteOrder } from "../api/order";
import { fetchPayments } from "../api/payments";
import axiosInstance from "../api/axiosInstance";

const AppContext = createContext();

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}

function AppContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const [transactionsList, setTransactionsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [userLoading, setUserLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [cartLoading, setCartLoading] = useState(false);
    const [productsLoading, setProductsLoading] = useState(true);
    const [userOrders, setUserOrders] = useState([]); // Declare once at the top
    const [userTransactions, setUserTransactions] = useState([]);
    const navigate = useNavigate();

    // Fetch user from backend using token
    async function fetchUser() {
        setUserLoading(true);
        const access = localStorage.getItem("access");
        if (access) {
            setAuthToken(access);
            try {
                const res = await getUserProfile();
                setUser(mapUser(res.data)); // <-- map user here
            } catch {
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setUserLoading(false);
    }

    async function fetchProducts() {
        setProductsLoading(true);
        try {
            const apiProducts = await fetchProductsFromApi();
            setProducts(apiProducts);
        } catch (error) {
            toast.error("Failed to fetch products from server.");
            setProducts([]);
        }
        setProductsLoading(false);
    }
    function fetchTransactions() {
        setTransactionsList(initialTransactions);
    }

    // Fetch cart from backend
    async function loadCart() {
    setCartLoading(true);
    try {
        const res = await fetchCartItems();
        // res.data is an array of cart items
        setCart(res.data.map(item => ({
            id: item.id, // cart item id
            productId: item.product.id, // add this line
            name: item.product.name,
            img: item.product.image,
            category: item.product.category?.name,
            price: Number(item.product.price),
            quantity: item.quantity,
        })));
    } catch {
        setCart([]);
    }
    setCartLoading(false);
}

    useEffect(() => { fetchProducts(); }, []);
    useEffect(() => { fetchUser(); }, []);
    useEffect(() => { fetchTransactions(); }, []);
    // Call loadCart when user logs in or on mount
    useEffect(() => {
        if (user) loadCart();
        else setCart([]);
    }, [user]);

    async function loadOrders() {
      if (user) {
        try {
          const res = await fetchOrders();
          setUserOrders(res.data.map(order => ({
            id: order.id,
            date: order.created_at || order.date,
            status: order.status,
            address: order.address,
            total: Number(order.total_price),
            itemsDetails: order.items.map(item => ({
              productId: item.product.id,
              name: item.product.name,
              quantity: item.quantity,
            })),
          })));
        } catch {
          setUserOrders([]);
        }
      } else {
        setUserOrders([]);
      }
    }

    useEffect(() => {
      loadOrders();
    }, [user]);

    async function editUserDetails(firstName, lastName, email, phone, address) {
        if (!firstName || !lastName || !email) {
            toast.error("All fields are required!");
            return;
        }
        try {
            const res = await updateUserProfile({
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                address
            });
            setUser(mapUser(res.data));
            toast.success("User details updated successfully!");
        } catch (error) {
            toast.error("Failed to update user details.");
        }
    }

    // Add item to cart (only if logged in)
    async function handleAddItem(productId, quantity = 1) {
        if (!user) {
            toast.error("You must be logged in to add items to cart.");
            navigate("/login");
            return;
        }
        // Find product to check stock
        const product = products.find(p => p.id === productId);
        if (!product) {
            toast.error("Product not found.");
            return;
        }
        // Check if already in cart
        const cartItem = cart.find(item => item.productId === productId);
        try {
            if (cartItem) {
                // Update quantity if already in cart
                await addQuantity(cartItem.id);
            } else {
                // Fetch the user's cart to get the cart ID
                const cartRes = await fetchCart();
                const cartId = cartRes.data.id;
                await addToCart(cartId, productId, quantity);
                toast.success("Added to cart!");
            }
            loadCart();
        } catch (err) {
            console.error("Add to cart error:", err.response?.data || err.message);
            toast.error("Failed to add to cart.");
        }       
    }

    // Update quantity
    async function addQuantity(cartItemId) {
        const item = cart.find(i => i.id === cartItemId);
        if (item) {
            // Find product to check stock
            const product = products.find(p => p.id === item.productId);
            if (!product) {
                toast.error("Product not found.");
                return;
            }
            if (item.quantity + 1 > product.stock) {
                toast.error(`Only ${product.stock} in stock.`);
                return;
            }
            try {
                await updateCartItem(cartItemId, item.quantity + 1);
                loadCart();
                toast.success("Quantity updated!");
            } catch {
                toast.error("Failed to update quantity.");
            }
        }
        
    }
    async function removeQuantity(cartItemId) {
        const item = cart.find(i => i.id === cartItemId);
        if (item && item.quantity > 1) {
            try {
                await updateCartItem(cartItemId, item.quantity - 1);
                loadCart();
                toast.success("Quantity updated!");
            } catch {
                toast.error("Failed to update quantity.");
            }
        } else if (item) {
            await handleRemoveCartItem(cartItemId);
        }
    }

    // Remove item
    async function handleRemoveCartItem(cartItemId) {
        try {
            await removeCartItem(cartItemId);
            loadCart();
            toast.success("Item removed from cart!");
        } catch {
            toast.error("Failed to remove item.");
        }
    }

    function addItem(id, name, img, category, price, quantity = 1) {
        const newItem = {id, name, img, category, price, quantity}
        const existingItem = cart.find(ele => newItem.id == ele.id);
        if (existingItem) {
            setCart(cart =>
                cart.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
            toast.success(`${name} quantity updated in cart!`);
        } else {
            setCart(cart => [...cart, newItem]);
            toast.success(`${name} added to cart!`);
        }
    }

    // function removeCartItem(id) {
    //     setCart(cart => cart.filter(ele => ele.id != id));
    //     toast.success("Item removed from cart!");
    // }

    function calculateTotal(items) {
        if (!Array.isArray(items) || items.length == 0) {
            return 0
        }
        return items.reduce((total,item)=> {
            return total + (item.price * item.quantity)
        },0)
    }

    useEffect(() => {
        setTotal(calculateTotal(cart))
    }, [cart])

    // Place order logic
    async function placeOrder() {
        try {
            const res = await apiPlaceOrder();
            toast.success("Order placed successfully!");
            loadCart();
            await loadOrders(); // <-- refresh orders after placing
            return res.data;
        } catch (err) {
            toast.error(
                err.response?.data?.error ||
                "Failed to place order."
            );
            return null;
        }
    }

    // Update order status and log transaction
    async function completeOrder(orderId, amount, transactionId = "") {
        try {
            // Call backend to create Payment and update order status
            await axiosInstance.post(`payments/${orderId}/`, {
                payment_method: "Paystack",
                transaction_id: transactionId,
            });
            toast.success("Payment successful! Order is now processing.");
            // Optionally, refresh orders and transactions
            await loadOrders();
            await loadTransactions();
        } catch (err) {
            toast.error("Failed to log payment in backend.");
        }
    }

    function logFailedTransaction(orderId, amount) {
        setTransactionsList(prev => [
            {
                id: Date.now(),
                userId: user.id,
                date: new Date().toISOString().split("T")[0],
                amount,
                type: "Failed",
                status: "Failed",
                reason: "User closed payment popup"
            },
            ...prev
        ]);
        toast.error("Payment cancelled or failed. Please try again.");
    }

    function deleteTransaction(id) {
        setTransactionsList(prev => prev.filter (tx => tx.id !== id));
        toast.success("Transaction deleted.");
    }

    async function deleteOrder(id) {
        try {
            await apiDeleteOrder(id);
            setUserOrders(prev => prev.filter(order => order.id !== id));
            toast.success("Order deleted.");
        } catch {
            toast.error("Failed to delete order.");
        }
    }

async function loadTransactions() {
  if (user) {
    try {
      const res = await fetchPayments();
      // Filter and map payments for the current user
      setUserTransactions(
        res.data
          .filter(tx => tx.user === user.id || tx.user?.id === user.id)
          .map(tx => ({
            id: tx.id,
            date: tx.created_at || tx.date,
            amount: Number(tx.amount),
            status: tx.status || (tx.paid ? "Success" : "Pending"),
            type: tx.payment_method || tx.type || "Paystack",
            reason: tx.reason || "",
          }))
      );
    } catch {
      setUserTransactions([]);
    }
  } else {
    setUserTransactions([]);
  }
}

// Fetch transactions when user logs in
useEffect(() => {
  loadTransactions();
}, [user]);

    async function logout() {
        const refresh = localStorage.getItem("refresh");
        try {
            if (refresh) {
                await apiLogout(refresh);
            }
        } catch (e) {
            // Optionally handle error
        }
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
        navigate("/login");
        toast.success("Logged out successfully!");
    }

    const value = {
        cart,
        setCart,
        user,
        setUser,
        addQuantity,
        removeQuantity,
        handleRemoveCartItem,
        total,
        navigate,
        handleAddItem,
        products,
        productsLoading,
        ordersList,
        transactionsList,
        editUserDetails,
        placeOrder,
        completeOrder,
        userOrders,
        userTransactions,
        logFailedTransaction,
        searchTerm,
        setSearchTerm,
        deleteTransaction,
        deleteOrder,
        logout,
        userLoading,
        cartLoading,
        loadCart,
        loadOrders,
        loadTransactions, // <-- expose loadTransactions
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider