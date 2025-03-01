import hero from "../../assets/videos/hero.mp4"
function Hero() {
  return (
    <div className="lg:grid lg:grid-cols-2 mt-36 lg:place-items-center lg:px-36 px-6 w-fit">
    <div className="txt">
      <div className="">
        <h1 className="font-bold lg:text-[40px] text-2xl text-[#2E2A2A]">Welcome to</h1>
        <h1 className="font-bold lg:text-8xl text-6xl font-gengboy bg-clip-text text-transparent bg-gradient-to-r from-dark-blue from-35.32% to-black to-96.75% tracking-wide">
          Megeminds
        </h1>
        <h1 className="font-bold lg:text-5xl text-4xl text-black">Collections</h1>
      </div>
      <div className="flex flex-col lg:mt-8 mt-3">
        <p className="lg:text-xl text-sm font-medium lg:w-[440px] w-[300px]">
          We believe your uniqueness deserves to be celebrated. Discover clothes
          that make you feel empowered, inspired, and ready to conquer the
          world.
        </p>
        <button className="bg-dark-blue text-white text-xl font-semibold rounded-md w-[175px] py-4 px-7 hover:bg-[#000074] lg:mt-8 mt-7">Learn more</button>
      </div>
    </div>
    <div className="lg:h-[440px] lg:w-[550px] w-full h-[300px] lg:mt-0 mt-14">
      <video src={hero} className="hidden"></video>
      <video autoPlay loop className="object-cover lg:w-full lg:h-full w-inherit h-inherit">
        <source src={hero} type="video/mp4" />
      </video>
    </div>
    </div>
  );
}

export default Hero;
