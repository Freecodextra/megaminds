import Product from "../product/Product"
import arrival1 from "../../assets/images/arrival1.png"
import arrival2 from "../../assets/images/arrival2.png"
import arrival3 from "../../assets/images/arrival3.jpeg"


function NewArrival() {
  const arrivals = [
    {
      category: "Clothing",
      name: "Stella Men Suit",
      price: "N200,000",
      img: arrival1
    },
    {
      category: "Clothing",
      name: "Stella Men Suit",
      price: "N200,000",
      img: arrival2
    },
    {
      category: "Clothing",
      name: "Stella Men Suit",
      price: "N200,000",
      img: arrival3
    },
  ]
  return (
    <div className="lg:mt-20 px-6">
        <div className="arrival-heading flex justify-center items-center flex-col">
        <h1 className="font-gengboy font-bold bg-clip-text text-transparent bg-gradient-to-r from-dark-blue from-60% to-black to-99% tracking-wide text-center underline lg:text-[64px] text-5xl">New Arrival</h1>
        <hr className="border-2 border-dark-blue lg:w-[350px] w-64 lg:-mt-2 -mt-1"/>
        </div>
        <div className="products flex lg:flex-row flex-col justify-center items-center lg:mt-16 mt-5 gap-16">
          {
            arrivals.map((arrival, index)=> {
              return <Product key={index} {...arrival} />
            })
          }
        </div>
    </div>
  )
}

export default NewArrival