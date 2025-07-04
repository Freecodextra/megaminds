import { motion } from "framer-motion";
import ship from "../../assets/images/ship.png"
import money from "../../assets/images/money.png"
import time from "../../assets/images/time.png"

function CustomerCare() {
  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 lg:flex items-center justify-center mt-24 hidden">
        <div className="gap-12 w-full bg-light-gray flex items-center justify-center rounded-xl py-8">
          <div className="txt space-x-[19px] flex items-center justify-center">
            <img src={ship} alt="icon" />
            <span className="text-2xl">Free Shipping</span>
          </div>
          <div className="txt space-x-[19px] flex items-center justify-center">
            <img src={money} alt="icon" />
            <span className="text-2xl">Quick Payment</span>
          </div>
          <div className="txt space-x-[19px] flex items-center justify-center">
            <img src={time} alt="icon" />
            <span className="text-2xl">24/7 Support</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CustomerCare