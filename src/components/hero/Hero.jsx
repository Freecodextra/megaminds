import hero from "../../assets/videos/hero.mp4"
import { useAppContext } from "../../contexts/AppContext";
function Hero() {
  const {navigate} = useAppContext();
  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:grid lg:grid-cols-2 mt-36 lg:place-items-center lg:gap-12">
      <div className="txt">
        <div>
          <h1 className="font-bold lg:text-[40px] text-2xl text-[#2E2A2A]">Welcome to</h1>
          <h1 className="font-extrabold lg:text-7xl text-5xl font-montserrat bg-clip-text text-transparent bg-gradient-to-r from-dark-blue from-35.32% to-[#000074] to-96.75% py-2">
            Megeminds
          </h1>
          <h1 className="font-bold lg:text-[40px] text-4xl text-black mt-2">Collections</h1>
        </div>
        <div className="flex flex-col mt-3">
          <p className="lg:text-base text-sm text-[#383838] font-medium lg:w-[440px] w-[300px]">
            We believe your uniqueness deserves to be celebrated. Discover clothes
            that make you feel empowered, inspired, and ready to conquer the
            world.
          </p>
          <button className="bg-dark-blue text-white text-xl font-semibold rounded-md w-[175px] py-4 px-7 hover:bg-[#000074] lg:mt-3 mt-7" onClick={() => navigate("/about")}>Learn more</button>
        </div>
      </div>
      <div className="lg:h-[440px] lg:w-[550px] w-full h-[300px] lg:mt-0 mt-14">
        <video src={hero} className="hidden"></video>
        <video autoPlay loop className="object-cover w-full h-full">
          <source src={hero} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default Hero;
