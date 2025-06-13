import { useAppContext } from "../../contexts/AppContext"
import Item from "../items/Item"
import { allProducts } from "../../assets/assets";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Products({ category }) {
  const query = useQuery();
  const search = query.get("search")?.toLowerCase() || "";
  const {products} = useAppContext();

  // Normalize category for filtering and heading
  const categoryMap = {
    men: "Men",
    women: "Women",
    shoes: "Shoes"
  };

  // For shoes, filter by name or category as needed
  let filteredProducts = [];
  let heading = "All Products";
  if (category === "men") {
    filteredProducts = allProducts.filter(p => p.category === "Men");
    heading = "Men";
  } else if (category === "women") {
    filteredProducts = allProducts.filter(p => p.category === "Women");
    heading = "Women";
  } else if (category === "shoes") {
    filteredProducts = allProducts.filter(p => p.category === "Shoes");
    heading = "Shoes";
  } else {
    filteredProducts = allProducts;
  }

  // Apply search filter if search is present
  if (search) {
    filteredProducts = filteredProducts.filter(
      p =>
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
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
                  filteredProducts.map((product)=> (
                    <Item key={product.id} {...product} />
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