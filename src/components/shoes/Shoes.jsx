import Item from "../items/Item"
import shoe1 from "../../assets/images/shoe1.png"
import shoe2 from "../../assets/images/shoe2.png"
import shoe3 from "../../assets/images/shoe3.png"
import shoe4 from "../../assets/images/shoe4.png"
import shoe5 from "../../assets/images/shoe5.png"
import shoe6 from "../../assets/images/shoe6.png"
import shoe7 from "../../assets/images/shoe7.png"
import shoe8 from "../../assets/images/shoe8.png"
import shoe9 from "../../assets/images/shoe9.png"
import shoe10 from "../../assets/images/shoe10.png"
import shoe11 from "../../assets/images/shoe11.png"
import shoe12 from "../../assets/images/shoe12.png"


function Shoes() {
    const shoes = [
        {
            img: shoe1,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 1
        },
        {
            img: shoe2,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 2
        },
        {
            img: shoe3,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 3
        },
        {
            img: shoe4,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 4
        },
        {
            img: shoe5,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 5
        },
        {
            img: shoe6,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 6
        },
        {
            img: shoe7,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 7
        },
        {
            img: shoe8,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 8
        },
        {
            img: shoe9,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 9
        },
        {
            img: shoe10,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 10
        },
        {
            img: shoe11,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 11
        },
        {
            img: shoe12,
            category: "Clothing",
            name: "Steller Men Clothes",
            price: 200000,
            id: 12
        },
    ]
  return (
    <div className="mt-36 lg:mx-52 mx-20">
        <div className="head flex flex-col items-center justify-center gap-10">
        <h1 className="text-4xl font-bold text-center">Shoes</h1>
        <hr className=" lg:w-[955px] w-full"/>
        </div>
        <div className="flex flex-wrap gap-10 justify-center items-center mt-14">
            {
                shoes.map((shoe)=> {
                    return <Item key={shoe.id} {...shoe} />
                })
            }
        </div>
    </div>
  )
}

export default Shoes