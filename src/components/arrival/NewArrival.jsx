import { motion } from "framer-motion";
import { useAppContext } from "../../contexts/AppContext";
import Product from "../product/Product";


function NewArrival() {
  const { products } = useAppContext();
  // Get the first 3 products for arrivals
  const arrivals = products.slice(0, 3);
  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-4 lg:mt-20 mt-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="arrival-heading flex justify-center items-center flex-col">
        <h1 className="font-montserrat font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-dark-blue from-60% to-[#000074] to-99% tracking-wide text-center underline lg:text-[40px] text-4xl">New Arrival</h1>
      </div>
      <div className="products flex lg:flex-row flex-col justify-center items-center lg:mt-16 mt-5 gap-16">
        {arrivals.map((arrival, idx) => (
          <motion.div
            key={arrival.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Product
              id={arrival.id}
              category={arrival.category} // Product.jsx expects category object
              name={arrival.name}
              price={Number(arrival.price)}
              image={arrival.image}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default NewArrival;