import Item from "../items/Item"
import women1 from "../../assets/images/women1.jpeg"
import women2 from "../../assets/images/women2.jpeg"
import women3 from "../../assets/images/women3.jpeg"
import women4 from "../../assets/images/women4.jpeg"
import women5 from "../../assets/images/women5.jpeg"
import women6 from "../../assets/images/women6.jpeg"
import women7 from "../../assets/images/women7.jpeg"
import women8 from "../../assets/images/women8.jpeg"
import women9 from "../../assets/images/women9.jpeg"
import women10 from "../../assets/images/women10.jpeg"
import women11 from "../../assets/images/women11.jpeg"
import women12 from "../../assets/images/women12.jpeg"
import women13 from "../../assets/images/women13.jpeg"
import women14 from "../../assets/images/women14.jpeg"
import women15 from "../../assets/images/women15.jpeg"
import women16 from "../../assets/images/women16.jpeg"
import women17 from "../../assets/images/women17.jpeg"
import women18 from "../../assets/images/women18.jpeg"
import women19 from "../../assets/images/women19.jpeg"
import women20 from "../../assets/images/women20.jpeg"


function Women() {
  const womens = [
    {
        img: women1,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 13
    },
    {
        img: women2,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 14
    },
    {
        img: women3,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 15
    },
    {
        img: women4,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 16
    },
    {
        img: women5,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 17
    },
    {
        img: women6,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 18
    },
    {
        img: women7,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 19
    },
    {
        img: women8,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 20
    },
    {
        img: women9,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 21
    },
    {
        img: women10,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 22
    },
    {
        img: women11,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 23
    },
    {
        img: women12,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 24
    },
    {
        img: women13,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 25
    },
    {
        img: women14,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 26
    },
    {
        img: women15,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 27
    },
    {
        img: women16,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 28
    },
    {
        img: women17,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 29
    },
    {
        img: women18,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 30
    },
    {
        img: women19,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 31
    },
    {
        img: women20,
        category: "Clothing",
        name: "Steller women Clothes",
        price: 200000,
        id: 32
    },
]
  return (
    <div className="mt-36 lg:mx-52 mx-20">
        <div className="head flex flex-col items-center justify-center gap-10">
        <h1 className="text-4xl font-bold text-center">Women&apos;s Wear</h1>
        <hr className=" lg:w-[955px] w-full"/>
        </div>
        <div className="flex flex-wrap gap-10 justify-center items-center mt-14">
            {
                womens.map((women)=> {
                    return <Item key={women.id} {...women} />
                })
            }
        </div>
    </div>
  )
}

export default Women