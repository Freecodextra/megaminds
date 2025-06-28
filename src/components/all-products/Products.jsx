import LoadingSpinner from "../common/LoadingSpinner";
import { useAppContext } from "../../contexts/AppContext"
import Item from "../items/Item"
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Products({ category }) {
  const query = useQuery();
  const search = query.get("search")?.toLowerCase() || "";
  const { products, productsLoading } = useAppContext();

  if (productsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner />
      </div>
    );
  }

  // Normalize category for filtering and heading
  let filteredProducts = [];
  let heading = "All Products";
  if (category === "men") {
    filteredProducts = products.filter(p => p.category?.name === "Men");
    heading = "Men";
  } else if (category === "women") {
    filteredProducts = products.filter(p => p.category?.name === "Women");
    heading = "Women";
  } else if (category === "shoes") {
    filteredProducts = products.filter(p => p.category?.name === "Shoes");
    heading = "Shoes";
  } else if (category === "accessories") {
    filteredProducts = products.filter(p => p.category?.name === "Accessories");
    heading = "Accessories";
  } else {
    filteredProducts = products;
  }

  // Apply search filter if search is present
  if (search) {
    filteredProducts = filteredProducts.filter(
      p =>
        p.name.toLowerCase().includes(search) ||
        (p.category?.name && p.category.name.toLowerCase().includes(search)) ||
        (p.description && p.description.toLowerCase().includes(search))
    );
    heading = `Search Results for "${search}"`;
  }

  return (
    <motion.div
      className="mt-36 lg:mx-52 mx-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="head flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-center">{heading}</h1>
        <hr className=" lg:w-[955px] w-full"/>
      </div>
      <div className="flex flex-wrap gap-10 justify-center items-center mt-14">
        {
          filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
              >
                <Item
                  id={product.id}
                  img={product.image}
                  category={product.category?.name}
                  name={product.name}
                  price={Number(product.price)}
                />
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-500 w-full">No products found.</div>
          )
        }
      </div>
    </motion.div>
  )
}

export default Products;