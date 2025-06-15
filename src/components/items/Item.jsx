import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

function Item({ id, img, category, name, price }) {
  const { handleAddItem } = useAppContext();
  // Function to handle adding item to cart
  const addItem = () => {
    handleAddItem(id);
  };

  return (
    <div className="group w-full max-w-xs mx-auto h-auto mb-10">
      <Link to={`/product/${id}`}>
        <div className="image w-full h-56 sm:h-[230px] hover:shadow-xl transition">
          <img
            src={img}
            alt={name}
            className="object-cover w-full h-full mb-4 rounded"
          />
        </div>
        <div className="txt w-full my-2 text-lg px-1 flex flex-col gap-[2px]">
          <span className="type text-base">{category}</span>
          <p className="name font-semibold text-base">{name}</p>
          <p className="price font-semibold text-base">
            ₦{price.toLocaleString()}
          </p>
        </div>
      </Link>
      <button
        className="w-full border border-black rounded-lg font-bold text-base py-3 hover:bg-dark-blue hover:text-white hover:border-0 transition"
        onClick={addItem}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Item;
