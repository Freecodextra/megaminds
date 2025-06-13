import title1 from "../../assets/images/title1.png"
import title2 from "../../assets/images/title2.png"
import { OrderNow } from "../navbar/Navbar"

function Styles() {
    const latestStyles = [
        {
            title: "Title - Website Headline", 
            body: "Your uniqueness deserves to be celebrated. check out our amazing products.",
            img: title1,
            isReverse: false
        },
        {
            title: "Title - Website Headline", 
            body: "Your uniqueness deserves to be celebrated. check out our amazing products.",
            img: title2,
            isReverse: true
        },
    ]
  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:mt-24 mt-20">
      <h1 className="lg:text-4xl text-2xl font-bold text-center">Check out our latest styles</h1>
      {
        latestStyles.map((style,index)=>{
          return <LatestStyles key={index} {...style} />
        })
      }
    </div>
  )
}

function LatestStyles({title,body,img, isReverse}) {
    const style = isReverse ? "lg:flex-row-reverse" : "lg:flex-row";
    return (
        <div className={`flex items-center justify-center max-md:flex-col lg:mt-8 mt-5 lg:gap-12 ${style} max-md:flex-col-reverse`}>
            <div className="lg:w-[602px] lg:h-[458px]">
            <div className="txt lg:w-[415px] mt-16 ml-8">
                <h1 className="font-bold lg:text-5xl text-4xl">{title}</h1>
                <h4 className="lg:text-xl font-semibold mt-8 mb-5">{body}</h4>
                <OrderNow />
            </div>
            </div>
            <div className="image lg:hover:w-[669px] lg:hover:h-[508px] max-md:mx-6 hover:shadow-2xl transition-all duration-500 max-md:mt-5">
                <img src={img} alt="image" className="object-cover w-full h-full" />
            </div>
        </div>
    )
}

export default Styles