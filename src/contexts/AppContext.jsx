import {createContext, useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { allProducts, userDetails, orders as initialOrders, transactions as initialTransactions } from '../assets/assets';
import toast from "react-hot-toast";

const AppContext = createContext();

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}

function AppContextProvider({children}) {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const [transactionsList, setTransactionsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    function fetchUser() {
        setUser(userDetails);
    }

    function fetchProducts() {
        setProducts(allProducts);
    }
    function fetchOrders() {
        setOrdersList(initialOrders);
    }
    function fetchTransactions() {
        setTransactionsList(initialTransactions);
    }

    useEffect(() => { fetchProducts(); }, []);
    useEffect(() => { fetchUser(); }, []);
    useEffect(() => { fetchOrders(); }, []);
    useEffect(() => { fetchTransactions(); }, []);

    function editUserDetails(firstName, lastName, email, phone, address) {
        if (!firstName || !lastName || !email) {
            toast.error("All fields are required!");
            return;
        }
        setUser(prevUser => ({
            ...prevUser,
            firstName,
            lastName,
            email,
            phone,
            address
        }));
        toast.success("User details updated successfully!");
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

    function addQuantity(id) {
        setCart(cart =>
            cart.map(ele =>
                ele.id == id ? { ...ele, quantity: ele.quantity + 1 } : ele
            )
        );
        toast.success("Item quantity increased!");
    }

    function removeQuantity(id) {
        setCart(cart =>
            cart.map(ele =>
                ele.id == id && ele.quantity > 1
                    ? { ...ele, quantity: ele.quantity - 1 }
                    : ele
            )
        );
        toast.success("Item quantity decreased!");
    }

    function removeCartItem(id) {
        setCart(cart => cart.filter(ele => ele.id != id));
        toast.success("Item removed from cart!");
    }

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
    function placeOrder() {
        if (!user?.address) {
            toast.error("Please add your address in your profile before checkout.");
            navigate("/profile");
            return false;
        }
        if (cart.length === 0) {
            toast.error("Your cart is empty!");
            return false;
        }
        // Check for existing pending order for this user
        const existingPending = ordersList.find(
            order => order.userId === user.id && order.status === "Pending"
        );
        if (existingPending) {
            toast("You already have a pending order. Proceed to payment.");
            return existingPending;
        }
        const newOrder = {
            id: Date.now(),
            userId: user.id,
            date: new Date().toISOString().split("T")[0],
            status: "Pending",
            total: total,
            items: cart.length,
            itemsDetails: cart.map(item => ({
                productId: item.id,
                name: item.name,
                quantity: item.quantity
            })),
            address: user.address
        };
        setOrdersList(prev => [newOrder, ...prev]);
        setCart([]);
        toast.success("Order placed! Proceed to payment.");
        return newOrder;
    }

    // Update order status and log transaction
    function completeOrder(orderId, amount) {
        setOrdersList(prev =>
            prev.map(order =>
                order.id === orderId ? { ...order, status: "Processing" } : order
            )
        );
        setTransactionsList(prev => [
            {
                id: Date.now(),
                userId: user.id,
                date: new Date().toISOString().split("T")[0],
                amount,
                type: "Debit",
                status: "Success",
                reason: "Order Payment"
            },
            ...prev
        ]);
        toast.success("Payment successful! Order is now processing.");
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
        setTransactionsList(prev => prev.filter(tx => tx.id !== id));
        toast.success("Transaction deleted.");
    }

    function deleteOrder(id) {
        setOrdersList(prev => prev.filter(order => order.id !== id));
        toast.success("Order deleted.");
    }

    // Filter orders and transactions for current user
    const userOrders = ordersList.filter(order => order.userId === user?.id);
    const userTransactions = transactionsList.filter(tx => tx.userId === user?.id);

    const value = {
        cart,
        setCart,
        user,
        setUser,
        addQuantity,
        removeQuantity,
        removeCartItem,
        total,
        navigate,
        addItem,
        products,
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
        deleteOrder
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider