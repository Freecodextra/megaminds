import test1 from "../../assets/images/test1.png";
import test2 from "../../assets/images/test2.png";
import test3 from "../../assets/images/test3.png";

function Testimonials() {
  const testimonies = [
    {
      img: test1,
      testimony:
        "Your uniqueness deserves to be celebrated. check out our amazing products. Your uniqueness deserves to be celebrated. check out our amazing products. Your uniqueness deserves to be celebrated. check out our amazing products.",
      name: "Last - Name",
      position: "Position - Company",
    },
    {
      img: test2,
      testimony:
        "Your uniqueness deserves to be celebrated. check out our amazing products. Your uniqueness deserves to be celebrated. check out our amazing products. Your uniqueness deserves to be celebrated. check out our amazing products.",
      name: "Vee - Hilton",
      position: "Position - Company",
    },
    {
      img: test3,
      testimony:
        "Your uniqueness deserves to be celebrated. check out our amazing products. Your uniqueness deserves to be celebrated. check out our amazing products. Your uniqueness deserves to be celebrated. check out our amazing products.",
      name: "Bryan Houston",
      position: "Position - Company",
    },
    {
      img: test1,
      testimony:
        "Your uniqueness deserves to be celebrated. check out our amazing products. Your uniqueness deserves to be celebrated. check out our amazing products. Your uniqueness deserves to be celebrated. check out our amazing products.",
      name: "Last - Name",
      position: "Position - Company",
    },
  ];
  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-center">
      <div className="lg:mt-24 mt-20 w-full">
        <h1 className="lg:text-4xl text-3xl font-bold text-center">
          Hear from our customers
        </h1>
        <div className="lg:mt-10 mt-8 flex pt-20 overflow-x-scroll lg:gap-6 gap-3 w-full relative">
          {testimonies.map((testimony, index) => {
            return <Testimonial key={index} {...testimony} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Testimonial({ img, testimony, name, position }) {
  return (
    <div className="testimonial w-[294px] bg-[#D9D9D9] rounded-[30px] pt-20 px-8 pb-8 relative flex-shrink-0  m-0">
      <div className="absolute w-[140px] h-[140px] rounded-full overflow-hidden -top-20 right-20 shadow-xl">
        <img src={img} alt="image" className="object-cover" />
      </div>
      <p className="text-center text-md italic font-medium text-black/50">
        {testimony}
      </p>
      <div className="text-center mt-5">
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="font-semibold text-[15px] text-black/50 mt-1">
          {position}
        </p>
      </div>
    </div>
  );
}
export default Testimonials;
