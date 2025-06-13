
import { useAppContext } from "../../contexts/AppContext";
import Product from "../product/Product";


function NewArrival() {
  const { products } = useAppContext();
  // Get the first 3 products for arrivals
  const arrivals = products.slice(0, 3);
  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:mt-20 mt-10">
      <div className="arrival-heading flex justify-center items-center flex-col">
        <h1 className="font-montserrat font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-dark-blue from-60% to-[#000074] to-99% tracking-wide text-center underline lg:text-[40px] text-4xl">New Arrival</h1>
      </div>
      <div className="products flex lg:flex-row flex-col justify-center items-center lg:mt-16 mt-5 gap-16">
        {arrivals.map((arrival) => (
          <Product key={arrival.id} {...arrival} />
        ))}
      </div>
    </div>
  );
}

export default NewArrival;