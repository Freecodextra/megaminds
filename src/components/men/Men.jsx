import Item from "../items/Item"
import men1 from "../../assets/images/men1.jpeg"
import men2 from "../../assets/images/men2.jpeg"
import men3 from "../../assets/images/men3.jpeg"
import men4 from "../../assets/images/men4.jpeg"
import men5 from "../../assets/images/men5.jpeg"
import men6 from "../../assets/images/men6.jpeg"
import men7 from "../../assets/images/men7.jpeg"
import men8 from "../../assets/images/men8.jpeg"
import men9 from "../../assets/images/men9.jpeg"
import men10 from "../../assets/images/men10.jpeg"
import men11 from "../../assets/images/men11.jpeg"
import men12 from "../../assets/images/men12.jpeg"
import men13 from "../../assets/images/men13.jpeg"
import men14 from "../../assets/images/men14.jpeg"
import men15 from "../../assets/images/men15.jpeg"
import men16 from "../../assets/images/men16.jpeg"
import men17 from "../../assets/images/men17.jpeg"
import men18 from "../../assets/images/men18.jpeg"
import men19 from "../../assets/images/men19.jpeg"
import men20 from "../../assets/images/men20.jpeg"


function Men() {
  const mens = [
    {
        img: men1,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 33
    },
    {
        img: men2,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 34
    },
    {
        img: men3,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 35
    },
    {
        img: men4,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 36
    },
    {
        img: men5,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 37
    },
    {
        img: men6,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 38
    },
    {
        img: men7,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 39
    },
    {
        img: men8,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 40
    },
    {
        img: men9,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 41
    },
    {
        img: men10,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 42
    },
    {
        img: men11,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 43
    },
    {
        img: men12,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 44
    },
    {
        img: men13,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 45
    },
    {
        img: men14,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 46
    },
    {
        img: men15,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 47
    },
    {
        img: men16,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 48
    },
    {
        img: men17,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 49
    },
    {
        img: men18,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 50
    },
    {
        img: men19,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 51
    },
    {
        img: men20,
        category: "Clothing",
        name: "Steller Men Clothes",
        price: 200000,
        id: 52
    },
]
  return (
    <div className="mt-36 lg:mx-52 mx-20">
        <div className="head flex flex-col items-center justify-center gap-10">
        <h1 className="text-4xl font-bold text-center">Men&apos;s Wear</h1>
        <hr className="lg:w-[955px] w-full"/>
        </div>
        <div className="flex flex-wrap gap-10 justify-center items-center mt-14">
            {
                mens.map((men)=> {
                    return <Item key={men.id} {...men} />
                })
            }
        </div>
    </div>
  )
}

export default Men