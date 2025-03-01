
import ship from "../../assets/images/ship.png"
import money from "../../assets/images/money.png"
import time from "../../assets/images/time.png"
function CustomerCare() {
  return (
    <div className="lg:flex items-center justify-center mt-96 hidden">
        <div className="gap-12 w-[1152px] h-[139px] bg-light-gray flex items-center justify-center">
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
  )
}

export default CustomerCare