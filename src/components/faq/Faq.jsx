import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react"
import downBtn from "../../assets/images/down-btn.png"

function Faq() {
  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-4 mt-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h1 className="lg:text-4xl text-2xl font-bold text-center">Frequently Asked Questions</h1>
      <div className="mt-12 flex flex-col items-center gap-4">
        <Questionaire />
        <Questionaire />
        <Questionaire />
        <Questionaire />
        <Questionaire />
      </div>
    </motion.div>
  )
}

function Questionaire() {
    const [open, setopen] = useState(false)
    const openFaQ = (e) => {
        setopen((state)=> !state)
    }
    return (
        <motion.div
          className="lg:w-[956px] w-full rounded-[30px] lg:px-36 px-6 bg-[#D9D9D9]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
            <div className={`flex items-center justify-between gap-4 ${open ? "pt-9" : "pt-4 pb-4"}`}>
                <h1 className="txt font-bold lg:text-3xl text-xl flex-1 text-[#323a46]">
                    Accordion - FAQs
                </h1>
                <button
                  className="w-[54px] h-[54px] rounded-full bg-dark-blue grid place-items-center flex-shrink-0"
                  onClick={openFaQ}
                  aria-label="Toggle FAQ"
                >
                    <img src={downBtn} alt="toggle" />
                </button>
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  className="drop-down mt-3 overflow-hidden visible mb-8 transition-all duration-700"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <hr className="border border-[#b6b5b5]" />
                  <p className="pt-3">This is an answer to a frequently asked question. a couple more words to specify the subject further, provide more detail and make sure the user understands everything.</p>
                </motion.div>
              )}
            </AnimatePresence>
        </motion.div>
    )
}
export default Faq