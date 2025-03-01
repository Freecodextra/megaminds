import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

function Item({ id, img, category, name, price }) {
  const {cart,setCart} = useContext(CartContext)

  function addItem() {
    const newItem = {id, name, img, category, price, quantity: 1}
    const existingItem = cart.find(ele => newItem.id == ele.id);
    if (existingItem) {
      setCart(
        cart.map(ele => ele.id == newItem.id ? {...ele, quantity: ele.quantity + 1} : ele)
      )
    } else {
      setCart([...cart, newItem])
    }
  }
  return (
    <div className="group w-[218px] h-auto mb-10">
      <div className="image h-[230px] hover:w-[226px] hover:h-[246px] hover:shadow-xl">
      <img src={img} alt="image" className="object-cover w-full h-full" />
      </div>
      <div className="txt w-80 my-2 text-2xl px-1 flex flex-col gap-[2px]">
        <span className="type text-base">{category}</span>
        <p className="name font-semibold text-base">{name}</p>
        <p className="price font-semibold text-base">{price}</p>
      </div>
      <button className="border border-black rounded-lg font-bold text-xl px-[46px] py-3 hover:bg-dark-blue hover:text-transparent hover:bg-clip-text group-hover:border-dark-blue group-hover:text-dark-blue hover:border-0" onClick={addItem}>
        Add to Cart
      </button>
    </div>
  );
}

export default Item;
