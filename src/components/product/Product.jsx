import star from "../../assets/images/star.png"
import starFill from "../../assets/images/star-fill.png"
import productBg from "../../assets/images/product-bg.png" 

function Product({category, name, price, img}) {
  return (
    <div className="max-md:grid max-md:place-items-center">
        <div className="group image bg-dark-blue lg:w-[330px] lg:h-[470px] w-[271px] h-[392px] overflow-hidden rounded-[74px] relative lg:hover:w-[400px] lg:hover:h-[511px] hover:w-[300px] hover:h-[420px] hover:shadow-2xl transition-all duration-500">           
            <img src={img} alt="product-image" className="object-cover w-full h-full" />
            <div className="absolute bottom-0"><img src={productBg} alt="" className="object-cover w-[330px] h-[470px] group-hover:w-[400px] group-hover:h-[511px] bottom-0 transition-none" /></div>
            <div className="grid group place-items-center shop-now font-bold w-[105px] h-[36px] border border-white absolute bottom-10 left-14 rounded-xl hover:border-0 hover:bg-[#D9D9D9]">
            <button className="text-white text-center text-sm hover:text-black">Shop Now</button>
            </div> 
        </div>
        <div className="txt w-80 mt-6 lg:text-2xl text-xl px-1 flex flex-col gap-2 max-md:ml-10">
          <span className="type">{category}</span>
          <p className="name font-semibold">{name}</p>
          <div className="ratings flex gap-2">
            <img src={starFill} alt="star" className="w-6 h-6" />
            <img src={starFill} alt="star" className="w-6 h-6" />
            <img src={starFill} alt="star" className="w-6 h-6" />
            <img src={starFill} alt="star" className="w-6 h-6" />
            <img src={star} alt="star" className="w-6 h-6" />
          </div>
          <p className="price font-semibold">{price}</p>
        </div>
    </div>
  )
}

export default Product