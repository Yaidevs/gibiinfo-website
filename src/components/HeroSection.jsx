import { Link } from "react-router-dom"
import img1 from "../assets/image 5.png"

const HeroSection = () => {
  return (
    <section id="home" className="bg-[#008080] py-32 pt-[160px]">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 text-center lg:text-left">
        <div className="lg:w-1/2">
          <h1 className="text-3xl text-white sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            Learn, Practice and Excel
          </h1>
          <p className="text-white mt-4">
            Master your subjects with GibiInfo's comprehensive practice questions and detailed explanations.
          </p>
          <Link
            to="/exit-exam"
            className="mt-6 inline-block bg-white text-[#008080] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex flex-col items-center">
          <img src={img1 || "/placeholder.svg"} alt="Mobile UI 1" className="w-full h-auto rounded-lg" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection

