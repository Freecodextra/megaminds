import { useParams } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

function ProductDetails() {
  const { id } = useParams();
  const { products, addItem, navigate } = useAppContext();

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 mt-36 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product.id, product.name, product.img, product.category, product.price, 1);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-36 flex flex-col lg:flex-row gap-10 items-center">
      <img src={product.img} alt={product.name} className="w-full max-w-sm rounded-lg shadow" />
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-lg text-gray-600">{product.category}</p>
        <p className="text-2xl font-bold text-dark-blue">₦{product.price.toLocaleString()}</p>
        {/* Product Description */}
        <div className="mt-2">
          <h2 className="font-semibold mb-1">Description</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="border border-dark-blue text-dark-blue px-6 py-3 rounded hover:bg-dark-blue hover:text-white font-semibold"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="bg-dark-blue text-white px-6 py-3 rounded hover:bg-[#000074] font-semibold"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;