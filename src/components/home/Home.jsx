import NewArrival from "../arrival/NewArrival"
import Styles from "../c-styles/Styles"
import CustomerCare from "../customer-care/CustomerCare"
import Deal from "../deal/Deal"
import Faq from "../faq/Faq"
import Hero from "../hero/Hero"
import Testimonials from "../testimonials/Testimonials"

function Home() {
  return (
    <>
      <Hero />
      <NewArrival />
      <Deal />
      <Styles />
      <Testimonials />
      <Faq />
      <CustomerCare />
    </>
  )
}

export default Home