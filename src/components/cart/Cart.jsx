import { useContext, useState, useEffect, useMemo } from "react";
import ShoppingBag from "../../assets/images/Shopping bag.png";
// import img from "../../assets/images/women13.jpeg"
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate()

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
  
  function addQuntity(e) {
      setCart(cart => {
        return cart.map(ele => {
         return ele.id == e.target.dataset.num ? {...ele, quantity: ele.quantity + 1} : ele
        })
      })
}
function removeQuntity(e) {
  setCart(cart => {
    return cart.map(ele => {
     return ele.id == e.target.dataset.num && ele.quantity > 1 ? {...ele, quantity: ele.quantity - 1} : ele
    })
  })
} 
function removeCartItem(e) {
  setCart(cart=> {
    return cart.filter(ele => ele.id != e.target.dataset.num)
  })
}
  return (
    <div className="mt-36 lg:mx-52 mx-14">
      <div className="head flex flex-col items-center justify-center gap-10">
        <h1 className="text-4xl font-bold text-center">Cart</h1>
        <hr className=" lg:w-[955px] w-full" />
      </div>
      {cart.length == 0 ? (
        <div className="max-md:flex items-center justify-center">
        <EmptyCart />
        </div>
      ) : (
        <div className="lg:mt-14 flex flex-wrap lg:gap-14 mx-md:items-center justify-center">
          <div className="cart-items space-y-[50px] mb-10 flex items-center flex-col">
            {cart.map(((ele) => {
              return <CartItem key={ele.id} {...ele} add={addQuntity} remove={removeQuntity} item={removeCartItem} />;
            }))}
          </div>
          <div>
          <div className="cart-summary w-[330px] lg:w-[400px]">
            <div className="inner-div space-y-5 min-h-[200px] bg-light-gray lg:p-10 p-5">
              <p className="font-bold lg:text-[32px] text-xl">Cart Summary</p>
              <div className="sub-total flex justify-between items-end">
                <span className="lg:text-2xl text-black/70 font-bold">
                  Sub Total
                </span>
                <span className="lg:text-2xl text-black/70 font-bold">N{total}</span>
                {/* <span className="lg:text-2xl text-black/70 font-bold">Quantity</span> */}
              </div>
              {/* {
                cart.map(ele => {
                  return (
                    <div className="sub-total flex items-end justify-between gap-24" key={ele.id}>
                    <span className="lg:text-2xl text-black/70 font-bold w-52">
                      {ele.name}
                    </span>
                    <span className="lg:text-2xl text-black/70 font-bold">N{ele.price}</span>
                    <span className="lg:text-2xl text-black/70 font-bold">{ele.quantity}</span>
                  </div>
                  )
                })
              } */}
              <div className="sub-total flex justify-between mt-2">
                <span className="lg:text-2xl text-black/70 font-bold">Total</span>
                <span className="lg:text-2xl text-black/70 font-bold">N{total}</span>
              </div>
            </div>
          </div>
          <div className="flex mt-5">
          <button className="lg:px-[106px] px-14 lg:py-5 py-3 border-black border rounded-[8px]" onClick={()=> navigate("/checkout")}>Checkout</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="grid place-items-center mt-14">
      <div className="lg:w-[956px] lg:h-[408px] flex flex-col gap-4 justify-center items-center lg:bg-light-gray lg:rounded-[51px]">
        <img src={ShoppingBag} alt="shopping bag" />
        <p className="font-medium text-2xl">No item in your cart</p>
        <button className="lg:px-[106px] px-6 lg:py-[25px] py-3 bg-dark-blue text-white rounded-[8px]">Start Shoping</button>
      </div>
    </div>
  );
}

function CartItem({ id, name, category, price, img, quantity, add, remove, item }) {
  return (
    <div className="cart-item lg:w-[665px] lg:p-[50px] p-5 lg:bg-light-gray">
      <div className="inner-div h-[250px] flex items-center gap-[17px]">
        <div className="image lg:w-[237px] w-[102px] lg:h-[250px] h-[121px]">
          <img src={img} alt="image" className="w-full h-full object-cover" />
        </div>
        <div className="txt-btn flex flex-col gap-6">
          <div className="txt">
            <p className="lg:text-2xl text-xl">{category}</p>
            <p className="lg:text-[32px] text-xl font-semibold">{name}</p>
            <p className="lg:text-2xl text-xl font-semibold">N{price}</p>
          </div>
          <div className="flex justify-evenly">
          <div className="btn lg:bg-white bg-light-gray flex items-center justify-between lg:rounded-[17px] rounded-lg lg:pr-7 pr-6 pl-5 lg:py-3 py-2 lg:min-w-[164px] min-w-[130px]">
            <button className="p-2" onClick={remove} data-num={id}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15" 
                height="3"
                viewBox="0 0 15 3"
                fill="none"
                data-num={id}
                className="max-md:w-3"
              >
                <path d="M0 1.5H15" stroke="#0000DA" strokeWidth="3" data-num={id} />
              </svg>
            </button>
            <span className="lg:text-xl text-sm font-semibold ordinal">{quantity}</span>
            <button onClick={add} data-num={id}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                data-num={id}
                className="max-md:w-3"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.92111 10.1967V16.0738H9.92111V10.1967H16V7.19672H9.92111V0.5H6.92111V7.19672H0V10.1967H6.92111Z"
                  fill="#0000DA"
                  data-num={id}
                />
              </svg>
            </button>
          </div>
          <button onClick={item} data-num={id} className="max-md:text-sm">remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
