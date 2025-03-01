import Twitter from "../../assets/images/Twitter.png"
import Instagram from "../../assets/images/Instagram.png"
import Youtube from "../../assets/images/Youtube.png"
import { Logo } from "../navbar/Navbar"

function Footer() {
  return (
    <div className='bg-light-gray lg:h-[529px] mt-24 max-md:pb-10'>
        <div className="inner lg:mx-52 mx-6 lg:pt-16 pt-5">
            <div className="flex justify-between items-center max-md:flex-col max-md:gap-5">
                <Logo />
                <div className="txt text-[#555555]">Copyright 2024 Megeminds | All rights reserved</div>
                <div className="links flex items-center gap-1">
                    <div className="link w-[33px] h-[33px] grid place-items-center bg-white">
                        <img src={Youtube} alt="Youtube" />
                    </div>
                    <div className="link w-[33px] h-[33px] grid place-items-center bg-white">
                        <img src={Instagram} alt="Instagram" />
                    </div>
                    <div className="link w-[33px] h-[33px] grid place-items-center bg-white">
                        <img src={Twitter} alt="Twitter" />
                    </div>
                </div>
            </div>
            <div className="nav-linksflex items-center justify-center mt-14">
                <div className="flex justify-between lg:gap-48 gap-5 flex-wrap">
                <ul className="space-y-5 underline underline-offset-4">
                    <li>About Us</li>
                    <li>Clothes</li>
                    <li>Blogs</li>
                    <li>FAQs</li>
                </ul>
                <ul className="space-y-5 underline-offset-4 underline">
                    <li>Home</li>
                    <li>Offer</li>
                    <li>Men</li>
                    <li>Reservation</li>
                </ul>
                <ul className="space-y-5 underline-offset-4 underline">
                    <li>megeminds.ng</li>
                    <li>+62 958 248 966</li>
                </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer