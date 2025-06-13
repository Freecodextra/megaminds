import { useState } from "react"
import downBtn from "../../assets/images/down-btn.png"

function Faq() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-24">
      <h1 className="lg:text-4xl text-2xl font-bold text-center">Frequently Asked Questions</h1>
      <div className="mt-12 flex flex-col items-center gap-4">
        <Questionaire />
        <Questionaire />
        <Questionaire />
        <Questionaire />
        <Questionaire />
      </div>
    </div>
  )
}

function Questionaire() {
    const [open, setopen] = useState(false)
    const openFaQ = (e) => {
        setopen((state)=> !state)
    }
    const height = open ? "visible mb-8" : "h-0 invisible";
    return (
        <div className="lg:w-[956px] w-full rounded-[30px] lg:px-36 px-6 bg-[#D9D9D9]">
                <div className={`flex justify-between items-center ${open ? "pt-9" : "pt-4"}`}>
                <h1 className="txt font-bold lg:text-3xl text-xl text-center text-[#323a46]">Accordion - FAQs</h1>
                <button className="w-[54px] h-[54px] rounded-full bg-dark-blue grid place-items-center" onClick={openFaQ}>
                    <img src={downBtn} alt="image" />
                </button>
                </div>
                <div className={`drop-down mt-3 overflow-hidden ${height} transition-all duration-700`}>
                    <hr className="border border-[#b6b5b5]" />
                    <p className="pt-3">This is an answer to a frequently asked question. a couple more words to specify the subject further, provide more detail and make sure the user understands everything.</p>
                </div>
            </div>
    )
}
export default Faq