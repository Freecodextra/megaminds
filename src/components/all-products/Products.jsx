import LoadingSpinner from "../common/LoadingSpinner";
import { useAppContext } from "../../contexts/AppContext"
import Item from "../items/Item"
import { useLocation } from "react-router-dom";

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
    <div className="mt-36 lg:mx-52 mx-20">
      <div className="head flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-center">{heading}</h1>
        <hr className=" lg:w-[955px] w-full"/>
      </div>
      <div className="flex flex-wrap gap-10 justify-center items-center mt-14">
        {
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Item
                key={product.id}
                id={product.id}
                img={product.image}
                category={product.category?.name}
                name={product.name}
                price={Number(product.price)}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 w-full">No products found.</div>
          )
        }
      </div>
    </div>
  )
}

export default Products;