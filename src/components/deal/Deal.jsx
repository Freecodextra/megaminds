import dealCard from "../../assets/images/deal-card.png"

function Deal() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 grid place-items-center">
      <div className="bg-black mt-16 w-full lg:h-[556px] rounded-[40px] lg:rounded-[77px] overflow-hidden relative hover:shadow-[0_19px_27px_25px_rgba(0,0,0,0.05)] transition-all">
        <div className="image h-full">
          <img src={dealCard} alt="deal-card-img" className="h-full w-full object-cover" />
        </div>
        <div className="txt absolute lg:top-28 top-10 lg:right-20 right-1 h-80 flex flex-col lg:justify-between">
          <div className="real-txt text-white">
            <h2 className="lg:text-xl text-[12px] lg:mb-2">Deal of the Day</h2>
            <h1 className="lg:text-5xl text-[12px] lg:font-bold">Men&apos;s New Hoodie</h1>
            <div className="price flex gap-4 items-center font-bold lg:text-md text-[13px] tracking-wider mt-2">
              <span className="new-price">N35,000</span>
              <span className="old-price line-through">N60,000</span>
            </div>
          </div>
          <div className="button max-md:mt-12">
            <button className="border border-white lg:px-7 px-3 lg:py-2 py-1 text-white font-bold lg:rounded-xl rounded hover:border-0 hover:bg-[#D9D9D9] hover:text-black max-md:text-[10px]">Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deal